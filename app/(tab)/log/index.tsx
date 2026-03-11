import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import z from "zod";

//Home screen is an immediate log in screen.
//I have hopefully set up stack navigation that can be used to add the sign up form here too.
// you know, click here to sign in! (and then it navigates to the signup.tsx for that form.)
//There is also Tab navigation to profile, this is where we will add the larger 5 field form to edit a users information.
//campus hub week 9 has all the zod fields we need, please look at it.

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type logInForm = z.infer<typeof loginSchema>;

const login = () => {
  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm<logInForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: logInForm) => {
    Alert.alert("logged in!", `welcome back ${data.email}`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  };
  return (
    <View>
      <Text style={styles.header}>Login</Text>
      <View style={styles.formComponent}>
        <Text style={styles.label}>Email: </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input]}
              placeholder="example@example.ex"
              placeholderTextColor={""}
              value={value}
              onChange={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
      </View>
      <View style={styles.formComponent}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input]}
              placeholder=""
              placeholderTextColor={""}
              value={value}
              onChange={onChange}
              keyboardType="visible-password"
              autoCapitalize="none"
              textContentType="password"
            />
          )}
        />
      </View>
      <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      <Text>
        Don't have an account?{" "}
        <Pressable onPress={() => router.push("/(tab)/log/signup")}>
          {" "}
          <u>Sign up</u>
        </Pressable>
      </Text>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  loginContainer: {},
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  label: {
    marginLeft: 15,
  },
  input: {
    backgroundColor: "#d3d3d3",
    marginLeft: 15,
    marginRight: 15,
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
  error: {
    backgroundColor: "red",
    color: "white",
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
  },
  formComponent: {},
  button: {
    marginLeft: 15,
    backgroundColor: "violet",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {},
});
