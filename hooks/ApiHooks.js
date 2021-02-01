import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { appTag, baseUrl } from '../utils/variables';

const doFetch = async (url, options = {}) => {
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.error) {
        throw new Error(json.message + ': ' + json.error);
    } else if (!response.ok) {
        throw new Error('doFetch failed');
    } else {
        return json;
    }
};

const useLoadMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const loadMedia = async (limit = 5) => {
        try {
            const listJson = await doFetch(baseUrl + 'tags/' + appTag);
            const media = await Promise.all(
                listJson.map(async (item) => {
                    const fileJson = await doFetch(
                        baseUrl + 'media/' + item.file_id
                    );
                    return fileJson;
                })
            );
            setMediaArray(media);
        } catch (error) {
            console.error('loadMedia error', error.message);
        }
    };
    useEffect(() => {
        loadMedia(10);
    }, []);
    return mediaArray;
};

const useLogin = () => {
    const postLogin = async (userCredentials) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userCredentials)
        };
        try {
            const userData = await doFetch(baseUrl + 'login', options);
            return userData;
        } catch (error) {
            throw new Error('postLogin error: ' + error.message);
        }
    };

    return { postLogin };
};

const useUser = () => {
    const postRegister = async (inputs) => {
        console.log('trying to create user', inputs);
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        };
        try {
            const json = await doFetch(baseUrl + 'users', fetchOptions);
            console.log('register resp', json);
            return json;
        } catch (e) {
            throw new Error(e.message);
        }
    };

    const checkToken = async (token) => {
        try {
            const options = {
                method: 'GET',
                headers: { 'x-access-token': token }
            };
            const userData = await doFetch(baseUrl + 'users/user', options);
            return userData;
        } catch (error) {
            throw new Error(error.message);
        }
    };
    const checkIsUserAvailable = async (username) => {
        try {
            const result = await doFetch(
                baseUrl + 'users/username/' + username
            );
            return result.available;
        } catch (error) {
            throw new Error('apihooks checkIsUserAvailable', error.message);
        }
    };

    return { postRegister, checkToken, checkIsUserAvailable };
};

const useTag = () => {
    const getByTag = async (tag) => {
        try {
            const tagList = await doFetch(baseUrl + 'tags/' + tag);
            return tagList;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const addTag = async (fileId) => {
        console.log('AddTag Called: ', fileId);
        const userToken = await AsyncStorage.getItem('userToken');
        const axios = require('axios').default;

        let formData = new FormData();
        formData.append('file_id', fileId);
        formData.append('tag', appTag);

        const options = {
            url: baseUrl + 'tags',
            method: 'POST',
            headers: {
                'x-access-token': userToken
            },
            data: {
                file_id: fileId,
                tag: appTag
            }
        };

        try {
            await axios(options).then((res) => {
                if (res.status == 201) {
                    console.log('Tag added to post');
                } else {
                    console.log(res);
                }
            });
        } catch (error) {
            console.log('Addtag err: ', error);
        }
    };

    return { getByTag, addTag };
};

export { useLoadMedia, useLogin, useUser, useTag };
