import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

export default function TimeRemainingIndicator({ dueDate }) {
  if (!dueDate) {
    return null;
  }

  try {
    const now = dayjs();
    const due = dayjs(dueDate);
    
    if (!due.isValid()) {
      return null;
    }

    const diffHours = due.diff(now, 'hour');
    const diffDays = due.diff(now, 'day');

    const getTimeText = () => {
      if (diffDays > 0) {
        return `${diffDays}D`;
      } else if (diffHours > 0) {
        return `${diffHours}H`;
      } else {
        return 'NOW';
      }
    };

    const getIndicatorColor = () => {
      if (diffDays > 7) return '#4CAF50';
      if (diffDays > 3) return '#FFC107';
      if (diffDays > 0) return '#FF9800';
      return '#F44336';
    };

    return (
      <View style={[styles.container, { backgroundColor: getIndicatorColor() }]}>
        <Text style={styles.text}>{getTimeText()}</Text>
      </View>
    );
  } catch (error) {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 