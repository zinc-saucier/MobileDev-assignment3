import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Login", headerShown: true }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up", headerShown: true }}
      />
    </Stack>
  );
}
