/* eslint-disable max-len */
import React from 'react';
import List from './components/List';

import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <List />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    imageBg: {
        width: 200,
        height: 200
    }
});

export default App;
