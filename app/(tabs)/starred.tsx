import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTasks } from '../../context/TaskContext';

export default function StarredScreen() {
  const { tasks, toggleStar } = useTasks();
  const { colors } = useTheme();

  const starred = tasks.filter((t) => t.isStarred);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Starred Tasks</Text>

      {starred.length === 0 ? (
        <Text style={{ color: colors.text }}>No starred tasks yet.</Text>
      ) : (
        <FlatList
          data={starred}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.task, { backgroundColor: colors.card }]}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.title, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text style={{ color: colors.text }}>
                  {item.description}
                </Text>
              </View>
              <TouchableOpacity onPress={() => toggleStar(item.id)}>
                <Ionicons
                  name="star"
                  size={24}
                  color="#FFD700"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 24, fontWeight: '600', marginBottom: 16 },
  task: {
    padding: 12,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});

