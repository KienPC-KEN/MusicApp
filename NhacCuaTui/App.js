import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

import TabNav from './TabNav';
import Playlist from './compoments/Playlist';
import SearchSong from './compoments/SearchSong';

import { MusicProvider } from './compoments/context/MusicContext';

enableScreens(); // Tối ưu hóa màn hình
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >

      <MusicProvider>
        <Stack.Navigator
          initialRouteName='TabNav'
          screenOptions={{
            animation: 'slide_from_right'
          }}>
          <Stack.Screen name="TabNav" component={TabNav} options={{ headerShown: false }} />
          <Stack.Screen name="Playlist" component={Playlist} options={{ headerShown: false }} />

          <Stack.Group
            screenOptions={{
              animation: 'fade_from_bottom'
            }}>
            <Stack.Screen name="SearchSong" component={SearchSong} options={{ headerShown: false }} />
          </Stack.Group>
        </Stack.Navigator>
      </MusicProvider>


    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
