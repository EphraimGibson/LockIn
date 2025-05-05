import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "../../context/TaskContext"; // Import the custom hook
import { Gueststyles } from "@/style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { useEffect } from "react";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { interpolate, useAnimatedStyle} from 'react-native-reanimated';
import dayjs from 'dayjs';
import TimeRemainingIndicator from '../../components/TimeRemainingIndicator';
import TaskDetailsModal from '../../components/TaskDetailsModal';

export default function todayTasks() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

const renderRightActions =  (
  progress: Animated.SharedValue<number>,
  dragX: Animated.SharedValue<number>,
  item: any
) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [100, 0]
          ),
        },
      ],
    };
  });
 //animates the swipe to follow the taskcard to the left
  return (
    <Animated.View style={[{ width: 100, height: 60 } , animatedStyle ]}>
      <Pressable
        style={{
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: '100%',
        }}
        onPress={() => handleCompleteTask(item.id)}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Complete</Text>
      </Pressable>
    </Animated.View>
  );
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


  function getRecommendedTasks(tasks: any[]) {
    const today = dayjs();
    const sevenDaysFromNow = today.add(7, 'day');
  
    // Filter tasks that are either high priority, due within 7 days, or past due
    let filteredTasks = tasks.filter((task) => {
      const dueDate = dayjs(task.Due_Date);
      const isHighPriority = task.Priority_Level === 'High';
      const isDueWithinSevenDays = dueDate.isBefore(sevenDaysFromNow);
      const isPastDue = dueDate.isBefore(today);
      
      return isHighPriority || isDueWithinSevenDays || isPastDue;
    });
  
    // Sort by priority and due date
    filteredTasks.sort((a, b) => {
      // First sort by priority (High > Medium > Low)
      const priorityOrder = { High: 1, Medium: 2, Low: 3, null: 4, undefined: 4 };
      const aPriority = priorityOrder[a.Priority_Level] || 4;
      const bPriority = priorityOrder[b.Priority_Level] || 4;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      
      // If same priority, sort by due date (earliest first)
      const aDate = dayjs(a.Due_Date);
      const bDate = dayjs(b.Due_Date);
      return aDate.diff(bDate);
    });
  
    return filteredTasks;
  }

 useEffect(() => {
  retrieveTasks();

 }, []);
 const recommendedTasks = getRecommendedTasks(tasks);

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

const handleTaskPress = (task) => {
  setSelectedTask(task);
  setShowTaskDetails(true);
};

  return (
    
    <View style={Gueststyles.container}>
      <Text style={Gueststyles.header}>Hello Great Tasker!</Text>
      <FlatList
        data={recommendedTasks} // Pass the tasks array to the FlatList
        keyExtractor={(item) => item.id.toString()} // Use the task ID as the key
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={(progess,dragX) => renderRightActions(progess,dragX,item)}
          >
            <Pressable onPress={() => handleTaskPress(item)}>
              <View style={[Gueststyles.taskCard, { backgroundColor: getTaskCardColor(item) }]}>
                <Text style={Gueststyles.taskTitle}>{item.Title}</Text>
                <TimeRemainingIndicator dueDate={item.Due_Date} />
              </View>
            </Pressable>
          </Swipeable>
        )}
      />
      <Pressable
        style={Gueststyles.fab}
        onPress={() => router.push("/addTaskScreen")} // Navigate to the AddTask screen
      >
        <Text style={Gueststyles.fabText}>+</Text>
      </Pressable>

      <TaskDetailsModal
        visible={showTaskDetails}
        task={selectedTask}
        onClose={() => setShowTaskDetails(false)}
      />
    </View>
  );
}

