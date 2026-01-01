import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "users";
const CURRENT_USER_KEY = "current_user";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (data) setUser(JSON.parse(data));
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const storedUsers = await AsyncStorage.getItem(USERS_KEY);
    if (!storedUsers) throw new Error("No users found");

    const users = JSON.parse(storedUsers);
    const user = users.find(
      (user: User) => user.email === email && user.password === password
    );

    if (!user) throw new Error("Invalid email or password");

    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    setUser(user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const storedUsers = await AsyncStorage.getItem(USERS_KEY);
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.find((user: User) => user.email === email);
    if (userExists) throw new Error("User already exists");

    const newUser = { name, email, password };
    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  //Check context is properly initialized before use.
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
