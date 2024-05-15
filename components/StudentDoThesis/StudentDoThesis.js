import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import React from 'react';
import API, { endpoints } from "../../configs/API";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import styles from './SDTStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";

const StudentDoThesis = ({ navigation }) => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const LoadStudents = async () => {
            setLoading(true);
            const access_token = await AsyncStorage.getItem('token-access');
            console.log(access_token);
            try {
                let res = await API.get(endpoints['students']);
                setStudents(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        LoadStudents();
    }, []);


    const AddStudent = () => {
        navigation.navigate('AddStudent');
    }

    const gotoStudentDetail = (studentId) => {
        navigation.navigate('StudentDetail', { studentId: studentId });
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>StudentDoThesis</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={AddStudent}>
                        <Text style={styles.buttonText}>Thêm sinh viên</Text>
                    </TouchableOpacity>
                </View>
                {students.map((student, index) => {
                    let date = new Date(student.date_created);
                    let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                    // Định dạng điểm số
                    let score = student.count_score.toFixed(2);

                    // Định dạng trạng thái
                    let status;
                    switch (student.status) {
                        case 'DN':
                            status = 'Đã nộp';
                            break;
                        case 'DCD':
                            status = 'Đang chấm điểm';
                            break;
                        case 'DCDX':
                            status = 'Đã chấm điểm xong';
                            break;
                        default:
                            status = 'Unknown status';
                    }
                    return (
                        <View style={styles.studentInfo} key={index}>
                            <TouchableOpacity onPress={() => gotoStudentDetail(student.id)}>
                                <Text style={styles.studentInfoText}>Mã sinh viên: {student.id}</Text>
                                <Text style={styles.studentInfoText}>Tên sinh viên: {student.student_name}</Text>
                                <Text style={styles.studentInfoText}>Mã bài khóa luận: {student.thesis}</Text>
                                <Text style={styles.studentInfoText}>Hội đồng bảo vệ khóa luận: {student.thesis_defense_committee}</Text>
                                <Text style={styles.studentInfoText}>Ngày tạo bài khóa luận: {formattedDate}</Text>
                                <Text style={styles.studentInfoText}>Trạng thái bài khóa luận: {status}</Text>
                                <Text style={styles.studentInfoText}>Tổng điểm: {score}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default StudentDoThesis;