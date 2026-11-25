import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Task } from "../types";

type Props = {
  item: Task;
  toggleDone: (id: number) => void;
};

export default function TaskItem({
  item,
  toggleDone,
}: Props) {
  return (
    <Pressable onPress={() => toggleDone(item.id)}>
      <Text
        style={[
          styles.task,
          item.done && styles.doneTask,
        ]}
      >
        {item.text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  task: {
    fontSize: 18,
    marginBottom: 10,
  },

  doneTask: {
    textDecorationLine: "line-through",
  },
});