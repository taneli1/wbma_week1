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
                <Text style={styles.content}>
                    {props.singleMedia.description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

ListItem.propType = {
    singleMedia: PropTypes.object
};

const styles = StyleSheet.create({
    listTitle: {
        fontSize: 22,
        color: '#111D4A',
        flex: 3,
        alignSelf: 'center',
        paddingBottom: 10
    },
    textBox: {
        flex: 3
    },
    row: {
        backgroundColor: '#8380B6',
        marginTop: 20,
        justifyContent: 'space-around',
        alignContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#000',
        borderRadius: 4,
        elevation: 16
    },
    image: {
        flex: 2,
        width: 120,
        borderRadius: 6,
        margin: 10
    },
    imagebox: {},
    content: {
        color: 'white',
        paddingBottom: 10
    }
});

export default ListItem;
