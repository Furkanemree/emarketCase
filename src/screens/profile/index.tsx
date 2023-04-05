import React from 'react';
import ScreenContainer from '../../components/base/containers/screen-container';
import ContentContainer from '../../components/base/containers/content-container';
import useTheme from '../../utils/redux-selectors/use-theme';
import CustomView from '../../components/custom/custom-view';
import { UserTag } from 'iconsax-react-native';
import CustomText from '../../components/custom/custom-text';

const Profile: React.FC = () => {
  const theme: any = useTheme()
  return (
    <ScreenContainer>
      <ContentContainer>
        <CustomView justifyCenter alignCenter>
          <UserTag
            size="100"
            color={theme.PrimaryColor}
          />
          <CustomText mt4 center color={theme.DisabledColor} >You must be logged in to view this page</CustomText>
        </CustomView>
      </ContentContainer>
    </ScreenContainer>
  );
};

export default Profile;