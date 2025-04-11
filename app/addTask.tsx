import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "@/context/TaskContext"; // Import the TaskProvider
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"; // Import the DateTimePicker component and DateTimePickerEvent type

export default function AddTask() {
  const { addTask } = useTaskContext(); // Access the addTask function from the context
  const router = useRouter(); // Use the router for navigation
  const [taskTitle, setTaskTitle] = useState(""); // State for the task title
  const [taskDescription, setTaskDescription] = useState(""); // State for the task description
  const [dueDate, setDueDate] = useState<Date | null>(null); // State for the due date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker
  // Function to handle creating a new task
  const handleCreateTask = () => {
    if (taskTitle.trim()) {

      addTask({         // Add the new task to the global state
        id: Date.now(), // Generate a unique ID for the task
        title: taskTitle,
        description: taskDescription,
        dueDate,
      });

      router.back();       // Navigate back to the previous screen

    } else {
      alert("Task title is required!"); // Show an alert if the title is empty
    }
  };

  const dateChangeHandler = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false); // Hide the date picker after selecting a date
    if (selectedDate) {
      setDueDate(selectedDate);
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

      <Pressable
        style={styles.input}
        onPress={() => setShowDatePicker(true)} // Show the date picker when pressed
      >

      <Text>{dueDate ? dueDate.toISOString().split("T")[0] : "Select a date"}</Text> {/* Display the selected date */}
    </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate || new Date()} // Current selected date
          mode="date" // Show only the date picker
          display={Platform.OS === "ios" ? "inline" : "default"} // Display style
          onChange={dateChangeHandler} // Handle date selection
        />
      )}

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

function handleDateChange(event: DateTimePickerEvent, date?: Date): void {
  throw new Error("Function not implemented.");
}
