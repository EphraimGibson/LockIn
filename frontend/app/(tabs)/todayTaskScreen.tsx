import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Vibration,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useTaskContext } from "../../context/TaskContext"; // Import the custom hook
import { Gueststyles } from "@/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useEffect } from "react";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import dayjs from "dayjs";
import TimeRemainingIndicator from "../../components/TimeRemainingIndicator";
import TaskDetailsModal from "../../components/TaskDetailsModal";
import PomodoroModal from "../../components/PomodoroModal";
import { LinearGradient } from "expo-linear-gradient";
import { getTokens } from "../../utils/token";
import Constants from "expo-constants";
import { apiFetch } from "@/utils/api";

const IP = Constants.expoConfig.extra.IP;

export default function TodayTaskScreen() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);

  const renderRightActions = (
    progress: Animated.SharedValue<number>,
    dragX: Animated.SharedValue<number>,
    item: any,
  ) => {
    const animatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(progress.value, [0, 1], [100, 0]);
      return {
        transform: [{ translateX }],
      };
    });

    return (
      <Animated.View style={[{ width: 100, height: 60 }, animatedStyle]}>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green",
            borderTopRightRadius: 12,
            borderBottomRightRadius: 12,
            height: "100%",
            width: "100%",
          }}
          onPress={() => handleCompleteTask(item.id)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Complete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  const handleCompleteTask = async (taskId: number) => {
    try {
      const res = await apiFetch(`/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTasks((prevTasks: any[]) =>
          prevTasks.filter((task) => task.id !== taskId),
        );
        return;
      }
    } catch (error) {
      if (error.message === "Session expired") {
        Alert.alert("Session Expired", "Returning back to login", [
          { text: "Ok" },
        ]);

        router.push("../loginScreen");
      } else {
        Alert.alert(
          "Unexpected error while deleting task",
          "Please try again",
          [{ text: "Ok" }],
        );
      }
    }
  };

  const { tasks, setTasks } = useTaskContext(); // Access tasks from the context
  const router = useRouter(); // Use the router for navigation

  async function retrieveTasks() {
    try {
      const res = await apiFetch("/tasks", { method: "GET" });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
      }
    } catch (error) {
      if (error.message === "Session expired") {
        {
          Alert.alert("Session Expired", "Please login again", [
            { text: "Ok" },
          ]);
          router.push("./loginScreen");
        }
      } else {
        Alert.alert("Issues retrieving your tasks", "Please try again", [
          { text: "Ok" },
        ]);
      }
    }
  }

  function getRecommendedTasks(tasks: any[]) {
    const today = dayjs();
    const sevenDaysFromNow = today.add(7, "day");

    // Filter tasks that are either high priority, due within 7 days, or past due
    let filteredTasks = tasks.filter((task) => {
      const dueDate = dayjs(task.Due_Date);
      const isHighPriority = task.Priority_Level === "High";
      const isDueWithinSevenDays = dueDate.isBefore(sevenDaysFromNow);
      const isPastDue = dueDate.isBefore(today);

      return isHighPriority || isDueWithinSevenDays || isPastDue;
    });

    // Sort by priority and due date
    filteredTasks.sort((a, b) => {
      // First sort by priority (High > Medium > Low)
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
        null: 4,
        undefined: 4,
      };
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
    const daysUntilDue = dueDate.diff(now, "day");

    // If due within 3 days, override to High priority
    if (daysUntilDue <= 3) {
      return "High";
    }
    // If due within 7 days, override to Medium priority
    else if (daysUntilDue <= 7) {
      return "Medium";
    }
    // Otherwise use original priority
    return task.Priority_Level;
  };

  const getTaskCardColor = (task: any) => {
    const effectivePriority = getEffectivePriority(task);

    switch (effectivePriority) {
      case "High":
        return "#FFE5E5"; // Light red
      case "Medium":
        return "#FFF3E0"; // Light orange
      case "Low":
        return "#FFFDE7"; // Light yellow
      default:
        return "#FFFDE7";
    }
  };

  const handleTaskPress = (task: any) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleLongPress = (task: any) => {
    Vibration.vibrate(100);
    setSelectedTask(task);
    setShowPomodoro(true);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["bottom"]}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#4A90E2", "#357ABD"]}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Today's Focus</Text>
          <Text style={styles.headerSubtitle}>
            Prioritized tasks for today • Long press to start a focus session
          </Text>
        </View>
      </LinearGradient>
      <View style={[Gueststyles.container, { paddingTop: 0 }]}>
        <FlatList
          data={recommendedTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, item)
              }
              friction={2}
              rightThreshold={40}
              overshootRight={false}
              containerStyle={{
                marginVertical: 6,
                borderRadius: 12,
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Pressable
                onPress={() => handleTaskPress(item)}
                onLongPress={() => handleLongPress(item)}
                delayLongPress={500}
              >
                <View
                  style={[
                    Gueststyles.taskCard,
                    {
                      backgroundColor: getTaskCardColor(item),
                    },
                  ]}
                >
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

        <PomodoroModal
          visible={showPomodoro}
          task={selectedTask}
          onClose={() => setShowPomodoro(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 22,
  },
});
