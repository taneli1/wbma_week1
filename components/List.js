import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from './ListItem';

const url = 'http://media.mw.metropolia.fi/wbma/media/';

const List = () => {
    const [mediaArray, setMediaArray] = useState([]);

    const loadMedia = async () => {
        try {
            const posts = await fetch(url);
            const json = await posts.json();

            const data = await Promise.all(
                json.map(async (item) => {
                    const response = await fetch(url + item.file_id);
                    const rJson = response.json();
                    return rJson;
                })
            );
            setMediaArray(data);
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
