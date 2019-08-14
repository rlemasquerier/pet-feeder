import React, { Component, ReactNode, createRef } from 'react';
import Animation from 'lottie-react-native';

interface Props {
  size: number;
  name: string;
}

export class LottieAnimation extends Component<Props, {}> {
  private animation = createRef<Animation>();

  public componentDidMount() {
    this.animation.current && this.animation.current.play();
  }
  public render(): ReactNode {
    return (
      <Animation
        ref={this.animation}
        style={{
          width: this.props.size,
          height: this.props.size,
        }}
        loop={true}
        source={this.props.name}
      />
    );
  }
}
