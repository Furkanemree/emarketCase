import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "../utils/app-routes";
import Favorite from "../screens/favorite";
import SharedScreens from "./shared-screens";
import CustomHeader from "../components/custom/custom-header";


const Stack = createNativeStackNavigator();

const FavoriteRoutes = AppRoutes.Favorite.childs;
const FavoriteMasterStack = ({ initialRoute = AppRoutes.Favorite.initialRoute }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name={FavoriteRoutes.FavoritePage.name} options={{
                header: (props) => {
                    return (
                        <CustomHeader />
                    )
                },
            }} component={Favorite} />
            {SharedScreens}
        </Stack.Navigator>
    );
}

export default FavoriteMasterStack;