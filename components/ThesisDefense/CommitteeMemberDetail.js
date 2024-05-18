import { useCallback, useRef } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { authApi, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CommitteeMemberDetailStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';

const CommitteeMemberDetail = ({ route, navigation }) => {

    const committeeMemberId = route?.params.committee_members_id;
    const [committeeMember, setCommitteeMember] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [parties, setParties] = useState([]);
    const url = 'http://10.0.2.2:8000/static';

    useEffect(() => {
        LoadDefenseCommitteeDetail();
    }, [committeeMemberId]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setParties([]);
        LoadDefenseCommitteeDetail();
        setRefreshing(false);
    }, [committeeMemberId]);

    console.log(committeeMemberId);


    const LoadDefenseCommitteeDetail = async () => {
        setLoading(true);
        const access_token = await AsyncStorage.getItem('token-access');
        console.log(access_token);
        if (access_token === null) {
            alert('Bạn không có quyền truy cập vào trang này');
            navigation.navigate('Home');
        } else {
            try {
                let res = await authApi(access_token).get(endpoints['committee_member_detail'](committeeMemberId));
                setCommitteeMember(res.data);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    alert('Bạn không có quyền truy cập vào trang này');
                    navigation.navigate('Home');
                }
            } finally {
                setLoading(false);
            }
        }
    }

    const [selectedRole, setSelectedRole] = useState(null);
    const pickerRef = useRef();
    const [isPickerVisible, setPickerVisible] = useState(false);

    const roles = [
        { label: 'Chủ tịch', value: 'CT' },
        { label: 'Thư ký', value: 'TK' },
        { label: 'Thành viên', value: 'TV' },
    ];
    console.log(selectedRole);

    const updateRole = async () => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn cập nhật vai trò của thành viên hội đồng này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý', onPress: async () => {
                        const access_token = await AsyncStorage.getItem('token-access');
                        setLoading(true);
                        try {
                            let res = await authApi(access_token).patch(endpoints['committee_member_update_role'](committeeMemberId), {
                                role: selectedRole
                            });
                            alert('Cập nhật thành công');
                            LoadDefenseCommitteeDetail();
                            console.info(res);
                        } catch (error) {
                            console.error(error?.response?.data?.detail);
                            alert('Cập nhật thất bại ' + error?.response?.data?.detail);
                        } finally {
                            setLoading(false);
                        }
                    },
                }
            ]
        );
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View style={styles.container}>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                        {committeeMember.committee_member && (
                            <View style={styles.section}>
                                <Text style={styles.title}>Thông tin thành viên hội đồng</Text>
                                <Text style={styles.text}>Mã thành viên hội đồng: {committeeMember.committee_member.id}</Text>
                                <Text style={styles.text}>
                                    Ngày tham gia: {new Date(committeeMember.committee_member.date_join).toLocaleDateString()}
                                </Text>
                                <Text style={styles.text}>Vai trò: {committeeMember.committee_member.role}</Text>
                                <Text style={styles.text}>Mã hội đồng: {committeeMember.committee_member.thesis_defense_committee}</Text>
                            </View>
                        )}
                        {committeeMember.teacher_user && (
                            <View style={styles.section}>
                                <Text style={styles.title}>Thông tin giáo viên</Text>
                                <Text style={styles.text}>Mã giáo viên: {committeeMember.committee_member.teacher_user}</Text>
                                <Text style={styles.text}>Tên giáo viên: {committeeMember.committee_member.teacher_name}</Text>
                                <Text style={styles.text}>Username: {committeeMember.teacher_user.username}</Text>
                                <Image
                                    style={styles.image}
                                    source={{ uri: `${url}${committeeMember.teacher_user.avatar}` }}
                                />
                                <Text style={styles.text}>Email: {committeeMember.teacher_user.email}</Text>
                            </View>
                        )}
                    </ScrollView>
                    <TouchableOpacity onPress={() => setPickerVisible(!isPickerVisible)} style={styles.button}>
                        <Text style={styles.buttonText}>Chỉnh sửa vai trò</Text>
                    </TouchableOpacity>
                    {isPickerVisible && (
                        <View>
                            <RNPickerSelect
                                ref={pickerRef}
                                onValueChange={(value) => setSelectedRole(value)}
                                items={roles}
                                style={{
                                    inputIOS: styles.picker,
                                    inputAndroid: styles.picker,
                                }}
                            />
                            <TouchableOpacity onPress={updateRole} style={styles.button}>
                                <Text style={styles.buttonText}>Thay thế</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            )}
        </View>
    );
};

export default CommitteeMemberDetail;