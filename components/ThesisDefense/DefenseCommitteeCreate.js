import { View, Text, TextInput, TouchableOpacity, Button, Alert } from "react-native";
import { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./CreateDefenseStyles";


const DefenseCommitteeCreate = ({ navigation }) => {

    const [defense_committee, setDefenseCommittee] = useState({
        name: '',
        date_end: '',
    });

    console.log(defense_committee);

    const create = async () => {
        try {
            const access_token = await AsyncStorage.getItem('token-access');
            const res = await authApi(access_token).post(endpoints['defense_committee'], defense_committee);
            console.log(res.data);
            alert('Thêm ủy ban thành công');
            navigation.navigate('DefenseCommittee');
        }
        catch (error) {
            if (error.response && error.response.status === 403) {
                alert('Bạn không có quyền thực hiện chức năng này');
            } else {
                alert('Đã có lỗi xảy ra');
            }
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
        setDefenseCommittee(prevState => ({ ...prevState, date_end: date }));
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DefenseCommitteeCreate</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên hội đồng"
                onChangeText={(text) => setDefenseCommittee(prevState => ({ ...prevState, name: text }))}
            />
            <Button title="Chọn ngày kết thúc" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Text style={styles.dateText}>{defense_committee.date_end ? defense_committee.date_end.toLocaleString() : ''}</Text>
            <TouchableOpacity style={styles.button} onPress={create}>
                <Text style={styles.buttonText}>Thêm ủy ban</Text>
            </TouchableOpacity>
        </View >
    );
}

export default DefenseCommitteeCreate;