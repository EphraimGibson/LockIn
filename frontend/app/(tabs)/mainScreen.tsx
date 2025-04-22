import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "../../context/TaskContext"; // Import the custom hook
import { Gueststyles } from "@/style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";
import { useEffect } from "react";


export default function Main() {
  const { tasks, setTasks } = useTaskContext(); // Access tasks from the context
  const router = useRouter(); // Use the router for navigation

  async function retrieveTasks(){
  try {
    const token = await AsyncStorage.getItem('token');

    const res = await fetch('http://192.168.1.230:3000/tasks',{
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

  return (
    <View style={Gueststyles.container}>
      <Text style={Gueststyles.header}>Hello Great Tasker!</Text>
      <Text>Click the + button to add a new task</Text>
      <FlatList
        data={tasks} // Pass the tasks array to the FlatList
        keyExtractor={(item) => item.id.toString()} // Use the task ID as the key
        renderItem={({ item }) => (
          <View style={Gueststyles.taskCard}>
            <Text style={Gueststyles.taskTitle}>{item.Title}</Text>
          </View>
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

