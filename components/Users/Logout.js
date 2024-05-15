import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native';
import MyContext from '../../configs/MyContext';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
    const navigation = useNavigation();
    const [user, dispatch] = useContext(MyContext);

    const logout = async () => {
        await AsyncStorage.removeItem('token-access');
        dispatch({
            "type": 'LOGOUT'
        });
        navigation.navigate('Login');
    }

    if (user === null)
        return <Button title="Đăng nhập" onPress={() => navigation.navigate('Login')} />

    return <Button title="Đăng xuất" onPress={logout} />
}

export default LogoutButton;