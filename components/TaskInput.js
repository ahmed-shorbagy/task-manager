import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

const TaskInput = ({ onAddTask }) => {
  const [text, setText] = useState('');

  const handleAddTask = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddTask(trimmed);
    setText('');
  }, [text, onAddTask]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What needs to be done?"
        placeholderTextColor="#8E8E93"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTask}
        returnKeyType="done"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={[styles.addButton, !text.trim() && styles.addButtonDisabled]}
        onPress={handleAddTask}
        activeOpacity={0.7}
        disabled={!text.trim()}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#F2F2F7',
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '400',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  addButtonDisabled: {
    backgroundColor: '#B0B0B8',
    ...Platform.select({
      ios: {
        shadowOpacity: 0,
      },
      android: {
        elevation: 0,
      },
    }),
  },
  addButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -1,
  },
});

export default React.memo(TaskInput);
