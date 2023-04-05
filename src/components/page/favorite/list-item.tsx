import React from "react"
import useTheme from "../../../utils/redux-selectors/use-theme"
import CustomText from "../../custom/custom-text"
import CustomView from "../../custom/custom-view";
import CustomImage from "../../custom/custom-image";
import { Star1 } from "iconsax-react-native";
import { TouchableOpacity } from "react-native";
type Props = {
    [key: string]: any;
};
const FavoriteListItem = ({
    item, index, deleteFavorite
}: Props) => {
    const theme: any = useTheme();
    return (
        <CustomView key={index} bottomWidth={1} pb2 borderColor={theme.BorderColor} mt2 row noFlex color={theme.White} >
            <CustomImage source={item?.image} style={{ width: 60, height: 60, borderRadius: 10 }} resizeMode="cover" />
            <CustomView pl2>
                <CustomText medium>{item?.name}</CustomText>
                <CustomText xs light numberOfLines={2}>{item?.description}</CustomText>
            </CustomView>
            <CustomView noFlex style={{ width: 50, height: 60 }}  >
                <TouchableOpacity activeOpacity={.7} onPress={deleteFavorite} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Star1 size={35} color={theme.StarColor} variant="Bold" />
                </TouchableOpacity>
            </CustomView>
        </CustomView >
    )
}
export default React.memo(FavoriteListItem);

