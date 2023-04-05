import React, { useCallback, useEffect, useMemo, useState } from "react"
import { RefreshControl, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import general from "../general";
import useOnEntityUpdated from "../../infrastructure/event-bus/hooks/use-on-entity-updated";
import NavigationService from "../../services/NavigationService";
import apiCalls from "../apicall/api-calls";
import useDeleteEntityHelper from "./use-delete-entity-helper";
import useGoBackOnEntityDelete from "./use-goback-on-entity-delete";


const CustomScrollView = ({ children, helper }) => {
    return (
        <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={helper.pullToRefreshLoading} onRefresh={helper.reloadForPullToRefresh} />}
        >{children}
        </ScrollView>
    )
}


const ScrollViewWithPullToRefresh = React.memo(CustomScrollView)


const useDetailPageHelper = ({
    controller,
    action,
    id,
    goBackOnEntityDelete = true,
    goBackOnLoadError = true,
    entityType = null,
    onDetailLoaded,
    editScreenName,
    reloadKey
}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [pullToRefreshLoading, setPullToRefreshLoading] = useState(false);


    const loadData = useCallback((forPullToRefresh = false) => {
        setLoading(true);
        setPullToRefreshLoading(forPullToRefresh);
        dispatch(apiCalls.ApiCall({
            controller: controller,
            itemId: id,
            method: "get",
            action: action,
            showAlertOnError: true,
            callback: async () => {
                setLoading(false);
                setPullToRefreshLoading(false);
            },
            onSuccess: async ({ data }) => {
                setData(data);
                onDetailLoaded && onDetailLoaded(data);
            },
            onError: () => { goBackOnLoadError && navigation.goBack() }
        }))
    }, []);

    useEffect(() => {
        if (!general.isNullOrEmpty(reloadKey))
            loadData(false);
    }, [reloadKey])

    useGoBackOnEntityDelete(entityType, goBackOnEntityDelete ? id : -1);

    const loadDataForEventBus = useCallback(() => {
        loadData(false);
    }, [])
    useOnEntityUpdated(entityType, id || -1, loadDataForEventBus)

    const deleteHelper = useDeleteEntityHelper(controller, entityType, id);

    useEffect(() => {
        loadData(false);
    }, []);


    const reloadForPullToRefresh = useCallback(() => {
        loadData(true);
    }, []);

    const goEdit = useCallback(() => {
        NavigationService.push(editScreenName, { id, id })
    }, [editScreenName]);


    return {
        data,
        loading,
        setLoading,
        loadData,
        pullToRefreshLoading,
        reloadForPullToRefresh,
        goEdit,
        deleteHelper,
        ScrollView: ScrollViewWithPullToRefresh
    }
}

export default useDetailPageHelper;