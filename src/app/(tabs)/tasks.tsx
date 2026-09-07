import { Pressable, ScrollView, Text, View } from "react-native";
import { useTasks } from "@/context/TaskContext";

export default function Tasks() {
  const { tasks, loading, toggleTask } = useTasks();

  const completedTasks = tasks.filter((task) => task.completed).length;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-[#0f0f1e]">
        <Text className="text-lg text-gray-500 dark:text-gray-400">
          Loading tasks...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-[#0f0f1e]"
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* Header */}
      <View className="mt-12 items-center">
        <Text className="text-4xl font-bold text-black dark:text-white">
          Tasks
        </Text>

        <Text className="mt-2 text-gray-500 dark:text-gray-400">
          Manage your daily tasks
        </Text>
      </View>

      {/* Statistics */}
      <View className="mx-5 mt-8 flex-row justify-between">
        <View className="flex-1 rounded-2xl bg-gray-100 p-4 dark:bg-[#1e1e2e]">
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Total Tasks
          </Text>

          <Text className="mt-2 text-2xl font-bold text-black dark:text-white">
            {tasks.length}
          </Text>
        </View>

        <View className="ml-4 flex-1 rounded-2xl bg-gray-100 p-4 dark:bg-[#1e1e2e]">
          <Text className="text-sm text-gray-500 dark:text-gray-400">
            Completed
          </Text>

          <Text className="mt-2 text-2xl font-bold text-pink-500">
            {completedTasks}
          </Text>
        </View>
      </View>

      {/* Today's Tasks */}
      <View className="px-5 pt-8">
        <Text className="mb-4 text-xl font-bold text-black dark:text-white">
          Today's Tasks
        </Text>

        <View className="rounded-2xl bg-gray-100 p-4 dark:bg-[#1e1e2e]">
          {tasks.length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-lg text-gray-500 dark:text-gray-400">
                No tasks yet
              </Text>

              <Text className="mt-2 text-sm text-gray-400">
                Add your first task to get started
              </Text>
            </View>
          ) : (
            tasks.map((task) => (
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
                      : "border-gray-400 dark:border-gray-500"
                  }`}
                >
                  {task.completed && (
                    <Text className="font-bold text-white">✓</Text>
                  )}
                </View>

                {/* Task */}
                <View className="flex-1">
                  <Text
                    className={`text-lg ${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-black dark:text-gray-200"
                    }`}
                  >
                    {task.title}
                  </Text>

                  <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {task.date}
                  </Text>
                </View>

                {/* Priority */}
                <Text
                  className={`text-sm font-semibold ${
                    task.priority === "High"
                      ? "text-red-500"
                      : task.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {task.priority}
                </Text>
              </Pressable>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
