import { View, Text, TouchableOpacity, ActivityIndicator, Switch, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import API, { authApi, endpoints } from '../../configs/API';
import { TextInput } from 'react-native-gesture-handler';
import UpThesisStyle from './UpThesisStyle';
import * as ImgPicker from 'expo-image-picker';
import mime from "mime";
import { processImagePicker } from "../../configs/Utils";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThesisUpdate = ({ route, navigation }) => {
    const { ThesisDetail } = route?.params;

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

    const [thesisId, setThesisId] = useState(ThesisDetail.id)
    const [thesisDetailData, setThesisDetailData] = useState({
        title: ThesisDetail.title,
        product: ThesisDetail.product,
        report: ThesisDetail.report,
        active: true
    });

    const updateThesis = async () => {
        Alert.alert(
            "Cập nhật Khóa Luận",
            "Bạn có chắc chắn muốn cập nhật Khóa Luận này không?",
            [
                {
                    text: "Không",
                    style: "cancel"
                },
                {
                    text: "Có",
                    onPress: async () => {
                        let formData = new FormData();
                        formData.append('title', thesisDetailData.title);

                        if (fileProduct) {
                            let productFile = processImagePicker(fileProduct);
                            formData.append('product', productFile);
                        }

                        if (fileReport) {
                            let reportFile = processImagePicker(fileReport);
                            formData.append('report', reportFile);
                        }

                        try {
                            const access_token = await AsyncStorage.getItem('token-access');
                            setLoading(true);
                            const res = await authApi(access_token).patch(endpoints['thesis_update'](thesisId), formData,
                                {
                                    Headers: {
                                        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
                                    }
                                }
                            );
                            alert('Cập nhật Khóa Luận Mới Thành Công!');
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
                }
            ]
        );
    }

    const change = (field, value) => {
        setThesisDetailData(current => {
            return { ...current, [field]: value, }
        });
    }

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        if (!isEnabled) {
            Alert.alert(
                "Chọn file",
                "Bạn có chắc chắn muốn chọn file mới không?",
                [
                    {
                        text: "Không",
                        style: "cancel"
                    },
                    {
                        text: "Có",
                        onPress: () => setIsEnabled(previousState => !previousState)
                    }
                ]
            );
        } else {
            setIsEnabled(previousState => !previousState);
        }
    }

    return (
        <View style={UpThesisStyle.container}>
            <Text style={UpThesisStyle.title}>Nhập Thông tin</Text>
            <TextInput style={UpThesisStyle.input} value={thesisDetailData.title} onChangeText={t => change("title", t)} placeholder={thesisDetailData.title} />

            <Switch
                style={UpThesisStyle.switch}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />

            <TouchableOpacity style={UpThesisStyle.btn} onPress={pickFileProduct} disabled={!isEnabled}>
                <TextInput style={UpThesisStyle.input} editable={false} value={fileProductName} placeholder={thesisDetailData.product} />
            </TouchableOpacity>

            <TouchableOpacity style={UpThesisStyle.btn} onPress={pickFileReport} disabled={!isEnabled}>
                <TextInput style={UpThesisStyle.input} editable={false} value={fileReportName} placeholder={thesisDetailData.report} />
            </TouchableOpacity>

            <TouchableOpacity style={UpThesisStyle.btn_create} onPress={updateThesis}>
                <Text style={UpThesisStyle.btn_text}>Tạo Mới</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ThesisUpdate    