import { HomeHeader } from "@/components/HomeHeader";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish project proposal", completed: false },
    { id: 2, title: "Attend team meeting", completed: false },
    { id: 3, title: "Review code changes", completed: false },
    { id: 4, title: "Submit weekly report", completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <ScrollView className="flex-1 bg-[#0f0f1e]">
      <HomeHeader />

      <View className="px-5 pt-6">
        {/* Greeting */}
        <View className="mb-4">
          <Text className="text-3xl font-bold text-white">
            Good morning, Tony
          </Text>
        </View>

        {/* Progress */}
        <View className="mb-4 w-full rounded-lg bg-[#1e1e2e] p-4">
          <Text className="text-gray-400">Today's Progress:</Text>

          <Text className="mt-2 text-gray-400">
            {completedTasks}/{tasks.length} tasks completed
          </Text>
        </View>

        {/* Tasks */}
        <View className="mb-4 p-4">
          <Text className="my-2 text-xl text-white">Today's Tasks:</Text>

          <View className="w-full rounded-lg bg-[#1e1e2e] p-4">
            {tasks.map((task) => (
              <Pressable
                key={task.id}
                onPress={() => toggleTask(task.id)}
                className="mb-4 flex-row items-center"
              >
                {/* Checkbox */}
                <View
                  className={`mr-3 h-6 w-6 items-center justify-center rounded-md border-2 ${
                    task.completed
                      ? "border-pink-500 bg-pink-500"
                      : "border-gray-500"
                  }`}
                >
                  {task.completed && (
                    <Text className="font-bold text-white">✓</Text>
                  )}
                </View>

                {/* Task text */}
                <Text
                  className={`flex-1 text-lg ${
                    task.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-300"
                  }`}
                >
                  {task.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
