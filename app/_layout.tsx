import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskProvider } from '../context/TaskContext';
import TabsLayout from './(tabs)/_layout';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <TabsLayout />
      </TaskProvider>
    </SafeAreaProvider>
  );
}
