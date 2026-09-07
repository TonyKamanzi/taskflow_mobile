import { Text, View } from "react-native";


export function HomeHeader() {
  return (
    <View className="dark:bg-[#1a1a2e] bg-gray-200 p-8 justify-center items-center border-b border-white align-center ">
      <Text className="dark:text-[#a0a0b0] text-2xl font-bold">Task Flow</Text>
    </View>
  );
}
