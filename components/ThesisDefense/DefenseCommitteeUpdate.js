import { View, Text, RefreshControl, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import API, { authApi, endpoints } from '../../configs/API';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from 'react-native-gesture-handler';
import styles from './DefenseCommitteeUpdateStyles';

const DefenseCommitteeUpdate = ({ route, navigation }) => {

    const { defense_committee_id } = route?.params;
    const [defense_committee_data, setDefenseCommitteeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [parties, setParties] = useState([]);

    useEffect(() => {
        LoadDefenseCommitteeDetail();
    }, [defense_committee_id]);

    console.log(defense_committee_data);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setParties([]);
        LoadDefenseCommitteeDetail();
        setRefreshing(false);
    }, []);

    const LoadDefenseCommitteeDetail = async () => {
        setLoading(true);
        try {
            let res = await API.get(endpoints['defense_committee_id'](defense_committee_id));
            setDefenseCommitteeData(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDefenseCommitteeData({ ...defense_committee_data, date_end: date });
        hideDatePicker();
    };

    const updateDefenseCommittee = async () => {
        Alert.alert(
            "Xác nhận",
            "Bạn chắc chắn muốn thay đổi?",
            [
                {
                    text: "Không",
                    style: "cancel"
                },
                {
                    text: "Có",
                    onPress: async () => {
                        setLoading(true);
                        try {
                            const access_token = await AsyncStorage.getItem('token-access');
                            console.log(access_token);
                            const res = await authApi(access_token).put(endpoints['defense_committee_update'](defense_committee_id), defense_committee_data, {
                            });
                            console.log(res.data);
                            alert('Cập nhật ủy ban thành công');
                            navigation.navigate('DefenseCommittee');
                        } catch (error) {
                            console.log(error);
                            alert('Đã có lỗi xảy ra');
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    }


    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text style={styles.title}>THÔNG TIN</Text>
                <TextInput
                    style={styles.input}
                    value={defense_committee_data?.name}
                    onChangeText={(text) => setDefenseCommitteeData({ ...defense_committee_data, name: text })}
                />
                <Button title="Chọn ngày kết thúc" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <Text style={styles.dateText}>
                    {defense_committee_data?.date_end
                        ? new Date(defense_committee_data.date_end).toLocaleDateString() + ' ' + new Date(defense_committee_data.date_end).toLocaleTimeString()
                        : ''}
                </Text>
                <TouchableOpacity style={styles.button} onPress={updateDefenseCommittee}>
                    <Text style={styles.buttonText}>Cập nhật</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default DefenseCommitteeUpdate;