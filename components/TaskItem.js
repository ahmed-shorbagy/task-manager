import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

const TaskItem = ({ task, onToggle, onDelete }) => {
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  return (
    <View style={[styles.container, task.completed && styles.containerCompleted]}>
      <TouchableOpacity
        style={styles.toggleArea}
        onPress={handleToggle}
        activeOpacity={0.6}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[styles.taskText, task.completed && styles.taskTextCompleted]}
          numberOfLines={2}
        >
          {task.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.6}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
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
  containerCompleted: {
    backgroundColor: '#F9F9FB',
    opacity: 0.8,
  },
  toggleArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#D1D1D6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '400',
    lineHeight: 22,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 14,
    color: '#FF3B30',
    fontWeight: '600',
  },
});

export default React.memo(TaskItem);
