import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "nativewind";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "@taskflow_theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();

  const [ready, setReady] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_KEY);

        if (savedTheme === "dark") {
          setColorScheme("dark");
          setIsDarkMode(true);
        } else if (savedTheme === "light") {
          setColorScheme("light");
          setIsDarkMode(false);
        } else {
          setIsDarkMode(colorScheme === "dark");
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      } finally {
        setReady(true);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    setIsDarkMode(colorScheme === "dark");
  }, [colorScheme]);

  const toggleDarkMode = async () => {
    const newTheme = isDarkMode ? "light" : "dark";

    // Change NativeWind
    setColorScheme(newTheme);

    // Update our context state
    setIsDarkMode(newTheme === "dark");

    // Save preference
    try {
      await AsyncStorage.setItem(THEME_KEY, newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  if (!ready) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
