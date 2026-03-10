import React from "react";
import { StyleSheet, Text, View } from "react-native";

//Home screen is an immediate log in screen.
//I have hopefully set up stack navigation that can be used to add the sign up form here too.
// you know, click here to sign in! (and then it navigates to the signup.tsx for that form.)
//There is also Tab navigation to profile, this is where we will add the larger 5 field form to edit a users information.
//campus hub week 9 has all the zod fields we need, please look at it.
const home = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default home;

const styles = StyleSheet.create({});
