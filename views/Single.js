import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';
import { Image, Text, Card, colors } from 'react-native-elements';
import moment from 'moment';

const Single = ({ route }) => {
    const { file } = route.params;
    return (
        <SafeAreaView style={styles.container}>
            <Card>
                <Card.Title h4>{file.title}</Card.Title>
                <Card.Title>{moment(file.time_added).format('LLL')}</Card.Title>
                <Card.Divider />
                <Card.Image
                    source={{ uri: uploadsUrl + file.filename }}
                    style={{ width: 300, height: 300 }}
                    resizeMode="contain"
                ></Card.Image>
                <Card.Divider />
                <Text style={{ marginStart: 10 }}>{file.description}</Text>
            </Card>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    box: {}
});

Single.propTypes = {
    route: PropTypes.object
};

export default Single;
