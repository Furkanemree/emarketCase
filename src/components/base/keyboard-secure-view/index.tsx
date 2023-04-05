import React from 'react';
import { KeyboardAvoidingView, Platform, } from 'react-native';


function KeyboardSecureView(props: any) {

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === "ios" ? 15 : 0}
            behavior={Platform.OS === "ios" ? "padding" : undefined} enabled style={{ flex: 1 }}>
            {props.children}
        </KeyboardAvoidingView>

    );
}

export default KeyboardSecureView;