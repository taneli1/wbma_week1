import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
    console.log(props);
    return (
        <TouchableOpacity style={styles.row}>
            <View style={styles.imagebox}>
                <Image
                    style={styles.image}
                    source={{ uri: props.singleMedia.thumbnails.w160 }}
                />
            </View>
            <View style={styles.textBox}>
                <Text style={styles.listTitle}>{props.singleMedia.title}</Text>
                <Text>{props.singleMedia.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

ListItem.propType = {
    singleMedia: PropTypes.object
};

const styles = StyleSheet.create({
    listTitle: {
        fontSize: 22
    },
    textBox: {
        flex: 2
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderRadius: 6
    },
    image: {
        flex: 3,
        width: 150,
        height: 80,
        borderRadius: 6
    },
    imagebox: {
        flex: 2
    }
});

export default ListItem;
