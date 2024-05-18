import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { useState, useEffect, useCallback } from "react";
import styles from "./TeacherDoThesisStyles";
import API, { authApi, endpoints } from "../../configs/API";

const TeacherDoThesis = ({navigation}) => {
    const [refreshing, setRefreshing] = useState(false);
    const [parties, setParties] = useState([]);
    const [teacherDoThesis, setTeacherDoThesis] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        LoadTeacherDoThesis();
    }, [refreshing]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setParties([]);
        LoadTeacherDoThesis();
        setRefreshing(false);
    }, []);
    console.log(teacherDoThesis);

    const LoadTeacherDoThesis = async () => {
        setLoading(true);
        try {
            let res = await API.get(endpoints['techers_do_thesis']);
            setTeacherDoThesis(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const goToTeacherDoThesisDetail = (teacherDoThesisId) => {
        navigation.navigate('TeacherDoThesisDetail', { teacher_do_thesis_id: teacherDoThesisId });
        console.log(teacherDoThesisId);
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {teacherDoThesis.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.item} onPress={() => goToTeacherDoThesisDetail(item.id)}>
                            <View>
                                <Text style={styles.text}>Tên giáo viên: {item.teacher_name}</Text>
                                <Text style={styles.text}>Mã học sinh làm đồ án: {item.thesis_student}</Text>
                                <Text style={styles.committeeText}>{`Ngày thêm: ${(new Date(item?.date_join)).toLocaleDateString()}`}</Text>
                                <Text style={styles.text}>Mã giáo viên: {item.teacher}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

export default TeacherDoThesis;