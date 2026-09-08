import { useRouter } from "expo-router";
import { useRef } from "react";
import { PanResponder, Pressable, Text, View } from "react-native";
import type { Task } from "@/context/TaskContext";

type SwipeableTaskProps = {
  task: Task;
  onToggle: () => void;
  onLongPress: () => void;
};

export function SwipeableTask({
  task,
  onToggle,
  onLongPress,
}: SwipeableTaskProps) {
  const router = useRouter();

  const hasSwiped = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,

      onMoveShouldSetPanResponder: (_, gestureState) => {
        const horizontalMovement = Math.abs(gestureState.dx);

        const verticalMovement = Math.abs(gestureState.dy);

        return horizontalMovement > 15 && horizontalMovement > verticalMovement;
      },

      onPanResponderGrant: () => {
        hasSwiped.current = false;
      },

      onPanResponderRelease: (_, gestureState) => {
        const swipeDistance = Math.abs(gestureState.dx);

        if (swipeDistance > 80) {
          hasSwiped.current = true;

          router.push({
            pathname: "/(tabs)/edit-task",
            params: {
              id: task.id,
            },
          });
        }
      },

      onPanResponderTerminate: () => {
        hasSwiped.current = false;
      },
    }),
  ).current;

  return (
    <View {...panResponder.panHandlers}>
      <Pressable
        onPress={() => {
          if (!hasSwiped.current) {
            onToggle();
          }
        }}
        onLongPress={onLongPress}
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
          {task.completed && <Text className="font-bold text-white">✓</Text>}
        </View>

        {/* Task title */}
        <View className="flex-1">
          <Text
            className={`text-lg ${
              task.completed
                ? "text-gray-500 line-through"
                : "text-black dark:text-gray-300"
            }`}
          >
            {task.title}
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
    </View>
  );
}
