import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserStyle from "./UserStyle";

const UsersDetail = () => {
    const [user, setUser] = useState({});
    let url = 'http://10.0.2.2:8000/static';

    useEffect(() => {
        const getUserData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@user');
                let userData = JSON.parse(jsonValue);
                if (userData) {
                    userData.avatar = url + userData.avatar;
                    setUser(userData);
                }
            } catch (e) {
                // read error
                console.log(e);
            }
        }
        getUserData();
    }, []);

    return (
        <View style={UserStyle.container}>
            <View style={UserStyle.header}>
                <View style={UserStyle.headerContent}>
                    <Image
                        style={UserStyle.avatar}
                        source={{ uri: user.avatar }}
                    />

                    <Text style={UserStyle.name}>{user?.first_name} {user?.last_name}</Text>
                </View>
            </View>

            <View style={UserStyle.body}>
                <View style={UserStyle.bodyContent}>
                    <Text style={UserStyle.textInfo}>First Name: {user?.first_name}</Text>
                    <Text style={UserStyle.textInfo}>Last Name: {user?.last_name}</Text>
                    <Text style={UserStyle.textInfo}>Email: {user?.email}</Text>
                    <Text style={UserStyle.textInfo}>Username: {user?.username}</Text>
                </View>
            </View>
        </View>
    )
}
export default UsersDetail;