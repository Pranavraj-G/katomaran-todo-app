import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function AuthScreen() {
  const theme = useColorScheme();

  return (
    <View style={[styles.container, theme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
      <Text style={[styles.text, theme === 'dark' ? styles.darkText : styles.lightText]}>
        Authentication Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  lightBackground: {
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
});

