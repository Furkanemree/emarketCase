import React from 'react';
import { Platform, View } from 'react-native';
import general from '../../../utils/general';
import useTheme from "../../../utils/redux-selectors/use-theme"
type Props = {
    [key: string]: any;
};
const CustomView = ({
    children,
    flex = 1,
    border = null,
    justifyCenter,
    alignCenter,
    alignEnd,
    justifyEnd,
    spaceBetween,
    bottomWidth,
    borderColor = 'transparent',
    noFlex = false,
    row,
    color = 'transparent',
    topLeftRadius = null,
    topRightRadius = null,
    bottomLeftRadius = null,
    bottomRightRadius = null,
    borderRadius = null,
    noRadius,
    borderWidth = null,
    useShadow,
    style,
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
    onLayout,


}: Props) => {
    const theme: any = useTheme();

    //marginTop
    let marginTop = null
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
    let marginLeft = null
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
    let marginRight = null
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
    let marginBottom = null
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
    let paddingTop = null
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
    let paddingLeft = null
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
    let paddingRight = null
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
    let paddingBottom = null
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
    let padding = null
    if (p1)
        padding = 10
    if (p2)
        padding = 20
    if (p3)
        padding = 30

    //paddingHorizontal
    let paddingHorizontal = null
    if (ph1)
        paddingHorizontal = 10
    if (ph2)
        paddingHorizontal = 20
    if (ph3)
        paddingHorizontal = 30

    //paddingVertical
    let paddingVertical = null
    if (pv1)
        paddingVertical = 10
    if (pv2)
        paddingVertical = 20
    if (pv3)
        paddingVertical = 30

    //margin
    let margin = null
    if (m1)
        margin = 10
    if (m2)
        margin = 20
    if (m3)
        margin = 30

    //marginHorizontal 
    let marginHorizontal = null
    if (mh1)
        marginHorizontal = 10
    if (mh2)
        marginHorizontal = 20
    if (mh3)
        marginHorizontal = 30

    //marginVertical
    let marginVertical = null
    if (mv1)
        marginVertical = 10
    if (mv2)
        marginVertical = 20
    if (mv3)
        marginVertical = 30

    let content = null

    if (justifyCenter)
        content = "center"
    if (justifyEnd)
        content = "flex-end"
    if (spaceBetween)
        content = "space-between"


    let radius = null

    if (general.isNullOrEmpty(topLeftRadius) && general.isNullOrEmpty(topRightRadius) && general.isNullOrEmpty(bottomRightRadius) && general.isNullOrEmpty(bottomLeftRadius))
        radius = borderRadius
    if (noRadius) radius = null

    return (
        <View onLayout={onLayout} style={{
            flex: noFlex ? 0 : flex,
            justifyContent: content,
            alignItems: alignCenter ? "center" : alignEnd ? "flex-end" : null,
            flexDirection: row ? "row" : "column",
            borderWidth: border,
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
            borderBottomWidth: bottomWidth ? bottomWidth : 0,
            borderColor: borderColor,
            backgroundColor: color,
            borderRadius: radius,
            borderTopLeftRadius: topLeftRadius,
            borderTopRightRadius: topRightRadius,
            borderBottomLeftRadius: bottomLeftRadius,
            borderBottomRightRadius: bottomRightRadius,
            ...(useShadow ? {
                ...Platform.select({
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
                        elevation: 5,

                    },
                })
            } : {

            }),
            ...style
        }} >
            {children}
        </View>
    ); 1
};
export default CustomView;


