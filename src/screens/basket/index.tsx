import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import ScreenContainer from '../../components/base/containers/screen-container';
import ContentContainer from '../../components/base/containers/content-container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRefState from '../../utils/hooks/use-ref-state';
import general from '../../utils/general';
import Loading from '../../components/custom/loading';
import CustomText from '../../components/custom/custom-text';
import CustomView from '../../components/custom/custom-view';
import { useDispatch } from 'react-redux';
import BasketListItem from '../../components/page/basket/list-item';
import memoize from 'fast-memoize';
import { useIsFocused } from '@react-navigation/native';
import { Actions as BasketActions } from "../../redux/basket/reducers";
import CustomScrollView from '../../components/custom/custom-scroll-view';
import { ShoppingCart } from 'iconsax-react-native';
import useTheme from '../../utils/redux-selectors/use-theme';

type Props = {
  [key: string]: any;
};
const Basket: React.FC = () => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const theme: any = useTheme()
  const [formProps, formPropsRef, setFormProps] = useRefState({ loading: true, basket: [] });
  const updateProps = useCallback((values: any) => setFormProps((curr: any) => ({ ...curr, ...values })), []);
  const onChangeBasket = useCallback((val: any) => { updateProps({ basket: val, loading: false }) }, []);


  const getBasket = useCallback(async () => {
    let basket = JSON.parse(await AsyncStorage.getItem("basket"))
    if (!general.isNullOrEmpty(basket)) onChangeBasket(basket)
    else onChangeBasket([])
  }, [formProps])

  useEffect(() => {
    getBasket()
  }, [isFocused])



  const onMinus = useCallback(async (item: any) => {
    let basket = JSON.parse(await AsyncStorage.getItem("basket"))
    if (item?.quantity > 1) {
      basket?.map((element: any) => {
        if (element.id === item.id) {
          if (element.quantity > 1) {
            element.quantity -= 1
          }
        }
      })
      await AsyncStorage.setItem("basket", JSON.stringify(basket))
    } else {
      let find = basket.filter((element: any) => item.id != element.id)
      await AsyncStorage.setItem("basket", JSON.stringify(find))
      dispatch(BasketActions.setBasketState({
        count: find.length
      }));
    }
    let updateBasket = JSON.parse(await AsyncStorage.getItem("basket"))
    onChangeBasket(updateBasket)
  }, [])


  const onAdd = useCallback(async (item: any) => {
    let basket = JSON.parse(await AsyncStorage.getItem("basket"))
    basket?.map((element: any) => {
      if (element.id === item.id) {
        element.quantity += 1
      }
    })
    await AsyncStorage.setItem("basket", JSON.stringify(basket))
    let updateBasket = JSON.parse(await AsyncStorage.getItem("basket"))
    onChangeBasket(updateBasket)
  }, [])


  const addCall = useMemo(() => memoize((item: any) => () => onAdd(item)), [])
  const minusCall = useMemo(() => memoize((item: any) => () => onMinus(item)), [])
  const renderItem = useCallback((item: any, index: number) => <BasketListItem key={index} item={item} index={index} onMinus={minusCall(item)} onAdd={addCall(item)} />, []);

  return (
    <ScreenContainer>
      <ContentContainer>
        {formProps?.loading &&
          <Loading />
        }
        {!formProps?.loading &&
          <>
            {!general.isNullOrEmpty(formProps?.basket) &&
              <CustomScrollView>
                {formProps?.basket?.map((item: any, index: number) => {
                  return renderItem(item, index)
                })}
              </CustomScrollView>
            }
            {general.isNullOrEmpty(formProps?.basket) &&
              <CustomView justifyCenter alignCenter>
                <ShoppingCart
                  size="100"
                  color={theme.PrimaryColor}
                />
                <CustomText mt4 color={theme.DisabledColor} center>Add items to your cart</CustomText>
              </CustomView>
            }
          </>
        }

      </ContentContainer>
    </ScreenContainer>
  );
};

export default Basket;