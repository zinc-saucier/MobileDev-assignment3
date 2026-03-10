import React from "react";
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
//app-wide theme file
//import {theme} from "../../../../styles/theme"

//form field validation goes here!

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phone: z.string(),
  postCode: z.string(),
})

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
    Alert.alert("Form submitted", "Your information has been updated.", [
      { text: `${data}`, onPress: () => router.back() },
    ]);
  }

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
            placeholderTextColor={""}
            value={value}
            onChange={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {/*Last Name */}
      <Text style={styles.label}>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input]}
            placeholder="last name here"
            placeholderTextColor={""}
            value={value}
            onChange={onChange}
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
            placeholderTextColor={""}
            value={value}
            onChange={onChange}
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
            placeholderTextColor={""}
            value={value}
            onChange={onChange}
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
            placeholderTextColor={""}
            value={value}
            onChange={onChange}
            autoCapitalize="characters"
            maxLength={9}
          />
        )}
      />
      {errors.postCode && (
        <Text style={styles.error}>{errors.postCode.message}</Text>
      )}
      
      {/* submit button */}
        <Pressable style={[styles.button]} 
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        
      
   
      
      </ScrollView>
  );
};

export default form;

const styles = StyleSheet.create({
  button: {},
  buttonText: {},
  content: {},
  container: {},
  h1: {},
  label: {},
  input: {},
  error: {},
});
