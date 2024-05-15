import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import API, { authApi, endpoints } from '../../configs/API';
import { TextInput } from 'react-native-gesture-handler';
import CreThesisStyle from './CreThesisStyle';
import * as ImgPicker from 'expo-image-picker';
import mime from "mime";
import { processImagePicker } from "../../configs/Utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThesisCreate = () => {
    const [loading, setLoading] = useState();

    const [fileProduct, setFileProduct] = useState(null)
    const [fileProductName, setFileProductName] = useState('')

    const pickFileProduct = async () => {
        let { status } = await ImgPicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImgPicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setFileProduct(result.assets[0])
                setFileProductName(result.assets[0].fileName)
            } else {
                setFileProduct(null)
            }
        }
    }

    const [fileReport, setFileReport] = useState(null)
    const [fileReportName, setFileReportName] = useState('')

    const pickFileReport = async () => {
        let { status } = await ImgPicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result = await ImgPicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setFileReport(result.assets[0])
                setFileReportName(result.assets[0].fileName)
            } else {
                setFileReport(null)
            }
        }
    }

    const [thesisData, setThesisData] = useState({
        title: "",
        product: "",
        report: "",
        active: true
    });

    const createThesis = async () => {

        let formData = new FormData();
        for (let key in thesisData) {
            formData.append(key, thesisData[key]);
        }

        let productFile = processImagePicker(fileProduct);
        let reportFile = processImagePicker(fileReport);

        formData.append('product', productFile);
        formData.append('report', reportFile);

        try {
            const access_token = await AsyncStorage.getItem('token-access');
            setLoading(true);
            const res = await authApi(access_token).post(endpoints['thesis_create'], formData,
                {
                    Headers: {
                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                    }
                }
            );
            console.log(res.data);
            alert('Tạo Khóa Luận Mới Thành Công!');
            navigation.navigate('Thesis');
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 403) {
                alert('Bạn không đủ quyền để thực hiện hành động này.');
            }
        } finally {
            setLoading(false);
        }
    }

    const change = (field, value) => {
        setThesisData(current => {
            return { ...current, [field]: value, }
        });
    }


    return (
        <View style={ThesisStyle.container}>
            <Text style={ThesisStyle.txt_title_create}>Nhập Thông tin</Text>
            <TextInput style={ThesisStyle.txt_input} value={thesisData.title} onChangeText={t => change("title", t)} placeholder="Tiêu đề" />

            <TouchableOpacity style={ThesisStyle.btn_choose_file} onPress={pickFileProduct}>
                <TextInput editable={false} style={ThesisStyle.txt_input} value={fileProductName} placeholder="Chọn File Dự Án" />
            </TouchableOpacity>
            <TouchableOpacity style={ThesisStyle.btn_choose_file} onPress={pickFileReport}>
                <TextInput editable={false} style={ThesisStyle.txt_input} value={fileReportName} placeholder="Chọn File Báo Cáo" />
            </TouchableOpacity>

            <TouchableOpacity style={ThesisStyle.btn_create} onPress={createThesis}>
                <Text style={ThesisStyle.btn_text}>Tạo Mới</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ThesisCreate;