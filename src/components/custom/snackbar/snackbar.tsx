import * as React from 'react';
import {
  Animated,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  Platform
} from 'react-native';
import CustomText from '../custom-text/index'
import {
  Button,
  Surface,
  withTheme,
} from 'react-native-paper';
import useTheme from "../../../utils/redux-selectors/use-theme"


export type SnackbarProps = React.ComponentProps<typeof Surface> & {
  /**
   * Whether the Snackbar is currently visible.
   */
  visible: boolean;

  type?: string;
  /**
   * Label and press callback for the action button. It should contain the following properties:
   * - `label` - Label of the action button
   * - `onPress` - Callback that is called when action button is pressed.
   */
  action?: Omit<React.ComponentProps<typeof Button>, 'children'> & {
    label: string;
  };
  /**
   * The duration for which the Snackbar is shown.
   */
  duration?: number;
  /**
   * Callback called when Snackbar is dismissed. The `visible` prop needs to be updated when this is called.
   */
  onDismiss: () => void;
  /**
   * Text content of the Snackbar.
   */
  children: React.ReactNode;
  /**
   * Style for the wrapper of the snackbar
   */
  wrapperStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<View>;
  /**
   * @optional
   */
  theme: ReactNativePaper.Theme;
};

const DURATION_SHORT = 4000;
const DURATION_MEDIUM = 7000;
const DURATION_LONG = 10000;


const Snackbar = ({
  visible,
  action,
  duration = DURATION_MEDIUM,
  onDismiss,
  children,
  wrapperStyle,
  style,
  theme,
  type,
  ...rest
}: SnackbarProps) => {
  const { current: opacity } = React.useRef<Animated.Value>(
    new Animated.Value(0.0)
  );
  const [hidden, setHidden] = React.useState<boolean>(!visible);

  const hideTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const themeColor: any = useTheme();
  const { scale } = theme.animation;

  React.useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, []);

  React.useLayoutEffect(() => {
    if (visible) {
      // show
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      setHidden(false);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200 * scale,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          const isInfinity =
            duration === Number.POSITIVE_INFINITY ||
            duration === Number.NEGATIVE_INFINITY;

          if (finished && !isInfinity) {
            hideTimeout.current = (setTimeout(
              onDismiss,
              duration
            ) as unknown) as NodeJS.Timeout;
          }
        }
      });
    } else {
      // hide
      if (hideTimeout.current) clearTimeout(hideTimeout.current);

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100 * scale,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setHidden(true);
      });
    }
  }, [visible, duration, opacity, scale, onDismiss]);

  const { colors, roundness } = theme;

  if (hidden) return null;

  const {
    style: actionStyle,
    label: actionLabel,
    onPress: onPressAction,
    ...actionProps
  } = action || {};

  return (
    <SafeAreaView
      pointerEvents="box-none"
      style={[styles.wrapper, wrapperStyle]}
    >
      <Surface
        pointerEvents="box-none"
        accessibilityLiveRegion="polite"
        style={
          [
            styles.container,
            {
              borderRadius: 10,
              opacity: opacity,
              transform: [
                {
                  scale: visible
                    ? opacity.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    })
                    : 1,
                },
              ],
              shadowColor: "#999",
              ...Platform.select({
                ios: {
                  shadowColor: themeColor.ShadowColorIOS,
                  shadowOffset: {
                    width: -1,
                    height: 1,
                  },
                  shadowOpacity: 0.12,
                  shadowRadius: 2.20,

                  elevation: 2,
                },
                android: {
                  shadowColor: themeColor.ShadowColorAndroid,
                  elevation: 4,

                },
              }),
            },
            { backgroundColor: themeColor.White },
            style,
          ] as StyleProp<ViewStyle>
        }
        {...rest}
      >
        <View style={{ width: 6, height: '100%', backgroundColor: type == 'success' ? themeColor.SuccessColor : themeColor.ErrorColor, borderBottomRightRadius: 10, borderTopRightRadius: 10, marginTop: -1, marginBottom: -1 }}>
          <Text>{""}</Text>
        </View>
        <CustomText xs bold color={themeColor.DarkGray} ml2>
          {children}
        </CustomText>
      </Surface>
    </SafeAreaView >
  );
};

/**
 * Show the Snackbar for a short duration.
 */
Snackbar.DURATION_SHORT = DURATION_SHORT;

/**
 * Show the Snackbar for a medium duration.
 */
Snackbar.DURATION_MEDIUM = DURATION_MEDIUM;

/**
 * Show the Snackbar for a long duration.
 */
Snackbar.DURATION_LONG = DURATION_LONG;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 70,
    left: 20, right: 20
  },
  container: {
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 10,
    paddingRight: 20,
    height: 50

  },
  content: {
    marginLeft: 16,
    marginVertical: 14,
    flexWrap: 'wrap',
    flex: 1,
  },
  button: {
    marginHorizontal: 8,
    marginVertical: 6,
  },
});

export default withTheme(Snackbar);