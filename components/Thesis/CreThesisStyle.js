import { StyleSheet } from 'react-native';

export default ThesisStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    txt_title_create: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    txt_input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginBottom: 5,
    },
    btn_choose_file: {
        backgroundColor: '#8f8f8f',
        padding: 5, // giảm padding từ 10 xuống còn 5
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    btn_create: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn_text: {
        color: '#fff',
        fontSize: 15,
    },
});