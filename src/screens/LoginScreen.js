import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  LayoutAnimation,
  Image,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import * as firebase from "firebase";

import loginImage from "../../assets/happy.png";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const onLogin = () => {
    console.log("Login User >>");
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((ref) => setLoading(false))
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error.message);
      });
  };

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Image source={loginImage} style={styles.image} />

          <Text style={styles.greeting}>
            Hello again{" "}
            <Text style={{ fontWeight: "bold" }}>{"\nWelcome Back."}</Text>
          </Text>

          <View style={styles.errorMsg}>
            {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <View style={styles.form}>
              <View>
                <Text style={styles.inputTitle}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                />
              </View>
              <View style={{ marginTop: 28 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={setPassword}
                  value={password}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: loading ? "#95a5a6" : "#E9446A" },
              ]}
              onPress={onLogin}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Sign in
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignSelf: "center", marginTop: 28 }}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={{ color: "#414959", fontSize: 13 }}>
                Don't have account?{" "}
                <Text style={{ fontWeight: "bold", color: "#E9446A" }}>
                  Sign up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 10,
  },
  greeting: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "400",
    position: "absolute",
    right: 30,
    top: 180,
  },
  errorMsg: {
    height: 60,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 12,
    fontWeight: "bold",
  },
  form: {
    marginBottom: 28,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,

    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "stretch",
    width: "100%",
    height: 240,
    alignSelf: "center",
    position: "relative",
    left: -120,
  },
});

export default LoginScreen;
