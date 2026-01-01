import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginScreen() {
  const { login } = useAuth();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={async (values, { setFieldError }) => {
          try {
            await login(values.email, values.password);
          } catch (e: any) {
            setFieldError("password", e.message);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange("email")}
              value={values.email}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
                onChangeText={handleChange("password")}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Signup" as never)}
            >
              <Text style={styles.link}>
                Don't you have an account? Sign Up{" "}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}
