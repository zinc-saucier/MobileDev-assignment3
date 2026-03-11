import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {theme} from "../../styles/theme";

const home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome to the Employee Information System</Text>
      <Text style={styles.label}>Please proceed to login</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: theme.colors.bg,
    },
    content: {
      flex: 1,
      alignContent: "center",
    },
    h1: {
      fontSize: 25,
      fontWeight: "600",
      margin: 15,
      marginTop: 35,
     
    },
    label: {
      marginLeft: theme.label.margin,
      fontSize: theme.label.size,
      fontWeight: "400",
    },
});
