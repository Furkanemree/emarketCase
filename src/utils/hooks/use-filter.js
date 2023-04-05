import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux";
import general from "../general";
import NavigationService from "../../services/NavigationService";
import memoize from "fast-memoize"
import useRefState from "./use-ref-state";
import { useNavigation } from "@react-navigation/native";

const useFilter = ({
    getDefaultFilter = () => { },
    filterScreenName,
}) => {
    const [filter, filterRef, setFilter] = useRefState(getDefaultFilter)
    const navigation = useNavigation()

    const updateFilterProps = useCallback((values) => setFilter(curr => ({
        ...curr, ...values,
    })), []);

    const [isHaveFilter, isHaveFilterRef, setIsHaveFilter] = useRefState(false);

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
                (formPropsIdKey, formPropsNameKey, valueIdKey = "value", valueNameKey = "label") => (value) =>
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

    const clearFilter = useCallback(() => {
        setFilter(getDefaultFilter())
    }, [getDefaultFilter]);

    const openFilter = useCallback(() => {
        navigation.push(filterScreenName, { setFilter: setFilter, clearFilter, filter: filterRef.current })
    }, [clearFilter]);

    useEffect(() => {
        const haveFilter = !general.areEqualFilter(filter, getDefaultFilter);
        if (isHaveFilterRef.current != haveFilter)
            setIsHaveFilter(haveFilter);
    }, [JSON.stringify(filter)])

    return { filter, setFilter, clearFilter, openFilter, isHaveFilter, updateFilterProps, onChangeDynamic, onChangeDynamicForSelect, onChangeDynamicForMultiSelect }
}

export default useFilter;