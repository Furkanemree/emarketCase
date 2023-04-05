import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react"
import AppRoutes from "../utils/app-routes";
import Filter from "../screens/home/filter";

const Stack = createNativeStackNavigator();
const SharedScreens = [
    <Stack.Screen key="ss1" name={AppRoutes.SharedScreens.Filter.name} options={{ presentation: 'modal', headerShown: false }} component={Filter} />,

]

export default SharedScreens;
