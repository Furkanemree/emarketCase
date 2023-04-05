import React, { useCallback } from "react";
import useRefState from "./use-ref-state";
import memoize from "fast-memoize"

const useFormProps = (intitialState) => {

    const [formProps, formPropsRef, setFormProps] = useRefState(intitialState);

    const updateFormProps = useCallback((values) => setFormProps(curr => ({
        ...curr, ...values,
        
    })), []);

    const onChangeDynamic = React.useMemo(
        () =>
            memoize(
                (param) => (value) => updateFormProps({ [param]: value })
            ),
        []
    );

    const onChangeDynamicForSelect = React.useMemo(
        () =>
            memoize(
                (formPropsIdKey, formPropsNameKey, valueIdKey = "value", valueNameKey = "label") => (value) =>
                    updateFormProps({ [formPropsIdKey]: value?.[valueIdKey], [formPropsNameKey]: value?.[valueNameKey] })
            ),
        []
    );


    const onChangeDynamicForMultiSelect = React.useMemo(
        () =>
            memoize(
                (formPropsIdListKey, formPropsOptionListKey) => (options, ids) =>
                    updateFormProps({ [formPropsIdListKey]: ids, [formPropsOptionListKey]: options })
            ),
        []
    );


    return {
        formProps,
        formPropsRef,
        setFormProps,
        updateFormProps,
        onChangeDynamic,
        onChangeDynamicForSelect,
        onChangeDynamicForMultiSelect
    }

}

export default useFormProps;