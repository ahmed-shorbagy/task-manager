import React, { useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Color mapping for task priority levels.
 */
const PRIORITY_COLORS = {
  low: '#10B981',
  medium: '#F59E0B',
  high: '#EF4444',
};

/**
 * Label mapping for task priority levels.
 */
const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

/**
 * TaskItem Component
 *
 * Renders a single task card with:
 * - Colored priority indicator bar
 * - Animated checkbox for toggling completion
 * - Task text with strikethrough when completed
 * - Priority badge
 * - Delete button with haptic feedback
 * - Fade-in animation on mount
 *
 * Wrapped in React.memo to prevent unnecessary re-renders in FlatList.
 *
 * @param {Object} task - Task object with id, text, completed, priority
 * @param {Function} onToggle - Callback when task completion is toggled
 * @param {Function} onDelete - Callback when task is deleted
 */
const TaskItem = ({ task, onToggle, onDelete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const checkScale = useRef(new Animated.Value(task.completed ? 1 : 0)).current;

  // Fade-in and slide-up animation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Animate checkmark when completion status changes
  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: task.completed ? 1 : 0,
      tension: 200,
      friction: 12,
      useNativeDriver: true,
    }).start();
  }, [task.completed, checkScale]);

  const handleToggle = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle(task.id);
  }, [task.id, onToggle]);

  const handleDelete = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onDelete(task.id);
  }, [task.id, onDelete]);

  const priorityColor = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium;

  return (
    <Animated.View
      style={[
        styles.container,
        task.completed && styles.containerCompleted,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Priority color indicator on the left edge */}
      <View style={[styles.priorityBar, { backgroundColor: priorityColor }]} />

      <View style={styles.content}>
        {/* Checkbox toggle area */}
        <TouchableOpacity
          style={styles.toggleArea}
          onPress={handleToggle}
          activeOpacity={0.6}
        >
          <View
            style={[
              styles.checkbox,
              task.completed && [
                styles.checkboxCompleted,
                { backgroundColor: '#6366F1', borderColor: '#6366F1' },
              ],
            ]}
          >
            <Animated.Text
              style={[
                styles.checkmark,
                { transform: [{ scale: checkScale }] },
              ]}
            >
              ✓
            </Animated.Text>
          </View>

          <View style={styles.textContainer}>
            <Text
              style={[
                styles.taskText,
                task.completed && styles.taskTextCompleted,
              ]}
              numberOfLines={2}
            >
              {task.text}
            </Text>
            {/* Priority badge */}
            <View
              style={[
                styles.priorityBadge,
                {
                  backgroundColor: `${priorityColor}18`,
                  borderColor: `${priorityColor}40`,
                },
              ]}
            >
              <View
                style={[
                  styles.priorityDot,
                  { backgroundColor: priorityColor },
                ]}
              />
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {PRIORITY_LABELS[task.priority]}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Delete button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.6}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.deleteText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  containerCompleted: {
    opacity: 0.7,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.02,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  priorityBar: {
    width: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  toggleArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  checkboxCompleted: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
    gap: 6,
  },
  taskText: {
    fontSize: 15,
    color: '#1E293B',
    fontWeight: '500',
    lineHeight: 21,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
    fontWeight: '400',
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    borderWidth: 1,
    gap: 5,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  deleteText: {
    fontSize: 16,
  },
});

export default React.memo(TaskItem);
