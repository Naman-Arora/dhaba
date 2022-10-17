import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import storage from "../storage/Storage";

import styles from "../styles/Styles";

const OwnerAccountPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [data, setData] = useState([]);
  //   const [userNameOkay, setUserNameOkay] = useState(true);/
  //   const [passwordOkay, setPasswordOkay] = useState(true);

  function Login() {
    let newAccountData = { username: email, password: password };

    fetch(`https://hacktx-api.onrender.com/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAccountData),
    })
      .then((res) => {
        let setCookie = res["headers"]["map"]["set-cookie"];
        setCookie = setCookie.replace("; Path=/", "");
        if (res.status === 200) {
          storage.save({
            key: "cookie",
            data: setCookie,
            expires: null,
          });
          navigation.navigate("OwnerHomePage");
        } else if (res.status === 404) {
          Alert.alert("Username or password was wrong.", "Please try again.", [
            { text: "Okay" },
          ]);
        } else {
          Alert.alert(
            "Something went wrong.",
            "Please try again, or the application might be down.",
            [{ text: "Okay" }]
          );
        }
      })
      .catch((err) => console.warn(err.message));
  }

  const localStyles = StyleSheet.create({
    textInputStyles: {
      borderWidth: 1,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 25,
      borderRadius: 10,
      height: 50,
      // borderColor: okay ? "black" : "red",
    },
  });

  return (
    <>
      <SafeAreaView>
        <Text style={styles.headerStyles}>{"\n\n"}Sign in to your account</Text>
        <TextInput
          style={localStyles.textInputStyles}
          placeholder="Username"
          value={email}
          onChangeText={(t) => setEmail(t)}
        />
        <TextInput
          style={localStyles.textInputStyles}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(t) => setPassword(t)}
        />
        <TouchableOpacity style={styles.buttonStyles} onPress={Login}>
          <Text style={styles.buttonTextStyles}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.ownerLoginPageLine} />
        <Text style={styles.textStyles}>Don&apos;t have an account?</Text>
        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.buttonTextStyles}>Sign up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};
export default OwnerAccountPage;
