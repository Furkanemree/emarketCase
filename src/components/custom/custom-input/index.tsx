import React, { useCallback } from "react"
import { TouchableOpacity, View, Keyboard, TextInput, Platform, InputAccessoryView, Button } from "react-native"
import general from "../../../utils/general";
import CustomText from "../../../components/custom/custom-text/index"
import useTheme from "../../../utils/redux-selectors/use-theme"
import { Eye, EyeSlash } from 'iconsax-react-native';
import useRefState from "../../../utils/hooks/use-ref-state";
type Props = {
    [key: string]: any;
};
const CustomInput = ({
    placeholder,
    leftIcon,
    rightIcon,
    label,
    value,
    secureTextEntry,
    errorMessage,
    multiline = false,
    onChange,
    height,
    borderWidth = 0,
    keyboardType,
    disabled,
    md = false,
    xs = false,
    lg = false,
    sm = false,
    xlg = false,
    regular = false,
    medium = false,
    bold = false,
    flex,
    maxLength,
    Icon,
    onPress,
    returnKeyType,
    addRequiredSign = false,
    color,
    borderColor,
    showShadow = false,
    variant = "Linear",
    iconColor = null,
    colorRef,
    iconOnPress,
    onBlur,
    style,


}: Props) => {

    const theme: any = useTheme();
    /* const inputAccessoryViewID = accesories ? general.generateRandomString(8) : null; */
    let fontFamily = "Montserrat_400Regular"

    if (regular)
        fontFamily = "Montserrat_400Regular"
    if (medium)
        fontFamily = "Montserrat_500Medium"
    if (bold)
        fontFamily = "Montserrat_700Bold"

    let fontsize = 14;
    if (xs)
        fontsize = 12;
    if (sm)
        fontsize = 14
    if (md)
        fontsize = 16;
    if (lg)
        fontsize = 18
    if (xlg)
        fontsize = 30



    if (general.isNullOrEmpty(placeholder))
        placeholder = label;

    const [formProps, formPropsRef, setFormProps] = useRefState({ passwordShowing: false });
    const updateProps = useCallback((values: any) => setFormProps((curr: any) => ({ ...curr, ...values })), []);
    const passwordShowingChange = useCallback((val: any) => { updateProps({ passwordShowing: val }) }, []);

    const visiblePassword = useCallback(() => {
        passwordShowingChange(!formPropsRef?.current?.passwordShowing)
    }, [])


    return (
        <View style={{ width: '100%', flexDirection: 'column', }} >
            {label &&
                <View style={{ flexDirection: 'row' }}>
                    <CustomText flex={0} style={{ marginLeft: 2, marginTop: 8 }} xs color={errorMessage ? theme.ErrorColor : theme.DarkGray}>{label}</CustomText>
                    <CustomText flex={0} style={{ marginLeft: 2, marginTop: 8 }} image color={errorMessage ? theme.ErrorColor : theme.DarkGray}>{addRequiredSign ? "*" : ""}</CustomText>
                </View>
            }
            <View
                style={{

                    ...(!showShadow ? {} : Platform.select({
                        ios: {
                            shadowColor: theme.ShadowColorIOS,
                            shadowOffset: {
                                width: -1,
                                height: 1,
                            },
                            shadowOpacity: 0.12,
                            shadowRadius: 2.20,

                            elevation: 2,
                        },
                        android: {
                            shadowColor: theme.ShadowColorAndroid,
                            elevation: 4,
                            borderTopWidth: .1,
                            borderColor: theme.ShadowColorAndroid,
                        },

                    })),
                    flexDirection: "row",
                    borderWidth: borderWidth,
                    borderRadius: 10,
                    justifyContent: rightIcon ? "space-around" : "center",
                    alignItems: "center",
                    borderColor: borderColor ? theme.White : theme.BackgroundColor,
                    marginTop: 6,
                    marginBottom: 6,
                    backgroundColor: disabled ? theme.InputDisabledColor : color ? theme.BackgroundColor : colorRef ? colorRef : theme.SecondaryColor,
                    height: multiline ? 100 : height ? height : 56,
                    padding: 2,
                    flex: flex ? 1 : null,
                    ...style
                }}>
                {leftIcon &&
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingLeft: 10, }} disabled={iconOnPress ? false : true} onPress={iconOnPress ? iconOnPress : null}>
                        <Icon size="25" color={!general.isNullOrEmpty(iconColor) ? iconColor : theme.DisabledColor} variant={variant} />
                    </TouchableOpacity>
                }

                <View style={{ flex: 1, justifyContent: 'center', zIndex: 9999, }} >
                    <TextInput
                        placeholderTextColor={theme.DisabledColor}
                        autoComplete="off"
                        autoCorrect={false}
                        style={{
                            color: theme.DarkGray,
                            borderBottomWidth: 0,
                            fontFamily: fontFamily,
                            flex: 1,
                            paddingLeft: 10,
                            paddingTop: multiline ? 11 : 0,
                            fontSize: fontsize,
                            padding: 0, margin: 0,
                            height: 40,
                        }}
                        onSubmitEditing={(event) => { if (!multiline) Keyboard.dismiss() }}
                        autoCapitalize={'none'}
                        selectionColor={theme.PrimaryColor}
                        value={value?.toString()}
                        returnKeyType={returnKeyType}
                        editable={onPress ? false : !disabled}
                        multiline={multiline}
                        textAlignVertical={multiline ? "top" : "center"}
                        maxLength={maxLength}
                        keyboardType={keyboardType}
                        underlineColorAndroid="rgba(255,255,255,0)"
                        blurOnSubmit={false}
                        onBlur={() => onBlur ? onBlur : Keyboard.dismiss()}
                        secureTextEntry={secureTextEntry && !formProps?.passwordShowing}
                        onChangeText={onChange}
                        placeholder={placeholder} />


                </View>
                {rightIcon &&
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingRight: 10, }} disabled={iconOnPress ? false : true} onPress={iconOnPress ? iconOnPress : null}>
                        <Icon size="25" color={!general.isNullOrEmpty(iconColor) ? iconColor : theme.White} variant={variant} />
                    </TouchableOpacity>
                }
                {secureTextEntry &&
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, paddingRight: 15, }} onPress={visiblePassword}>
                        {!formProps?.passwordShowing && <Eye size="25" color={!general.isNullOrEmpty(iconColor) ? iconColor : theme.White} variant={variant} />}
                        {formProps?.passwordShowing && <EyeSlash size="25" color={!general.isNullOrEmpty(iconColor) ? iconColor : theme.White} variant={variant} />}
                    </TouchableOpacity>
                }
            </View>
        </View >
    )
}


export default React.memo(CustomInput);