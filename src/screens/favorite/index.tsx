import React, { useCallback, useEffect, useMemo } from 'react';
import ScreenContainer from '../../components/base/containers/screen-container';
import ContentContainer from '../../components/base/containers/content-container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRefState from '../../utils/hooks/use-ref-state';
import general from '../../utils/general';
import Loading from '../../components/custom/loading';
import CustomText from '../../components/custom/custom-text';
import CustomView from '../../components/custom/custom-view';
import { useDispatch } from 'react-redux';
import memoize from 'fast-memoize';
import { useIsFocused } from '@react-navigation/native';
import CustomScrollView from '../../components/custom/custom-scroll-view';
import { Star } from 'iconsax-react-native';
import useTheme from '../../utils/redux-selectors/use-theme';
import FavoriteListItem from '../../components/page/favorite/list-item';
type Props = {
  [key: string]: any;
};
const Favorite: React.FC = () => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const theme: any = useTheme()
  const [formProps, formPropsRef, setFormProps] = useRefState({ loading: true, favorite: [] });
  const updateProps = useCallback((values: any) => setFormProps((curr: any) => ({ ...curr, ...values })), []);
  const onChangeFavorite = useCallback((val: any) => { updateProps({ favorite: val, loading: false }) }, []);

  const getFavorite = useCallback(async () => {
    let favorite = JSON.parse(await AsyncStorage.getItem("favorite"))
    if (!general.isNullOrEmpty(favorite)) onChangeFavorite(favorite)
    else onChangeFavorite([])
  }, [formProps])

  useEffect(() => {
    getFavorite()
  }, [isFocused])


  const onDelete = useCallback(async (item: any) => {
    let favorite = JSON.parse(await AsyncStorage.getItem("favorite"))
    let newArray = new Array<any>();
    newArray = [...favorite]
    let find = newArray.filter((element: any) => item.id != element.id)
    await AsyncStorage.setItem("favorite", JSON.stringify(find))
    getFavorite()
  }, [])


  const deleteCall = useMemo(() => memoize((item: any) => () => onDelete(item)), [])
  const renderItem = useCallback((item: any, index: number) => <FavoriteListItem key={index} item={item} index={index} deleteFavorite={deleteCall(item)} />, []);
  return (
    <ScreenContainer>
      <ContentContainer>
        {formProps?.loading &&
          <Loading />
        }
        {!formProps?.loading &&
          <>
            {!general.isNullOrEmpty(formProps?.favorite) &&
              <CustomScrollView>
                {formProps?.favorite?.map((item: any, index: number) => {
                  return renderItem(item, index)
                })}
              </CustomScrollView>
            }
            {general.isNullOrEmpty(formProps?.favorite) &&
              <CustomView justifyCenter alignCenter>
                <Star
                  size="100"
                  color={theme.PrimaryColor}
                />
                <CustomText mt4 color={theme.DisabledColor} center>Your favorites list is empty</CustomText>
              </CustomView>
            }
          </>
        }

      </ContentContainer>
    </ScreenContainer>
  );
};

export default Favorite;