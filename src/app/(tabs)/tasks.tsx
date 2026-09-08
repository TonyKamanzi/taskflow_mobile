import { DeleteTaskModal } from "@/components/DeleteTaskModal";
import { SwipeableTask } from "@/components/SwipeableTask";
import { useTasks } from "@/context/TaskContext";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

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
          {/* Total */}
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
                <SwipeableTask
                  key={task.id}
                  task={task}
                  onToggle={() => toggleTask(task.id)}
                  onLongPress={() => handleLongPress(task.id, task.title)}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>

      <DeleteTaskModal
        visible={deleteModalVisible}
        taskTitle={selectedTask?.title ?? ""}
        onCancel={handleCancelDelete}
        onDelete={handleDelete}
      />
    </>
  );
}
