import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "../utils/app-routes";
import Home from "../screens/home";
import HomeDetail from "../screens/home/detail";
import SharedScreens from "./shared-screens";
import CustomHeader from "../components/custom/custom-header";
import CustomDetailHeader from "../components/custom/custom-header/detail";



const Stack = createNativeStackNavigator();

const HomeRoutes = AppRoutes.Home.childs;
const HomeMasterStack = ({ initialRoute = AppRoutes.Home.initialRoute }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name={HomeRoutes.HomePage.name} options={{
                header: (props) => {
                    return (
                        <CustomHeader />
                    )
                },
            }} component={Home} />
            <Stack.Screen name={HomeRoutes.HomeDetail.name} options={{
                header: (props) => {
                    return (
                        <CustomDetailHeader title={props?.route?.params?.detail?.name} />
                    )
                },
            }} component={HomeDetail} />
            {SharedScreens}
        </Stack.Navigator>
    );
}

export default HomeMasterStack;