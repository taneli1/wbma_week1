import { enableExpoCliLogging } from 'expo/build/logs/Logs';
import { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { baseUrl } from '../utils/variables';

const doFetch = (url, options = {}) => {
    const response = fetch(url, options);
    if (!response.ok) {
        throw new Error('doFetch error');
    } else return response.json();
};

const useLoadMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const loadMedia = async (limit = 5) => {
        try {
            const listResponse = await fetch(baseUrl + 'media?limit=' + limit);
            const listJson = await listResponse.json();
            const media = await Promise.all(
                listJson.map(async (item) => {
                    const fileResponse = await fetch(
                        baseUrl + 'media/' + item.file_id
                    );
                    const fileJson = fileResponse.json();
                    // console.log('media file data', json);
                    return fileJson;
                })
            );

            setMediaArray(media);
        } catch (error) {
            console.error('loadMedia error', error);
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
            const response = await fetch(baseUrl + 'login', options);
            const userData = await response.json();
            if (response.ok) {
                console.log('Returned json');
                return userData;
            } else {
                throw new Error(userData.message);
            }
        } catch (error) {
            throw new Error(error.message);
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
            const response = await fetch(baseUrl + 'users', fetchOptions);
            const json = await response.json();
            console.log('register resp', json);
            if (response.ok) {
                return json;
            } else {
                throw new Error(json.message + ': ' + json.error);
            }
        } catch (e) {
            console.log('ApiHooks register', e.message);
            throw new Error(e.message);
        }
    };

    const checkToken = async (token) => {
        try {
            const options = {
                method: 'GET',
                headers: { 'x-access-token': token }
            };
            const response = await fetch(baseUrl + 'users/user', options);
            const userData = response.json();
            if (response.ok) {
                return userData;
            } else {
                throw new Error(userData.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };
    return { postRegister, checkToken };
};

const useTag = () => {
    const getByTag = async (tag) => {
        try {
            const array = await fetch(baseUrl + tag);
            const json = await array.json();
            return json;
        } catch (error) {
            console.log('getByTag error: ', error);
        }
    };
    return { getByTag };
};
export { useLoadMedia, useLogin, useUser, useTag };
