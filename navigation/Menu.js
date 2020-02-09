import React from 'react';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, Linking, ImageBackground,AsyncStorage } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
// import pis from '../assets/imgs/lll.png'
import { Icon } from 'react-native-elements'
import { DrawerItem } from '../components/index';
import auth from '../services/auth';
const { width } = Dimensions.get('screen');

  signout=(props)=>{
   auth.logout();
  props.navigation.navigate("login");
  }
const Drawer = props => (
  <Block style={styles.container} >
    {/* <ImageBackground 
     source={Images.RegisterBackground}
     style={styles.imageBackgroundContainer}
     imageStyle={styles.imageBackground}></ImageBackground> */}
    <Block style={styles.header}>
      {/* <Image style={styles.logo} source={pis} /> */}
      <Icon
          reverse
          name='ios-person'
          type='ionicon'
          size={50}
          color='#87cefa'
          />
    </Block>

    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerNavigatorItems {...props} />
        <TouchableOpacity onPress={()=>{this.signout(props)}}
          style={{ marginLeft: 6}}
        ><DrawerItem {...props} title="LOGOUT" /></TouchableOpacity>
      </ScrollView>
    </Block>
  </Block>
);

const Menu = {
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: '#9370db',
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor:'white',
    activeBackgroundColor: 'transparent',
    itemStyle: {
      width: width * 0.75,
      backgroundColor: 'transparent'
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: 'normal'
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    alignContent:'center',
    paddingHorizontal:100,
    marginBottom:20,
    marginTop:60,
    justifyContent: 'center'
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 120,
    width: '100%'
  }
});

export default Menu;
