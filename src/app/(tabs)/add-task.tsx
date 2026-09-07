import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("Today");
  const [priority, setPriority] = useState("Medium");

  const handleAddTask = () => {
    if (!title.trim()) {
      return;
    }

    console.log({
      title,
      date,
      priority,
    });

    setTitle("");
    setDate("Today");
    setPriority("Medium");
  };

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-[#0f0f1e]"
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header */}
      <View className="mt-12 items-center">
        <Text className="text-4xl font-bold text-black dark:text-white">
          Add Task
        </Text>

        <Text className="mt-2 text-gray-500 dark:text-gray-400">
          Create a new task
        </Text>
      </View>

      {/* Form */}
      <View className="px-5 pt-8">
        {/* Task title */}
        <Text className="mb-2 text-lg font-semibold text-black dark:text-white">
          Task Title
        </Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter task title"
          placeholderTextColor="#888"
          className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-4 text-black dark:border-gray-700 dark:bg-[#1e1e2e] dark:text-white"
        />

        {/* Date */}
        <Text className="mb-3 mt-6 text-lg font-semibold text-black dark:text-white">
          Due Date
        </Text>

        <View className="flex-row gap-3">
          {["Today", "Tomorrow"].map((item) => (
            <Pressable
              key={item}
              onPress={() => setDate(item)}
              className={`flex-1 rounded-xl p-4 ${
                date === item ? "bg-pink-500" : "bg-gray-100 dark:bg-[#1e1e2e]"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  date === item
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Priority */}
        <Text className="mb-3 mt-6 text-lg font-semibold text-black dark:text-white">
          Priority
        </Text>

        <View className="flex-row gap-3">
          {["Low", "Medium", "High"].map((item) => (
            <Pressable
              key={item}
              onPress={() => setPriority(item)}
              className={`flex-1 rounded-xl p-4 ${
                priority === item
                  ? "bg-pink-500"
                  : "bg-gray-100 dark:bg-[#1e1e2e]"
              }`}
            >
              <Text
                className={`text-center font-semibold ${
                  priority === item
                    ? "text-white"
                    : item === "High"
                      ? "text-red-500"
                      : item === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                }`}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Add button */}
        <Pressable
          onPress={handleAddTask}
          className="mt-8 rounded-xl bg-pink-500 p-4"
        >
          <Text className="text-center text-lg font-bold text-white">
            Add Task
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
