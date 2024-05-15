import { View, Text, TextInput, Switch, TouchableOpacity, Alert } from "react-native"
import React, { useEffect, useState } from 'react';
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './UpStudentStyles';

const UpStudent = ({ route, navigation }) => {
    const studentId = route?.params.student_id;
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        const getStudent = async () => {
            setLoading(true);
            try {
                let res = await API.get(endpoints['student_id'](studentId));
                setStudentData(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getStudent();
    }, [studentId]);

    const updateStudent = async () => {
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
                        const access_token = await AsyncStorage.getItem('token-access');
                        console.log(access_token);
                        setLoading(true);
                        try {
                            let res = await authApi(access_token).put(endpoints['student_update'](studentData.id), studentData);
                            alert("Chỉnh sửa thành công");
                            navigation.navigate('Student');
                        } catch (error) {
                            console.log(error.response);
                            if (error.response) {
                                alert("Chỉnh sửa không thành công");
                            }
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
            <Text style={styles.title}>Chỉnh sửa sinh viên</Text>
            <Text style={styles.text_item}>Mã khóa luận:</Text>
            <TextInput
                style={styles.input}
                placeholder={studentData?.thesis?.toString()}
                value={studentData?.thesis?.toString()}
                onChangeText={(value) => setStudentData({ ...studentData, thesis: value })}
            />
            <Text style={styles.text_item}>Mã hội đồng bảo vệ khóa luận:</Text>
            <TextInput
                style={styles.input}
                placeholder={studentData?.thesis_defense_committee?.toString()}
                value={studentData?.thesis_defense_committee?.toString()}
                onChangeText={(value) => setStudentData({ ...studentData, thesis_defense_committee: value })}
            />
            <Text style={styles.text_item}>Trạng thái:</Text>
            <TextInput
                style={styles.input}
                placeholder={studentData?.status}
                value={studentData?.status}
                onChangeText={(value) => setStudentData({ ...studentData, status: value })}
            />
            <Text style={styles.text_item}>Hoạt động:</Text>
            <TextInput
                style={styles.input}
                placeholder={studentData?.count_score?.toString()}
                value={studentData?.count_score?.toString()}
                onChangeText={(value) => setStudentData({ ...studentData, count_score: value })}
            />
            <Text style={styles.text_item}>Mã Sinh viên:</Text>
            <TextInput
                style={styles.input}
                placeholder={studentData?.student?.toString()}
                value={studentData?.student?.toString()}
                onChangeText={(value) => setStudentData({ ...studentData, student: value })}
            />
            <TouchableOpacity style={styles.button} onPress={updateStudent}>
                <Text style={styles.buttonText}>CHỈNH SỬA</Text>
            </TouchableOpacity>
        </View>
    );
}

export default UpStudent;