import React, { useCallback, useEffect, useMemo } from 'react';
import ScreenContainer from '../../components/base/containers/screen-container';
import ContentContainer from '../../components/base/containers/content-container';
import useParams from '../../utils/hooks/use-params';
import useFilterPageHelper from '../../utils/hooks/use-filter-page-helper';
import CustomView from '../../components/custom/custom-view';
import CustomText from '../../components/custom/custom-text';
import { TouchableOpacity, View } from 'react-native';
import { CloseCircle, TickCircle, TickSquare } from 'iconsax-react-native';
import useTheme from '../../utils/redux-selectors/use-theme';
import NavigationService from '../../services/NavigationService';
import CustomButton from '../../components/custom/custom-button';
import { useSelector } from 'react-redux';
import useRefState from '../../utils/hooks/use-ref-state';
import general from '../../utils/general';
import CustomScrollView from '../../components/custom/custom-scroll-view';
import memoize from 'fast-memoize';
import useReRender from '../../utils/hooks/use-re-render';
import SearchBar from '../../components/base/search-bar';

type Props = {
    [key: string]: any;
};
const Filter: React.FC = () => {
    const list = useSelector((x: any) => x.market.list)
    const theme: any = useTheme()
    const reRender = useReRender()
    const [formProps, formPropsRef, setFormProps] = useRefState({ list: [], brandType: [], modelType: [], brandSearchList: [], modelSearchList: [] });
    const updateProps = useCallback((values: any) => setFormProps((curr: any) => ({ ...curr, ...values })), []);
    const onChangeList = useCallback((val: any) => { updateProps({ list: val, }) }, []);
    const onChangeBrand = useCallback((val: any) => { updateProps({ brand: val, }) }, []);
    const onChangeModel = useCallback((val: any) => { updateProps({ model: val, }) }, []);
    const onChangeSortBy = useCallback((val: any) => { updateProps({ sortBy: val, }) }, []);
    const onChangeBrandType = useCallback((val: any) => { updateProps({ brandType: val, }) }, []);
    const onChangeModelType = useCallback((val: any) => { updateProps({ modelType: val, }) }, []);


    const onChangeBrandSearchList = useCallback((val: any) => { updateProps({ brandSearchList: val, }) }, []);
    const onChangeModelSearchList = useCallback((val: any) => { updateProps({ modelSearchList: val, }) }, []);



    const onChangeBrandSearch = useCallback((val: any) => {
        let data = formPropsRef?.current?.brand
        const filtered = data?.filter((item: any) => {
            const itemText = item?.name;
            return itemText.toLowerCase().includes(val.toLowerCase());
        })
        updateProps({ brandSearch: val, brandSearchList: filtered })
    }, []);

    const onChangeModelSearch = useCallback((val: any) => {
        let data = formPropsRef?.current?.model
        const filtered = data?.filter((item: any) => {
            const itemText = item?.name;
            return itemText.toLowerCase().includes(val.toLowerCase());
        })
        updateProps({ modelSearch: val, modelSearchList: filtered })
    }, []);


    const { setFilter, clearFilter, filter }: any = useParams()
    var filterSystem = useFilterPageHelper({ filter, clearFilter, setFilter })


    useEffect(() => {
        if (filter) {
            onChangeBrandType(filter?.brand ?? [])
            onChangeModelType(filter?.model ?? [])
            onChangeSortBy(filter?.shortBy ?? "")
        }
    }, []);

    let shortData = [
        { name: "Old to new", value: "Old to new", selected: false },
        { name: "New to old", value: "New to old", selected: false },
        { name: "Price hight to low", value: "Price hight to low", selected: false },
        { name: "Price low to hight", value: "Price low to hight", selected: false },
    ]



    useEffect(() => {
        if (!general.isNullOrEmpty(list)) {
            onChangeList(list)
            let newBrand = new Array()
            let newModel = new Array()
            const a = list
            const groupedData = a.reduce((acc, item) => {
                if (!acc[item.brand]) {
                    acc[item.brand] = true;
                }
                return acc;
            }, {});

            const categories = Object.keys(groupedData);
            categories?.map((item: any) => {
                newBrand.push({ name: item, value: item, selected: false })
            })

            const b = list
            const groupedDataModel = b.reduce((acc, item) => {
                if (!acc[item.model]) {
                    acc[item.model] = true;
                }
                return acc;
            }, {});

            const categoriesModel = Object.keys(groupedDataModel);
            categoriesModel?.map((item: any) => {
                newModel.push({ name: item, value: item, selected: false })
            })
            onChangeBrand(newBrand)
            onChangeBrandSearchList(newBrand)
            onChangeModel(newModel)
            onChangeModelSearchList(newModel)
        }
    }, [list])

    const goBack = useCallback(() => {
        NavigationService.goBack()
    }, []);


    const onChangeShort = useCallback((item: any, selectIndex: number) => {
        filterSystem.updateFilterProps({ shortBy: item })
        onChangeSortBy(item)
    }, [])

    const changeBrandType = useCallback((selectedItem: any, selectIndex: number) => {

        let newBrandType = formPropsRef?.current?.brandType;
        let findValue = newBrandType?.findIndex((obj: any) => obj.value === selectedItem.value)
        if (findValue >= 0) {
            let find = newBrandType?.filter((item: any) => item.value != selectedItem.value)
            newBrandType = find
        }
        else {
            newBrandType.push(selectedItem);
        }
        onChangeBrandType(newBrandType)
        filterSystem.updateFilterProps({ brand: newBrandType })
    }, [])

    const changeModelType = useCallback((selectedItem: any, selectIndex: number) => {

        let newModelType = formPropsRef?.current?.modelType;
        let findValue = newModelType?.findIndex((obj: any) => obj.value === selectedItem.value)
        if (findValue >= 0) {
            let find = newModelType?.filter((item: any) => item.value != selectedItem.value)
            newModelType = find
        }
        else {
            newModelType.push(selectedItem);
        }
        onChangeModelType(newModelType)
        filterSystem.updateFilterProps({ model: newModelType })
    }, [])


    const updateSelectedCall = useMemo(() => memoize((item, index) => () => onChangeShort(item, index)), [])
    const updateBrandCall = useMemo(() => memoize((item, index) => () => changeBrandType(item, index)), [])
    const updateModelCall = useMemo(() => memoize((item, index) => () => changeModelType(item, index)), [])

    let brandListData = formProps?.brandSearchList?.length > 0 ? formProps?.brandSearchList : formProps?.brand;
    let modelListData = formProps?.modelSearchList?.length > 0 ? formProps?.modelSearchList : formProps?.model;


    return (
        <ScreenContainer>
            <ContentContainer>
                <CustomView noFlex row bottomWidth={1} borderColor={theme.BorderColor} style={{ height: 55 }}>
                    <CustomView noFlex style={{ height: 50, width: 50 }}>
                        <TouchableOpacity onPress={goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <CloseCircle
                                size="30"
                                color={theme.Black}
                            />
                        </TouchableOpacity>
                    </CustomView>
                    <CustomView justifyCenter alignCenter>
                        <CustomText medium md>Filter</CustomText>
                    </CustomView>
                    <CustomView noFlex style={{ height: 50, width: 50 }}>

                    </CustomView>
                </CustomView>
                <CustomView pt1 pb1 bottomWidth={1} borderColor={theme.BorderColor} >
                    <CustomText mb2 color={theme.DarkGray}>Sort By</CustomText>
                    <CustomScrollView>
                        {shortData?.map((item: any, index: number) => {
                            return (
                                <View key={"short" + index}>
                                    <TouchableOpacity onPress={updateSelectedCall(item, index)} style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                        <TickCircle
                                            size="22"
                                            color={(item?.value == formProps?.sortBy?.value) ? theme.PrimaryColor : theme.PrimaryColor}
                                            variant={(item?.value == formProps?.sortBy?.value) ? "Bold" : "Outline"}
                                        />
                                        <CustomText xs ml2>{item?.name}</CustomText>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </CustomScrollView>
                </CustomView>
                <CustomView pt1 pb1 bottomWidth={1} borderColor={theme.BorderColor} >
                    <CustomText color={theme.DarkGray}>Brand</CustomText>
                    <CustomScrollView>

                        <CustomView noFlex pl3 pr3 mt2>
                            <SearchBar placeholder={"Search"} value={formProps?.searchBrand} onChange={onChangeBrandSearch} />
                        </CustomView>
                        {brandListData?.map((item: any, index: number) => {
                            return (
                                <View key={"brand" + index}>
                                    <TouchableOpacity onPress={updateBrandCall(item, index)} style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                        <TickSquare
                                            size="22"
                                            color={formProps?.brandType?.some((val: any) => val.value === item?.value) ? theme.PrimaryColor : theme.PrimaryColor}
                                            variant={formProps?.brandType?.some((val: any) => val.value === item?.value) ? "Bold" : "Outline"}
                                        />
                                        <CustomText xs ml2>{item?.name}</CustomText>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </CustomScrollView>
                </CustomView>
                <CustomView pt1 pb1  >
                    <CustomText color={theme.DarkGray}>Model</CustomText>
                    <CustomScrollView>
                        <CustomView noFlex pl3 pr3 mt2>
                            <SearchBar placeholder={"Search"} value={formProps?.searchModel} onChange={onChangeModelSearch} />
                        </CustomView>
                        {modelListData?.map((item: any, index: number) => {
                            return (
                                <View key={"model" + index}>
                                    <TouchableOpacity onPress={updateModelCall(item, index)} style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}>
                                        <TickSquare
                                            size="22"
                                            color={formProps?.modelType?.some((val: any) => val.value === item?.value) ? theme.PrimaryColor : theme.PrimaryColor}
                                            variant={formProps?.modelType?.some((val: any) => val.value === item?.value) ? "Bold" : "Outline"}
                                        />
                                        <CustomText xs ml2>{item?.name}</CustomText>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </CustomScrollView>

                </CustomView>

                <CustomView noFlex row style={{ height: 50 }}>
                    <CustomView justifyCenter mr1 >
                        <CustomButton whiteText color={theme.ErrorColor} height={45} text={"Clear"} onPress={filterSystem.clearFilter} />
                    </CustomView>
                    <CustomView justifyCenter ml1 >
                        <CustomButton whiteText color={theme.PrimaryColor} height={45} text={"Filter"} onPress={filterSystem.saveFilter} />
                    </CustomView>

                </CustomView>


            </ContentContainer>
        </ScreenContainer >
    );
};

export default Filter;