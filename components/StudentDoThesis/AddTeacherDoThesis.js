import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import styles from "./AddTeacherDoThesisStyles";

const AddTeacherDoThesis = ({ route, navigation }) => {
    const [loading, setLoading] = useState(false);
    const studenId = route?.params.student_id;

    const [teacherId, setTeacherId] = useState();
    console.log(teacherId);

    const AddTeacherDoThesis = async () => {
        Alert.alert(
            "Xác nhận",
            "Bạn chắc chắn muốn thêm giáo viên này chứ?",
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
                            console.info(access_token);
                            const res = await authApi(access_token).post(endpoints['teacher_do_thesis_add'], {
                                thesis_student: studenId,
                                teacher: parseInt(teacherId)
                            });
                            alert('Thêm giáo viên thành công');
                            navigation.navigate('Student');
                            console.log(res.data);
                        } catch (error) {
                            console.log(error)
                            if (error.response && error.response.status === 403) {
                                alert('Không có quyền truy cập');
                            } else {
                                alert('Đã có lỗi xảy ra' + error?.response?.data?.detail);
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
            <Text style={styles.title}>AddTeacherDoThesis</Text>
            <Text>Nhập mã giáo viên</Text>
            <TextInput
                style={styles.input}
                placeholder="Mã giáo viên"
                onChangeText={setTeacherId}
            />
            <TouchableOpacity style={styles.button} onPress={AddTeacherDoThesis}>
                <Text style={styles.buttonText}>Thêm</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddTeacherDoThesis;