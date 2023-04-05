import React from "react"
import useTheme from "../../../utils/redux-selectors/use-theme"
import CustomText from "../../custom/custom-text"
import CustomView from "../../custom/custom-view";
import CustomImage from "../../custom/custom-image";
import general from "../../../utils/general";
import CustomButton from "../../custom/custom-button";
import { TouchableOpacity } from "react-native";
import { Star1 } from "iconsax-react-native";

type Props = {
    [key: string]: any;
};

const ListItem = ({
    item, index, detailPress, addFavorite, addBasket
}: Props) => {
    const theme: any = useTheme();
    return (
        <CustomView
            p1
            useShadow
            mt3
            mr2={index % 2 == 0 ? true : false}
            ml3={index % 2 == 0 ? true : false}
            ml2={index % 2 != 0 ? true : false}
            mr3={index % 2 != 0 ? true : false}
            color={theme.White}
            style={{ height: 302 }}>
            <TouchableOpacity onPress={detailPress} activeOpacity={.7} style={{ flex: 1 }}>
                <CustomView noFlex style={{ width: 24, height: 24, position: 'absolute', right: 6, top: 6, zIndex: 9999 }}>
                    <TouchableOpacity onPress={addFavorite} activeOpacity={.7} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Star1
                            size="22"
                            color={item?.isFavorite ? theme.StarColor : theme.StarDisabledColor}
                            variant="Bold"
                        />
                    </TouchableOpacity>
                </CustomView>
                <CustomImage source={item?.image} style={{ height: 150, width: '100%', borderRadius: 10 }} resizeMode={"cover"} />
                <CustomText medium xs mt3 color={theme.PrimaryColor}>{general.currencyFormat(item?.price)}</CustomText>
                <CustomView mt3>
                    <CustomText medium xs numberOfLines={2}>{item?.name}</CustomText>
                </CustomView>
                <CustomButton whiteText color={theme.PrimaryColor} height={36} text={"Add to Card"} onPress={addBasket} />
            </TouchableOpacity>
        </CustomView>
    )
}
export default React.memo(ListItem);

