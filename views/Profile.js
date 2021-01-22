import React from 'react';
import { StyleSheet, SafeAreaView, Text, Button } from 'react-native';
import { useContext } from 'react/cjs/react.development';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = (props) => {
    const { isLoggedIn, setIsLoggedIn, user } = useContext(MainContext);
    console.log('profile', isLoggedIn, user);
    const logout = async () => {
        setIsLoggedIn(false);
        await AsyncStorage.clear();
        navigation.navigate('Login');
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text>Profile</Text>
            <Button title={'Logout'} onPress={logout} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40
    }
});

export default Profile;
