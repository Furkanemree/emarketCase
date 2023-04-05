import React, { useCallback, useRef, useState } from "react"
import { useEffect } from "react";
import { ActivityIndicator, RefreshControl } from "react-native"
import general from "../../../utils/general";
import useTheme from "../../../utils/redux-selectors/use-theme"
import useRefState from "../../../utils/hooks/use-ref-state"
import NoRecordsFound from "../../base/no-record/index";
import { FlashList } from "@shopify/flash-list";
import CustomView from "../custom-view";
import SearchBar from "../../base/search-bar";
import CustomText from "../custom-text";
import CustomButton from "../custom-button";
type Props = {
    [key: string]: any;
};
const CustomFlashList = ({
    reloadKey = "",
    renderItem,
    filter,
    numColumns = 1,
    ItemSeparatorComponent,
    searchLabel,
    searchPlaceHolder,
    searchIconColor,
    useSearchBar,
    hideHeaderComponentIfListEmpty = true,
    skeleton,
    estimatedItemSize = 100,
    ListHeaderComponent,
    onScroll,
    ListFooterComponent,
    onViewableItemsChanged,
    useData = [],
    useFilter,
    filterOnPress

}: Props) => {
    const theme: any = useTheme();
    const didMountRef = useRef(false);
    const [searchTimer, searchTimerRef, setSearchTimer] = useRefState(null);
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState({ data: [], value: "" });
    const [data, dataRef, setData] = useRefState({ data: [], totalCount: 0 });
    const [pagingAndSearch, pagingAndSearchRef, setPagingAndSearch] = useRefState({ page: 1, pageSize: 12, pageCount: 0, search: "", keyForRefreshControl: "" });
    const [serachTextHook, setSearchTextHook] = useState("");

    useEffect(() => {
        if (didMountRef.current)
            setLoading(true);
        setData((curr: any) => ({ ...curr, data: [] }));
        setPagingAndSearch((curr: any) => ({ ...curr, page: 1, keyForRefreshControl: general.generateRandomString(5) }));
    }, [JSON.stringify(filter), reloadKey]);

    useEffect(() => {
        let newData: any = [];
        if (general.isNullOrEmpty(filter?.brand) && general.isNullOrEmpty(filter?.model) && general.isNullOrEmpty(filter?.shortBy)) {
            newData = useData;
        }
        if (!general.isNullOrEmpty(filter?.brand)) {
            useData?.map((item: any) => {
                const newBrandList = filter?.brand?.some((val: any) => val.value === item?.brand)
                if (newBrandList)
                    newData.push(item)
            })
        }
        if (!general.isNullOrEmpty(filter?.model)) {
            useData?.map((item: any) => {
                const newModelList = filter?.model?.some((val: any) => val.value === item?.model)
                if (newModelList)
                    newData.push(item)
            })

        }
        if (!general.isNullOrEmpty(filter?.shortBy)) {
            if (general.isNullOrEmpty(newData))
                newData = useData
            if (filter?.shortBy?.value === "Old to new") {
                newData.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            }
            else if (filter?.shortBy?.value === "New to old") {
                newData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }
            else if (filter?.shortBy?.value === "Price hight to low") {
                newData.sort((a: any, b: any) => parseFloat(b?.price) - parseFloat(a?.price));
            }
            else if (filter?.shortBy?.value === "Price low to hight") {
                newData.sort((a: any, b: any) => parseFloat(a?.price) - parseFloat(b?.price));
            }
        }

        newData = newData ? newData.slice(0, (pagingAndSearchRef?.current?.page * pagingAndSearchRef?.current?.pageSize)) : [];
        setData((curr: any) => ({ ...curr, data: newData }));
        setPagingAndSearch((curr: any) => ({ ...curr, pageCount: (useData?.length / pagingAndSearchRef?.current?.pageSize) }));
        setLoading(false);
        if (!didMountRef.current)
            didMountRef.current = true;
    }, [pagingAndSearch.page, pagingAndSearch.search, pagingAndSearch.keyForRefreshControl, filter]);


    const loadMore = useCallback(() => {
        if (pagingAndSearchRef?.current?.pageCount > pagingAndSearchRef?.current?.page) {
            setLoading(true);
            let newData = useData ? useData.slice((pagingAndSearchRef?.current?.page * pagingAndSearchRef?.current?.pageSize), pagingAndSearchRef?.current?.pageSize) : [];
            setData((curr: any) => ({ ...curr, data: newData }));
            setLoading(false);
            setPagingAndSearch((curr: any) => ({ ...curr, page: pagingAndSearchRef?.current?.page + 1 }));
        }
    }, [pagingAndSearch.pageCount, pagingAndSearch.page])

    const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

    const onChangeSearchText = useCallback((value: any) => {
        const val = value;
        setSearchTextHook(value);
        clearTimeout(searchTimer);

        setSearchTimer(setTimeout(() => {
            const filtered = dataRef?.current?.data?.filter((item: any) => {
                const itemText = item?.name;
                return itemText.toLowerCase().includes(value.toLowerCase());
            })
            setPagingAndSearch((curr: any) => ({ ...curr, search: val, page: 1 }));
            setSearchData({ data: filtered, value: value })
        }, 650));
    }, [searchTimer])


    return (
        <CustomView>
            {useSearchBar &&
                <CustomView noFlex pl3 pr3 mt2>
                    <SearchBar label={searchLabel} iconColor={searchIconColor} placeholder={searchPlaceHolder} value={serachTextHook} onChange={onChangeSearchText} />
                </CustomView>
            }
            {useFilter &&
                <CustomView noFlex pl3 pr3 mt1 row style={{ height: 50 }}>
                    <CustomView justifyCenter>
                        <CustomText medium>Filters:</CustomText>
                    </CustomView>
                    <CustomView justifyCenter>
                        <CustomButton onPress={filterOnPress} color={theme.DisabledStarColor} height={36} text={"Select Filter"} />
                    </CustomView>
                </CustomView>
            }
            <FlashList
                refreshControl={<RefreshControl refreshing={loading} colors={[theme.PrimaryColor]} tintColor={theme.PrimaryColor} progressBackgroundColor={theme.White} />}
                estimatedItemSize={estimatedItemSize}
                overScrollMode="never"
                keyExtractor={keyExtractor}
                data={searchData?.value.length > 0 ? searchData?.data : data?.data}
                numColumns={numColumns}
                ListHeaderComponent={(!loading || data?.data?.length !== 0)
                    && (data?.data?.length !== 0 || !hideHeaderComponentIfListEmpty)
                    && ListHeaderComponent}
                onEndReached={loadMore}
                onScroll={onScroll}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={(!loading) && <NoRecordsFound show />}
                ListFooterComponent={ListFooterComponent ? ListFooterComponent : skeleton ? loading && skeleton : loading && <ActivityIndicator color={theme.PrimaryColor} style={{ marginTop: 10 }} size="large" />}
                renderItem={renderItem}
                onViewableItemsChanged={onViewableItemsChanged}
                ItemSeparatorComponent={ItemSeparatorComponent}

            />
        </CustomView>
    );
};
export default React.memo(CustomFlashList);
