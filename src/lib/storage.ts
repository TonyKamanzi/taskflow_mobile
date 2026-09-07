import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
  id: number;
  title: string;
  date: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

const TASKS_KEY = "@taskflow_tasks";

export async function getTasks(): Promise<Task[]> {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_KEY);

    if (!storedTasks) {
      return [];
    }

    return JSON.parse(storedTasks);
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]) {
  try {
    await AsyncStorage.setItem(
      TASKS_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}

export async function addTask(task: Task) {
  const tasks = await getTasks();

  const updatedTasks = [...tasks, task];

  await saveTasks(updatedTasks);
}

export async function updateTask(updatedTask: Task) {
  const tasks = await getTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );

  await saveTasks(updatedTasks);
}

export async function deleteTask(id: number) {
  const tasks = await getTasks();

  const updatedTasks = tasks.filter(
    (task) => task.id !== id
  );

  await saveTasks(updatedTasks);
}