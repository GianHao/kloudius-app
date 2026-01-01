import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#F9FAFB",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: "#4F46E5",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
    fontWeight: "500",
  },
  error: {
    color: "#DC2626",
    fontSize: 13,
    marginBottom: 6,
  },
  homeText: {
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center",
  },
});
