import React, { Component, ReactNode } from 'react';
import { ScrollView, Text, View, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Page, Card, Calendar, RoundButton } from '../../components';
import theme from '../../theme';
import firebase from 'react-native-firebase';

const TOP_BANNER_HEIGHT = 50;

export class Home extends Component<NavigationScreenProps, {}> {
  private logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      });
  };

  public render(): ReactNode {
    return (
      <Page>
        <View style={styles.topBanner}>
          <Text style={styles.topBannerText}>Bonjour Rodolphe !</Text>
          <Text style={styles.topBannerText} onPress={this.logout}>
            Logout
          </Text>
        </View>
        <View style={styles.content}>
          <Calendar />
          <ScrollView>
            <Card title="Matin" content="Gaïa a été nourrie par Yoann !" />
            <Card title="Soir" content="La gamelle de Gaïa est vide !" />
            <View style={styles.buttonsContainer}>
              <RoundButton
                iconName="cross"
                color={theme.colors.secondaryAction}
                iconColor={theme.colors.white}
              />
              <RoundButton
                iconName="spoon-knife"
                color={theme.colors.action}
                iconColor={theme.colors.black}
              />
            </View>
          </ScrollView>
        </View>
      </Page>
    );
  }
}

interface Style {
  content: ViewStyle;
  topBanner: ViewStyle;
  topBannerText: TextStyle;
  buttonsContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  content: {
    flex: 1,
    overflow: 'hidden',
    paddingHorizontal: theme.margins.pagePadding,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.backgroundColor,
  },
  topBanner: {
    height: TOP_BANNER_HEIGHT,
    backgroundColor: theme.colors.banner,
    paddingHorizontal: 2 * theme.margins.unit,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBannerText: {
    ...theme.fonts.regular,
    color: theme.colors.white,
  },
  buttonsContainer: {
    marginVertical: 5 * theme.margins.unit,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
