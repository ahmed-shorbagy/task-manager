import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Animated,
  Keyboard,
} from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Priority options for tasks.
 * Each priority has a label, color, and unique key.
 */
const PRIORITIES = [
  { key: 'low', label: 'Low', color: '#10B981' },
  { key: 'medium', label: 'Med', color: '#F59E0B' },
  { key: 'high', label: 'High', color: '#EF4444' },
];

/**
 * TaskInput Component
 *
 * Provides a text input for task description and a priority selector.
 * Prevents empty submissions and provides haptic feedback on add.
 *
 * @param {Function} onAddTask - Callback receiving (text, priority) when a task is added
 */
const TaskInput = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const inputRef = useRef(null);

  // Animate the add button press
  const animatePress = useCallback(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim]);

  /**
   * Handles adding a new task.
   * Validates non-empty input, triggers haptic feedback,
   * calls parent callback, and resets input state.
   */
  const handleAddTask = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    animatePress();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAddTask(trimmed, selectedPriority);
    setText('');
    Keyboard.dismiss();
  }, [text, selectedPriority, onAddTask, animatePress]);

  const isDisabled = !text.trim();

  return (
    <View style={styles.container}>
      {/* Text Input Row */}
      <View style={styles.inputRow}>
        <View style={styles.inputWrapper}>
          <Text style={styles.inputIcon}>✏️</Text>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="What do you need to do?"
            placeholderTextColor="#94A3B8"
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
            autoCorrect={false}
            maxLength={100}
          />
        </View>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.addButton, isDisabled && styles.addButtonDisabled]}
            onPress={handleAddTask}
            activeOpacity={0.7}
            disabled={isDisabled}
          >
            <Text style={styles.addButtonText}>＋</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Priority Selector Row */}
      <View style={styles.priorityRow}>
        <Text style={styles.priorityLabel}>Priority:</Text>
        {PRIORITIES.map((p) => (
          <TouchableOpacity
            key={p.key}
            style={[
              styles.priorityChip,
              {
                backgroundColor:
                  selectedPriority === p.key ? p.color : '#F1F5F9',
                borderColor:
                  selectedPriority === p.key ? p.color : '#E2E8F0',
              },
            ]}
            onPress={() => {
              setSelectedPriority(p.key);
              Haptics.selectionAsync();
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.priorityDot,
                { backgroundColor: selectedPriority === p.key ? '#FFF' : p.color },
              ]}
            />
            <Text
              style={[
                styles.priorityChipText,
                { color: selectedPriority === p.key ? '#FFF' : '#64748B' },
              ]}
            >
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
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
  inputIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '400',
  },
  addButton: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  addButtonDisabled: {
    backgroundColor: '#CBD5E1',
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
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  priorityLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginRight: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priorityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 6,
  },
  priorityDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  priorityChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default React.memo(TaskInput);
