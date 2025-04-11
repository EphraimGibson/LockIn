import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "@/context/TaskContext"; // Import the TaskProvider
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"; // Import the DateTimePicker component and DateTimePickerEvent type
import { addTaskstyles } from '../style';

export default function AddTask() {
  const { addTask } = useTaskContext(); // Access the addTask function from the context
  const router = useRouter(); // Use the router for navigation
  const [taskTitle, setTaskTitle] = useState(""); // State for the task title
  const [taskDescription, setTaskDescription] = useState(""); // State for the task description
  const [dueDate, setDueDate] = useState<Date | null>(null); // State for the due date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker


  const handleCreateTask = () => {      // Function to handle creating a new task
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
    <View style={addTaskstyles.container}>
      <Text style={addTaskstyles.header}>Add New Task</Text>

      <TextInput
        style={addTaskstyles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle} // Update the task title state
      />

      <TextInput
        style={[addTaskstyles.input, addTaskstyles.textArea]}
        placeholder="Task Description"
        value={taskDescription}
        onChangeText={setTaskDescription} // Update the task description state
        multiline
        numberOfLines={4}
      />

      <Pressable
        style={addTaskstyles.input}
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

      <View style={addTaskstyles.buttonContainer}>
        <Pressable
          style={[addTaskstyles.button, addTaskstyles.cancelButton]}
          onPress={() => router.back()} // Navigate back without saving
        >
          <Text style={addTaskstyles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[addTaskstyles.button, addTaskstyles.createButton]}
          onPress={handleCreateTask} // Call the handleCreateTask function
        >
          <Text style={addTaskstyles.buttonText}>Create Task</Text>
        </Pressable>
      </View>
    </View>
  );
}


function handleDateChange(event: DateTimePickerEvent, date?: Date): void {
  throw new Error("Function not implemented.");
}
