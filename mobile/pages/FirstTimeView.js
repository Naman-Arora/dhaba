import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "../styles/Styles";
import logo from '../assets/truck.png';

const FirstTimeView = ({ navigation }) => {

  function clickedOwner() {
    navigation.navigate("OwnerLoginPage");
  }

  function clickedCustomer() {
    navigation.navigate('Maps');
  }

  return (
    <>
      <SafeAreaView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyles}
            source={logo}
          />
        </View>
        <View style={styles.topViewStyles}>
          <Text style={styles.welcomeStyles}>
            Welcome to Dhaba!
          </Text>
          <Text style={styles.textStyles}>
            Are you a food truck owner {"\n"} or a customer?
          </Text>
        </View>
        <TouchableOpacity
          style={styles.welcomeButtonStyles}
          onPress={clickedOwner}
        >
          <Text style={styles.welcomeButtonTextStyles}>Owner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.welcomeButtonStyles}
          onPress={clickedCustomer}
        >
          <Text style={styles.welcomeButtonTextStyles}>Customer</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default FirstTimeView;
