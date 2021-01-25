import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';
import { ListItem as RNEListItem, Avatar } from 'react-native-elements';

const ListItem = ({ navigation, singleMedia }) => {
    return (
        <RNEListItem
            onPress={() => {
                navigation.navigate('Single', { file: singleMedia });
            }}
        >
            <Avatar
                source={{ uri: uploadsUrl + singleMedia.thumbnails.w160 }}
            />
            <RNEListItem.Content>
                <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
                <RNEListItem.Subtitle>
                    {singleMedia.description}
                </RNEListItem.Subtitle>
            </RNEListItem.Content>
            <RNEListItem.Chevron />
        </RNEListItem>
    );
};

ListItem.propTypes = {
    singleMedia: PropTypes.object,
    navigation: PropTypes.object
};

export default ListItem;
