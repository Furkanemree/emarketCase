import React, { useCallback, useEffect, useRef, useState } from "react"
import memoize from "fast-memoize"
import useRefState from "./use-ref-state";
import { useNavigation } from "@react-navigation/native";
const useFilterPageHelper = (params) => {
    const [filter, filterRef, setFilter] = useRefState(params?.filter)

    const navigation = useNavigation();
    const updateFilterProps = useCallback((values) => setFilter(curr => ({
        ...curr, ...values,
    })), []);


    const onChangeDynamic = React.useMemo(
        () =>
            memoize(
                (param) => (value) => updateFilterProps({ [param]: value })
            ),
        []
    );

    const onChangeDynamicForSelect = React.useMemo(
        () =>
            memoize(
                (formPropsIdKey, formPropsNameKey, valueIdKey = "value", valueNameKey = "name") => (value) =>
                    updateFilterProps({ [formPropsIdKey]: value?.[valueIdKey], [formPropsNameKey]: value?.[valueNameKey] })
            ),
        []
    );

    const onChangeDynamicForMultiSelect = React.useMemo(
        () =>
            memoize(
                (formPropsIdListKey, formPropsOptionListKey) => (options, ids) =>
                    updateFilterProps({ [formPropsIdListKey]: ids, [formPropsOptionListKey]: options })
            ),
        []
    );
    const onChangeDynamicForSelectUpdateProps = React.useMemo(
        () =>
            memoize(
                (formPropsIdKey, formPropsNameKey, valueIdKey = "value", valueNameKey = "label", overrideFormPropsOnSelect = {}) => (value) =>
                updateFilterProps({ [formPropsIdKey]: value?.[valueIdKey], [formPropsNameKey]: value?.[valueNameKey], ...overrideFormPropsOnSelect })
            ),
        []
    );


    const clearFilter = useCallback(() => {
        params?.clearFilter();
        navigation.goBack();
    }, []);

    const saveFilter = useCallback(() => {
        params?.setFilter(filterRef.current);
        navigation.goBack();
    }, []);


    return { filter, clearFilter, saveFilter, onChangeDynamic, onChangeDynamicForSelect, onChangeDynamicForMultiSelect,onChangeDynamicForSelectUpdateProps, updateFilterProps }
}

export default useFilterPageHelper;