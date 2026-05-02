import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';

let nextId = 1;

const generateId = () => {
  return `task-${Date.now()}-${nextId++}`;
};

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = useCallback((text) => {
    const newTask = {
      id: generateId(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const handleToggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <TaskItem
        task={item}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    ),
    [handleToggleTask, handleDeleteTask]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        {totalCount > 0 && (
          <Text style={styles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        )}
      </View>

      {/* Task Input */}
      <TaskInput onAddTask={handleAddTask} />

      {/* Task List */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptySubtitle}>
              Add a task above to get started
            </Text>
          </View>
        }
        // Performance optimizations
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={15}
        windowSize={10}
        initialNumToRender={15}
        getItemLayout={undefined}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#1C1C1E',
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 4,
    fontWeight: '500',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 40,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3A3A3C',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#8E8E93',
  },
});

export default HomeScreen;
