import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import MyStyles from "../../styles/MyStyles";
import LoginSite from "./LoginStyle";
import { useState, useContext } from "react";
import * as ImgPicker from 'expo-image-picker';
import mime from "mime";
import { processImagePicker } from "../../configs/Utils";
import API, { endpoints } from "../../configs/API";

const Register = ({ navigation }) => {

    const [avatar, setAvatar] = useState(null)
    const [fileName, setFileName] = useState('')
    const [user, setUser] = useState({
        'username': '',
        'last_name': '',
        'email': '',
        'username': '',
        'password': '',
    });

    const [loading, setLoading] = useState();

    const pickImage = async () => {
        let { status } = await ImgPicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImgPicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setAvatar(result.assets[0])
                setFileName(result.assets[0].fileName)
            } else {
                setAvatar(null)
            }

        }
    }

    const register = async () => {
        for (let key in user) {
            if (!user[key]) {
                alert(`Vui lòng nhập ${key}`);
                return;
            }
        }
    
        // Kiểm tra xem avatar có được chọn hay không
        if (!avatar) {
            alert('Vui lòng chọn avatar');
            return;
        }


        let formData = new FormData();
        for (let key in user) {
            formData.append(key, user[key]);
        }
        let formAvatar = processImagePicker(avatar)
        formData.append('avatar', formAvatar)

        try {
            setLoading(true);
            const res = await API.post(endpoints['register'], formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                }
            })
            alert('Đăng ký thành công');
            navigation.navigate('Login');
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    }

    const change = (field, value) => {
        setUser(current => {
            return { ...current, [field]: value, }
        });
    }

    return (
        <View style={MyStyles.container_register}>
            <Text style={MyStyles.txt}>ĐĂNG KÝ NGƯỜI DÙNG</Text>
            <TextInput value={user.first_name} onChangeText={t => change("first_name", t)} placeholder="Họ" style={LoginSite.input} />
            <TextInput value={user.last_name} onChangeText={t => change("last_name", t)} placeholder="Tên" style={LoginSite.input} />
            <TextInput value={user.email} onChangeText={t => change("email", t)} placeholder="Email" style={LoginSite.input} />
            <TextInput value={user.username} onChangeText={t => change("username", t)} placeholder="Tên Đăng Nhập" style={LoginSite.input} />
            <TextInput value={user.password} onChangeText={t => change("password", t)} placeholder="Mật Khẩu" style={LoginSite.input} secureTextEntry={true} />
            <TouchableOpacity onPress={pickImage}>
                {avatar && (
                    <Image
                        source={{ uri: avatar.uri }}
                        style={{ width: 100, height: 100, marginTop: 10 }}
                    />
                )}
                <TextInput
                    editable={false}
                    placeholder="Ảnh Đại Diện"
                    value={fileName}
                />
            </TouchableOpacity>

            <TouchableOpacity style={LoginSite.btn_register} onPress={register}>
                {loading && <ActivityIndicator />}
                <Text style={{ fontSize: 15 }}>ĐĂNG KÝ</Text>
            </TouchableOpacity>

            
        </View>
    );
};

export default Register;