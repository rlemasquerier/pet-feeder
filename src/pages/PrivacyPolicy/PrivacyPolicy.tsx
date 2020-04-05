import React from 'react';
import { WebView } from 'react-native-webview';
import { Page, Header } from 'pet-feeder/src/components';

interface Props {}

export const PrivacyPolicy: React.FC<Props> = () => {
  // TODO: It doesn't work without timeout. Why ?
  const INJECTED_JAVASCRIPT = `
    setTimeout(() => {
      header = document.getElementById('header');
      header.parentNode.removeChild(header);
      footer = document.getElementById('footer');
      footer.parentNode.removeChild(footer);
    }, 100);
    true;   
  `;

  return (
    <Page>
      <Header title="Politique de confidentialité" />
      <WebView
        source={{ uri: 'https://rlemasquerier.github.io/pet-feeder/privacy-policy/' }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
      />
    </Page>
  );
};
