import { SearchNormal1 } from 'iconsax-react-native';
import React from 'react';
import useTheme from '../../../utils/redux-selectors/use-theme';
import CustomInput from '../../custom/custom-input';
type Props = {
    [key: string]: any;
};
const SearchBar = ({
    label,
    placeholder,
    addRequiredSign = false,
    value,
    onChange,
    iconColor,
    Icon = SearchNormal1

}: Props) => {
    const theme: any = useTheme()
    return (
        <CustomInput
            leftIcon
            Icon={Icon}
            label={label}
            iconColor={iconColor}
            placeholder={placeholder}
            addRequiredSign={addRequiredSign}
            value={value}
            onChange={onChange}></CustomInput>
    );
};
export default React.memo(SearchBar);
