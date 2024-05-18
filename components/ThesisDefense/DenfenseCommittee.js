import { useCallback } from "react";
import { View, Text, RefreshControl, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import styles from "./DefenseCommitteeStyles";
import API, { authApi, endpoints } from "../../configs/API";


const DefenseCommittee = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const [parties, setParties] = useState([]);
    const [defense_committee, setDefenseCommittee] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        LoadDefenseCommittee();
    }, [refreshing]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setParties([]);
        LoadDefenseCommittee();
        setRefreshing(false);

    }, []);

    const LoadDefenseCommittee = async () => {

        setLoading(true);
        try {
            let res = await API.get(endpoints['defense_committee']);
            setDefenseCommittee(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const goToCreateDefenseCommittee = () => {
        navigation.navigate('DefenseCommitteeCreate');
    }

    const goToDetail = (defenseCommitteeId) => {
        navigation.navigate('DefenseCommitteeDetail', { defense_committee_id: defenseCommitteeId });
        console.log(defenseCommitteeId);
    }

    return (
        <View style={styles.container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text style={styles.title}>HỘI ĐỒNG BẢO VỆ KHÓA LUẬN</Text>

                {defense_committee.map((committee, index) => (
                    <TouchableOpacity key={index} onPress={() => goToDetail(committee.id)}>
                        <View style={styles.committeeContainer}>
                            <Text style={styles.committeeText}>{`Mã hội đồng: ${committee.id}`}</Text>
                            <Text style={styles.committeeText}>{`Tên hội đồng: ${committee.name}`}</Text>
                            <Text style={styles.committeeText}>{`Ngày tạo: ${committee.date_created}`}</Text>
                            <Text style={styles.committeeText}>{`Ngày kết thúc: ${committee.date_end}`}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.addButton} onPress={goToCreateDefenseCommittee}>
                <Text style={styles.addButtonText}>Thêm ủy ban</Text>
            </TouchableOpacity>

        </View>
    )
}

export default DefenseCommittee;