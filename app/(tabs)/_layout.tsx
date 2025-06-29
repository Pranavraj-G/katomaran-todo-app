import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';

import AddTaskScreen from './add-task';
import CompletedScreen from './completed';
import HomeScreen from './home';
import StarredScreen from './starred';

const Drawer = createDrawerNavigator();

export default function TabsLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <Drawer.Navigator
      initialRouteName="⚲ Home"
      screenOptions={{
        headerShown: true,
        drawerType: Platform.OS === 'web' ? 'permanent' : 'front',
        drawerStyle: {
          backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
          width: 240,
        },
        headerStyle: {
          backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
        },
        headerTintColor: isDark ? '#fff' : '#000',
      }}
    >
      <Drawer.Screen name="⚲ Home" component={HomeScreen} />
      <Drawer.Screen name="✰ Starred Tasks" component={StarredScreen} />
      <Drawer.Screen name="☑ Completed" component={CompletedScreen} />
      <Drawer.Screen name="✙ Add Task" component={AddTaskScreen} />
    </Drawer.Navigator>
  );
}


