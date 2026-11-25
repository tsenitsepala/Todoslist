import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import TaskItem from "./src/components/TaskItem";
import { Task } from "./src/types";
const STORAGE_KEY = "TASKS";

export default function App() {
const [taskText, setTaskText] = useState<string>("");
const [tasks, setTasks] = useState<Task[]>([]);


const addTask = () => {
  if (taskText.trim() === "") return;

  const newTask: Task = {
    id: Date.now(),
    text: taskText,
    done: false, 
  };

  setTasks([...tasks, newTask]);
  setTaskText("");

};

const toggleDone = (id: number) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, done: !task.done }
      : task
  );

  setTasks(updatedTasks);
};

const saveTasks = async (
  taskList: Task[]
) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(taskList)
    );
  } catch (error) {
    console.log(error);
  }
};

const loadTasks = async () => {
  try {
    const data =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (data !== null) {
      setTasks(JSON.parse(data));
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

return (

  <View style={styles.container}>
      <Text style={styles.title}>
        Todo list
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={taskText}
        onChangeText={setTaskText}
      />

      <Button
        title="Save"
        onPress={addTask}
      />

    <FlatList
    data={tasks}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
    <TaskItem
    item={item}
    toggleDone={toggleDone}
    />
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },

  list: {
    marginTop: 20,
  },
});