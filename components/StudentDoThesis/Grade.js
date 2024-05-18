import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
import API, { authApi, endpoints } from '../../configs/API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import styles from './GraceStyles';
import { useCallback } from 'react';


const Grade = ({ route, navigation }) => {
    const studentId = route?.params.student_id;
    const teacherId = route?.params.teacher_id;
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState(null);
    const [score, setScore] = useState(0);
    const [specificCriteria, setSpecificCriteria] = useState([]);
    const [specific_criteria_id, setSpecificCriteriaId] = useState(null);

    const [specificCriteriaData, setSpecificCriteriaData] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [parties, setParties] = useState([]);


    useEffect(() => {
        setSpecificCriteria(specificCriteriaData);
    }, [specificCriteria]);

    useEffect(() => {
        getStudent();
    }, [studentId]);

    useEffect(() => {
        getGradeSpectific();
    }, [studentId, teacherId]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setParties([]);
        getStudent();
        getGradeSpectific();
        setRefreshing(false);
    }, []);

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

    console.log(specific_criteria_id);


    const addGrade = async () => {
        try {
            setLoading(true);
            const access_token = await AsyncStorage.getItem('token-access');
            let res = await authApi(access_token).post(endpoints['grade'], {
                "score": parseFloat(score),
                "specific_criteria": specific_criteria_id,
                "student_thesis": studentId,
                "teacher_defense_commit": teacherId
            });
            onRefresh();
            alert("Chấm điểm thành công");
            // navigation.navigate('StudentDetail', { studentId: studentId });
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 403) {
                alert("Bạn không có quyền chấm điểm");
            } else if (error.response) {
                alert(error.response.data.detail);
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại sau");
            }
        } finally {
            setLoading(false);
        }
    }

    const getGradeSpectific = async () => {
        try {
            setLoading(true);
            let res = await API.get(endpoints['grade_spectific'](studentId, teacherId));
            console.log(res.data);
            if (!res.data || res.data.length === 0) {
                alert('Đã hết mục tiêu chấm điểm');
                navigation.navigate('StudentDetail', { studentId: studentId });
                return;
            }
            setSpecificCriteriaData(res.data);
            setSpecificCriteriaId(res.data[0].id); // Set the initial value here
        } catch (error) {
            console.log(error);
            if (error.response) {
                alert(error.response.data.detail);
            }
            navigation.navigate('StudentDetail', { studentId: studentId });
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container} >
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <>
                    <Text style={styles.title}>Grade</Text>
                    <Text style={styles.title}>Nhập điểm</Text>
                    <TextInput
                        style={styles.input}
                        value={score.toString()}
                        onChangeText={(text) => setScore(Number(text))}
                        placeholder="0.0"
                    />
                    <Text style={styles.title}>Chọn tiêu chí chấm điểm</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={specific_criteria_id}
                        onValueChange={(itemValue, itemIndex) => setSpecificCriteriaId(itemValue)}
                    >
                        {Array.isArray(specificCriteria) && specificCriteria.map((item, index) => (
                            <Picker.Item key={index} label={item.name} value={item.id} />
                        ))}
                    </Picker>
                    <TouchableOpacity style={styles.submitButton} onPress={addGrade}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

export default Grade;