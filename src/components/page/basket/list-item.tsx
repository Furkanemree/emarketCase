import React from "react"
import useTheme from "../../../utils/redux-selectors/use-theme"
import CustomText from "../../custom/custom-text"
import CustomView from "../../custom/custom-view";
import general from "../../../utils/general";
import { TouchableOpacity } from "react-native";
import { Add, Minus } from "iconsax-react-native";

type Props = {
    [key: string]: any;
};

const BasketListItem = ({
    item, index, onMinus, onAdd
}: Props) => {
    const theme: any = useTheme();
    return (
        <CustomView mt2 row noFlex color={theme.White} >
            <CustomView pl2>
                <CustomText medium>{item?.name}</CustomText>
                <CustomText color={theme.PrimaryColor} md>{general.currencyFormat(item.price)}</CustomText>
            </CustomView>
            <CustomView noFlex row color='red' style={{ height: 40, width: '45%' }}>
                <CustomView color={theme.SecondaryColor} >
                    <TouchableOpacity onPress={onMinus} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Minus
                            size="28"
                            color={theme.DisabledColor}
                        />
                    </TouchableOpacity>
                </CustomView>
                <CustomView justifyCenter alignCenter color={theme.PrimaryColor} >
                    <CustomText white medium>{item?.quantity}</CustomText>
                </CustomView>
                <CustomView color={theme.SecondaryColor} >
                    <TouchableOpacity onPress={onAdd} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Add
                            size="28"
                            color={theme.DisabledColor}
                        />
                    </TouchableOpacity>
                </CustomView>

            </CustomView>
        </CustomView >
    )
}
export default React.memo(BasketListItem);

