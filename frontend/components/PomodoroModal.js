import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, Vibration } from 'react-native';
import * as Audio from 'expo-audio';

export default function PomodoroModal({ visible, task, onClose }) {
  const [selectedMode, setSelectedMode] = useState(null); // 'short' or 'long'
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(1);
  const [sound, setSound] = useState();

  const SHORT_WORK = 25 * 60; // 25 minutes in seconds
  const SHORT_BREAK = 5 * 60; // 5 minutes in seconds
  const LONG_WORK = 50 * 60; // 50 minutes in seconds
  const LONG_BREAK = 10 * 60; // 10 minutes in seconds

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/notification.mp3'),
        { shouldPlay: true }
      );
      setSound(sound);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      Vibration.vibrate([0, 500, 200, 500]);
      playSound();
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(selectedMode === 'short' ? SHORT_BREAK : LONG_BREAK);
      } else {
        setIsBreak(false);
        setSessions(sessions - 1);
        if (sessions > 1) {
          setTimeLeft(selectedMode === 'short' ? SHORT_WORK : LONG_WORK);
        } else {
          setIsActive(false);
          onClose();
        }
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = (mode) => {
    setSelectedMode(mode);
    setTimeLeft(mode === 'short' ? SHORT_WORK : LONG_WORK);
    setIsActive(true);
    setIsBreak(false);
  };

  const getProgressColor = () => {
    if (isBreak) return '#4CAF50';
    return selectedMode === 'short' ? '#FF9800' : '#F44336';
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
            <Text style={styles.title}>Focus Session</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          {!selectedMode ? (
            <View style={styles.modeSelection}>
              <Text style={styles.subtitle}>Choose your focus mode:</Text>
              <Pressable
                style={[styles.modeButton, { backgroundColor: '#FF9800' }]}
                onPress={() => startSession('short')}
              >
                <Text style={styles.modeTitle}>Short Focus</Text>
                <Text style={styles.modeDescription}>25 min work + 5 min break</Text>
              </Pressable>
              <Pressable
                style={[styles.modeButton, { backgroundColor: '#F44336' }]}
                onPress={() => startSession('long')}
              >
                <Text style={styles.modeTitle}>Long Focus</Text>
                <Text style={styles.modeDescription}>50 min work + 10 min break</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.timerContainer}>
              <Text style={styles.taskTitle}>{task.Title}</Text>
              <Text style={[styles.timerText, { color: getProgressColor() }]}>
                {formatTime(timeLeft)}
              </Text>
              <Text style={styles.statusText}>
                {isBreak ? 'Break Time!' : 'Focus Time'}
              </Text>
              <Text style={styles.sessionsText}>
                {sessions} {sessions === 1 ? 'session' : 'sessions'} remaining
              </Text>
              <View style={styles.controls}>
                <Pressable
                  style={[styles.controlButton, { backgroundColor: getProgressColor() }]}
                  onPress={() => setIsActive(!isActive)}
                >
                  <Text style={styles.controlButtonText}>
                    {isActive ? 'Pause' : 'Resume'}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.controlButton, { backgroundColor: '#666' }]}
                  onPress={() => {
                    setIsActive(false);
                    setSelectedMode(null);
                    setTimeLeft(null);
                  }}
                >
                  <Text style={styles.controlButtonText}>Reset</Text>
                </Pressable>
              </View>
            </View>
          )}
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
  modeSelection: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#666',
  },
  modeButton: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  modeDescription: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  timerContainer: {
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerText: {
    fontSize: 72,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
  },
  sessionsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  controlButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 100,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 