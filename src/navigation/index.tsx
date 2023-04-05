import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import NavigationService from "../services/NavigationService";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SharedScreens from "./shared-screens";
import AppRoutes from "../utils/app-routes";
import CustomTabBar from "../components/custom/custom-tab-bar";



const Navigation = ({ initialRoute }: any) => {
    const AppStack = createNativeStackNavigator();
    return (
        <NavigationContainer ref={ref => { NavigationService.setTopLevelNavigator(ref) }} >
            <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
                <AppStack.Screen name={AppRoutes.Apps.name} component={CustomTabBar} options={{ headerShown: false }} />
                {SharedScreens}
            </AppStack.Navigator>
        </NavigationContainer >
    );
};
export default Navigation;
