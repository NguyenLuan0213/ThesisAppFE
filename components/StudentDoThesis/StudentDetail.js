import { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import API, { authApi, endpoints } from '../../configs/API';
import styles from './StudentDetailStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentDetail = ({ route, navigation }) => {
    const { studentId } = route?.params;
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    const [teacherId, setTeacherId] = useState({});

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const jsonValue = await AsyncStorage.getItem('@user');
                let userData = JSON.parse(jsonValue);
                setUser(userData);
                setTeacherId(userData.id);
                console.log(userData);
            } catch (e) {
                // read error
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
        getUserData();
    }, []);

    useEffect(() => {
        const LoadStudent = async () => {
            setLoading(true);
            try {
                let res = await API.get(endpoints['student_detail'](studentId));
                setStudentData(res.data);
            }
            catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        LoadStudent();
    }, [studentId]);

    const getRoleName = (role) => {
        switch (role) {
            case 'CT':
                return 'Chủ tịch';
            case 'TK':
                return 'Thư ký';
            case 'TV':
                return 'Thành viên';
            default:
                return 'Không xác định';
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const getStatusName = (status) => {
        switch (status) {
            case 'DN':
                return 'Đã nộp';
            case 'DCD':
                return 'Đang chấm điểm';
            case 'DCDX':
                return 'Đã chấm điểm xong';
            default:
                return 'Không xác định';
        }
    }

    const deleteStudent = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa sinh viên này?",
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
                            await authApi(access_token).put(endpoints['student_delete'](studentId));
                            alert('Xóa thành công');
                            navigation.navigate('Student');
                            return [...prevState]
                        } catch (error) {
                            console.error(error);
                            if (error.response && error.response.status === 403) {
                                alert('Bạn không đủ quyền để thực hiện hành động này.');
                            }
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ]
        );
    }

    const gotoUpdateStudent = (studentId) => {
        navigation.navigate('UpdateStudent', { student_id: studentId });

    }

    const goToGrade = (studentId, teacherId) => {
        const status = studentData.student_do_thesis.status;

        if (status === 'DCD') {
            navigation.navigate('Grade', { student_id: studentId, teacher_id: teacherId });

            console.info(studentId, teacherId)
        } else if (status === 'DN') {
            alert('Chưa tới thời gian chấm điểm');
        } else if (status === 'DCDX') {
            alert('Đã chấm điểm xong');
        }

    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>THÔNG TIN SINH VIÊN LÀM KHÓA LUẬN</Text>

            {loading ? (
                <Text>Loading...</Text>
            ) : studentData ? (
                <ScrollView>
                    <View>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.itemText}>Mã sinh viên khóa luận: {studentData.student_do_thesis.id}</Text>
                            <Text style={styles.itemText}>Tên sinh viên: {studentData.student_do_thesis.student_name}</Text>
                            <Text style={styles.itemText}>Mã khóa luận: {studentData.student_do_thesis.thesis}</Text>
                            <Text style={styles.itemText}>Mã hội đồng bảo vệ: {studentData.student_do_thesis.thesis_defense_committee}</Text>
                            <Text style={styles.itemText}>Ngày tạo: {formatDate(studentData.student_do_thesis.date_created)}</Text>
                            <Text style={styles.itemText}>Trạng thái: {getStatusName(studentData.student_do_thesis.status)}</Text>
                            <Text style={styles.itemText}>Điểm trung bình: {studentData.student_do_thesis.count_score}</Text>
                            <Text style={styles.itemText}>Active: {studentData.student_do_thesis.active ? 'Yes' : 'No'}</Text>
                            <Text style={styles.itemText}>Mã sinh viên: {studentData.student_do_thesis.student}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Khóa Luận:</Text>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.itemText}>Tên khóa luân: {studentData.thesis.title}</Text>
                            <Text style={styles.itemText}>Dự án: {studentData.thesis.teacher_defense_commit}</Text>
                            <Text style={styles.itemText}>Báo cáo: {studentData.thesis.product}</Text>
                            <Text style={styles.itemText}>Ngày tạo: {formatDate(studentData.thesis.date_created)}</Text>
                            <Text style={styles.itemText}>Trạng thái: {studentData.thesis.active ? 'Yes' : 'No'}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Điểm: (Hệ 10)</Text>
                        {studentData.scores.map((score, index) => (
                            <View key={index} style={styles.scoreContainer}>
                                <Text style={styles.itemText}>Điểm {index + 1}: {score.score}</Text>
                                <Text style={styles.itemText}>Ngày chấm: {formatDate(score.date_created)}</Text>
                                <Text style={styles.itemText}>Mã tiêu chí cụ thể: {score.specific_criteria}</Text>
                                <Text style={styles.itemText}>Mã giáo viên chấm điểm: {score.teacher_defense_commit}</Text>
                            </View>
                        ))}

                        <Text style={styles.sectionTitle}>Giáo viên hướng dẫn:</Text>
                        {studentData.teachers_do_thesis.map((teacher, index) => (
                            <View key={index} style={styles.scoreContainer}>
                                <Text style={styles.itemText}>Giáo viên {index + 1}: {teacher.teacher_name}</Text>
                                <Text style={styles.itemText}>Ngày tham gia: {formatDate(teacher.date_join)}</Text>
                            </View>
                        ))}

                        <Text style={styles.sectionTitle}>Giáo viên chấm điểm:</Text>
                        {studentData.grading_teachers.map((teacher, index) => (
                            <View key={index} style={styles.scoreContainer}>
                                <Text style={styles.itemText}>Giáo viên {index + 1}: {teacher.teacher_user}</Text>
                                <Text style={styles.itemText}>Tên giáo viên: {teacher.teacher_name}</Text>
                                <Text style={styles.itemText}>Ngày tham gia: {formatDate(teacher.date_join)}</Text>
                                <Text style={styles.itemText}>Vai trò: {getRoleName(teacher.role)}</Text>
                            </View>
                        ))}

                        <Text style={styles.sectionTitle}>Hội đồng bảo vệ:</Text>
                        <View style={styles.scoreContainer}>
                            <Text style={styles.itemText}>Tên hội đồng: {studentData.thesis_defense_committee.name}</Text>
                            <Text style={styles.itemText}>Ngày tạo: {formatDate(studentData.thesis_defense_committee.date_created)}</Text>
                            <Text style={styles.itemText}>Ngày kết thúc: {formatDate(studentData.thesis_defense_committee.date_end)}</Text>
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <Text>No student data available</Text>
            )}
            <TouchableOpacity style={styles.button_delete} onPress={deleteStudent}>
                <Text style={styles.buttonText}>XÓA SINH VIÊN NÀY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => gotoUpdateStudent(studentData.student_do_thesis.id)}>
                <Text style={styles.buttonText}>CHỈNH SỬA</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button_grade} onPress={() => goToGrade(studentData.student_do_thesis.id, teacherId)}>
                <Text style={styles.buttonText_grade}>CHẤM ĐIỂM</Text>
            </TouchableOpacity>
        </View>
    );
}

export default StudentDetail;