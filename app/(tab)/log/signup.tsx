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

//navigate here from a clickable "sign up" text.
//sign up form goes here.

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password must be less than 20 characters" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "Password must contain at least one special character",
  });

const signupSchema = z
  .object({
    fullName: z.string().min(3, "full name must be at least 3 characters"),
    email: z.email("Enter a valid email address.").trim(),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type signupForm = z.infer<typeof signupSchema>;

const signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const onSubmit = (data: signupForm) => {
    Alert.alert(
      "Thank you for signing up!",
      `Welcome aboard! ${data.fullName}`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  };
  return (
    <ScrollView>
      <Text>Create your profile</Text>
      <Text>Full Name</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="full name here"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.fullName && <Text>{errors.fullName.message}</Text>}
      <Text>Email Address: </Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="example@example.com"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      <Text>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            textContentType="password"
            style={[styles.input]}
            placeholder="Please enter your password"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}
      <Text>Confirm Password</Text>
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <TextInput
            textContentType="password"
            style={[styles.input]}
            placeholder="full name here"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}
      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Sign Up!</Text>
      </Pressable>
      <Text>
        Already have an account?{" "}
        <Pressable onPress={() => router.push("/(tab)/log/index")}>
          Log In.
        </Pressable>
      </Text>
    </ScrollView>
  );
};

export default signup;

const styles = StyleSheet.create({
  input: {},
});
