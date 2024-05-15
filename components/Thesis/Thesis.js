import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useState } from "react";
import API, { endpoints } from "../../configs/API";
import ThesisStyle from "./ThesisStyle";
import { Linking, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Thesis = ({ navigation }) => {
    const [thesisData, setThesisData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const LoadThesis = async () => {
            try {
                let res = await API.get(endpoints['thesis']);
                setThesisData(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        LoadThesis();
    }, []);

    const refreshThesisData = async () => {
        try {
            let res = await API.get(endpoints['thesis']);
            setThesisData(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Pass the function as a prop when navigating to ThesisDetail
    const gotoThesisDetail = (thesisId) => {
        navigation.navigate("ThesisDetail", { "thesisId": thesisId, "onThesisDelete": refreshThesisData });
    }

    const gotoThesisCreate = () => {
        navigation.navigate("ThesisCreate");
    }

    return (
        <View style={ThesisStyle.container}>
            <ScrollView>
                {thesisData === null ? <ActivityIndicator /> : <>
                    {thesisData.map((c) => (
                        <TouchableOpacity key={c.id} onPress={() => gotoThesisDetail(c.id)} style={ThesisStyle.container_list_item}>
                            <View style={ThesisStyle.boder_item}>
                                <Text style={ThesisStyle.txt_title}>{c.title}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={ThesisStyle.txt_item}>Dự án: </Text>
                                    <TouchableOpacity onPress={() => Linking.openURL(c.product)}>
                                        <Text style={ThesisStyle.txt_item}>{c.product}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={ThesisStyle.txt_item}>Báo Cáo: </Text>
                                    <TouchableOpacity onPress={() => Linking.openURL(c.report)}>
                                        <Text style={ThesisStyle.txt_item}>{c.report}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={ThesisStyle.txt_item}>Date Created: {new Date(c.date_created).toLocaleString()}</Text>
                                <Text style={ThesisStyle.txt_item}>Active: {c.active ? 'Yes' : 'No'}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </>}
                <View style={ThesisStyle.container_acction}>
                    <TouchableOpacity
                        style={ThesisStyle.button}
                        onPress={gotoThesisCreate}>
                        <Text style={ThesisStyle.buttonText}>Create</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default Thesis;