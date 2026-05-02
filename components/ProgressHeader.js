import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

/**
 * ProgressHeader Component
 *
 * Displays a gradient-style header with:
 * - App title and current date
 * - Task completion progress bar
 * - Task statistics (completed / total)
 *
 * @param {number} total - Total number of tasks
 * @param {number} completed - Number of completed tasks
 */
const ProgressHeader = ({ total, completed }) => {
  const progress = total > 0 ? completed / total : 0;
  const percentage = Math.round(progress * 100);

  // Format current date for display
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      {/* Title and date */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.greeting}>📋 Task Manager</Text>
          <Text style={styles.date}>{dateString}</Text>
        </View>
        {total > 0 && (
          <View style={styles.percentContainer}>
            <Text style={styles.percentText}>{percentage}%</Text>
            <Text style={styles.percentLabel}>done</Text>
          </View>
        )}
      </View>

      {/* Progress Bar (only shown when tasks exist) */}
      {total > 0 && (
        <View style={styles.progressSection}>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${percentage}%` },
                percentage === 100 && styles.progressComplete,
              ]}
            />
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>
              <Text style={styles.statsHighlight}>{completed}</Text> of{' '}
              <Text style={styles.statsHighlight}>{total}</Text> tasks completed
            </Text>
            {total > 0 && completed === total && (
              <Text style={styles.celebrateText}>🎉 All done!</Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 48,
    paddingBottom: 20,
    backgroundColor: '#6366F1',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    ...Platform.select({
      ios: {
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    fontWeight: '500',
  },
  percentContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  percentText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  percentLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressSection: {
    marginTop: 18,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A5B4FC',
    borderRadius: 4,
    minWidth: 8,
  },
  progressComplete: {
    backgroundColor: '#34D399',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statsText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.65)',
    fontWeight: '400',
  },
  statsHighlight: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  celebrateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FDE68A',
  },
});

export default React.memo(ProgressHeader);
