import { useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import API, { endpoints } from '../../configs/API';
import styles from './DefenseCommitteeDetailStyles';

const DefenseCommitteeDetail = ({ route, navigation }) => {
    const { defense_committee_id } = route?.params;
    const [refreshing, setRefreshing] = useState(false);
    const [parties, setParties] = useState([]);
    const [defense_committee_data, setDefenseCommitteeData] = useState([]);
    const [loading, setLoading] = useState(false);

    // console.log(defense_committee_data.defense_committee.id);
    useEffect(() => {
        LoadDefenseCommitteeDetail();
    }, [defense_committee_id]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setParties([]);
        LoadDefenseCommitteeDetail();
        setRefreshing(false);
    }, []);


    const LoadDefenseCommitteeDetail = async () => {
        setLoading(true);
        try {
            let res = await API.get(endpoints['defense_committee_detail'](defense_committee_id));
            setDefenseCommitteeData(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const goToUpdate = (defenseCommitteeId) => {
        navigation.navigate('DefenseCommitteeUpdate', { defense_committee_id: defenseCommitteeId });
        console.log(defenseCommitteeId);
    }

    const goToJoinMember = (defenseCommitteeId) => {
        if (defense_committee_data.committee_members?.length >= 5) {
            alert('Hội đồng đã đủ người');
        } else {
            navigation.navigate('CommitteeMemberJoin', { defense_committee_id: defenseCommitteeId });
            console.log(defenseCommitteeId);
        }
    }

    const gotoMemberDetail = (CommitteeMemberId) => {
        navigation.navigate('CommitteeMemberDetail', { committee_members_id: CommitteeMemberId });
        console.log(CommitteeMemberId);
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <Text style={styles.title}>HỘI ĐỒNG BẢO VỆ KHÓA LUẬN</Text>
                    <View style={styles.committeeContainer}>
                        <Text style={styles.committeeText}>{`Mã hội đồng: ${defense_committee_data.defense_committee?.id}`}</Text>
                        <Text style={styles.committeeText}>{`Tên hội đồng: ${defense_committee_data.defense_committee?.name}`}</Text>
                        <Text style={styles.committeeText}>{`Ngày tạo: ${(new Date(defense_committee_data.defense_committee?.date_created)).toLocaleDateString()}`}</Text>
                        <Text style={styles.committeeText}>{`Ngày kết thúc: ${(new Date(defense_committee_data.defense_committee?.date_end)).toLocaleDateString()}`}</Text>
                    </View>
                    <Text style={styles.title}>Danh sách thành viên hội đồng</Text>
                    {defense_committee_data.committee_members?.map((member, index) => (
                        <TouchableOpacity key={index} onPress={() => gotoMemberDetail(member.id)}>
                            <View style={styles.committeeContainer}>
                                <Text style={styles.committeeText}>{`Tên thành viên: ${member.teacher_name}`}</Text>
                                <Text style={styles.committeeText}>{`Chức vụ: ${member.role}`}</Text>
                                <Text style={styles.committeeText}>{`Mã nhân viên: ${member.teacher_user}`}</Text>
                                <Text style={styles.committeeText}>{`Ngày thêm: ${(new Date(member.date_join)).toLocaleDateString()}`}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            <TouchableOpacity style={styles.updateButton} onPress={() => goToUpdate(defense_committee_id)}>
                <Text style={styles.addButtonText}>Chỉnh sửa ủy ban</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addCommitteButton} onPress={() => goToJoinMember(defense_committee_id)}>
                <Text style={styles.addButtonText}>Thêm thành viên hội đồng</Text>
            </TouchableOpacity>
        </View>
    );
}


export default DefenseCommitteeDetail;