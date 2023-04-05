import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { View, SafeAreaView, } from "react-native"
import LoadingFullScreen from "../components/custom/loading/full-screen-loading"
import Navigation from "../navigation";
import Loading from "../components/custom/loading";
import { Actions as ApiCallActions } from "../redux/api-call/reducers";
import { Actions as MarketActions } from "../redux/market/reducers";
import AppRoutes from "../utils/app-routes";
import { useFonts, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold, Montserrat_300Light } from '@expo-google-fonts/montserrat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import general from "../utils/general";
import { Actions as ThemeActions } from "../redux/theme/reducers";
import { createStyles } from "../utils/style-generator";
import AlertRenderer from "../components/base/alert-renderer/alertRenderer";
import { Actions as BasketActions } from "../redux/basket/reducers";

type Props = {
    [key: string]: any;
};

const Root = ({ }) => {
    const dispatch = useDispatch();
    const themeReducer = useSelector((state: any) => state.theme);
    const [state, setState] = useState({
        loadData: true,
        appColorSchemeLoading: true,
        initialRoute: AppRoutes.Apps.name,
    });

    const [fontsLoaded] = useFonts({ Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold, Montserrat_800ExtraBold });



    const loadData = async ({ onSuccess }: Props) => {
        dispatch(ApiCallActions.NativeGet({
            controller: "products",
            action: null,
            showAlertOnError: true,
            showLoading: true,
            onSuccess: async ({ data }: any) => {
                let basket = JSON.parse(await AsyncStorage.getItem("basket"))
                let favorite = JSON.parse(await AsyncStorage.getItem("favorite"))
                data?.map((item: any) => {
                    if (favorite?.find((favoriteItem: any) => favoriteItem.id === item.id)) {
                        item.isFavorite = true
                    } else {
                        item.isFavorite = false
                    }
                })
                dispatch(BasketActions.setBasketState({
                    count: basket.length
                }));
                dispatch(MarketActions.setMarketState({
                    list: data
                }));
                onSuccess({});
            },
            onError: (x: any) => {
                console.log(x)
            },
        }))

    }

    const loadColorScheme = async ({ onSuccess }) => {
        const schemeStorage = await AsyncStorage.getItem("colorScheme");
        let scheme = "light";
        if (!general.isNullOrEmpty(schemeStorage))
            scheme = schemeStorage;

        const themeData = scheme === "light" ? themeReducer.light : themeReducer.dark;

        const styles: any = await createStyles({ themeData });
        await AsyncStorage.setItem("colorScheme", (!general.isNullOrEmpty(schemeStorage) ? schemeStorage : 'light'));
        dispatch(ThemeActions.setThemeState({
            Styles: styles,
            currentTheme: scheme,
            currentThemeName: scheme === "light" ? "light" : "dark",
            ...themeData
        }));
        onSuccess({});
    }
    useEffect(() => {
        loadData({
            onSuccess: () => {
                setState(curr => ({ ...curr, loadData: false }));
            }
        });
        loadColorScheme({
            onSuccess: () => {
                setState(curr => ({ ...curr, appColorSchemeLoading: false }));
            }
        });
    }, [])
    if (state.loadData || state.appColorSchemeLoading || !fontsLoaded) {
        return (
            <>
                <View style={{ flex: 1, backgroundColor: themeReducer.White, justifyContent: 'center', alignItems: 'center' }}>
                    <Loading color={themeReducer.PrimaryColor} />
                </View>
            </>
        )
    }
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: themeReducer.White }}   >
            <Navigation initialRoute={state.initialRoute} />
            <LoadingFullScreen />
            <AlertRenderer />
        </SafeAreaView>
    )
}

export default Root;


