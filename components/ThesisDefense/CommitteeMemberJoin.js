import { View, Text, TouchableOpacity } from 'react-native';
import { authApi, endpoints } from '../../configs/API';
import { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CommitteeMemberJoinStyles';

const CommitteeMemberJoin = ({ route, navigation }) => {
    const { defense_committee_id } = route?.params;

    const [role, setRole] = useState();
    const [teacher_user, setTeacherUser] = useState();
    const [loading, setLoading] = useState(true);
    console.log(defense_committee_id);
    console.log(role);
    console.log(teacher_user);


    const committee_join = async () => {
        setLoading(true);
        try {
            const access_token = await AsyncStorage.getItem('token-access');
            console.log(access_token);
            const res = await authApi(access_token).post(endpoints['committee_join'], {
                thesis_defense_committee: defense_committee_id ? defense_committee_id : null,
                role: role,
                teacher_user: teacher_user,
            });
            console.log(res.data);
            alert('Thêm thành công');
            navigation.navigate('DefenseCommitteeDetail', { defense_committee_id: defense_committee_id });
        } catch (error) {

            if (error.response && error.response.status === 403) {
                alert('Bạn không có quyền thực hiện thao tác này');
            } else {
                alert('Lỗi: ' + error.response.data.detail)
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>THÊM THÀNH VIÊN</Text>
            <RNPickerSelect
                onValueChange={(value) => setRole(value)}
                items={[
                    { label: 'Chủ tịch', value: 'CT' },
                    { label: 'Thư ký', value: 'TK' },
                    { label: 'Thành viên', value: 'TV' },
                ]}
                placeholder={{ label: 'Chọn vai trò...', value: null }}
                style={styles.picker}
            />
            <Text>Mã giáo viên</Text>
            <TextInput
                style={styles.input}
                value={teacher_user}
                onChangeText={setTeacherUser}
                placeholder='Nhập mã giáo viên'
            />
            <TouchableOpacity style={styles.button} onPress={committee_join}>
                <Text style={styles.buttonText}>Thêm thành viên</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CommitteeMemberJoin;