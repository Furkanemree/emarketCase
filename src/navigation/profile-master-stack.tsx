import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppRoutes from "../utils/app-routes";
import Profile from "../screens/profile";
import SharedScreens from "./shared-screens";
import CustomHeader from "../components/custom/custom-header";


const Stack = createNativeStackNavigator();

const ProfileRoutes = AppRoutes.Profile.childs;
const ProfileMasterStack = ({ initialRoute = AppRoutes.Profile.initialRoute }) => {
    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name={ProfileRoutes.ProfilePage.name} options={{
                header: (props) => {
                    return (
                        <CustomHeader />
                    )
                },
            }} component={Profile} />
            {SharedScreens}
        </Stack.Navigator>
    );
}

export default ProfileMasterStack;