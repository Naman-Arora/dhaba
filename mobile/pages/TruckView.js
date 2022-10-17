import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View } from "react-native";

import styles from "../styles/Styles";

const TruckView = (truckName) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    const tn = truckName["route"]["params"].replace(" ", "%20");
    fetch(`https://hacktx-api.onrender.com/customer/getOne/${tn}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setName(res[0]["name"]);
        setDescription(res[0]["description"]);
        setFoodItems(res[0]["menu"][0]["items"]);
      })
      .catch((err) => console.warn(err));
  }, []);

  const menuItems = foodItems.map((item, index) => (
    <View key={index} style={styles.menuStyles}>
      <Text style={{fontSize: 17.5, fontStyle: "italic", textAlign: "left"}}>{item.name}</Text>
      <Text style={{fontSize: 17.5, fontStyle: "italic", textAlign: "right"}}>
        ${item.price}
      </Text>
    </View>
  ));
  return (
    <>
      <SafeAreaView>
        <Text style={styles.menuHeaderStyles}>{name}</Text>
        <Text style={styles.descriptionStyles}>{description}</Text>
        <View style={styles.ownerLoginPageLine} />
        {menuItems}
      </SafeAreaView>
    </>
  );
};

export default TruckView;
