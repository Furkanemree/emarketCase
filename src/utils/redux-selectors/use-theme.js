import { useSelector } from "react-redux";

const useTheme = () => {
    /** @type {{Gradient1, Gradient2,ErrorColor,BackgroundColor,SecondaryColor,Gold,PrimaryColor,PrimaryColorLight, Black, White, TextInputColor, TextColor, TextInputPlaceholderColor, ShadowColor, DisabledColor, PrimaryLightColor, ClearActive, LabelColor, BorderColor, LabelFontSize, TextInputFontSize}} */
    const z = useSelector(state => state.theme);
    return z;
}
export default useTheme;