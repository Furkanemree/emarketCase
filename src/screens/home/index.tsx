import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ScreenContainer from '../../components/base/containers/screen-container';
import { useDispatch, useSelector } from 'react-redux';
import CustomFlashList from '../../components/custom/custom-flash-list';
import useRefState from '../../utils/hooks/use-ref-state';
import ListItem from '../../components/page/home/list-item';
import memoize from 'fast-memoize';
import NavigationService from '../../services/NavigationService';
import AppRoutes from '../../utils/app-routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import general from '../../utils/general';
import { Actions as BasketActions } from "../../redux/basket/reducers";
import { Actions as MarketActions } from "../../redux/market/reducers";
import CommandBus from '../../infrastructure/command-bus/command-bus';
import useFilter from '../../utils/hooks/use-filter';

type Props = {
  [key: string]: any;
};
const Home: React.FC = () => {
  const dispatch = useDispatch()
  const list = useSelector((x: any) => x.market.list)
  const [formProps, formPropsRef, setFormProps] = useRefState({ loading: true, list: [] });
  const updateProps = useCallback((values: any) => setFormProps((curr: any) => ({ ...curr, ...values })), []);
  const onChangeList = useCallback((val: any) => { updateProps({ list: val, loading: false }) }, []);
  const [rKey, setRKey] = useState(general.generateRandomString(10))

  useEffect(() => {
    if (!general.isNullOrEmpty(list)) {
      onChangeList(list)
    }
  }, [list])


  const filterSystem = useFilter({
    getDefaultFilter: () => ({
    }),
    filterScreenName: AppRoutes.SharedScreens.Filter.name
  });

  const goDetail = useCallback((item: any) => {
    NavigationService.push(AppRoutes.Home.childs.HomeDetail.name, { detail: item })
  }, [])

  const addBasket = useCallback(async (item: any) => {
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
      let find = newArray.filter((element: any) => item.id == element.id)
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

  const addFavorite = useCallback(async (item: any) => {
    let favorite = JSON.parse(await AsyncStorage.getItem("favorite"))
    let newArray = new Array<any>();
    let newList = new Array<any>();
    newList = [...formPropsRef?.current?.list]
    if (general.isNullOrEmpty(favorite)) {
      newArray.push(item)
      await AsyncStorage.setItem("favorite", JSON.stringify(newArray))
      CommandBus.sc.alertSuccess("Product added to favorites")
      newList.map((newItem: any) => {
        if (newItem?.id === item.id) {
          item.isFavorite = true
        }
      })
      dispatch(MarketActions.setMarketState({
        list: newList
      }));
      setRKey(general.generateRandomString(10))
    } else {
      newArray = [...favorite]
      let find = newArray.filter((element: any) => item.id == element.id)
      if (!general.isNullOrEmpty(find)) {
        newArray = newArray.filter((element: any) => item.id != element.id)
        await AsyncStorage.setItem("favorite", JSON.stringify(newArray))
        CommandBus.sc.alertSuccess("The product has been deleted from favorites")
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
        setRKey(general.generateRandomString(10))
      } else {
        newArray.push(item)
        await AsyncStorage.setItem("favorite", JSON.stringify(newArray))
        CommandBus.sc.alertSuccess("Product added to favorites")
        newList.map((newItem: any) => {
          if (newItem?.id === item.id) {
            item.isFavorite = true
          }
        })
        dispatch(MarketActions.setMarketState({
          list: newList
        }));
        setRKey(general.generateRandomString(10))
      }
    }
  }, [formProps])

  const filterOnPress = useCallback(() => {
    filterSystem.openFilter()
  }, [])
  const basketCall = useMemo(() => memoize((item: any) => () => addBasket(item)), [])
  const favoriteCall = useMemo(() => memoize((item: any) => () => addFavorite(item)), [])
  const detailCall = useMemo(() => memoize((item: any) => () => goDetail(item)), [])
  const renderItem = useCallback(({ item, index }: Props) => <ListItem item={item} index={index} detailPress={detailCall(item)} addFavorite={favoriteCall(item)} addBasket={basketCall(item)} />, [formProps]);
  return (
    <ScreenContainer>
      {!general.isNullOrEmpty(formProps?.list) &&
        <CustomFlashList
          useData={formProps?.list}
          renderItem={renderItem}
          numColumns={2}
          reloadKey={rKey}
          filter={filterSystem.filter}
          useSearchBar
          searchPlaceHolder="Search"
          useFilter
          filterOnPress={filterOnPress}
        />
      }
    </ScreenContainer>
  );
};

export default Home;