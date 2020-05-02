import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Value } from 'react-native-reanimated';
import { withSpringTransition } from 'react-native-redash';
import { Page } from 'pet-feeder/src/components';
import theme from 'pet-feeder/src/theme';
import { HOCProps as PageHOCProps } from './withPageAnimation';
import { HOCProps as MenuHOCProps } from './withMenuAnimation';

interface HOCProps {
  pageContainerStyle: ViewStyle;
  menuContainerStyle: ViewStyle;
}

export const pageWithAnimatedMenu = (
  WrappedPage: React.FC<PageHOCProps>,
  WrappedMenu: React.FC<MenuHOCProps>
) => {
  const HOC = ({ pageContainerStyle, menuContainerStyle }: HOCProps) => {
    const open = new Value<0 | 1>(0);
    const transition = withSpringTransition(open);
    return (
      <Page>
        <View style={styles.container}>
          <WrappedPage
            containerStyle={pageContainerStyle}
            onPress={() => open.setValue(1)}
            transition={transition}
          />
          <View style={styles.layer} pointerEvents="box-none">
            <WrappedMenu containerStyle={menuContainerStyle} transition={transition} open={open} />
          </View>
        </View>
      </Page>
    );
  };

  return HOC;
};

interface Style {
  container: ViewStyle;
  layer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: theme.colors.black,
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
});
