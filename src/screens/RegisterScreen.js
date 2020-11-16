import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  Image,
  ScrollView,
} from "react-native";
import * as firebase from "firebase";

import registerImage from "../../assets/coffee.png";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  });

  const onRegister = () => {
    console.log("Register >>");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: name,
        });
      })
      .catch((error) => setErrorMsg(error.message));
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Image source={registerImage} style={styles.image} />

        <Text style={styles.greeting}>
          Hello again{" "}
          <Text style={{ fontWeight: "bold" }}>
            {"\nSign up to get started."}
          </Text>
        </Text>

        <View style={styles.errorMsg}>
          {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Full Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={setName}
                value={name}
              />
            </View>
            <View style={{ marginTop: 28 }}>
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

          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", marginTop: 28 }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "#414959", fontSize: 13 }}>
              Already have account?{" "}
              <Text style={{ fontWeight: "bold", color: "#E9446A" }}>
                Sign in
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  greeting: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "400",
    position: "absolute",
    left: 30,
    top: 160,
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
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "stretch",
    width: "90%",
    height: 230,
    alignSelf: "center",
    position: "relative",
    right: -110,
    transform: [{ rotateY: "180deg" }],
  },
});

export default RegisterScreen;
