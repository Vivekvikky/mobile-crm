import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage
} from 'react-native';

// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';

// Now UI themed components
import auth from '../services/auth';
const { width } = Dimensions.get('screen');
class Authorize extends React.Component {

  constructor(props){
    super(props);
    this.state ={
    }
  }

  async componentDidMount(){
    const login = await AsyncStorage.getItem('userData');
   if(login == null){
       this.props.navigation.navigate('Auth')
   }
   else {
    this.props.navigation.navigate('App')
   }
  }

  render(){
    return(
      <Block style={styles.container}>
        <View>
        <Text></Text>
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

export default Authorize;
