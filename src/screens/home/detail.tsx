import React, { useCallback, useEffect } from 'react';
import ScreenContainer from '../../components/base/containers/screen-container';
import ContentContainer from '../../components/base/containers/content-container';
import useRefState from '../../utils/hooks/use-ref-state';
import useParams from '../../utils/hooks/use-params';
import general from '../../utils/general';
import Loading from '../../components/custom/loading';
import CustomScrollView from '../../components/custom/custom-scroll-view';
import CustomImage from '../../components/custom/custom-image';
import CustomView from '../../components/custom/custom-view';
import CustomText from '../../components/custom/custom-text';
import useTheme from '../../utils/redux-selectors/use-theme';
import CustomButton from '../../components/custom/custom-button';
import { Star1 } from 'iconsax-react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Actions as BasketActions } from "../../redux/basket/reducers";
import { useDispatch, useSelector } from 'react-redux';
import CommandBus from '../../infrastructure/command-bus/command-bus';
import { Actions as MarketActions } from "../../redux/market/reducers";

type Props = {
    [key: string]: any;
};
const Detail: React.FC = () => {
    const { detail }: any = useParams()
    const list = useSelector((x: any) => x.market.list)
    const dispatch = useDispatch()
    const theme: any = useTheme()
    const [formProps, formPropsRef, setFormProps] = useRefState({ detail: [] });
    const updateProps = useCallback((values: any) => setFormProps((curr: any) => ({ ...curr, ...values })), []);
    const onChangeDetail = useCallback((val: any) => { updateProps({ detail: val }) }, []);
    const onChangeList = useCallback((val: any) => { updateProps({ list: val, loading: false }) }, []);
    useEffect(() => {

    }, [list])

    useEffect(() => {
        if (!general.isNullOrEmpty(list)) onChangeList(list)
        if (!general.isNullOrEmpty(detail)) onChangeDetail(detail)
    }, [detail, list])

    const addBasket = useCallback(async () => {
        let item = { ...formPropsRef?.current?.detail }
        let basket = JSON.parse(await AsyncStorage.getItem("basket"))
        let newArray = new Array<any>();

        if (general.isNullOrEmpty(basket)) {
            newArray.push({ ...item, quantity: 1 })
            await AsyncStorage.setItem("basket", JSON.stringify(newArray))
            dispatch(BasketActions.setBasketState({
                count: newArray.length
            }));
        } else {
            newArray = [...basket]
            let find = newArray.filter((element: any) => item?.id == element.id)
            if (!general.isNullOrEmpty(find)) {
                newArray.map((element: any) => {
                    if (element.id === item.id) {
                        element.quantity += 1
                    }
                })
                await AsyncStorage.setItem("basket", JSON.stringify(newArray))
            } else {
                newArray.push({ ...item, quantity: 1 })
                await AsyncStorage.setItem("basket", JSON.stringify(newArray))
                dispatch(BasketActions.setBasketState({
                    count: newArray.length
                }));
            }
        }
        CommandBus.sc.alertSuccess("Product added to cart")
    }, [])

    const addFavorite = useCallback(async () => {
        let newArray = new Array<any>();
        let newList = new Array<any>();
        newList = [...formPropsRef?.current?.list]
        let item = { ...formPropsRef?.current?.detail }
        let favorite = JSON.parse(await AsyncStorage.getItem("favorite"))
        if (!general.isNullOrEmpty(favorite)) {
            let find = favorite.filter((element: any) => item.id == element.id)
            if (!general.isNullOrEmpty(find)) {
                newArray = favorite.filter((element: any) => item.id != element.id)
                await AsyncStorage.setItem("favorite", JSON.stringify(newArray))
                CommandBus.sc.alertSuccess("The product has been deleted from favorites")
                let newDetail = { ...formPropsRef?.current?.detail }
                newDetail.isFavorite = false
                onChangeDetail(newDetail)
                newList.map((newItem: any, index: number) => {
                    if (newItem?.id === newArray[index]?.id) {
                        item.isFavorite = true
                    } else {
                        item.isFavorite = false
                    }
                })
                dispatch(MarketActions.setMarketState({
                    list: newList
                }));
            } else {
                newArray.push(item)
                await AsyncStorage.setItem("favorite", JSON.stringify(newArray))
                CommandBus.sc.alertSuccess("Product added to favorites")
                let newDetail = { ...formPropsRef?.current?.detail }
                newDetail.isFavorite = true
                onChangeDetail(newDetail)
                newList.map((newItem: any) => {
                    if (newItem?.id === item.id) {
                        item.isFavorite = true
                    }
                })
                dispatch(MarketActions.setMarketState({
                    list: newList
                }));
            }
        } else {
            newArray.push(item)
            await AsyncStorage.setItem("favorite", JSON.stringify(newArray))
            CommandBus.sc.alertSuccess("Product added to favorites")
            let newDetail = { ...formPropsRef?.current?.detail }
            newDetail.isFavorite = true
            onChangeDetail(newDetail)
            newList.map((newItem: any) => {
                if (newItem?.id === item.id) {
                    item.isFavorite = true
                }
            })
            dispatch(MarketActions.setMarketState({
                list: newList
            }));
        }
    }, [])
    return (
        <ScreenContainer>
            <ContentContainer>
                {general.isNullOrEmpty(formProps?.detail) &&
                    <Loading />
                }
                {!general.isNullOrEmpty(formProps?.detail) &&
                    <CustomView>
                        <CustomScrollView  >
                            <CustomView noFlex mt1>
                                <CustomView noFlex borderRadius={10} style={{ height: 250, width: '100%' }}>
                                    <CustomImage source={formProps?.detail?.image} style={{ height: 250, width: '100%', borderRadius: 10 }} resizeMode={"cover"} />
                                </CustomView>
                                <CustomView noFlex style={{ width: 24, height: 24, position: 'absolute', right: 6, top: 6, zIndex: 9999 }}>
                                    <TouchableOpacity onPress={addFavorite} activeOpacity={.7} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Star1
                                            size="22"
                                            color={formProps?.detail?.isFavorite ? theme.StarColor : theme.StarDisabledColor}
                                            variant="Bold"
                                        />
                                    </TouchableOpacity>
                                </CustomView>
                            </CustomView>
                            <CustomView noFlex mt2>
                                <CustomText bold xlg>{formProps?.detail?.name}</CustomText>
                            </CustomView>
                            <CustomView noFlex mt2>
                                <CustomText xs>{formProps?.detail?.description}</CustomText>
                            </CustomView>
                        </CustomScrollView>
                        <CustomView noFlex row mt2 style={{ height: 50 }}>
                            <CustomView>
                                <CustomText color={theme.PrimaryColor}>{"Price:"}</CustomText>
                                <CustomText bold md>{general.currencyFormat(formProps?.detail?.price)}</CustomText>
                            </CustomView>
                            <CustomView justifyCenter >
                                <CustomButton onPress={addBasket} whiteText color={theme.PrimaryColor} height={36} text={"Add to Card"} />
                            </CustomView>
                        </CustomView>
                    </CustomView>
                }
            </ContentContainer>
        </ScreenContainer>
    );
};

export default Detail;