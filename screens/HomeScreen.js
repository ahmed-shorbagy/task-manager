import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  LayoutAnimation,
  UIManager,
} from 'react-native';

// Import custom components
import ProgressHeader from '../components/ProgressHeader';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import TaskInput from '../components/TaskInput';
import TaskItem from '../components/TaskItem';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Generates a unique ID for each task.
 * Combines timestamp with an incrementing counter to ensure uniqueness
 * even when tasks are created in rapid succession.
 */
let nextId = 1;
const generateId = () => `task-${Date.now()}-${nextId++}`;

/**
 * Custom LayoutAnimation config for smooth list transitions
 * when tasks are added, deleted, or filtered.
 */
const layoutAnimConfig = {
  duration: 250,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

/**
 * HomeScreen Component
 *
 * Main screen of the Task Manager app. Manages all task state locally
 * using React's useState hook (no external state management).
 *
 * Features:
 * - Add tasks with priority levels (low, medium, high)
 * - Toggle task completion (visual strikethrough + checkbox animation)
 * - Delete tasks with smooth LayoutAnimation
 * - Search tasks by text
 * - Filter tasks by status (All, Active, Completed)
 * - Progress tracking with visual progress bar
 * - Haptic feedback on interactions
 * - Optimized FlatList rendering
 */
const HomeScreen = () => {
  // Core task state — array of { id, text, completed, priority, createdAt }
  const [tasks, setTasks] = useState([]);

  // UI state for filtering and searching
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ────────────────────────────────────────────
  // Task Actions
  // ────────────────────────────────────────────

  /**
   * Adds a new task to the beginning of the list.
   * Triggers a LayoutAnimation for smooth insertion.
   *
   * @param {string} text - Task description
   * @param {string} priority - Priority level ('low', 'medium', 'high')
   */
  const handleAddTask = useCallback((text, priority) => {
    LayoutAnimation.configureNext(layoutAnimConfig);
    const newTask = {
      id: generateId(),
      text,
      completed: false,
      priority: priority || 'medium',
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  /**
   * Toggles a task's completed status.
   *
   * @param {string} id - Task ID to toggle
   */
  const handleToggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  /**
   * Deletes a task by ID.
   * Triggers a LayoutAnimation for smooth removal.
   *
   * @param {string} id - Task ID to delete
   */
  const handleDeleteTask = useCallback((id) => {
    LayoutAnimation.configureNext(layoutAnimConfig);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // ────────────────────────────────────────────
  // Derived State (computed from tasks)
  // ────────────────────────────────────────────

  /**
   * Counts for each filter tab, computed from the full task list.
   * Memoized to avoid recalculation on every render.
   */
  const counts = useMemo(() => {
    const all = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = all - completed;
    return { all, active, completed };
  }, [tasks]);

  /**
   * Filtered and searched task list.
   * First filters by status (all/active/completed),
   * then filters by search query (case-insensitive).
   */
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply status filter
    if (filter === 'active') {
      result = result.filter((t) => !t.completed);
    } else if (filter === 'completed') {
      result = result.filter((t) => t.completed);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((t) => t.text.toLowerCase().includes(query));
    }

    return result;
  }, [tasks, filter, searchQuery]);

  // ────────────────────────────────────────────
  // FlatList Optimization Callbacks
  // ────────────────────────────────────────────

  /** Memoized renderItem to prevent unnecessary re-renders */
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

  /** Stable key extractor using unique task IDs */
  const keyExtractor = useCallback((item) => item.id, []);

  /**
   * Returns an appropriate empty state message based on
   * the current filter and search state.
   */
  const getEmptyMessage = () => {
    if (searchQuery.trim()) {
      return {
        icon: '🔍',
        title: 'No matching tasks',
        subtitle: 'Try a different search term',
      };
    }
    if (filter === 'active') {
      return {
        icon: '🎉',
        title: 'All caught up!',
        subtitle: "You've completed all your tasks",
      };
    }
    if (filter === 'completed') {
      return {
        icon: '📝',
        title: 'Nothing completed yet',
        subtitle: 'Start checking off your tasks',
      };
    }
    return {
      icon: '📋',
      title: 'No tasks yet',
      subtitle: 'Add your first task to get started!',
    };
  };

  const emptyMessage = getEmptyMessage();

  // ────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header with progress bar and stats */}
      <ProgressHeader total={counts.all} completed={counts.completed} />

      {/* Search bar (only visible when tasks exist) */}
      {tasks.length > 0 && (
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />
      )}

      {/* Filter tabs (only visible when tasks exist) */}
      {tasks.length > 0 && (
        <FilterTabs
          activeFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
      )}

      {/* Task Input */}
      <TaskInput onAddTask={handleAddTask} />

      {/* Divider */}
      {filteredTasks.length > 0 && (
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </Text>
          <View style={styles.dividerLine} />
        </View>
      )}

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>{emptyMessage.icon}</Text>
            <Text style={styles.emptyTitle}>{emptyMessage.title}</Text>
            <Text style={styles.emptySubtitle}>{emptyMessage.subtitle}</Text>
          </View>
        }
        // ── Performance optimizations ──
        removeClippedSubviews={Platform.OS === 'android'}
        maxToRenderPerBatch={15}
        windowSize={10}
        initialNumToRender={15}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
    marginHorizontal: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 40,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '400',
  },
});

export default HomeScreen;
