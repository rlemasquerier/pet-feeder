import React, { useState } from 'react';
import { Text, TextStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { useCurrentUser } from 'pet-feeder/src/hooks';
import theme from './../../theme';
import { Page, TopBanner, TribeCode, Button, Loader } from 'pet-feeder/src/components';
import { navigator, PAGES } from 'pet-feeder/src/services/navigation';
import { CreateTribe } from './CreateTribe';
import { JoinTribe } from './JoinTribe';

interface Props {}

export const JoinOrCreateTribe: React.FC<Props> = () => {
  const [code, setCode] = useState<string | null>(null);
  const { user, refetchUser } = useCurrentUser();
  if (!user) {
    return <Loader size={100} />;
  }
  const onPressCreateTribeContinue = async () => {
    await refetchUser();
    navigator.navigate(PAGES.HOME);
  };
  return (
    <Page>
      <TopBanner label={`Bienvenue, ${user.name} !`} />
      <View style={styles.container}>
        <Text style={styles.titleText}>Que souhaites-tu faire ?</Text>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.subtitleText}>Créer une nouvelle coloc</Text>
          {!code && <CreateTribe onCodeReceived={setCode} />}
          {!!code && (
            <>
              <Text style={{ marginVertical: 3 * theme.margins.unit }}>
                {`Voici le code de ta coloc. Donne-le à tes colocs pour qu'ils puissent te rejoindre !`}
              </Text>
              <TribeCode code={code} />
              <View style={{ marginVertical: 3 * theme.margins.unit }}>
                <Button label="Continuer" onPress={onPressCreateTribeContinue} isLoading={false} />
              </View>
            </>
          )}
          {!code && <JoinTribe />}
        </View>
      </View>
    </Page>
  );
};

interface Style {
  container: ViewStyle;
  titleText: TextStyle;
  subtitleText: TextStyle;
  codeText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    padding: 5 * theme.margins.unit,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  titleText: {
    ...theme.fonts.hugeStrong,
  },
  subtitleText: {
    ...theme.fonts.big,
  },
  codeText: {
    ...theme.fonts.code,
  },
});
