import React, { useContext, useState } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLogin } from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import { Button } from 'react-native-elements';

const LoginForm = ({ navigation }) => {
    const { inputs, handleInputChange } = useLoginForm();
    const { postLogin } = useLogin();
    const [loading] = useState(false);
    const { setIsLoggedIn, setUser } = useContext(MainContext);

    const doLogin = async () => {
        try {
            const userData = await postLogin(inputs);
            setIsLoggedIn(true);
            setUser(userData);
            await AsyncStorage.setItem('userToken', userData.token);
        } catch (error) {
            console.error('postLogin error', error);
            Alert.alert('Cant login');
        }
    };

    return (
        <View>
            <FormTextInput
                autoCapitalize="none"
                placeholder="username"
                onChangeText={(txt) => handleInputChange('username', txt)}
            />
            <FormTextInput
                autoCapitalize="none"
                placeholder="password"
                onChangeText={(txt) => handleInputChange('password', txt)}
                secureTextEntry={true}
            />
            <Button title="login" onPress={doLogin} />
        </View>
    );
};

LoginForm.propTypes = {
    navigation: PropTypes.object
};

export default LoginForm;
