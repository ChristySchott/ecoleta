import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import Points from "./pages/Points";
import Detail from "./pages/Detail";

const AppSatck = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppSatck.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#f0f0f5",
          },
        }}
      >
        <AppSatck.Screen name="Home" component={Home} />
        <AppSatck.Screen name="Points" component={Points} />
        <AppSatck.Screen name="Detail" component={Detail} />
      </AppSatck.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
