import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { useContext } from 'react/cjs/react.development';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button, Card, ListItem } from 'react-native-elements';
import { baseUrl, uploadsUrl } from '../utils/variables';
import { useTag } from '../hooks/ApiHooks';

const Profile = (props) => {
    const { setIsLoggedIn, user } = useContext(MainContext);
    const { getByTag } = useTag();
    const [avatar, setAvatar] = useState('http://placekitten.com/400');

    console.log('profile ', user);
    const logout = async () => {
        setIsLoggedIn(false);
        await AsyncStorage.clear();
        navigation.navigate('Login');
    };

    const fetchAvatar = async () => {
        try {
            const list = await getByTag('tags/avatar_' + user.user_id);
            if (list.length > 0) setAvatar(uploadsUrl + list.pop().filename);
            else throw 'List is empty';
        } catch (error) {
            console.log('ThisError: ', error);
        }
    };
    fetchAvatar();

    console.log(baseUrl + 'tags/avatar_' + user.user_id);
    return (
        <SafeAreaView style={styles.container}>
            <Card>
                <Card.Title>
                    <Text h1>{user.username}</Text>
                </Card.Title>
                <Card.Image source={{ uri: avatar }} style={styles.image} />
                <ListItem>
                    <Avatar icon={{ name: 'email', color: 'black' }} />
                    <Text>{user.email}</Text>
                </ListItem>
                <ListItem>
                    <Avatar
                        icon={{
                            name: 'user',
                            type: 'font-awesome',
                            color: 'black'
                        }}
                    />
                    <Text>{user.full_name}</Text>
                </ListItem>
                <Button title={'Logout'} onPress={logout} />
            </Card>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        alignItems: 'center'
    },
    title: {
        flexDirection: 'row',
        alignSelf: 'flex-start'
    },
    titleText: {},
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1
    }
});

export default Profile;
