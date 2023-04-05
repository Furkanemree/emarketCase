import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import useTheme from "../../../utils/redux-selectors/use-theme"
import { Dropdown } from 'react-native-element-dropdown';
import { ArrowDown2 } from 'iconsax-react-native';
import i18next from 'i18next';
import { useDispatch } from "react-redux";
import { Actions as ApiCallActions } from "../../../redux/api-call/reducers";
import CustomText from '../custom-text';
import general from '../../../utils/general';
type Props = {
    [key: string]: any;
};
const CustomDropDown = ({
    onChange,
    placeholder,
    search = false,
    border = 0,
    searchPlaceholder = "",
    controller = "",
    action = "",
    label,
    addRequiredSign = false,
    labelField = "label",
    valueField = "value",
    height = 56,
    color,
    errorMessage,
    position = "bottom",
    value,
    data = null,
    i18disable = false,
}: Props) => {
    const dispatch = useDispatch();
    const theme: any = useTheme();
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        if (general.isNullOrEmpty(data)) {
            dispatch(ApiCallActions.NativePost({
                controller: controller,
                action: action,
                data: {
                    pageSize: 20,
                    pageNumber: 1,
                },
                showAlertOnError: true,
                showLoading: true,
                onSuccess: async ({ data }) => {
                    let arr = []
                    data?.map((item: any, index: number) => {
                        item.name = i18disable ? item.name : i18next.t(item.name)
                        arr.push(item)
                    })
                    setItems(arr)

                },
            }))
        } else {
            setItems(data)
        }
    }, [])

    const renderItem = (item: any) => {

        return (
            <View style={{ height: 35, marginTop: 8, justifyContent: 'center', paddingHorizontal: 20 }}>
                <CustomText xs>{item?.name}</CustomText>
            </View>
        );
    };



    return (
        <View style={{ width: '100%', flexDirection: 'column', }}>
            {!general.isNullOrEmpty(label) &&
                <View style={{ flexDirection: 'row' }}>
                    <CustomText flex={0} style={{ marginLeft: 2, marginTop: 6, marginBottom: 4, }} xs color={errorMessage ? theme.ErrorColor : theme.DarkGray}>{i18disable ? label : i18next.t(label)}</CustomText>
                    <CustomText flex={0} style={{ marginLeft: 2, marginTop: 6, marginBottom: 4, }} image color={errorMessage ? theme.ErrorColor : theme.DarkGray}>{addRequiredSign ? "*" : ""}</CustomText>
                </View>
            }
            <Dropdown
                containerStyle={styles.container}
                style={[styles.dropdown, { backgroundColor: color ? theme.BackgroundColor : theme.SecondaryColor, borderColor: theme.White, borderWidth: border, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: isOpen ? 0 : 10, borderBottomRightRadius: isOpen ? 0 : 10, height: height }]}
                placeholderStyle={[styles.placeholderStyle, { color: theme.DarkGray }]}
                selectedTextStyle={[styles.selectedTextStyle, { color: theme.DarkGray }]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={items}
                search={search}
                keyboardAvoiding
                onFocus={() => { setIsOpen(true) }}
                onBlur={() => { setIsOpen(false) }}
                searchPlaceholder={searchPlaceholder}
                placeholder={i18disable ? placeholder : i18next.t(placeholder)}
                dropdownPosition={position}
                renderRightIcon={() => (
                    <View style={{ marginRight: 8 }}>
                        <ArrowDown2 size="20" color={theme.DisabledColor} />
                    </View>
                )}
                flatListProps={{
                    style: { backgroundColor: color ? theme.BackgroundColor : theme.SecondaryColor }
                }}
                renderItem={renderItem}
                maxHeight={300}
                labelField={i18disable ? labelField : i18next.t(labelField)}
                valueField={valueField}
                value={i18disable ? value : i18next.t(value)}
                onChange={onChange}

            />
        </View>
    );
};
export default React.memo(CustomDropDown);

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        backgroundColor: 'white',
        borderWidth: 0,
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
    dropdown: {

        width: "100%",

        zIndex: 999,
        paddingLeft: 10,
    },
    label: {
        position: 'absolute',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        backgroundColor: 'rgba(39, 49, 63, .15)',
        fontSize: 14,
        borderWidth: 1,
        color: 'white'

    },
    placeholderStyle: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
    },
    selectedTextStyle: {
        fontSize: 14,
        borderWidth: 0,
        fontFamily: "Montserrat_400Regular",
        borderBottomWidth: 0
    },
    iconStyle: {
        width: 20,
        height: 20,

    },
    inputSearchStyle: {
        height: 45,
        fontSize: 16,
        fontFamily: "Montserrat_400Regular",
        color: 'white',
        borderRadius: 7,
        marginTop: 10

    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});