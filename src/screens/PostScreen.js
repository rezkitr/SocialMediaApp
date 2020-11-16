import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../../Fire";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import avatar from "../../assets/avatar.jpg";

const firebase = require("firebase");
require("firebase/firestore");

const ProfileScreen = ({ navigation }) => {
  LogBox.ignoreLogs(["Setting a timer"]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPhotoPermissions();
  }, []);

  const getPhotoPermissions = async () => {
    if (Constants.platform.ios || Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert("We need permissions to access to your camera");
      }
    }
  };

  const onPost = () => {
    setLoading(true);
    Fire.shared
      .addPost({ text: text, localUri: image })
      .then((ref) => {
        setText("");
        setImage(null);
        setLoading(false);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Yeayy!",
          text2: "Take a look to your post",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 10,
        });
        navigation.navigate("Home");
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          position: "top",
          text1: "Failed to post",
          text2: "Sorry something went wrong",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 10,
        });
        setLoading(false);
        console.log(err);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#16a085" />
        </View>
      ) : (
        <>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Ionicons name="md-arrow-back" size={24} color="#D8D9DB" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPost}>
              <Text style={{ fontWeight: "bold" }}>Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Image source={avatar} style={styles.avatar} />
            <TextInput
              autoFocus
              multiline
              numberOfLines={4}
              style={{ flex: 1 }}
              placeholder="Want to share something"
              value={text}
              onChangeText={setText}
            />
          </View>

          <TouchableOpacity style={styles.photo} onPress={pickImage}>
            <Ionicons name="md-camera" size={32} color="#D8D9DB" />
          </TouchableOpacity>

          <View style={{ marginHorizontal: 32, marginTop: 32, height: 180 }}>
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%", resizeMode: "stretch" }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});

export default ProfileScreen;
