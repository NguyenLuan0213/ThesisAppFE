import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import Styles from "./Styles";
import { useEffect, useState } from "react";

const Home =({ navigation }) => {

    const [criteria, setCriteria] = useState(null);

    useEffect(() => {
        const LoandCriteria = async () => {
            try {
                let res = await fetch("https://codon0213.pythonanywhere.com/criteria/");
                let data = await res.json();
                setCriteria(data.results); // Chỉ lấy phần "results" từ dữ liệu trả về
            } catch (error) {
                console.log(error);
            }
        }
        LoandCriteria();
        
    }, []);

    const gotoSpecificCriteria = (criteriaId) => {

        navigation.navigate("Spectific", { "criteriaId": criteriaId });
    }

    return (
        <View style={MyStyles.container}>
            <Text style={Styles.subject}>HOMEPAGE</Text>
            <ScrollView style={{flex: 1, flexDirection: "row"}}>
            </ScrollView>
        </View>
    );
};

export default Home;