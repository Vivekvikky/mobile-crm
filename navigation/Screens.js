import React from 'react';
import { Block } from "galio-framework";
import { Easing, Animated } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
// screens
// import Login from '../screens/login';
import MyOrders from  '../user/myOrders';
import MyCart from '../user/mycart';
import Profile from '../user/profile';
import Address from '../user/address';
// drawer
import Menu from './Menu';
import DrawerItem from '../components/DrawerItem';

// header for screens
import Header from '../components/Header';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index;
    const width = layout.initWidth;

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    });
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1]
    });
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0]
    });

    const scaleWithOpacity = { opacity };
    const screenName = 'Search';

    if (
      screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    ) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] };
  }
});

const MyOrdersStack = createStackNavigator(
  {
    MyOrders: {
      screen: MyOrders,
      navigationOptions: ({ navigation }) => ({
        header: <Header search options title="My Orders" navigation={navigation} />
      })
    }
  },
  {
    cardStyle: {
      backgroundColor: 'white'
    },
    transitionConfig
  }
);

const MyCartStack = createStackNavigator(
  {
    MyCart: {
      screen: MyCart,
      navigationOptions: ({ navigation }) => ({
        header: (
          <Header search options title="My Cart" navigation={navigation} />
        ),
        headerTransparent: true
      })
    }
  },
  {
    cardStyle: { backgroundColor: '#ffebcd' },
    transitionConfig
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Profile" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: '#dda0dd'
    },
    transitionConfig
  }
);

const AddressStack = createStackNavigator(
  {
    Address: {
      screen: Address,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Address" navigation={navigation} />
      })
    },
  },
  {
    cardStyle: {
      backgroundColor: 'white'
    },
    transitionConfig
  }
);
const AppStack = createDrawerNavigator(
  {
    // Login: {
    //   screen: Login,
    //   navigationOptions: {
    //     drawerLabel: () => { }
    //   }
    // },
    MyOrders: {
      screen: MyOrdersStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => <DrawerItem screen="MyOrders" focused={focused} title="My Orders" />
      })
    },
    // MyCart: {
    //   screen: MyCartStack,
    //   navigationOptions: navOpt => ({
    //     drawerLabel: ({ focused }) => (
    //       <DrawerItem focused={focused} title="My Cart" />
    //     )
    //   })
    // },
    Profile: {
      screen: ProfileStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Profile" title="Profile" />
        )
      })
    },
    Address: {
      screen: AddressStack,
      navigationOptions: navOpt => ({
        drawerLabel: ({ focused }) => (
          <DrawerItem focused={focused} screen="Address" title="Address" />
        )
      })
    },
  },
  Menu
);

const AppContainer = createAppContainer(AppStack);
export default AppContainer;
