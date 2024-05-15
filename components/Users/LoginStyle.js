import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    input: {
        width: "100%",
        height: 50,
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        backgroundColor: "#FFFFFF",
        margin: 10, // khoảng cách giữa ô input và các thành phần xung quanh
    },
    btn: {
        width: "100%",
        padding: 10,
        backgroundColor: "#00FFFF",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    btn_register: {
        width: "80%",
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: "#33CCFF",
        alignItems: "center",
        borderRadius: 10, // bo góc
    },
    btn_login: {
        width: "80%",
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: "#008800",
        alignItems: "center",
        borderRadius: 10, // bo góc
    },
    btn_register_login: {
        width: "80%",
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: "#33CCFF",
        alignItems: "center",
        borderRadius: 10, // bo góc
    },
    text_login: {
        fontSize: 25,
        fontWeight: 'bold', // Đặt độ đậm của chữ
        letterSpacing: 1, // Đặt khoảng cách giữa các chữ
        textTransform: 'uppercase', // Đặt chữ hoa
        textAlign: 'center', // Đặt căn lề cho chữ
        color: '#000099', // Đặt màu cho chữ
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B0E0E6',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    icon: {
        width: 30,
        height: 30,
    },
    inputIcon: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: '#3498db',
    },
    fabookButton: {
        backgroundColor: '#3b5998',
    },
    googleButton: {
        backgroundColor: '#ff0000',
    },
    loginText: {
        color: 'white',
    },
    restoreButtonContainer: {
        width: 250,
        marginBottom: 15,
        alignItems: 'flex-end',
    },
    socialButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    socialIcon: {
        color: '#FFFFFF',
        marginRight: 5,
    },
});
