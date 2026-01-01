import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignupScreen() {
  const { signup } = useAuth();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          await signup(values.name, values.email, values.password);
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <TextInput
              placeholder="Name"
              style={styles.input}
              onChangeText={handleChange("name")}
              value={values.name}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              placeholder="Email"
              style={styles.input}
              autoCapitalize="none"
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
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
}
