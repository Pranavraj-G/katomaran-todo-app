import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTasks } from '../../context/TaskContext';

export default function HomeScreen() {
  const { tasks, toggleComplete, toggleStar, deleteTask } = useTasks();
  const { colors } = useTheme();

  const sortedTasks = tasks.slice().sort((a, b) =>
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  function isToday(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.task,
        {
          backgroundColor: colors.card,
          borderLeftWidth: 4,
          borderLeftColor: item.isCompleted ? '#4CAF50' : 'transparent',
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              textDecorationLine: item.isCompleted ? 'line-through' : 'none',
            },
          ]}
        >
          {item.title}
        </Text>
        <Text style={[styles.description, { color: colors.text }]}>
          {item.description}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: isToday(item.dueDate) ? '#FF3B30' : colors.text,
            fontWeight: isToday(item.dueDate) ? 'bold' : 'normal',
          }}
        >
          Due: {new Date(item.dueDate).toLocaleString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleStar(item.id)}>
          <Ionicons
            name={item.isStarred ? 'star' : 'star-outline'}
            size={24}
            color={item.isStarred ? '#FFD700' : colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleComplete(item.id)}>
          <Ionicons
            name={item.isCompleted ? 'checkbox-outline' : 'square-outline'}
            size={24}
            color={item.isCompleted ? '#4CAF50' : colors.text}
            style={{ marginLeft: 12 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Ionicons
            name="trash-outline"
            size={24}
            color="#FF3B30"
            style={{ marginLeft: 12 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>All Tasks</Text>

      {tasks.length === 0 ? (
        <Text style={{ color: colors.text }}>No tasks yet.</Text>
      ) : (
        <FlatList
          data={sortedTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  task: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Platform.select({
      web: {
        border: '1px solid #ccc',
      },
    }),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
});

