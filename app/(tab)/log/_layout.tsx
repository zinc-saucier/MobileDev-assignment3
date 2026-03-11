import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Sign Up", headerShown: false }}
      />
    </Stack>
  );
}
