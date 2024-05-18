import { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import API, { authApi, endpoints } from '../../configs/API';
import ThesisDetailStyle from './ThesisDetailStyle';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThesisDetail = ({ route, navigation }) => {
    const thesisId = route?.params?.thesisId;
    const [ThesisDetail, setThesisDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const onThesisDelete = route?.params?.onThesisDelete;
    const [thesis_detail, setThesis_Detail] = useState(null);

    const [refreshing, setRefreshing] = useState(false);
    const [parties, setParties] = useState([]);

    useEffect(() => {
        loadThesisDetail();
    }, [thesisId]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setParties([]);
        loadThesisDetail();
        setRefreshing(false);
    }, []);

        const loadThesisDetail = async () => {
            setLoading(true);
            try {
                let res = await API.get(endpoints['thesis_detail'](thesisId));
                setThesisDetail(res.data);
                setThesis_Detail(res.data.thesis);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

    const getStatusDescription = (status) => {
        switch (status) {
            case 'DN':
                return 'Đã nộp';
            case 'DCD':
                return 'Đang chấm điểm';
            case 'DCDX':
                return 'Đã chấm điểm xong';
            default:
                return 'Unknown status';
        }
    }

    // Extract the function from the navigation params

    // Call the function after deleting a thesis
    const deleteThesis = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc chắn muốn xóa khóa luận này?",
            [
                {
                    text: "Không",
                    style: "cancel"
                },
                {
                    text: "Có",
                    onPress: async () => {
                        try {
                            const access_token = await AsyncStorage.getItem('token-access');
                            await authApi(access_token).put(endpoints['thesis_delete'](thesisId));
                            alert('Xóa thành công');
                            navigation.navigate('Thesis');
                            onThesisDelete(); // Refresh the data
                        } catch (error) {
                            console.error(error);
                            if (error.response && error.response.status === 403) {
                                alert('Bạn không đủ quyền để thực hiện hành động này.');
                            }
                        }
                    }
                }
            ]
        );
    }

    const gotoThesisUpdate = (thesis_detail) => {
        navigation.navigate('ThesisUpdate', { ThesisDetail: thesis_detail });
    }

    return (
        <View style={ThesisDetailStyle.container}>
            <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <>
                        {ThesisDetail.thesis && (
                            <>
                                <Text style={ThesisDetailStyle.title}>Khóa Luận: {ThesisDetail.thesis.title}</Text>
                                <Text style={ThesisDetailStyle.text}>Dự án: {ThesisDetail.thesis.product}</Text>
                                <Text style={ThesisDetailStyle.text}>Báo cáo: {ThesisDetail.thesis.report}</Text>
                                <Text style={ThesisDetailStyle.text}>Ngày tạo: {new Date(ThesisDetail.thesis.date_created).toLocaleString()}</Text>
                                <Text style={ThesisDetailStyle.text}>Trạng thái: {ThesisDetail.thesis.active ? 'Yes' : 'No'}</Text>
                            </>
                        )}
                        <Text style={ThesisDetailStyle.separator}> -------------------------------------------------- </Text>
                        {ThesisDetail.student_do_thesis && (
                            <>
                                <Text style={ThesisDetailStyle.title}>Học Sinh</Text>
                                {ThesisDetail.student_do_thesis.map((student, index) => (
                                    <View key={index}>
                                        <Text style={ThesisDetailStyle.text}>Tên sinh viên {index + 1}: {student.student_name}</Text>
                                        <Text style={ThesisDetailStyle.text}>Mã khóa luân sv: {student.id}</Text>
                                        <Text style={ThesisDetailStyle.text}>Trạng thái: {getStatusDescription(student.status)}</Text>
                                        <Text style={ThesisDetailStyle.text}>Tổng điểm: {student.count_score}</Text>
                                        <Text style={ThesisDetailStyle.text}>Ngày tạo: {new Date(student.date_created).toLocaleString()}</Text>
                                        <Text style={ThesisDetailStyle.separator}> -------------------------------------------------- </Text>
                                    </View>
                                ))}
                            </>
                        )}

                        {ThesisDetail.teacher_do_thesis && (
                            <>
                                <Text style={ThesisDetailStyle.title}>Giáo Viên</Text>
                                {ThesisDetail.teacher_do_thesis.map((teacher, index) => (
                                    <View key={index}>
                                        <Text style={ThesisDetailStyle.text}>Giáo viên phụ trách: {teacher.teacher_name}</Text>
                                        <Text style={ThesisDetailStyle.text}>Mã khóa luận sinh viên phụ trách: {teacher.thesis_student}</Text>
                                        <Text style={ThesisDetailStyle.text}>Date Joined: {new Date(teacher.date_join).toLocaleString()}</Text>
                                        <Text style={ThesisDetailStyle.separator}> -------------------------------------------------- </Text>
                                    </View>
                                ))}
                            </>
                        )}
                        <Text style={ThesisDetailStyle.title}>Hội Đồng Khóa Luận</Text>
                        {ThesisDetail.thesis_defense_committee ? (ThesisDetail.thesis_defense_committee.length > 0 ? (
                            <>
                                <Text style={ThesisDetailStyle.text}>Tên Hội Đồng: {ThesisDetail.thesis_defense_committee[0].name}</Text>
                                <Text style={ThesisDetailStyle.text}>Ngày tạo: {new Date(ThesisDetail.thesis_defense_committee[0].date_created).toLocaleString()}</Text>
                                <Text style={ThesisDetailStyle.text}>Ngày kết thúc: {new Date(ThesisDetail.thesis_defense_committee[0].date_end).toLocaleString()}</Text>
                            </>
                        ) : (null)) : (null)
                        }
                    </>
                )}
            </ScrollView>
            <TouchableOpacity style={ThesisDetailStyle.btn_delete} onPress={deleteThesis}>
                <Text style={ThesisDetailStyle.btn_text}>XÓA KHÓA LUẬN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ThesisDetailStyle.btn} onPress={() => gotoThesisUpdate(ThesisDetail.thesis)}>
                <Text style={ThesisDetailStyle.btn_text}>CẬP NHẬT KHÓA LUẬN</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ThesisDetail;