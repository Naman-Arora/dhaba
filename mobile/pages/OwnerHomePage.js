import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import storage from "../storage/Storage";

import styles from "../styles/Styles";

const OwnerHomePage = () => {
  const [truckName, setTruckName] = useState("");
  const [description, setDescription] = useState("");
  const [loc, setLoc] = useState({
    longitude: 0,
    latitude: 0,
  });

  async function setLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission to grant location was denied.",
        "Please go into the settings and allow location permissions.",
        [
          {
            text: "Okay",
          },
        ]
      );
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    Alert.alert(
      "Location Updated!",
      "Tap the update server button in order to push the changes onto the server.",
      [{ text: "Okay" }]
    );

    setLoc({
      latitude: location["coords"]["latitude"],
      longitude: location["coords"]["longitude"],
    });
  }

  async function updateServer() {
    const newObject = {
      newName: truckName,
      newDescription: description,
      newLocation: {
        lat: loc.latitude,
        lng: loc.longitude,
      },
    };
    const res = await fetch("https://hacktx-api.onrender.com/owner/update", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObject),
    });
    if (res.status === 200) {
      Alert.alert("Post was successful", "", [{ text: "Okay" }]);
    } else {
      Alert.alert("Post was unsuccessful", "", [
        { text: "Cancel" },
        { text: "Try Again", onPress: updateServer },
      ]);
    }
  }

  useEffect(() => {
    storage
      .load({ key: "cookie" })
      .then((ret) => {
        console.log("After loading from storage: " + ret);
        fetch("https://hacktx-api.onrender.com/owner/getCurrent", {
          method: "GET",
          mode: "cors",
          //cache: "no-cache",
          headers: {
            //"cookie": ret,
            "Content-Type": "application/json",
            // "Cookie": ret,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            setTruckName(res["name"]);
            setDescription(res["description"]);
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => {
        console.warn(err.message);
      });
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.headerStyles}>Food Truck Name</Text>
      <TextInput
        style={styles.textInputStyles}
        value={truckName}
        onChangeText={(t) => setTruckName(t)}
      />

      <Text style={styles.headerStyles}>Location</Text>
      <TextInput style={styles.textInputStyles} value={""} />

      <Text style={styles.headerStyles}>Description</Text>
      <TextInput
        style={styles.textInputStyles}
        value={description}
        onChangeText={(t) => setDescription(t)}
      />

      <TouchableOpacity style={styles.buttonStyles} onPress={setLocation}>
        <Text style={styles.buttonTextStyles}>Update Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyles} onPress={updateServer}>
        <Text style={styles.buttonTextStyles}>Update Server</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OwnerHomePage;
