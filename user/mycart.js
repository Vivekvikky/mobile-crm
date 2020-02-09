import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground,View,AsyncStorage
} from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import auth from '../services/auth';
const { width } = Dimensions.get('screen');
class MyCart extends React.Component {

  constructor(props){
    super(props);
    
    this.state ={  
    }
  }
  render(){
    
    return(
      <Block style={styles.container}>
        <View>
        <Text>My Cart...............</Text>
        </View>
     </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom:20,
    paddingHorizontal: 10,
    marginTop: 44,
    color: '#ff0000'
  },
});

export default MyCart;
