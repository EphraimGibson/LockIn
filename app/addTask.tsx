import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "@/context/TaskContext"; // Import the TaskProvider

export default function AddTask() {
  const { addTask } = useTaskContext(); // Access the addTask function from the context
  const router = useRouter(); // Use the router for navigation
  const [taskTitle, setTaskTitle] = useState(""); // State for the task title
  const [taskDescription, setTaskDescription] = useState(""); // State for the task description
  const [dueDate, setDueDate] = useState(""); // State for the due date

  // Function to handle creating a new task
  const handleCreateTask = () => {
    if (taskTitle.trim()) {
      // Add the new task to the global state
      addTask({
        id: Date.now(), // Generate a unique ID for the task
        title: taskTitle,
        description: taskDescription,
        dueDate,
      });

      // Navigate back to the previous screen
      router.back();
    } else {
      alert("Task title is required!"); // Show an alert if the title is empty
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle} // Update the task title state
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Task Description"
        value={taskDescription}
        onChangeText={setTaskDescription} // Update the task description state
        multiline
        numberOfLines={4}
      />

      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD)"
        value={dueDate}
        onChangeText={setDueDate} // Update the due date state
      />

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()} // Navigate back without saving
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.createButton]}
          onPress={handleCreateTask} // Call the handleCreateTask function
        >
          <Text style={styles.buttonText}>Create Task</Text>
        </Pressable>
      </View>
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
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "#ff4444",
  },
  createButton: {
    backgroundColor: "#03A9F4",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});