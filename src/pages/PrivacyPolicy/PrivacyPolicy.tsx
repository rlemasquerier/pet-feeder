import React from 'react';
import { WebView } from 'react-native-webview';
import { Page, Header } from 'pet-feeder/src/components';

interface Props {}

export const PrivacyPolicy: React.FC<Props> = () => {
  return (
    <Page>
      <Header title="Politique de confidentialité" />
      <WebView source={{ uri: 'https://rlemasquerier.github.io/pet-feeder/privacy-policy/' }} />
    </Page>
  );
};
