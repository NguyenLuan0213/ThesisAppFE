import { View, Text, ActivityIndicator, ScrollView, RefreshControl, TouchableOpacity } from "react-native"
import { useState, useEffect, useCallback } from "react";
import styles from "./TeacherDoThesisDetailStyles";
import API, { endpoints } from "../../configs/API";

const TeacherDoThesisDetail = ({ route }) => {
    const teacherId = route?.params?.teacher_do_thesis_id;
    console.log(teacherId);

    const [refreshing, setRefreshing] = useState(false);
    const [parties, setParties] = useState([]);
    const [loading, setLoading] = useState(false);

    const [teacherDoThesisDetail, setTeacherDoThesisDetail] = useState(null);

    useEffect(() => {
        LoadTeacherDoThesisDetail();
    }, [refreshing, teacherId]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setParties([]);
        LoadTeacherDoThesisDetail();
        setRefreshing(false);
    }, [teacherId]);

    const LoadTeacherDoThesisDetail = async () => {
        setLoading(true);
        try {
            let res = await API.get(endpoints['teacher_detail'](teacherId));
            setTeacherDoThesisDetail(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>Thông tin giáo viên phụ trách</Text>
                        <Text style={styles.text}>Tên giáo viên: {teacherDoThesisDetail?.teacher_name}</Text>
                        <Text style={styles.text}>Mã học sinh làm đồ án : {teacherDoThesisDetail?.thesis_student}</Text>
                        <Text style={styles.text}>{`Ngày thêm: ${(new Date(teacherDoThesisDetail?.date_join)).toLocaleDateString()}`}</Text>
                        <Text style={styles.text}>Mã giáo viên: {teacherDoThesisDetail?.teacher}</Text>
                    </View>
                </ScrollView>
            )}
        </View>
    )
}

export default TeacherDoThesisDetail;