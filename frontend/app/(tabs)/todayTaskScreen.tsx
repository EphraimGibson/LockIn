import React from "react";
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



export default function todayTasks() {

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


  function getRecommendedTasks(tasks) {
    const today = dayjs().format('YYYY-MM-DD');
  
    // 1. Filter tasks due today
    let todayTasks = tasks.filter(
      (task: { Due_Date: string; }) => task.Due_Date === today
    );
  
    // 2. Sort by priority (High > Medium > Low > null)
    const priorityOrder = { High: 1, Medium: 2, Low: 3, null: 4, undefined: 4 };
    todayTasks.sort((a, b) => {
      const aPriority = priorityOrder[a.Priority_Level] || 4;
      const bPriority = priorityOrder[b.Priority_Level] || 4;
      if (aPriority !== bPriority) return aPriority - bPriority;
      // If same priority, sort by Due_Date (earliest first)
      return (a.Due_Date || '').localeCompare(b.Due_Date || '');
    });
  
    // 3. If no priority, fallback to earliest due date
    if (todayTasks.length === 0) {
      todayTasks = tasks
        .filter((task: { Due_Date: any; }) => task.Due_Date)
        .sort((a, b) => (a.Due_Date || '').localeCompare(b.Due_Date || ''));
    }
  
    // 4. Optionally, limit to top N
    // return todayTasks.slice(0, 5);
    return todayTasks;
  }

 useEffect(() => {
  retrieveTasks();

 }, []);
 const recommendedTasks = getRecommendedTasks(tasks);


  return (
    
    <View style={Gueststyles.container}>
      <Text style={Gueststyles.header}>Hello Great Tasker!</Text>
      <Text>Click the + button to add a new task</Text>
      <FlatList
        data={recommendedTasks} // Pass the tasks array to the FlatList
        keyExtractor={(item) => item.id.toString()} // Use the task ID as the key
        renderItem={({ item }) => (
        <Swipeable
          renderRightActions={(progess,dragX) => renderRightActions(progess,dragX,item)}
        >
          <View style={Gueststyles.taskCard}>
            <Text style={Gueststyles.taskTitle}>{item.Title}</Text>
          </View>
        </Swipeable>
        )}
      />
      <Pressable
        style={Gueststyles.fab}
        onPress={() => router.push("/addTaskScreen")} // Navigate to the AddTask screen
      >
        <Text style={Gueststyles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

