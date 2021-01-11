/* eslint-disable max-len */
import React from "react";
import List from "./components/List";

import { StyleSheet, View } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <List />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
    flexWrap: "wrap",
  },
});

export default App;
