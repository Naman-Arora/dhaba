import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";


import { StyleSheet, View, Dimensions, Image, Alert } from "react-native";
import * as Location from "expo-location";

import BottomSheet from "reanimated-bottom-sheet";
// import Animated from "react-native-reanimated";
import styles from "../styles/Styles";
import List from "./List";
import logo from "../assets/truck.png";

export default function Maps() {
  const [region, setRegion] = useState({
    latitude: 30.2849,
    longitude: -97.7341,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied.", "", [
          { text: "Okay" },
        ]);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: location["coords"]["latitude"],
        longitude: location["coords"]["longitude"],
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      });
    })();
    fetch("https://hacktx-api.onrender.com/customer/getAll", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.warn(err.message));
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 20,
        height: 1250,
      }}
    >
      <List navigation />
    </View>
  );

  const sheetRef = React.useRef(null);
  const markers = data.map((item, index) => (
    <Marker
      key={index}
      coordinate={{
        latitude: item["location"]["lat"],
        longitude: item["location"]["lng"],
      }}
      title={item["name"]}
      description={item["description"]}
      pinColor="black"
    />
  ));

  return (
    <View style={mapStyles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={["87.5%", "17.5%"]}
        renderHeader={renderHeader}
        renderContent={renderContent}
        initialSnap={1}
      />
      <MapView
        style={mapStyles.map}
        region={region}
        onRegionChange={(r) => setRegion(r)}
      >
        {markers}
      </MapView>
      <View style={styles.mapBoxStyles}>
        <Image style={styles.mapImageStyles} source={logo} />
      </View>
    </View>
  );
}

const mapStyles = StyleSheet.create({
  container: {
    flex: true,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
