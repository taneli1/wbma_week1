import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Text } from 'react-native-elements';

const Login = ({ navigation }) => {
    const { isLoggedIn, setIsLoggedIn, setUser } = useContext(MainContext);
    console.log('logged in : ', isLoggedIn);
    const { checkToken } = useUser();

    const getToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
            try {
                const userData = await checkToken(userToken);
                setIsLoggedIn(true);
                console.log('UserData: ' + userData);
                setUser(userData);
                navigation.navigate('Home');
            } catch (error) {
                console.log('token check fail ', error.message);
            }
        }
    };
    useEffect(() => {
        getToken();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <Text h4 style={styles.text}>
                    Login
                </Text>
                <LoginForm navigation={navigation} />
            </View>

            <View>
                <Text h4 style={styles.text}>
                    Register
                </Text>
                <RegisterForm navigation={navigation} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 24
    },
    text: {
        marginTop: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

Login.propTypes = {
    navigation: PropTypes.object
};

export default Login;
