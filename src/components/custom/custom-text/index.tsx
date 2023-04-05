import i18next from "i18next";
import React from "react"
import { Text } from "react-native"
import useTheme from "../../../utils/redux-selectors/use-theme"
type Props = {
    [key: string]: any;
};
const CustomText = ({
    children,
    flex = 0,
    numberOfLines,
    color = null,
    underline = false,
    lineThrough = false,
    disabled = false,
    i18disable = true,
    ///////////////////////color
    success = false,
    error = false,
    danger = false,
    info = false,
    white = false,
    ///////////////////////size
    image = false,
    imagex = false,
    xxs = false,
    xs = false,
    sm = false,
    md = false,
    lg = false,
    xlg = false,
    xxlg = false,
    header = false,
    tutorial = false,
    ///////////////////////position
    left = false,
    right = false,
    center = false,
    ///////////////////////transform
    toUpper = false,
    toLower = false,
    ///////////////////////fontWeight
    bold = false,
    light = false,
    medium = false,
    italic = false,
    fontSize = 16,
    ///////////////////////spacing
    mt1,
    mt2,
    mt3,
    mt4,
    mt5,
    mt6,
    mt7,
    ml1,
    ml2,
    ml3,
    ml4,
    ml5,
    ml6,
    mr1,
    mr2,
    mr3,
    mr4,
    mr5,
    mr6,
    mb1,
    mb2,
    mb3,
    mb4,
    mb5,
    mb6,
    pt1,
    pt2,
    pt3,
    pt4,
    pt5,
    pt6,
    pt7,
    pl1,
    pl2,
    pl3,
    pl4,
    pl5,
    pl6,
    pr1,
    pr2,
    pr3,
    pr4,
    pr5,
    pr6,
    pb1,
    pb2,
    pb3,
    pb4,
    pb5,
    pb6,
    pb7,
    p1,
    p2,
    p3,
    pv1,
    pv2,
    pv3,
    ph1,
    ph2,
    ph3,
    m1,
    m2,
    m3,
    mv1,
    mv2,
    mv3,
    mh1,
    mh2,
    mh3,
    style
}: Props) => {
    const theme: any = useTheme();

    let textColor = '#000000';

    if (white)
        textColor = theme.White;
    if (success)
        textColor = theme.SuccessColor;
    if (error)
        textColor = theme.ErrorColor;
    if (info)
        textColor = theme.InfoColor;
    if (danger)
        textColor = theme.DangerColor;
    if (disabled)
        textColor = theme.DisabledColor;
    if (color)
        textColor = color;

    let fontFamily = "Montserrat_400Regular"

    if (light)
        fontFamily = "Montserrat_300Light"
    if (medium)
        fontFamily = "Montserrat_500Medium"
    if (bold)
        fontFamily = "Montserrat_800ExtraBold"

    let align = "left"

    if (left)
        align = "left"
    if (right)
        align = "right"
    if (center)
        align = "center"

    let transform = null

    if (toLower)
        transform = "lowercase"
    if (toUpper)
        transform = "uppercase"


    //marginTop
    let marginTop = 0
    if (mt1)
        marginTop = 5
    if (mt2)
        marginTop = 10
    if (mt3)
        marginTop = 15
    if (mt4)
        marginTop = 20
    if (mt5)
        marginTop = 25
    if (mt6)
        marginTop = 30
    if (mt7)
        marginTop = 50

    //marginLeft
    let marginLeft = 0
    if (ml1)
        marginLeft = 5
    if (ml2)
        marginLeft = 10
    if (ml3)
        marginLeft = 15
    if (ml4)
        marginLeft = 20
    if (ml5)
        marginLeft = 25
    if (ml6)
        marginLeft = 30

    //marginRight
    let marginRight = 0
    if (mr1)
        marginRight = 5
    if (mr2)
        marginRight = 10
    if (mr3)
        marginRight = 15
    if (mr4)
        marginRight = 20
    if (mr5)
        marginRight = 25
    if (mr6)
        marginRight = 30

    //marginBottom
    let marginBottom = 0
    if (mb1)
        marginBottom = 5
    if (mb2)
        marginBottom = 10
    if (mb3)
        marginBottom = 15
    if (mb4)
        marginBottom = 20
    if (mb5)
        marginBottom = 25
    if (mb6)
        marginBottom = 30

    //paddingTop
    let paddingTop = 0
    if (pt1)
        paddingTop = 5
    if (pt2)
        paddingTop = 10
    if (pt3)
        paddingTop = 15
    if (pt4)
        paddingTop = 20
    if (pt5)
        paddingTop = 25
    if (pt6)
        paddingTop = 30
    if (pt7)
        paddingTop = 50

    //paddingLeft
    let paddingLeft = 0
    if (pl1)
        paddingLeft = 5
    if (pl2)
        paddingLeft = 10
    if (pl3)
        paddingLeft = 15
    if (pl4)
        paddingLeft = 20
    if (pl5)
        paddingLeft = 25
    if (pl6)
        paddingLeft = 30

    //paddingRight
    let paddingRight = 0
    if (pr1)
        paddingRight = 5
    if (pr2)
        paddingRight = 10
    if (pr3)
        paddingRight = 15
    if (pr4)
        paddingRight = 20
    if (pr5)
        paddingRight = 25
    if (pr6)
        paddingRight = 30

    //paddingBottom
    let paddingBottom = 0
    if (pb1)
        paddingBottom = 5
    if (pb2)
        paddingBottom = 10
    if (pb3)
        paddingBottom = 15
    if (pb4)
        paddingBottom = 20
    if (pb5)
        paddingBottom = 25
    if (pb6)
        paddingBottom = 30
    if (pb7)
        paddingBottom = 50

    //padding
    let padding = 0
    if (p1)
        padding = 10
    if (p2)
        padding = 20
    if (p3)
        padding = 30

    //paddingHorizontal
    let paddingHorizontal = 0
    if (ph1)
        paddingHorizontal = 10
    if (ph2)
        paddingHorizontal = 20
    if (ph3)
        paddingHorizontal = 30

    //paddingVertical
    let paddingVertical = 0
    if (pv1)
        paddingVertical = 10
    if (pv2)
        paddingVertical = 20
    if (pv3)
        paddingVertical = 30

    //margin
    let margin = 0
    if (m1)
        margin = 10
    if (m2)
        margin = 20
    if (m3)
        margin = 30

    //marginHorizontal 
    let marginHorizontal = 0
    if (mh1)
        marginHorizontal = 10
    if (mh2)
        marginHorizontal = 20
    if (mh3)
        marginHorizontal = 30

    //marginVertical
    let marginVertical = 0
    if (mv1)
        marginVertical = 10
    if (mv2)
        marginVertical = 20
    if (mv3)
        marginVertical = 30

    let fontsize = fontSize;
    if (image)
        fontsize = 10;
    if (imagex)
        fontsize = 8;
    if (xxs)
        fontsize = 12;
    if (xs)
        fontsize = 14;
    if (sm)
        fontsize = 16
    if (md)
        fontsize = 18;
    if (lg)
        fontsize = 20
    if (xlg)
        fontsize = 22
    if (xxlg)
        fontsize = 24
    if (header)
        fontsize = 30
    if (tutorial)
        fontsize = 45


    return (
        <Text
            numberOfLines={numberOfLines ? numberOfLines : null}
            style={{
                flex: flex,
                color: textColor || color,
                fontSize: fontsize,
                textDecorationLine: underline ? 'underline' : lineThrough ? "line-through" : null,
                fontFamily: fontFamily,
                textAlign: align,
                textTransform: transform,
                margin: margin,
                padding: padding,
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginRight: marginRight,
                paddingTop: paddingTop,
                paddingBottom: paddingBottom,
                paddingLeft: paddingLeft,
                paddingRight: paddingRight,
                paddingHorizontal: paddingHorizontal,
                paddingVertical: paddingVertical,
                marginVertical: marginVertical,
                marginHorizontal: marginHorizontal,
                ...style,
            }}>{i18disable ? children : i18next.t(children)}</Text>
    )
}
export default React.memo(CustomText);