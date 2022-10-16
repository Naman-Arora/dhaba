import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstTimeView from "./pages/FirstTimeView";
import OwnerLoginPage from "./pages/OwnerLoginPage";
import CreateAccount from "./pages/CreateAccount";
import Maps from "./pages/Maps";
import List from "./pages/List";
import OwnerHomePage from "./pages/OwnerHomePage";
import TruckView from "./pages/TruckView";
// import Tabs from "./components/Menu"

const Stack = createNativeStackNavigator();

const App = () => {
  let initialRoute = "FirstTimeView";

  return (
    <>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="FirstTimeView"
              component={FirstTimeView}
              options={{ title: "Welcome" }}
            />
            <Stack.Screen
              name="OwnerLoginPage"
              component={OwnerLoginPage}
              options={{ title: "Sign In" }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{ title: "Sign Up" }}
            />
            <Stack.Screen
              name="Maps"
              component={Maps}
              options={{ title: "Search for Trucks" }}
            />
            <Stack.Screen
              name="List"
              component={List}
              options={{ title: "List" }}
            />
            <Stack.Screen
              name="OwnerHomePage"
              component={OwnerHomePage}
              options={{ title: "Owner Home Page" }}
            />
            <Stack.Screen
              name="TruckView"
              component={TruckView}
              options={{ title: "TruckView" }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
