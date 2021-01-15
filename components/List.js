import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from './ListItem';

const url =
    'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

const List = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const loadMedia = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log('json fetch: ' + json);
            setMediaArray(json);
        } catch (err) {
            console.log('loadmedia : ', err);
        }
    };

    useEffect(() => {
        loadMedia();
    }, []);

    return (
        <FlatList
            data={mediaArray}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <ListItem singleMedia={item} />}
        />
    );
};

const styles = StyleSheet.create({});

export default List;
