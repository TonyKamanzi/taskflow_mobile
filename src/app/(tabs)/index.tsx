import { HomeHeader } from "@/components/HomeHeader";
import { DeleteTaskModal } from "@/components/DeleteTaskModal";
import { useTasks } from "@/context/TaskContext";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { tasks, loading, toggleTask, deleteTask } = useTasks();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selectedTask, setSelectedTask] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const handleLongPress = (taskId: string, taskTitle: string) => {
    setSelectedTask({
      id: taskId,
      title: taskTitle,
    });

    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;

    await deleteTask(selectedTask.id);

    setDeleteModalVisible(false);
    setSelectedTask(null);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedTask(null);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-[#0f0f1e]">
        <Text className="text-lg text-gray-500 dark:text-gray-400">
          Loading tasks...
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-gray-100 dark:bg-[#0f0f1e]"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <HomeHeader />

        <View className="px-5 pt-6">
          {/* Greeting */}
          <View className="mb-4">
            <Text className="text-3xl font-bold text-black dark:text-white">
              Good morning, Tony
            </Text>
          </View>

          {/* Progress */}
          <View className="mb-4 w-full rounded-lg bg-gray-200 p-4 dark:bg-[#1e1e2e]">
            <Text className="text-gray-600 dark:text-gray-400">
              Today's Progress:
            </Text>

            <Text className="mt-2 text-gray-600 dark:text-gray-400">
              {completedTasks}/{tasks.length} tasks completed
            </Text>
          </View>

          {/* Tasks */}
          <View className="p-4 mb-4">
            <Text className="my-2 text-xl text-black dark:text-white">
              Today's Tasks:
            </Text>

            <View className="w-full rounded-md bg-gray-200 p-4 dark:bg-[#1e1e2e]">
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
                    onLongPress={() => handleLongPress(task.id, task.title)}
                    delayLongPress={500}
                    className="flex-row items-center mb-4"
                  >
                    {/* Checkbox */}
                    <View
                      className={`mr-3 h-6 w-6 items-center justify-center rounded-md border-2 ${
                        task.completed
                          ? "border-pink-500 bg-pink-500"
                          : "border-gray-500 dark:border-gray-500"
                      }`}
                    >
                      {task.completed && (
                        <Text className="font-bold text-white">✓</Text>
                      )}
                    </View>

                    {/* Task title */}
                    <Text
                      className={`flex-1 text-lg ${
                        task.completed
                          ? "text-gray-500 line-through"
                          : "text-black dark:text-gray-300"
                      }`}
                    >
                      {task.title}
                    </Text>
                  </Pressable>
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Delete confirmation modal */}
      <DeleteTaskModal
        visible={deleteModalVisible}
        taskTitle={selectedTask?.title ?? ""}
        onCancel={handleCancelDelete}
        onDelete={handleDelete}
      />
    </>
  );
}
