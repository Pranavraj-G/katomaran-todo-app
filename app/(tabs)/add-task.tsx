import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTasks } from '../../context/TaskContext';

export default function AddTaskScreen() {
  const { addTask } = useTasks();
  const { colors } = useTheme();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [remindMe, setRemindMe] = useState<Date | null>(null);
  const [repeat, setRepeat] = useState<'none' | 'daily' | 'weekly'>('none');
  const [isStarred, setIsStarred] = useState(false);

  const [isDueDatePickerVisible, setDueDatePickerVisible] = useState(false);
  const [isRemindPickerVisible, setRemindPickerVisible] = useState(false);

  const showDueDatePicker = () => setDueDatePickerVisible(true);
  const hideDueDatePicker = () => setDueDatePickerVisible(false);
  const handleDueDateConfirm = (date: Date) => {
    setDueDate(date);
    hideDueDatePicker();
  };

  const showRemindPicker = () => setRemindPickerVisible(true);
  const hideRemindPicker = () => setRemindPickerVisible(false);
  const handleRemindConfirm = (date: Date) => {
    setRemindMe(date);
    hideRemindPicker();
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    addTask({
      title,
      description,
      dueDate: dueDate.toISOString(),
      remindMe: remindMe ? remindMe.toISOString() : null,
      repeat,
      isStarred,
      isCompleted: false,
    });

    setTitle('');
    setDescription('');
    setDueDate(new Date());
    setRemindMe(null);
    setRepeat('none');
    setIsStarred(false);
    alert('Task added!');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]}>Title</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor={colors.border}
      />

      <Text style={[styles.label, { color: colors.text }]}>Description</Text>
      <TextInput
        style={[styles.input, { borderColor: colors.border, color: colors.text }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Details..."
        placeholderTextColor={colors.border}
        multiline
      />

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Due Date:</Text>
        <TouchableOpacity onPress={showDueDatePicker}>
          <Text style={{ color: colors.primary }}>
            {dueDate.toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDueDatePickerVisible}
        mode="datetime"
        onConfirm={handleDueDateConfirm}
        onCancel={hideDueDatePicker}
      />

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Remind Me:</Text>
        <TouchableOpacity onPress={showRemindPicker}>
          <Text style={{ color: colors.primary }}>
            {remindMe ? remindMe.toLocaleString() : 'None'}
          </Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isRemindPickerVisible}
        mode="datetime"
        onConfirm={handleRemindConfirm}
        onCancel={hideRemindPicker}
      />

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Repeat:</Text>
        {['none', 'daily', 'weekly'].map((option) => (
          <TouchableOpacity key={option} onPress={() => setRepeat(option as any)}>
            <Text
              style={[
                styles.repeatOption,
                {
                  color:
                    repeat === option ? '#007AFF' : colors.text,
                  fontWeight: repeat === option ? 'bold' : 'normal',
                },
              ]}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.text }]}>Starred:</Text>
        <Switch value={isStarred} onValueChange={setIsStarred} />
      </View>

      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
    marginTop: 6,
  },
  repeatOption: {
    marginRight: 12,
  },
});

