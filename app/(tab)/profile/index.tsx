import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters."),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters."),
  email: z.string().trim().email("Must be a valid email address."),
  phone: z
    .string()
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Phone number must be at least 10 digits.",
    ),
});

//the large 5 field form goes here!
const index = () => {
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
