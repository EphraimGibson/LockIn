import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

export default function TaskDetailsModal({ visible, task, onClose }) {
  if (!task) return null;

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return dayjs(date).format('MMMM D, YYYY h:mm A');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#FFE5E5';
      case 'Medium':
        return '#FFF3E0';
      case 'Low':
        return '#FFFDE7';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{task.Title}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.description}>
              {task.Description || 'No description provided'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Due Date:</Text>
            <Text style={styles.value}>{formatDate(task.Due_Date)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Priority:</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.Priority_Level) }]}>
              <Text style={styles.priorityText}>{task.Priority_Level || 'Not set'}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
}); 