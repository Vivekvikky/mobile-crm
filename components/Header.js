import React from 'react';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';

import Icon from './Icon';
import Input from './Input';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="What are you looking for?"
        placeholderTextColor={'#8898AA'}
        onFocus={() => navigation.navigate('Search')}
        iconContent={
          <Icon size={16} color='#fff5ee' name="zoom-bold2x" family="NowExtra" />
        }
      />
    );
  };

  renderHeader = () => {
    const { search, options, tabs } = this.props;
    if (search || tabs || options) {
      return (
        <Block center>
          {search ? this.renderSearch() : null}
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;
    const { routeName } = navigation.state;
    const noShadow = ['Search'].includes(routeName);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <Block >
        <NavBar
          title={title}
          style={navbarStyles}
          transparent={transparent}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'minimal-left2x' : 'align-left-22x'}
              family="NowExtra"
              size={20}
              onPress={this.handleLeftPress}
              color={iconColor || '#000000'}
            />
          }
          leftStyle={{ paddingVertical:10, flex: 0.3 }}
          titleStyle={[
            styles.title,
            { color:'black'},
            titleColor && { color: titleColor }
          ]}
          // {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom:20,
    paddingTop: iPhoneX ? 60 : 30,
    height:'10%'
    // zIndex: 5
  },
  shadow: {
    backgroundColor:'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  header: {
    backgroundColor:'black'
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#d3d3d3'
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4
  },
  tab: {
    backgroundColor: '#b0e0e6',
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
});

export default withNavigation(Header);
