
import { createReducer, createActions } from "reduxsauce";


const INITIAL_STATE = {
    currentTheme: "light",
    light: {
        PrimaryColor: "#2A59FE",
        SecondaryColor: '#f3f6fa',
        Gradient1: "#41D5FB",
        Gradient2: "#F25012",
        BackgroundColor: "#ffffff",
        SuccessColor: "#7DCC9F",
        ErrorColor: '#DA1C31',
        InfoColor: "#29B2F7",
        DangerColor: "#F59D27",
        Black: "#44444a",
        White: "#fff",
        TextInputColor: "#0E254D",
        TextColor: "#fff",
        PlaceHolderColor: "#8A94A6",
        ShadowColor: "#000",
        DisabledColor: "#8E8E9B",
        DisableTextColor: "#A9A9A9",
        ButtonColor: "#D9D9D9",
        SuccessOpacity: "rgba(11, 189, 88, .1)",
        ErrorOpacity: "rgba(231, 103, 72, .3)",
        BorderColor: "#e9e9e9",
        ModalColor: "rgba(51, 51, 51, .4)",
        DarkGray: "#66666a",
        InputBackgroundColor: "#f3f6fa",//f9f9f9,
        BlackOpacity: "rgba(0, 0, 0, .6)",
        InputDisabledColor: "#f5f5f5",
        MapAction: "#fff",
        ShadowColorIOS: "#000",
        ShadowColorAndroid: "#555",
        RecipesTextColor: "#1E1E1E",
        ActivitiesTextColor: "#5E1F15",
        ProductsTextColor: "#702E0F",
        MarketTextColor: "#633D23",
        StarColor: "#FFB800",
        StarDisabledColor: "#d9d9d9"
    },

    dark: {
        PrimaryColor: "#2A59FE",
        SecondaryColor: '#1c2531',
        Gradient1: "#41D5FB",
        Gradient2: "#F25012",
        BackgroundColor: "#ffffff", //44444a
        SuccessColor: "#99e699",
        ErrorColor: '#E76748',
        InfoColor: "#9ddcfb",
        DangerColor: "#f9c785",
        Black: "#fff",
        White: "#242f3e", //44444a
        TextInputColor: "#0E254D",
        TextColor: "#fff",
        PlaceHolderColor: "#8A94A6",
        ShadowColor: "#000",
        DisabledColor: "#f5f5f5",
        DisableTextColor: "#A9A9A9",
        ButtonColor: "#D9D9D9",
        SuccessOpacity: "rgba(11, 189, 88, .1)",
        ErrorOpacity: "rgba(231, 103, 72, .3)",
        BorderColor: "#7d94b5",
        ModalColor: "rgba(51, 51, 51, .5)",
        DarkGray: "#f5f5f5",
        InputBackgroundColor: "#f9f9f9",
        InputDisabledColor: "#415571",
        MapAction: "#1c2531",
        ShadowColorIOS: "#000",
        ShadowColorAndroid: "#555",
        RecipesTextColor: "#FFFFFF",
        ActivitiesTextColor: "#FFFFFF",
        ProductsTextColor: "#FFFFFF",
        MarketTextColor: "#FFFFFF",
        StarColor: "#FFB800",
        StarDisabledColor: "#d9d9d9"

    },


    PrimaryColor: "#2A59FE",
    SecondaryColor: '#f3f6fa',
    Gradient1: "#41D5FB",
    Gradient2: "#F25012",
    BackgroundColor: "#ffffff",
    SuccessColor: "#7DCC9F",
    ErrorColor: '#E76748',
    InfoColor: "#29B2F7",
    DangerColor: "#F59D27",
    Black: "#07122F",
    White: "#fff",
    TextInputColor: "#0E254D",
    TextColor: "#0E254D",
    PlaceHolderColor: "#8A94A6",
    ShadowColor: "#000",
    DisabledColor: "#8E8E9B",
    DisableTextColor: "#A9A9A9",
    ButtonColor: "#D9D9D9",
    SuccessOpacity: "rgba(11, 189, 88, .1)",
    ErrorOpacity: "rgba(231, 103, 72, .3)",
    BorderColor: "#d9d9d9",
    ModalColor: "rgba(51, 51, 51, .5)",
    DarkGray: "#66666a",
    InputBackgroundColor: "#f9f9f9",
    ShadowColorIOS: "#000",
    ShadowColorAndroid: "#999",
    RecipesTextColor: "#1E1E1E",
    ActivitiesTextColor: "#5E1F15",
    ProductsTextColor: "#702E0F",
    MarketTextColor: "#633D23",
    StarColor: "#FFB800",
    StarDisabledColor: "#d9d9d9",
    Styles: {},
};

const { Types, Creators } = createActions({
    setThemeState: ["payload"],
});

export const ActionTypes = Types;
export const Actions = Creators;
export const INITIAL_STATE_FOR_SELECTOR_HOOK = INITIAL_STATE;
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_THEME_STATE]: (draft, { payload }) => ({ ...draft, ...payload }),
});
