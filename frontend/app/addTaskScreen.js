import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  Platform,
  Alert,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { useTaskContext } from "@/context/TaskContext"; // Import the TaskProvider
import DateTimePicker from "@react-native-community/datetimepicker"; // Import the DateTimePicker component
import { addTaskstyles } from "../style";
import { KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";

const IP = Constants.expoConfig.extra.IP;
import { apiFetch } from "../utils/api";

export default function AddTask() {
  const { addTask } = useTaskContext(); // Access the addTask function from the context
  const router = useRouter(); // Use the router for navigation
  const [taskTitle, setTaskTitle] = useState(""); // State for the task title
  const [taskDescription, setTaskDescription] = useState(""); // State for the task description
  const [priority, setPriority] = useState(""); // State for the priority
  const [dueDate, setDueDate] = useState(null); // State for the due date
  const [showDatePicker, setShowDatePicker] = useState(false); // State to control the visibility of the date picker

  const priorityOptions = ["High", "Medium", "Low"];

  async function postTask(Title, Description, Priority_Level, Due_Date) {
    try {
      const res = await apiFetch("/tasks", {
        method: "POST",
        body: JSON.stringify({
          Title,
          Description,
          Priority_Level,
          Due_Date,
        }),
      });

      if (res.ok) {
        const data = await res.json(); //get the body of the response from BE

        Alert.alert("Task created successfully");
        return data;
      } else {
        Alert.alert("Failed to create Task");
        return null;
      }
    } catch (error) {
      if (error.message === "Session expired") {
        Alert.alert("Session expired, please log in again");
        router.push("/loginScreen");
      } else {
        Alert.alert("Issues connecting with server", error.message);
      }
      return null;
    }
  }

  const handleCreateTask = async () => {
    if (taskTitle.trim()) {
      // Format the date to ISO string before sending
      const formattedDate = dueDate ? dueDate.toISOString() : null;

      const result = await postTask(
        taskTitle,
        taskDescription,
        priority,
        formattedDate,
      );

      if (result) {
        addTask({
          id: result.task.id,
          Title: taskTitle,
          Description: taskDescription,
          Priority_Level: priority,
          Due_Date: formattedDate,
        });
        router.back();
      }
    } else {
      alert("Task title is required!");
    }
  };

  const dateChangeHandler = (event, selectedDate) => {
    // Only close the picker when Done is pressed
    if (selectedDate) {
      if (Platform.OS === "android") {
        setShowDatePicker(false); // Always hide picker on Android
      }
      const date = new Date(selectedDate);
      setDueDate(date);
    }
  };

  const handleDone = () => {
    setShowDatePicker(false);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={addTaskstyles.container}>
          <TextInput
            style={addTaskstyles.input}
            placeholder="Task Title"
            placeholderTextColor={"#666"}
            value={taskTitle}
            onChangeText={setTaskTitle} // Update the task title state
          />

          <TextInput
            style={[addTaskstyles.input, addTaskstyles.textArea]}
            placeholder="Task Description"
            placeholderTextColor={"#666"}
            value={taskDescription}
            onChangeText={setTaskDescription} // Update the task description state
            multiline
            numberOfLines={4}
          />

          <View style={addTaskstyles.priorityContainer}>
            <Text style={addTaskstyles.priorityLabel}>Priority Level:</Text>
            <View style={addTaskstyles.priorityButtons}>
              {priorityOptions.map((option) => (
                <Pressable
                  key={option}
                  style={[
                    addTaskstyles.priorityButton,
                    priority === option && addTaskstyles.priorityButtonSelected,
                  ]}
                  onPress={() => setPriority(option)}
                >
                  <Text
                    style={[
                      addTaskstyles.priorityButtonText,
                      priority === option &&
                        addTaskstyles.priorityButtonTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={addTaskstyles.dateContainer}>
            <Text style={addTaskstyles.dateLabel}>Due Date & Time:</Text>
            <Pressable
              style={addTaskstyles.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={addTaskstyles.dateText}>
                {dueDate ? formatDate(dueDate) : "Select date and time"}
              </Text>
            </Pressable>
          </View>

          {Platform.OS === "ios" ? (
            <Modal
              transparent={true}
              visible={showDatePicker}
              animationType="slide"
            >
              <View style={addTaskstyles.modalContainer}>
                <View style={addTaskstyles.modalContent}>
                  <View style={addTaskstyles.modalHeader}>
                    <Pressable
                      style={addTaskstyles.modalButton}
                      onPress={() => setShowDatePicker(false)}
                    >
                      <Text style={addTaskstyles.modalButtonText}>Cancel</Text>
                    </Pressable>
                    <Pressable
                      style={addTaskstyles.modalButton}
                      onPress={handleDone}
                    >
                      <Text
                        style={[
                          addTaskstyles.modalButtonText,
                          { color: "#007AFF" },
                        ]}
                      >
                        Done
                      </Text>
                    </Pressable>
                  </View>
                  <View style={addTaskstyles.pickerContainer}>
                    <DateTimePicker
                      value={dueDate || new Date()}
                      mode="datetime"
                      display="spinner"
                      onChange={dateChangeHandler}
                      minimumDate={new Date()}
                      style={addTaskstyles.dateTimePicker}
                      textColor="#000000"
                      themeVariant="light"
                    />
                  </View>
                </View>
              </View>
            </Modal>
          ) : (
            showDatePicker && (
              <DateTimePicker
                value={dueDate || new Date()}
                mode="date"
                display="spinner"
                onChange={dateChangeHandler}
                minimumDate={new Date()}
              />
            )
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  modalButton: {
    padding: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#666",
  },
});
