import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

export default function TaskDetailsModal({ visible, task, onClose }) {
  const formatDate = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY h:mm A');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#FF6B6B';
      case 'Medium':
        return '#FFA726';
      case 'Low':
        return '#66BB6A';
      default:
        return '#9E9E9E';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>Task Details</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <View style={styles.content}>
            <Text style={styles.taskTitle}>{task?.Title}</Text>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {task?.Description || 'No description provided'}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Due Date</Text>
              <Text style={styles.dateText}>
                {task?.Due_Date ? formatDate(task.Due_Date) : 'No due date set'}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Priority</Text>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task?.Priority_Level) }]}>
                <Text style={styles.priorityText}>
                  {task?.Priority_Level || 'Not Set'}
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </Pressable>
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
  content: {
    gap: 20,
  },
  taskTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priorityText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
}); 