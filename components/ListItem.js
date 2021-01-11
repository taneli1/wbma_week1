import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const ListItem = (props) => {
  console.log(props);
  return (
    <TouchableOpacity style={styles.row}>
      <Image
        style={styles.image}
        source={{ uri: props.singleMedia.thumbnails.w160 }}
      />
      <View style={styles.textBox}>
        <Text styles={styles.listTitle}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propType = {
  singleMedia: PropTypes.object,
};

const styles = StyleSheet.create({
  listTitle: {
    fontSize: 20,
  },
  textBox: {
    width: "70%",
    paddingLeft: 20,
  },
  row: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  image: {
    width: 100,
    height: 200,
    borderRadius: 6,
  },
});

export default ListItem;
