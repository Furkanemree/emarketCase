import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "../utils/app-routes";
import Basket from "../screens/basket";
import SharedScreens from "./shared-screens";
import CustomHeader from "../components/custom/custom-header";


const Stack = createNativeStackNavigator();

const BasketRoutes = AppRoutes.Basket.childs;
const BasketMasterStack = ({ initialRoute = AppRoutes.Basket.initialRoute }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name={BasketRoutes.BasketPage.name} options={{
                header: (props) => {
                    return (
                        <CustomHeader />
                    )
                },
            }} component={Basket} />
            {SharedScreens}
        </Stack.Navigator>
    );
}

export default BasketMasterStack;