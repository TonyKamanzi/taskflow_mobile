import { useTasks } from "@/context/TaskContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function EditTask() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { tasks, updateTask } = useTasks();

  const task = tasks.find((item) => item.id === id);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("Today");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDate(task.date);
      setPriority(task.priority);
    }
  }, [task]);

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-[#0f0f1e]">
        <Text className="text-lg text-gray-500 dark:text-gray-400">
          Task not found
        </Text>

        <Pressable
          onPress={() => router.back()}
          className="px-6 py-3 mt-5 bg-pink-500 rounded-xl"
        >
          <Text className="font-bold text-white">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const handleSave = async () => {
    if (!title.trim()) return;

    await updateTask(task.id, title, date, priority);

    router.back();
  };

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-[#0f0f1e]"
      contentContainerStyle={{
        paddingBottom: 120,
      }}
    >
      {/* Header */}
      <View className="items-center px-5 mt-12">
        <Text className="text-4xl font-bold text-black dark:text-white">
          Edit Task
        </Text>

        <Text className="mt-2 text-gray-500 dark:text-gray-400">
          Update your task
        </Text>
      </View>

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

        {/* Due date */}
        <Text className="mt-6 mb-3 text-lg font-semibold text-black dark:text-white">
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
        <Text className="mt-6 mb-3 text-lg font-semibold text-black dark:text-white">
          Priority
        </Text>

        <View className="flex-row gap-3">
          {["Low", "Medium", "High"].map((item) => (
            <Pressable
              key={item}
              onPress={() => setPriority(item as "Low" | "Medium" | "High")}
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

        {/* Save */}
        <Pressable
          onPress={handleSave}
          className={`mt-8 rounded-xl p-4 ${
            title.trim() ? "bg-pink-500" : "bg-gray-300 dark:bg-gray-700"
          }`}
          disabled={!title.trim()}
        >
          <Text className="text-lg font-bold text-center text-white">
            Save Changes
          </Text>
        </Pressable>

        {/* Cancel */}
        <Pressable
          onPress={() => router.back()}
          className="mt-3 rounded-xl bg-gray-100 p-4 dark:bg-[#1e1e2e]"
        >
          <Text className="text-lg font-semibold text-center text-gray-700 dark:text-gray-300">
            Cancel
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
