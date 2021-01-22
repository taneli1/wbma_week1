import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({ navigation }) => {
    const { isLoggedIn, setIsLoggedIn, setUser } = useContext(MainContext);
    console.log('logged in : ', isLoggedIn);
    const { checkToken } = useLogin();

    const getToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
            try {
                const userData = await checkToken(userToken);
                setIsLoggedIn(true);
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
            <View style={styles.content}>
                <Text style={styles.headerText}>Login</Text>
                <LoginForm style={styles.box} navigation={navigation} />
            </View>

            <View style={styles.content}>
                <Text style={styles.headerText}>Register</Text>
                <RegisterForm style={styles.box} navigation={navigation} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {},
    headerText: {
        fontSize: 16,
        marginBottom: 10
    },
    content: {
        marginTop: 40
    }
});

Login.propTypes = {
    navigation: PropTypes.object
};

export default Login;
