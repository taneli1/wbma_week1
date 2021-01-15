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
    TouchableWithoutFeedback,
    View
} from 'react-native';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.header}>
                <ImageBackground
                    source={require('./assets/cat.jpg')}
                    style={styles.imageBg}
                    imageStyle={{ borderBottomRightRadius: 60 }}
                ></ImageBackground>
                <Text style={styles.overlayText}>Text header</Text>
            </View>
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
        width: '100%',
        height: 200
    },
    header: {},
    overlayText: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        color: 'white',
        fontSize: 25,
        backgroundColor: 'rgba(255,255,255,0.2)'
    }
});

export default App;
