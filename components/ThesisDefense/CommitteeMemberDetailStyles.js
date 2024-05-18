import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        color: '#666',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 50,
    },
    section: {
        marginBottom: 30,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    picker: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
    },
});