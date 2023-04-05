import React from 'react';
import { Platform, StyleSheet, } from 'react-native';
import useTheme from '../../../utils/redux-selectors/use-theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home2, Notepad2, Profile, ShoppingBag, Star1 } from "iconsax-react-native";
import AppRoutes from '../../../utils/app-routes';
import HomeMasterStack from '../../../navigation/home-master-stack';
import ProfileMasterStack from '../../../navigation/profile-master-stack';
import FavoriteMasterStack from '../../../navigation/favorite-master-stack';
import BasketMasterStack from '../../../navigation/basket-master-stack';
import { useSelector } from 'react-redux';
import CustomText from '../custom-text';
import CustomView from '../custom-view';

const CustomTabBar = () => {
    const theme: any = useTheme()
    const Tab = createBottomTabNavigator()
    const count = useSelector((x: any) => x.basket.count)

    return (

        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.White,
                    borderTopWidth: 0,
                    height: 65,
                    ...Platform.select({
                        ios: {
                            shadowColor: theme.ShadowColorIOS,
                            shadowOffset: {
                                width: -1,
                                height: 1,
                            },
                            shadowOpacity: 0.12,
                            shadowRadius: 2.20,

                            elevation: 2,
                        },
                        android: {
                            shadowColor: theme.ShadowColorAndroid,
                            elevation: 9,

                        },
                    })
                },
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: theme.PrimaryColor,
                tabBarInactiveTintColor: theme.DarkGray,
            }}>
            <Tab.Screen
                name={AppRoutes.Home.name}
                component={HomeMasterStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <>
                            <Home2 size={30} color={color} variant={focused ? "Bold" : "Outline"} />
                        </>
                    ),
                }}
            />
            <Tab.Screen
                name={AppRoutes.Basket.name}
                component={BasketMasterStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <CustomView justifyCenter alignCenter>
                            {count > 0 && <CustomView noFlex justifyCenter alignCenter color='red' style={{ height: 15, width: 15, borderRadius: 8, position: 'absolute', top: 10, right: -3, zIndex: 999 }}>
                                <CustomText image bold white>{count}</CustomText>
                            </CustomView>}
                            <ShoppingBag size={30} color={color} variant={focused ? "Bold" : "Outline"} />
                        </CustomView>
                    ),
                }}
            />
            <Tab.Screen
                name={AppRoutes.Favorite.name}
                component={FavoriteMasterStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Star1 size={30} color={color} variant={focused ? "Bold" : "Outline"} />
                    ),
                }}
            />
            <Tab.Screen
                name={AppRoutes.Profile.name}
                component={ProfileMasterStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <>
                            <Profile size={30} color={color} variant={focused ? "Bold" : "Outline"} />
                        </>
                    ),
                }}
            />
        </Tab.Navigator>

    );
};
export default CustomTabBar
const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 0,
        overflow: 'hidden'

    },
});