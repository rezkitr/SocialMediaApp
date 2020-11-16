import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const HomeScreen = () => {
  const posts = [
    {
      id: "1",
      name: "Rezki Triandy",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eveniet, sapiente rerum eius dignissimos sunt. Voluptatem explicabo voluptate quidem dolor ratione magnam maiores, officiis aspernatur quam sed, temporibus reiciendis eveniet!",
      timestamp: 1605502408207,
      avatar: require("../../assets/avatar.jpg"),
      image: require("../../assets/smiley.png"),
    },
  ];

  const renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image source={post.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <Ionicons
              name="ios-more"
              size={24}
              color="#73788B"
              style={{ transform: [{ rotate: "90deg" }] }}
            />
          </View>

          <Text style={styles.text}>{post.text}</Text>

          <Image
            source={post.image}
            style={styles.postImage}
            resizeMode="stretch"
          />

          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="ios-heart-empty"
              size={20}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
            <Ionicons
              name="ios-chatboxes"
              size={20}
              color="#73788B"
              style={{ marginRight: 16 }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>

      <FlatList
        style={styles.feed}
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderPost(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  feed: {
    marginHorizontal: 10,
  },
  feedItem: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 14,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  text: {
    marginTop: 16,
    textAlign: "justify",
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 120,
    borderRadius: 5,
    marginTop: 12,
    marginBottom: 4,
  },
});

export default HomeScreen;
