import React, { useCallback } from 'react';
import CustomView from '../custom-view';
import useTheme from '../../../utils/redux-selectors/use-theme';
import CustomText from '../custom-text';
import { ArrowLeft } from 'iconsax-react-native';
import { TouchableOpacity } from 'react-native';
import NavigationService from '../../../services/NavigationService';
type Props = {
    [key: string]: any;
};
const CustomDetailHeader = ({ title }: Props) => {
    const theme: any = useTheme()

    const goBack = useCallback(() => {
        NavigationService.goBack()
    }, [])

    return (
        <CustomView noFlex row color={theme.PrimaryColor} pl2 pr2 style={{ height: 50 }}>
            <CustomView noFlex style={{ width: 50, height: 50 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={goBack}>
                    <ArrowLeft
                        size={32}
                        color={theme.White}
                    />
                </TouchableOpacity>
            </CustomView>
            <CustomView alignCenter justifyCenter  >
                <CustomText lg bold numberOfLines={1} white>{title}</CustomText>
            </CustomView>
            <CustomView noFlex style={{ width: 50, height: 50 }}>
            </CustomView>
        </CustomView>
    );
};
export default React.memo(CustomDetailHeader);
