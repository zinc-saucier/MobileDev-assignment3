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
import { z } from "zod";
//app-wide theme file
import {theme} from "../../../styles/theme";

//form field validation goes here!

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters."),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Phone number must have 10 digits.",
    ),
  postCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/, "Enter a valid postal code"),
});

type EmployeeForm = z.infer<typeof formSchema>;

//the large 5 field form goes here!

const form = () => {
  const {
    control,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm<EmployeeForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postCode: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: EmployeeForm) => {
    Alert.alert(
      "Form submitted",
      `Employee: ${data.firstName} ${data.lastName}`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.h1}>Employee Profile</Text>
      {/*First Name */}
      <Text style={styles.label}>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="first name here"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.firstName && (
        <Text style={styles.error}>{errors.firstName.message}</Text>
      )}
      {/*Last Name */}
      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="last name here"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.lastName && (
        <Text style={styles.error}>{errors.lastName.message}</Text>
      )}

      {/*Email*/}
      <Text style={styles.label}>Email</Text>
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
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/*Phone number*/}
      <Text style={styles.label}>Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="(555) 555-5555"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      {/*Postal Code*/}
      <Text style={styles.label}>Postal Code</Text>
      <Controller
        control={control}
        name="postCode"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="A1B 2C3"
            placeholderTextColor={"gray"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
            maxLength={6}
          />
        )}
      />
      {errors.postCode && (
        <Text style={styles.error}>{errors.postCode.message}</Text>
      )}

      {/* submit button */}
      <Pressable style={[styles.button]} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

export default form;

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    backgroundColor: "violet",
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#000000",
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  content: {},
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
  input: {
    backgroundColor: theme.colors.bg,
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
});
