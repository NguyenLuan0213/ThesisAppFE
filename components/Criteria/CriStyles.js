import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    subject: {
        fontSize: 35,
        color: '#483D8B',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 20,
    },
    container: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        borderRadius: 10,
        margin: 10,
    },
    container_1: {
        flex: 1,
        backgroundColor: '#E6E6FA',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 18,
        color: '#000',
    },
    itemDescription: {
        fontSize: 16,
        color: '#696969',
    },
});