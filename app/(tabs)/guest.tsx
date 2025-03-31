import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "../../context/TaskContext"; // Import the custom hook

export default function Guest() {
  const { tasks } = useTaskContext(); // Access tasks from the context
  const router = useRouter(); // Use the router for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello Great Tasker!</Text>
      <Text>Click the + button to add a new task</Text>
      <FlatList
        data={tasks} // Pass the tasks array to the FlatList
        keyExtractor={(item) => item.id.toString()} // Use the task ID as the key
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>
          </View>
        )}
      />
      <Pressable
        style={styles.fab}
        onPress={() => router.push("/AddTask")} // Navigate to the AddTask screen
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "lightblue",
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#03A9F4",
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    fontSize: 30,
    color: "white",
  },
});