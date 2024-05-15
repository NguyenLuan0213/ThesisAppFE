import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import LoginSite from "./LoginStyle";
import { useState, useContext } from "react";
import MyContext from "../../configs/MyContext";
import API, { authApi, endpoints } from "../../configs/API";


const Login = ({ navigation }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [user, dispatch] = useContext(MyContext);

    const storeUserData = async (user) => {
        try {
            const jsonValue = JSON.stringify(user)
            await AsyncStorage.setItem('@user', jsonValue);
        } catch (e) {
            // saving error
            console.log(e);
        }
    }

    const login = async () => {
        try {
            let res = await API.post(endpoints['login'], {
                'username': username,
                'password': password,
                'client_id': "1C9ApNwkhy9nrJApEDCaAnTqgrrDwKkMeloc4M1T",
                'client_secret': "So7s3Rrv80BFqH8aQQXJeRlg5v5tmj6624HFVMgujF6k66rkkVwDweuK8SaSL1OB5L9wZcLoNGqQ927QvtjND4vgINQPdX6nfG6c5oWuz228Ux9JrUiXK9Oe4sIQu2w9",
                'grant_type': "password",
            });
            await AsyncStorage.setItem('token-access', res.data.access_token);      
            let user = await authApi(res.data.access_token).get(endpoints['create_user']);
            dispatch({
                "type": "LOGIN",
                "payload": user.data,
            });
            storeUserData(user.data);
            navigation.navigate('Home');
        } catch (error) {
            console.error('An error occurred:', error);
            if (error.response && error.response.status === 400) {
                alert("Sai tên đăng nhập hoặc mật khẩu");
            }
        }

    };

    const changeResgister = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={LoginSite.container}>
            {/* <TextInput value={username} onChangeText={t => setUsername(t)} style={LoginSite.input} placeholder="Tên Đăng Nhập..." />
            <TextInput secureTextEntry={true} value={password} onChangeText={t => setPassword(t)} style={LoginSite.input} placeholder="Mật Khẩu ..." /> */}
            <View style={LoginSite.inputContainer}>
                <Image
                    style={[LoginSite.icon, LoginSite.inputIcon]}
                    source={{ uri: 'https://img.icons8.com/ios-filled/512/user-male-circle.png' }} // Thay đổi URL hình ảnh tại đây
                />
                <TextInput
                    style={LoginSite.inputs}
                    placeholder="Tên đăng nhập..." // Thay đổi giá trị placeholder tại đây
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    value={username}
                    onChangeText={t => setUsername(t)}
                />
            </View>
            <View style={LoginSite.inputContainer}>
                <Image
                    style={[LoginSite.icon, LoginSite.inputIcon]}
                    source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }}
                />
                <TextInput
                    style={LoginSite.inputs}
                    placeholder="Mật Khẩu..."
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    value={password}
                    onChangeText={t => setPassword(t)}
                />
            </View>

            <TouchableOpacity style={LoginSite.btn_login} onPress={login}>
                <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Đăng Nhập</Text>
            </TouchableOpacity>
            <Text>Chưa có tài khoản?</Text>
            <TouchableOpacity style={LoginSite.btn_register_login} onPress={changeResgister}>
                <Text style={{ color: "#FFFFFF", fontSize: 15 }}>Đăng kí</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[LoginSite.buttonContainer, LoginSite.fabookButton]}>
                <View style={LoginSite.socialButtonContent}>
                    <Image
                        style={LoginSite.icon}
                        source={{ uri: 'https://img.icons8.com/color/70/000000/facebook.png' }}
                       />
                    <Text style={LoginSite.loginText}>Continue with facebook</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={[LoginSite.buttonContainer, LoginSite.googleButton]}>
                <View style={LoginSite.socialButtonContent}>
                    <Image
                        style={LoginSite.icon}
                        source={{ uri: 'https://img.icons8.com/color/70/000000/google.png' }}
                    />
                    <Text style={LoginSite.loginText}>Sign in with google</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Login;