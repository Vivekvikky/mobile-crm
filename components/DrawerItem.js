import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import Icon from './Icon';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'My Orders':
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? 'rgb(0,0,255)' : 'white'}
            style={{ opacity: 0.5 }}
            />
        );
      // case 'My Cart':
      //   return (
      //     <Icon
      //       name="cart-simple2x"
      //       family="NowExtra"
      //       size={18} color={focused ? 'rgb(0,0,255)' : 'white'}
      //       style={{ opacity: 0.5 }}
      //       />
      //   );
      case 'Profile':
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={focused ? 'rgb(0,0,255)' : 'white'}
            style={{ opacity: 0.5 }}
            />
        );
        case 'Address':
          return (
            <Icon
              name="profile-circle"
              family="NowExtra"
              size={18}
              color={focused ? 'rgb(0,0,255)' : 'white'}
              style={{ opacity: 0.5 }}
              />
          );
          // case 'Products':
          //   return (
          //     <Icon
          //       name="app2x"
          //       family="NowExtra"
          //       size={18}
          //       color={focused ? 'rgb(0,0,255)' : 'white'}
          //       style={{ opacity: 0.5 }}
          //       />
          //   );
            case 'LOGOUT':
              return (
                <Icon
                  name="share"
                  family="NowExtra"
                  size={18}
                  style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
                  color={focused ? '#ffa500' : 'white'}
                />
              );
      default:
        return null;
    }
  };

  render() {
    const { focused, title } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={{ marginRight: 5 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            style={{ textTransform: 'uppercase', fontWeight: '300' }}
            size={12}
            bold={focused ? true : false}
            color={focused ? 'rgb(0,0,255)' : 'white'}
          >
            {title}
          </Text>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white'
  },
  activeStyle: {
    backgroundColor:'white',
    borderRadius: 30,
    color: 'white'
  },
  shadow: {
    shadowColor:"white",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

export default DrawerItem;
