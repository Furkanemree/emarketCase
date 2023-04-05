import React from "react"
import { ScrollView } from "react-native"
type Props = {
    [key: string]: any;
};
const CustomScrollView = (({
    children,
    horizontal = false,
    bounces = false,
    contentContainerStyle,
}: Props) => {
    return (
        <ScrollView
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            style={{ flex: horizontal ? 0 : 1, }}
            horizontal={horizontal}
            nestedScrollEnabled
            contentContainerStyle={contentContainerStyle}
            bounces={bounces}
        >
            {children}
        </ScrollView>
    );
})
export default CustomScrollView;
