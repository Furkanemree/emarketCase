import React from 'react'
import { View } from "react-native"
import i18next from "i18next"
import CustomText from '../../custom/custom-text'
import useTheme from '../../../utils/redux-selectors/use-theme'
import CustomImage from '../../custom/custom-image'
const NoRecordsFound = (props: any) => {
    const theme: any = useTheme()
    if ((props.show != undefined || props.show != null) && !props.show) {
        return null;
    }
    return (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1, height: 250 }}>
            <CustomText flex={0} sm bold color={theme.DarkGray}>{"No Data"} </CustomText>
        </View>
    )
}

export default NoRecordsFound