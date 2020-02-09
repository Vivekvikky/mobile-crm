import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image,TextInput, ImageBackground, Platform,AsyncStorage,View,Modal,Button } from 'react-native';
// import Modal from "react-native-modal";
import { Block, Text, theme } from 'galio-framework';
const { width, height } = Dimensions.get('screen');
// import auth from '../services/auth'
// import profile from '../assets/profile circle.png'
import userService from '../services/userService'
import { Icon } from 'react-native-elements'
const thumbMeasure = (width - 48 - 32) / 3;
import PTRView from 'react-native-pull-to-refresh';
import auth from '../services/auth';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:'',
      UserProfile:'',
      modalVisible: false,
      name:'',email:'',phone:'',city:'',country:'',
    }
  }

   _refresh() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }

  editUser() {
    //  console.log("11111111111111",data);
    this.setState({
        'modalVisible': true,
    });
  }

  hideModalVisible() {
    this.setState({
        modalVisible: false
    });
  }

  componentDidMount(){
  //   let userData = await AsyncStorage.getItem("userData");
  //   let data = JSON.parse(userData);
  //  const userId = data.user_id
  //  this.setState({
  //    'user_id':userId,
  //  })
   this.getProfile();
  }

  getProfile(){
    auth.getToken().then(res=>{
      //   console.log("ressss",res);
       const user_id=res.user_id
      //  const role=res.role
      userService.getUserProfile(user_id).then(res=>{
        const result=JSON.parse(res);
       //  console.log("111111",result)
       this.setState({
         'UserProfile':result,
         'name':result.name,
         'email':result.email,'phone':result.phone,'city':result.city,'country':result.country
       })
      })
       this.setState({
        'user_id':user_id,
        // 'designation':role
      })
      })
    // console.log(this.state.user_id);
    //  userService.getUserProfile(this.state.user_id).then(res=>{
    //    const result=JSON.parse(res);
    //   //  console.log("111111",result)
    //   this.setState({
    //     'UserProfile':result,
    //     'name':result.name,
    //     'email':result.email,'phone':result.phone,'city':result.city,'country':result.country
    //   })
    //  })
  }


  updateProfile(){
    // event.preventDefault();
    const data={id:this.state.user_id,name:this.state.name,email:this.state.email,phone:this.state.phone,city:this.state.city,country:this.state.country}
    // console.log(data);
    userService.editProfileData(data).then(res=>{
      // console.log("22222222",res);
      this.getProfile();
    })
   
  }


  render(){
    // console.log(this.state.UserProfile);
    return (
      
      <Block>
      {/* <Block style={{flex: 1,flexDirection: 'column',justifyContent: 'space-between'}} > */}
        {/* <Block flex={0.6} >
            <ImageBackground
              source={Images.ProfileBackground}
              style={styles.profileContainer}
              imageStyle={styles.profileBackground}
            > */}
            {/* <Block flex > */}
            <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
              <Block middle style={{ top: height * 0.15 }}>
                {/* <Image source={profile} style={styles.avatar} /> */}
                <Icon reverse name='ios-person' type='ionicon' size={50} color='#87cefa' />
              </Block>
              <Block style={{ top: height * 0.2 }}>
                <Block middle >
                  <Text style={{marginBottom: theme.SIZES.BASE / 2,fontWeight:'900',fontSize:26}} color='#ffffff'>
                   {this.state.UserProfile.name}
                  </Text>
                  <Text size={16} color="white" style={{marginTop:5,lineHeight:20,fontWeight:'bold',fontSize: 18,opacity: .8}}>
                    {this.state.UserProfile.email}
                  </Text>
                </Block>
                <Block style={styles.info}>
                  <Block row space="around">
                    <Block middle>
                      <Text size={18} color="white" style={{ marginBottom: 4 }}> Phone </Text>
                      <Text size={14} color="white">{this.state.UserProfile.phone} </Text>
                    </Block>
                    <Block middle>
                      <Text color="white" size={18} style={{ marginBottom: 4 }}> City </Text>
                      <Text size={14} color="white">{this.state.UserProfile.city} </Text>
                    </Block>
                    <Block middle>
                      <Text color="white" size={18} style={{ marginBottom: 4}}>Country </Text>
                      <Text  size={14} color="white">{this.state.UserProfile.country}</Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
             </Block>
             <Block middle row style={{ position: 'absolute', width: width, top: height * 0.6 - 22, zIndex: 99 }}>
                <Button title='Edit Profile' color="#008080" style={{ width: 114, height: 44, marginHorizontal: 5,}}
                  round onPress={() => {this.editUser()}}>
                </Button>
            </Block>
          {/* </ImageBackground> */}
        {/* </Block> */}
      {/* </Block> */}
      

      {/* /////update profile model */}
      <Block>
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() =>this.hideModalVisible()}>
              <ScrollView>
               <Block style={styles.modalBlock}>
                  <Text style={{fontSize:30}}>
                     Edit Profile 
                  </Text>
                <Block>
                  <TextInput style={styles.input} placeholder="Name" shadowless
                    defaultValue={this.state.name} onChangeText={(text) =>this.setState({name:text})}>
                  </TextInput>
                </Block>
                <Block>
                  <TextInput style={styles.input} placeholder="Email" defaultValue={this.state.email}
                    shadowless onChangeText={(text) =>this.setState({email:text})}>
                  </TextInput>
                </Block>
                <Block>
                  <TextInput style={styles.input} placeholder="Mobile Number" defaultValue={this.state.phone}
                    shadowless onChangeText={(text) =>this.setState({phone:text})}>
                  </TextInput>
                </Block>
                <Block>
                  <TextInput style={styles.input} placeholder="City" defaultValue={this.state.city}
                    shadowless onChangeText={(text) =>this.setState({city:text})}>
                  </TextInput>
                </Block>
                <Block>
                  <TextInput style={styles.input} placeholder="Country" defaultValue={this.state.UserProfile.country}
                    shadowless onChangeText={(text) =>this.setState({country:text})}>
                  </TextInput>
                </Block>
                <Block style={{width:'40%',marginTop:20,justifyContent:"space-between",flexDirection:'row'}}>
                  <Button title="Save" color="#006400" borderRadius='14' style={{ width: 80, height: 60, marginHorizontal: 5, }}
                    round onPress={()=>{this.updateProfile();this.hideModalVisible()}}>
                  </Button>
                  <Button title="Close" color="#ff4500" borderRadius='14' style={{ width: 80, height: 60, marginHorizontal: 5, }}
                     round onPress={() =>{this.hideModalVisible()}}>
                  </Button>
                </Block>
               </Block>
              </ScrollView>
            </Modal>
           </Block>
          </Block>    
    )
  }
}
  
  const styles = StyleSheet.create({
  
    profileContainer: {
      width,
      height,
      padding: 0,
      // zIndex: 1
    },
    profileBackground: {
      width,
      height: height
    },
    info: {
      marginTop: 30,
      paddingHorizontal: 10,
      height: height * 0.8
    },
    button:{
      width:100
  },
  modalBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:40,
    // backgroundColor:'#66cdaa'
  },
    // avatarContainer: {
    //   position: 'relative',
    //   marginTop: -80
    // },
    avatar: {
      width: thumbMeasure,
      height: thumbMeasure,
      borderRadius: 50,
      borderWidth: 0
    },
    input: {
      width: 350,
      height: 55,
      backgroundColor:'#808080',
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',
    },
    // profile:{
    //   marginTop:50,
    //   alignItems:'center',
    //   justifyContent:'space-around',
    //   flexDirection:'row'
    // }
  });

  export default Profile;
  