import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import { Input } from 'react-native-elements';

const FormTextInput = ({ style, ...otherProps }) => {
    return <Input containerStyle={[styles.textInput]} {...otherProps} />;
};

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '100%',
        margin: 0,
        backgroundColor: 'white'
    }
});

FormTextInput.propTypes = {
    style: PropTypes.object
};

export default FormTextInput;
