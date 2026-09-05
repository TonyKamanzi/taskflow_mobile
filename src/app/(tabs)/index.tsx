import { Platform, Text, ScrollView } from 'react-native';
import * as Device from 'expo-device';
import { HomeHeader } from '@/components/HomeHeader';

export default function HomeScreen() {
  return (
    <ScrollView>
      <HomeHeader></HomeHeader>
      <Text>Welcome to Macrozone!</Text>
      <Text>Running on: {Platform.OS}</Text>
      <Text>Device Model: {Device.modelName}</Text>
      <Text>Device Brand: {Device.brand}</Text>
      <Text>OS Version: {Device.osVersion}</Text>
    </ScrollView>
  );
}