import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user?.name}</Text>
      <Text>Name: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
