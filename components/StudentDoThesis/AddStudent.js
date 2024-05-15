import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { act, useState } from 'react';
import API, { authApi, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './AddStudentStyle';

const AddStudent = ({navigation}) => {
    const [studentId, setStudentId] = useState("");
    const [thesisId, setThesisId] = useState("");
    const [committeeId, setCommitteeId] = useState("");


    const AddStudent = async () => {
        if (studentId === "" || thesisId === "" || committeeId === "") {
            Alert.alert("Missing fields", "Vui lòng nhập đủ các trường.");
            return;
        }
        try {
            const access_token = await AsyncStorage.getItem('token-access');

            let res = await authApi(access_token).post(endpoints['add_student'], {
                "thesis": parseInt(thesisId),
                "thesis_defense_committee": parseInt(committeeId),
                "status": "DN",
                "count_score": 0.0,
                "active": true,
                "student": parseInt(studentId)
            });
            console.log(res);
            alert("Thêm sinh viên thành công");
            navigation.navigate('Student');
        }
        catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.detail === "Không được tham gia 2 lần trên cùng 1 khóa luận.") {
                        alert("Bạn không thể tham gia cùng một khóa luận hai lần.");
                    } else if (error.response.data.detail === "Hội đồng khóa luận đã đầy, mời xem lại.") {
                        alert("Hội đồng khóa luận đã đầy, vui lòng xem lại.");
                    } else {
                        alert(error.response.data.detail);
                    }
                } else if (error.response.status === 403) {
                    alert("Bạn không có quyền tạo mới.");
                }
            }
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nhập các thông tin sau</Text>
            <Text style={styles.buttonText}>Mã học sinh :</Text>
            <TextInput
                style={styles.input}
                value={studentId}
                onChangeText={setStudentId}
                placeholder="Enter thesis ID"
            />
            <Text style={styles.buttonText}>Mã khóa luận:</Text>
            <TextInput
                style={styles.input}
                value={thesisId}
                onChangeText={setThesisId}
                placeholder="Enter thesis ID"
            />
            <Text style={styles.buttonText}>Mã hội đồng bảo vệ:</Text>
            <TextInput
                style={styles.input}
                value={committeeId}
                onChangeText={setCommitteeId}
                placeholder="Enter committee ID"
            />
            <View style={styles.button}>
                <TouchableOpacity onPress={AddStudent}>
                    <Text style={styles.buttonText_btn}>Thêm sinh viên</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AddStudent;