import React, { Component, ReactNode, createRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animation from 'lottie-react-native';

import anim from '../../theme/animations/loading.json';

interface Props {
  size: number;
}

export class Loader extends Component<Props, {}> {
  private animation = createRef<Animation>();

  public componentDidMount() {
    this.animation.current && this.animation.current.play();
  }
  public render(): ReactNode {
    return (
      <View style={styles.container}>
        <Animation
          ref={this.animation}
          style={{
            width: this.props.size,
            height: this.props.size,
          }}
          loop={true}
          source={anim}
        />
      </View>
    );
  }
}

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
