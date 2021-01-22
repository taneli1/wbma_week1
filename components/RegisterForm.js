import React from 'react';
import { Alert, Button, View } from 'react-native';
import PropTypes from 'prop-types';
import { useRegister } from '../hooks/ApiHooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';

const RegisterForm = ({ navigation }) => {
    const { inputs, handleInputChange } = useSignUpForm();
    const { postRegister } = useRegister();

    const doRegister = async () => {
        try {
            const result = await postRegister(inputs);
            Alert.alert(result.message);
        } catch (error) {
            console.log('reg error', error);
            Alert.alert(error.message);
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
            <FormTextInput
                autoCapitalize="none"
                placeholder="email"
                onChangeText={(txt) => handleInputChange('email', txt)}
            />
            <FormTextInput
                autoCapitalize="none"
                placeholder="full name"
                onChangeText={(txt) => handleInputChange('full_name', txt)}
            />
            <Button title="register" onPress={doRegister} />
        </View>
    );
};

RegisterForm.propTypes = {
    navigation: PropTypes.object
};

export default RegisterForm;
