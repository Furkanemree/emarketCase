import React from "react"
import { View } from "react-native"
import useTheme from "../../../utils/redux-selectors/use-theme"
import CustomText from "../../custom/custom-text"
type Props = {
    [key: string]: any;
};
const ErrorMessage = ({ text, small }:Props) => {
    const theme = useTheme();

    return (
        <View style={{ height: small ? 30 : 20 }}>
            {small == true ? <CustomText graphMinMax flex={0} color={theme.ErrorColor}>{text}</CustomText>
                : <CustomText flex={0} xs color={theme.ErrorColor}>{text}</CustomText>}
        </View>

    )


}

export default ErrorMessage;