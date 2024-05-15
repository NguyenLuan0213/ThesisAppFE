import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    container_list_item: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    boder_item: {
        padding: 10,
    },
    txt_title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    txt_item: {
        fontSize: 14,
    },
    container_acction: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '40%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});