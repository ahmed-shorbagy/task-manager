import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Available filter options.
 * Each filter has a key and display label.
 */
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

/**
 * FilterTabs Component
 *
 * Horizontal tabs to filter tasks by status (All, Active, Completed).
 * Shows the count of tasks in each category and highlights the active filter.
 *
 * @param {string} activeFilter - Currently selected filter key
 * @param {Function} onFilterChange - Callback when a filter tab is pressed
 * @param {Object} counts - Object with { all, active, completed } counts
 */
const FilterTabs = ({ activeFilter, onFilterChange, counts }) => {
  const handlePress = useCallback(
    (key) => {
      Haptics.selectionAsync();
      onFilterChange(key);
    },
    [onFilterChange]
  );

  return (
    <View style={styles.container}>
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.key;
        const count = counts[filter.key] || 0;

        return (
          <TouchableOpacity
            key={filter.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => handlePress(filter.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {filter.label}
            </Text>
            <View
              style={[
                styles.countBadge,
                isActive && styles.countBadgeActive,
              ]}
            >
              <Text
                style={[
                  styles.countText,
                  isActive && styles.countTextActive,
                ]}
              >
                {count}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 11,
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  tabLabelActive: {
    color: '#6366F1',
  },
  countBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countBadgeActive: {
    backgroundColor: '#EEF2FF',
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94A3B8',
  },
  countTextActive: {
    color: '#6366F1',
  },
});

export default React.memo(FilterTabs);
