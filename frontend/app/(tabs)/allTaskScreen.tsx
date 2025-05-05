import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet, Vibration, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { useTaskContext } from "../../context/TaskContext"; // Import the custom hook
import { Gueststyles } from "@/style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { useEffect } from "react";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { interpolate, useAnimatedStyle} from 'react-native-reanimated';
import TimeRemainingIndicator from '../../components/TimeRemainingIndicator';
import TaskDetailsModal from '../../components/TaskDetailsModal';
import PomodoroModal from '../../components/PomodoroModal';
import dayjs from 'dayjs';
import { LinearGradient } from 'expo-linear-gradient';

const getEffectivePriority = (task: any) => {
  const now = dayjs();
  const dueDate = dayjs(task.Due_Date);
  const daysUntilDue = dueDate.diff(now, 'day');

  // If due within 3 days, override to High priority
  if (daysUntilDue <= 3) {
    return 'High';
  }
  // If due within 7 days, override to Medium priority
  else if (daysUntilDue <= 7) {
    return 'Medium';
  }
  // Otherwise use original priority
  return task.Priority_Level;
};

const getTaskCardColor = (task: any) => {
  const effectivePriority = getEffectivePriority(task);
  
  switch (effectivePriority) {
    case 'High':
      return '#FFE5E5'; // Light red
    case 'Medium':
      return '#FFF3E0'; // Light orange
    case 'Low':
      return '#FFFDE7'; // Light yellow
    default:
      return '#FFFDE7'; // White
  }
};

export default function allTasks() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);

  const renderRightActions = (
    progress: Animated.SharedValue<number>,
    dragX: Animated.SharedValue<number>,
    item: any
  ) => {
    const animatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        progress.value,
        [0, 1],
        [100, 0]
      );
      return {
        transform: [{ translateX }],
      };
    });

    return (
      <Animated.View style={[{ 
        width: 100, 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
      }, animatedStyle]}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete</Text>
      </Animated.View>
    );
  };

  const handleSwipeableOpen = (direction: string, item: any) => {
    if (direction === 'right') {
      handleCompleteTask(item.id);
    }
  };

  const handleCompleteTask = async (taskId: number) =>{
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await fetch(`http://192.168.1.237:3000/tasks/${taskId}`,{
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (res.ok){
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
      
    }
    catch(error){
      Alert.alert("Error while deleting task",
        "Please try again",
        [{text: 'Ok'}]
      )
    }
  }
  const { tasks, setTasks } = useTaskContext(); // Access tasks from the context
  const router = useRouter(); // Use the router for navigation

  async function retrieveTasks(){
    try {
      const token = await AsyncStorage.getItem('token');

      const res = await fetch('http://192.168.1.237:3000/tasks',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if(res.ok){
         const data = await res.json();
         setTasks(data.tasks);
      }
      else if (res.status == 401){
        Alert.alert("Session Expires",
          "Please login again",
          [{text: "Ok"}],
        )
        router.push('./loginScreen')
      }

    }
    catch(error){
      Alert.alert("Issues retrieving your tasks",
                "Please try again",
                [{text: "Ok"}]
      )
    }
   
  }

  
 useEffect(() => {
  retrieveTasks();
 }, []);

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleLongPress = (task) => {
    Vibration.vibrate(100);
    setSelectedTask(task);
    setShowPomodoro(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4A90E2', '#357ABD']}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your Task Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Swipe right to complete tasks • Long press to start a focus session
          </Text>
        </View>
      </LinearGradient>
      <View style={[Gueststyles.container, { paddingTop: 0 }]}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
              onSwipeableOpen={(direction) => handleSwipeableOpen(direction, item)}
              friction={2}
              rightThreshold={40}
              overshootRight={false}
              containerStyle={{
                marginVertical: 6,
                borderRadius: 12,
                overflow: 'hidden',
                width: '100%',
              }}
            >
              <Pressable 
                onPress={() => handleTaskPress(item)}
                onLongPress={() => handleLongPress(item)}
                delayLongPress={500}
              >
                <View style={[
                  Gueststyles.taskCard, 
                  { 
                    backgroundColor: getTaskCardColor(item),
                    margin: 0,
                    borderRadius: 12,
                    width: '100%',
                  }
                ]}>
                  <Text style={Gueststyles.taskTitle}>{item.Title}</Text>
                  <TimeRemainingIndicator dueDate={item.Due_Date} />
                </View>
              </Pressable>
            </Swipeable>
          )}
        />
        <Pressable
          style={Gueststyles.fab}
          onPress={() => router.push("/addTaskScreen")}
        >
          <Text style={Gueststyles.fabText}>+</Text>
        </Pressable>

        <TaskDetailsModal
          visible={showTaskDetails}
          task={selectedTask}
          onClose={() => setShowTaskDetails(false)}
        />

        <PomodoroModal
          visible={showPomodoro}
          task={selectedTask}
          onClose={() => setShowPomodoro(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
});

