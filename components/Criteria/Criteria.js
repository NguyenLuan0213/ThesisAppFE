import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import CriStyles from "./CriStyles";
import API, { endpoints } from "../../configs/API";


const Criteria = ({ navigation }) => {
    const [criteria, setCriteria] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const LoadCriteria = async () => {
            setLoading(true);
            try {
                let res = await API.get(endpoints['criteria']);
                setCriteria(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        LoadCriteria();
    }, []);

    const gotoSpecificCriteria = (criteriaId) => {
        navigation.navigate("Spectific", { "criteriaId": criteriaId });
    }

    const gotoCreate = () => {
        navigation.navigate("CreateCriteria");
    }

    return (
        <View style={CriStyles.container_1}>
            <Text style={CriStyles.subject}>CÁC TIÊU CHÍ CHẤM ĐIỂM</Text>
            <ScrollView style={{ flex: 1 }}>
                <View style={CriStyles.container}>
                    {criteria === null ? (<ActivityIndicator />) : (
                        <>
                            {criteria.map((c) => (
                                <TouchableOpacity key={c.id} style={CriStyles.item} onPress={() => gotoSpecificCriteria(c.id)}>
                                    <Text style={CriStyles.itemText}> {c.name_title} </Text>
                                    <Text style={CriStyles.itemDescription}> {c.description}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

export default Criteria;
