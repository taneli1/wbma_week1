import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import { baseUrl } from '../utils/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { useTag } from '../hooks/ApiHooks';
import { MainContext } from '../contexts/MainContext';

const UploadForm = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const {
        inputs,
        handleInputChange,
        validateOnSend,
        handleInputEnd,
        uploadErrors,
        reset
    } = useUploadForm();
    const [image, setImage] = useState(null);
    const { addTag } = useTag();
    const { update, setUpdate } = useContext(MainContext);

    const doUpload = async () => {
        if (!validateOnSend()) {
            Alert.alert('Input validation failed!');
            return;
        }
        setLoading(true);
        const axios = require('axios').default;
        const pushAction = StackActions.push('Home', {});
        const userToken = await AsyncStorage.getItem('userToken');

        let localUri = image;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        if (type === 'image/jpg') type = 'image/jpeg';

        let formData = new FormData();
        formData.append('file', { uri: localUri, name: filename, type });
        formData.append('title', inputs.title);
        formData.append('description', inputs.description);

        const options = {
            url: baseUrl + 'media',
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token': userToken
            },
            data: formData
        };

        try {
            await axios(options).then((res) => {
                if (res.status == 201) {
                    console.log('res: ', res.data.file_id);
                    addTag(res.data.file_id);
                    delay(500);
                    setUpdate(update + 1);
                    delay(500);
                    reset();
                    navigation.dispatch(pushAction);
                } else {
                    console.log(res.status);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const chooseMedia = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            console.log(result.uri);
        }
    };

    const doReset = () => {
        setImage(null);
        reset;
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {
                    status
                } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert(
                        'Sorry, we need camera roll permissions to make this work!'
                    );
                }
            }
        })();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center'
            }}
        >
            <Image
                source={{ uri: image }}
                style={{ width: 300, height: 250 }}
                resizeMode="contain"
            ></Image>
            <Input
                id="title"
                autoCapitalize="none"
                placeholder="title"
                onChangeText={(txt) => handleInputChange('title', txt)}
                onEndEditing={(event) =>
                    handleInputEnd('title', event.nativeEvent.text)
                }
                errorMessage={uploadErrors.title}
            />
            <Input
                id="desc"
                autoCapitalize="none"
                placeholder="description"
                onChangeText={(txt) => handleInputChange('description', txt)}
                onEndEditing={(event) =>
                    handleInputEnd('description', event.nativeEvent.text)
                }
                errorMessage={uploadErrors.description}
            />
            <Button
                title="Choose media"
                style={{ width: '100%', marginTop: 20 }}
                onPress={chooseMedia}
            />
            <Button
                title="Upload"
                onPress={doUpload}
                loading={loading}
                disabled={image != null ? false : true}
            />
            <Button
                title="Reset form"
                onPress={doReset}
                style={{ width: '100%', marginTop: 20 }}
            />
        </View>
    );
};

UploadForm.propTypes = {
    navigation: PropTypes.object
};

function delay(delayInms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

export default UploadForm;
