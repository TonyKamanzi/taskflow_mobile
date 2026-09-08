import { DeleteTaskModal } from "@/components/DeleteTaskModal";
import { useTasks } from "@/context/TaskContext";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Tasks() {
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
      <View className="flex-1 items-center justify-center bg-white dark:bg-[#0f0f1e]">
        <Text className="text-lg text-gray-500 dark:text-gray-400">
          Loading tasks...
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-white dark:bg-[#0f0f1e]"
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* Header */}
        <View className="items-center mt-12">
          <Text className="text-4xl font-bold text-black dark:text-white">
            Tasks
          </Text>

          <Text className="mt-2 text-gray-500 dark:text-gray-400">
            Manage your daily tasks
          </Text>
        </View>

        {/* Statistics */}
        <View className="flex-row justify-between mx-5 mt-8">
          {/* Total Tasks */}
          <View className="flex-1 rounded-2xl bg-gray-100 p-4 dark:bg-[#1e1e2e]">
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Total Tasks
            </Text>

            <Text className="mt-2 text-2xl font-bold text-black dark:text-white">
              {tasks.length}
            </Text>
          </View>

          {/* Completed */}
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
                  onLongPress={() => handleLongPress(task.id, task.title)}
                  delayLongPress={500}
                  className="flex-row items-center mb-4"
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

                  {/* Task information */}
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
