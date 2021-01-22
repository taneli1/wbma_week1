import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

const FormTextInput = ({ style, ...otherProps }) => {
    return <TextInput style={[styles.textInput, style]} {...otherProps} />;
};

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: 200,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
    }
});

FormTextInput.propTypes = {
    style: PropTypes.object
};

export default FormTextInput;
