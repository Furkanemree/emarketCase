import React from 'react';
import CustomView from '../custom-view';
import useTheme from '../../../utils/redux-selectors/use-theme';
import CustomText from '../custom-text';
import { AppConfig } from '../../../config/app-config';
type Props = {
    [key: string]: any;
};
const CustomHeader = ({ }: Props) => {
    const theme: any = useTheme()
    return (
        <CustomView noFlex color={theme.PrimaryColor} pl2 justifyCenter style={{ height: 50 }}>
            <CustomText xxlg bold white>{AppConfig.APP_NAME}</CustomText>
        </CustomView>
    );
};
export default React.memo(CustomHeader);
