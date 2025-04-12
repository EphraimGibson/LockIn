import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "../../context/TaskContext"; // Import the custom hook
import { Gueststyles } from "@/style";

export default function Guest() {
  const { tasks } = useTaskContext(); // Access tasks from the context
  const router = useRouter(); // Use the router for navigation

  return (
    <View style={Gueststyles.container}>
      <Text style={Gueststyles.header}>Hello Great Tasker!</Text>
      <Text>Click the + button to add a new task</Text>
      <FlatList
        data={tasks} // Pass the tasks array to the FlatList
        keyExtractor={(item) => item.id.toString()} // Use the task ID as the key
        renderItem={({ item }) => (
          <View style={Gueststyles.taskCard}>
            <Text style={Gueststyles.taskTitle}>{item.title}</Text>
          </View>
        )}
      />
      <Pressable
        style={Gueststyles.fab}
        onPress={() => router.push("/addTask")} // Navigate to the AddTask screen
      >
        <Text style={Gueststyles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

