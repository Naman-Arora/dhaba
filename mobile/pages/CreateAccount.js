// user name: test
// password: testAccount

import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import storage from "../storage/Storage";

import styles from "../styles/Styles";

const CreateAccount = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let validUserName = true;

  async function makeAccount() {
    if (!validUserName) {
      Alert.alert("Your username cannot have any spaces.", "", [
        {
          text: "OK",
        },
      ]);
    } else if (password.length < 8) {
      Alert.alert("Passwords do not match.", "", [
        {
          text: "OK",
        },
      ]);
    } else if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.", "", [
        {
          text: "OK",
        },
      ]);
    } else {
      // send request to server: with email and password
      let newAccountData = { username: userName, password: password };
      const res = await fetch(`https://hacktx-api.onrender.com/signup`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccountData),
      });
      if (res.status === 409) {
        Alert.alert("This username was already taken.", "", [{ text: "Okay" }]);
      } else if (res.status === 200) {
        console.log("here in res status 200");
        Alert.alert("Account Created!", "Logging in now.", [
          { text: "Okay", onPress: Login },
        ]);
      } else {
        Alert.alert(
          "There was an error.",
          "Please try again later, or the application might be down",
          [
            {
              text: "Okay",
            },
          ]
        );
      }
    }
  }

  if (userName.split(" ").length > 1) {
    validUserName = false;
  } else {
    validUserName = true;
  }

  function Login() {
    let newAccountData = { username: userName, password: password };

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

  return (
    <>
      <SafeAreaView>
        <Text style={styles.headerStyles}>Create an account</Text>
        <TextInput
          style={styles.textInputStyles}
          placeholder="Username"
          value={userName}
          onChangeText={(t) => setUserName(t)}
        />
        <TextInput
          style={styles.textInputStyles}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(t) => setPassword(t)}
        />
        <TextInput
          style={styles.textInputStyles}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(t) => setConfirmPassword(t)}
        />
        <TouchableOpacity style={styles.buttonStyles} onPress={makeAccount}>
          <Text style={styles.buttonTextStyles}>Sign Up</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};
export default CreateAccount;
