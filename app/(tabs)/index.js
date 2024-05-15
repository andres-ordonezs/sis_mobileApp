import { Image, StyleSheet, Platform, Text } from 'react-native';
import { LoginForm } from "@/components/loginForm";
import { SafeAreaView } from 'react-native-safe-area-context';

import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {


  async function saveToken(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log('success');
      console.log('Token saved successfully');
    } catch (error) {
      console.log('Error saving token:', error);
    }
  }


  async function logInUser(userData) {
    try {
      const resp = await fetch("http://localhost:8000/api/-token/",
        {
          'method': 'POST',
          body: JSON.stringify({
            "username": userData.username,
            "password": userData.password
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }

      const data = await resp.json();
      console.log('Data received:', data);
      if (data.token) {
        await saveToken("token", data.token);
      } else {
        console.log('No token received');
      }

    } catch (error) {
      console.log('Error logging in user:', error);
    }
  }


  return (
    <SafeAreaView>
      <LoginForm logInUser={logInUser} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  }
});
