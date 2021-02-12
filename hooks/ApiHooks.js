import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { MainContext } from '../contexts/MainContext';
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

const useLoadMedia = (myFilesOnly, userId) => {
    const [mediaArray, setMediaArray] = useState([]);
    const { update } = useContext(MainContext);

    const loadMedia = async (limit = 10) => {
        try {
            const listJson = await doFetch(baseUrl + 'tags/' + appTag);
            let media = await Promise.all(
                listJson.map(async (item) => {
                    const fileJson = await doFetch(
                        baseUrl + 'media/' + item.file_id
                    );
                    return fileJson;
                })
            );
            if (myFilesOnly) {
                media = media.filter((item) => item.user_id === userId);
            }
            setMediaArray(media);
        } catch (error) {
            console.error('loadMedia error', error.message);
        }
    };
    useEffect(() => {
        loadMedia();
    }, [update]);
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
    const getUser = async (id, token) => {
        try {
            const options = {
                method: 'GET',
                headers: { 'x-access-token': token }
            };
            const userData = await doFetch(baseUrl + 'users/' + id, options);
            return userData;
        } catch (error) {
            throw new Error(error.message);
        }
    };

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

    return { postRegister, checkToken, checkIsUserAvailable, getUser };
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

const useMedia = () => {
    const deleteFile = async (fileId, token) => {
        const options = {
            method: 'DELETE',
            headers: { 'x-access-token': token }
        };
        try {
            const result = await doFetch(baseUrl + 'media/' + fileId, options);
            return result;
        } catch (error) {
            throw new Error('deleteFile error: ' + error.message);
        }
    };

    const updateFile = async (fileId, fileInfo, token) => {
        const options = {
            method: 'PUT',
            headers: {
                'x-access-token': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(fileInfo)
        };
        try {
            const result = await doFetch(baseUrl + 'media/' + fileId, options);
            return result;
        } catch (error) {
            throw new Error('updateFile error: ' + error.message);
        }
    };

    return { deleteFile, updateFile };
};

export { useLoadMedia, useLogin, useUser, useTag, useMedia };
