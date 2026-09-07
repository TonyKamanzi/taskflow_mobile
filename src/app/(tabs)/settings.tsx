import { useTheme } from "@/context/ThemeContext";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <ScrollView
      className="flex-1 bg-gray-100 dark:bg-[#0f0f1e]"
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <View className="px-5 pt-16">
        {/* Header */}
        <Text className="text-4xl font-bold text-black dark:text-white">
          Settings
        </Text>

        <Text className="mt-2 text-gray-500 dark:text-gray-400">
          Manage your TaskFlow preferences
        </Text>

        {/* Appearance */}
        <View className="mt-8 rounded-2xl bg-white p-5 dark:bg-[#1e1e2e]">
          <Text className="mb-5 text-xl font-bold text-black dark:text-white">
            Appearance
          </Text>

          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold text-black dark:text-white">
                Dark Mode
              </Text>

              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {isDarkMode
                  ? "Dark theme is enabled"
                  : "Light theme is enabled"}
              </Text>
            </View>

            <Pressable
              onPress={toggleDarkMode}
              className={`h-8 w-14 justify-center rounded-full p-1 ${
                isDarkMode ? "bg-pink-500" : "bg-gray-300"
              }`}
            >
              <View
                className={`h-6 w-6 rounded-full bg-white ${
                  isDarkMode ? "ml-6" : "ml-0"
                }`}
              />
            </Pressable>
          </View>
        </View>

        {/* Theme status - temporary debugging */}
        <View className="mt-5 rounded-2xl bg-white p-5 dark:bg-[#1e1e2e]">
          <Text className="text-black dark:text-white">
            Current theme: {isDarkMode ? "Dark" : "Light"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
