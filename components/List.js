import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from './ListItem';
import { useLoadMedia } from '../hooks/ApiHooks';

const List = ({ navigation }) => {
    const mediaArray = useLoadMedia();
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
