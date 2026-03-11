import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import z from "zod";
import { theme } from "../../../styles/theme";

//Home screen is an immediate log in screen.
//I have hopefully set up stack navigation that can be used to add the sign up form here too.
// you know, click here to sign in! (and then it navigates to the signup.tsx for that form.)
//There is also Tab navigation to profile, this is where we will add the larger 5 field form to edit a users information.
//campus hub week 9 has all the zod fields we need, please look at it.

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be minimum 8 characters long"),
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
    console.log(data);
  };
  return (
    <ScrollView
      style={styles.loginContainer}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.header}>Login</Text>

      <Text style={styles.label}>Email: </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="example@example.ex"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text style={styles.label}>Password: </Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder=""
            placeholderTextColor={""}
            value={value}
            onChangeText={onChange}
            keyboardType="visible-password"
            autoCapitalize="none"
            textContentType="password"
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

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
    </ScrollView>
  );
};

export default login;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  header: {
    fontSize: 25,
    fontWeight: "600",
    margin: 15,
    marginTop: 35,
    textAlign: "center",
  },
  label: {
    marginLeft: theme.label.margin,
    fontSize: theme.label.size,
    fontWeight: "400",
  },
  input: {
    backgroundColor: theme.colors.border,
    marginLeft: 15,
    marginRight: 15,
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
  },
  error: {
    backgroundColor: theme.colors.error,
    color: "white",
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    alignContent: "center",
  },
  button: {
    marginLeft: 15,
    backgroundColor: "violet",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: theme.colors.text,
  },
});
