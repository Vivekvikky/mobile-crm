import React from 'react';
import { StyleSheet,Button,TextInput,Dimensions,ImageBackground,Image } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import PTRView from 'react-native-pull-to-refresh';
const { width, height } = Dimensions.get('screen');
import auth from '../services/auth'
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
         email:'',
         password:''
        };
      }

      _refresh() {
        return new Promise((resolve) => {
          setTimeout(()=>{resolve()}, 2000)
        });
      }

      login=event=>{
        event.preventDefault();
        // this.props.navigation.navigate('MyOrders');
         const data=this.state
         if(data.email != ''){
           if(data.password != ''){
            auth.userLogin(data).then(res=>{
              console.log("222222222",res)
              this.setState({email:'',password:''})
              const resData=JSON.parse(res);
              // console.log("111111111",resData.token)
              if(resData.token != undefined){
                this.props.navigation.navigate('App');
              }
              else{
                alert(resData.message)
              }
            })
            // auth.userLogin(data).then(res=>{
            //   // console.log("3333333",res)
            //   this.setState({email:'',password:''})
            //   const resData=JSON.parse(res);
            //   // console.log("111111111",resData.token)
            //   if(resData.token != undefined){
            //     this.props.navigation.navigate('App');
            //   }
            //   else{
            //     alert(resData.message)
            //   }
            // })
           }
           else {
            alert('Please Enter Password');
          }
         }
         else {
          alert('Please Enter Email');
        } 
      }

      onChangeText = (key, val) => {
        this.setState({ [key]: val })
      }
      
    render(){
      // console.log(this.state)
        return(
          <PTRView onRefresh={this._refresh}>
          <Block flex> 
             {/* <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          > */}
         <Block flex style={styles.group}>
           <Text size={35} style={styles.title}>
            Login 
           </Text>
           {/* <Block style={styles.logo}>
           <Image source={Images.CreativeTimLogo} />
           </Block> */}
           <Block style={{marginTop:40}}>
              <TextInput
                value ={this.state.email}
                style={styles.input}
                placeholder='Email'
                iconContent={<Block />}
                shadowless
                onChangeText={val => this.onChangeText('email', val)}
               />
              </Block>
              <Block>
              <TextInput
              value={this.state.password}
                style={styles.input}
                placeholder='Password'
                iconContent={<Block />}
                shadowless
                onChangeText={val => this.onChangeText('password', val)}
               />
              </Block>
              <Block style={styles.button}>
              <Button
                title="Login"
                color="#8fbc8f"
                onPress={this.login} />
              </Block>
        </Block>
        {/* </ImageBackground> */}
        </Block>
        </PTRView>
        )
    }
}
const styles = StyleSheet.create({
  logo:{
    width:400,
    height:200
  },
    title: {
     marginTop:50,
     alignItems:'center',
      marginTop: 100,
    },
    group: {
        marginTop:100,
        width:'100%',
        alignItems:'center',
      },
      input: {
        width: 350,
        height: 55,
        backgroundColor:'#696969',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
      },
      button:{
        marginTop:40,
        // borderRadius:14,
        width:'30%',
      },
      imageBackgroundContainer: {
        width: width,
        height: height,
        padding: 0,
        zIndex: 1
      },
      imageBackground: {
        width: width,
        height: height
      },
    
})
export default Login;
