import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import StackNavigator from './navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';


export default function App() {
  return (
    <NavigationContainer >
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>

  );
}



