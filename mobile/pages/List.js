import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function List() {
  const listStyles = StyleSheet.create({
    opacityStyle: {
      padding: 25,
      marginHorizontal: 10,
      marginVertical: 10,
      height: 150,
      borderRadius: 50,
      backgroundColor: "black",
      shadowOpacity: 100,
      shadowRadius: 2.5,
      shadowOffset: { width: 0, height: 0 },
    },
    titleStyle: {
      alignSelf: "center",
      fontSize: 25,
      fontWeight: "600",
      marginBottom: 10,
      color: "white",
    },
    titleDescription: {
      fontSize: 15,
      fontWeight: "400",
      color: "white",
      alignSelf: "center",
    },
  });
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("https://hacktx-api.onrender.com/customer/getAll", { method: "GET" })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.warn(err.message));
  }, []);

  const items = data.map((item) => (
    <>
      <TouchableOpacity
        key={Math.random() * 100000000000}
        style={listStyles.opacityStyle}
        onPress={() => navigation.navigate("TruckView", item["name"])}
      >
        <Text style={listStyles.titleStyle}>{item["name"]}</Text>
        <Text style={listStyles.titleDescription}>{item["description"]}</Text>
      </TouchableOpacity>
    </>
  ));
  return <View>{items}</View>;
}
