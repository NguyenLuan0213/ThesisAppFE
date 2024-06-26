import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
      backgroundColor: '#00BFFF',
    },
    headerContent: {
      padding: 30,
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: 'white',
      marginBottom: 10,
    },
    name: {
      fontSize: 22,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding: 30,
    },
    textInfo: {
      fontSize: 18,
      marginTop: 20,
      marginRight: 10,
      color: '#000000',
    },
    bodyContent: {
      paddingTop: 40,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    menuBox: {
      backgroundColor: '#DCDCDC',
      width: 100,
      height: 100,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 12,
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 2,
        width: -2,
      },
      elevation: 4,
    },
    icon: {
      width: 60,
      height: 60,
    },
    info: {
      fontSize: 22,
      color: '#696969',
    },
  })
