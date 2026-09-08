import { Modal, Pressable, Text, View } from "react-native";

type DeleteTaskModalProps = {
  visible: boolean;
  taskTitle: string;
  onCancel: () => void;
  onDelete: () => void;
};

export function DeleteTaskModal({
  visible,
  taskTitle,
  onCancel,
  onDelete,
}: DeleteTaskModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="items-center justify-center flex-1 px-6 bg-black/50">
        <View className="w-full max-w-sm rounded-3xl bg-white p-6 dark:bg-[#1e1e2e]">
          {/* Icon */}
          <View className="items-center justify-center mb-4 bg-red-100 rounded-full h-14 w-14 dark:bg-red-500/20">
            <Text className="text-2xl">🗑️</Text>
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-black dark:text-white">
            Delete Task?
          </Text>

          {/* Message */}
          <Text className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this task?
          </Text>

          {/* Task name */}
          <View className="mt-4 rounded-xl bg-gray-100 p-4 dark:bg-[#2a2a3d]">
            <Text
              numberOfLines={2}
              className="font-semibold text-black dark:text-white"
            >
              {taskTitle}
            </Text>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-3 mt-6">
            <Pressable
              onPress={onCancel}
              className="flex-1 rounded-xl bg-gray-200 p-4 dark:bg-[#2a2a3d]"
            >
              <Text className="font-bold text-center text-gray-700 dark:text-gray-200">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={onDelete}
              className="flex-1 p-4 bg-red-500 rounded-xl"
            >
              <Text className="font-bold text-center text-white">Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
