import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Platform, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "@/context/TaskContext"; // Import the TaskProvider
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"; // Import the DateTimePicker component and DateTimePickerEvent type
import { addTaskstyles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddTask() {
  const { addTask } = useTaskContext(); // Access the addTask function from the context
  const router = useRouter(); // Use the router for navigation
  const [taskTitle, setTaskTitle] = useState(""); // State for the task title
  const [taskDescription, setTaskDescription] = useState(""); // State for the task description
  const [priority, setPriority] = useState("")
  const [dueDate, setDueDate] = useState(null); // State for the due date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker


  async function postTask(id,Title,Description,Priority_Level,Due_Date) {
    try{
            const token = await AsyncStorage.getItem('token');
            if (token){
              const res = await fetch('http://192.168.1.230:3000/tasks',
                {
                  method : 'POST',
                  headers: {
                    'Authorization' : `Bearer ${token}`,
                    'Content-Type' : 'application/json',
                  },
                  body: JSON.stringify({id, Title, Description,Priority_Level, Due_Date}),
                });
                if(res.ok){
                  Alert.alert("Task created succesfully");
                  return true;
                }
                else if (res.status === 401){
                  Alert.alert("Session expired, please log in again");
                }
                else{
                  Alert.alert("Failed to create Task");
                }
            }  
            return false;

    }
    catch(error){
      Alert.alert("Issues connecting with server", error.message);
      return false;
    }
  }
    
  
  const handleCreateTask = async () => {      // Function to handle creating a new task
    if (taskTitle.trim()) {

      const success = await postTask( Date.now(),taskTitle,taskDescription,priority,dueDate);

      if (success){
        addTask({         // Add the new task to the global state
          id: Date.now(), // Generate a unique ID for the task
          title: taskTitle,
          description: taskDescription,
          Priority: priority,
          dueDate,
      })
    
        router.back() }        // Navigate back to the previous screen

    } else {
      alert("Task title is required!"); // Show an alert if the title is empty
    }
  };

  const dateChangeHandler = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker after selecting a date
    if (selectedDate) setDueDate(selectedDate);
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

    <Pressable onPress={() => setShowDatePicker(true) }> 
        <Text>{dueDate ? dueDate.toISOString().split("T")[0] : "Select a date"}</Text> 
        {/* Display the selected date */}
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
