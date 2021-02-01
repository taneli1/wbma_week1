import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import UploadForm from '../components/UploadForm';
import PropTypes from 'prop-types';

const Upload = ({ navigation }) => {
    return (
        <ScrollView>
            <Card>
                <Card.Title>Upload media</Card.Title>
                <UploadForm navigation={navigation}></UploadForm>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        marginBottom: 20,
        marginTop: 20
    }
});

Upload.propTypes = {
    navigation: PropTypes.object
};

export default Upload;
