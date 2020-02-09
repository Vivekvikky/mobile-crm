
import React from 'react';
import { Block, GalioProvider } from 'galio-framework';
import Container from './navigation/navbar';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };
  render() {
      return (
        <GalioProvider>
          <Block flex>
            <Container />
          </Block>
        </GalioProvider>
      );
  }
}


