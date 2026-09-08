import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Task = {
  id: string;
  title: string;
  date: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
};

type TaskContextType = {
  tasks: Task[];
  loading: boolean;

  addTask: (
    title: string,
    date: string,
    priority: "Low" | "Medium" | "High",
  ) => Promise<void>;

  updateTask: (
    id: string,
    title: string,
    date: string,
    priority: "Low" | "Medium" | "High",
  ) => Promise<void>;

  toggleTask: (id: string) => Promise<void>;

  deleteTask: (id: string) => Promise<void>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_KEY = "@taskflow_tasks";

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks when the app starts
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(TASKS_KEY);

        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to AsyncStorage
  const saveTasks = async (updatedTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  };

  // Add task
  const addTask = async (
    title: string,
    date: string,
    priority: "Low" | "Medium" | "High",
  ) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      date,
      priority,
      completed: false,
    };

    const updatedTasks = [...tasks, newTask];

    await saveTasks(updatedTasks);
  };

  // Update task
  const updateTask = async (
    id: string,
    title: string,
    date: string,
    priority: "Low" | "Medium" | "High",
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: title.trim(),
            date,
            priority,
          }
        : task,
    );

    await saveTasks(updatedTasks);
  };

  // Complete / uncomplete task
  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task,
    );

    await saveTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    await saveTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
