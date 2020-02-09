import React,{Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import Login from '../screens/login';
import Screens from './Screens'
import Authorize from '../screens/authorize';
const NavigationStack = createStackNavigator({
    screens:{
    screen: Screens,
    navigationOptions: { header: null}
  },

});
const NavigationStack1 = createStackNavigator({
    login:{
    screen: Login,
    navigationOptions: { header: null}
  },
});
// const Container = createAppContainer({NavigationStack,authorize:Authorize},{initialRouteName: 'authorize',});

// export default Container; 
export default Container= createAppContainer(createSwitchNavigator(
    {
      AuthLoading: Authorize,
      App: NavigationStack,
      Auth: NavigationStack1,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));