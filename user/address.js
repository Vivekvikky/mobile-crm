import React from 'react';
import {ScrollView,StyleSheet,Dimensions,ImageBackground,AsyncStorage,View,Modal,TextInput,Text,Button} from 'react-native';
// Galio components
import { Block, Button as GaButton, theme } from 'galio-framework';
// Now UI themed components
import { RadioButton } from 'react-native-paper';
const { width } = Dimensions.get('screen');
import userService from '../services/userService'
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';
// import { Card,Icon,ListItem } from 'react-native-elements'
import PTRView from 'react-native-pull-to-refresh';
import auth from '../services/auth';

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:'',
      userAddress:[],
      modalVisible:false,
      modalVisible1:false,
      name:'',address:'',landmark:'',city:'',state:'',mobile_number:'',addr_type:'unchecked',pincode:'',address_id:'',
    };
  }

  _refresh() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }

  openModel() {
    this.setState({
        'modalVisible': true,
    });
  }

  editModel(item) {
    // console.log("111111",item);
    this.setState({
        'modalVisible1': true,
        'name':item.name,'address':item.address,'landmark':item.landmark,'city':item.city,
        'state':item.state,'mobile_number':item.mobile_number,'addr_type':item.addr_type,'pincode':item.pincode,'address_id':item.id

    });
  }

  hideModalVisible() {
    this.setState({
        modalVisible: false,
        modalVisible1:false
    });
  }

   componentDidMount(){
  //   let userData = await AsyncStorage.getItem("userData");
  //   let data = JSON.parse(userData);
  //  const userId = data.user_id
  //  this.setState({
  //    'user_id':userId
  //  })
   this.getAddress();
  }

  getAddress(){
    auth.getToken().then(res=>{
      //   console.log("ressss",res);
       const user_id=res.user_id
      //  const role=res.role
      userService.getUserAddress(user_id).then(res=>{
        const result=JSON.parse(res);
       this.setState({
           'userAddress':result
       })
      })
       this.setState({
        'user_id':user_id,
        // 'designation':role
      })
      })
    // console.log(this.state.user_id);
    //  userService.getUserAddress(this.state.user_id).then(res=>{
    //    const result=JSON.parse(res);
    //   this.setState({
    //       'userAddress':result
    //   })
    //  })
  }

  onChangeText = (addressData, val) => {
    this.setState({ [addressData]: val })
  }

  saveAddress(){
    console.log("test save")
    // event.preventDefault()
     const data={user_id:this.state.user_id,name:this.state.name,address:this.state.address,landmark:this.state.landmark,
      city:this.state.city,state:this.state.state,mobile_number:this.state.mobile_number,addr_type:this.state.addr_type,pincode:this.state.pincode}
      userService.addAddress(data).then(res=>{
        console.log("1111111",res);
        this.getAddress();
      })
      
  }

  updateAddress(){
    const data={user_id:this.state.user_id,id:this.state.address_id,name:this.state.name,address:this.state.address,landmark:this.state.landmark,
    city:this.state.city,state:this.state.state,mobile_number:this.state.mobile_number,addr_type:this.state.addr_type,pincode:this.state.pincode}
    // console.log("sdfgsdf",data)
    userService.editUserAddress(data).then(res=>{
      console.log("1111111111",res)
      this.getAddress();
    })
    
  }

  deleteAddress=(id)=>{
     userService.deleteUserAddress(id).then(res=>{
       console.log(res);
       this.getAddress();
     })
     
  }
  
  render(){
    // console.log(this.state.userAddress)
    const { addr_type } = this.state;
    return(
      <Container>
        <PTRView onRefresh={this._refresh} >
        <Block style={styles.buttonBlock}>
          <Button title="Add Address" color="#66cdaa" style={{width:120,height:60,borderRadius:14}} onPress={() => {this.openModel()}}>
          </Button>
        </Block>
        <Content style={{marginTop:20}}>
        {this.state.userAddress.map((item,index) => {
          return(
            <Card key={index}>
              <CardItem>
                  <Body >
                   <Text size={15}>{item.name}</Text>
                  <Text style={styles.cardText}>{item.addr_type}</Text>
                  <Text>{item.address} {item.landmark} {item.city}</Text>
                 <Text>{item.state} {item.pincode}</Text>
                 <Block style={{width:'40%',marginTop:30,justifyContent:"space-between",flexDirection:'row'}}>
                   <Button
                    style={{width:80,height:40,marginHorizontal:30}} shadowless title="Edit" color="#bc8f8f"
                    onPress={() =>{this.editModel(item)}}/>
                   <Button shadowless title="Remove" style={{width:100,height:40,borderRadius:14}} color="#8b0000"
                    onPress={()=>{this.deleteAddress(item.id)}}/>
                 </Block>
                 </Body>
              </CardItem>
            </Card>);})} 
            </Content>
              {/* //modal add address */}
        {/* <Block>
        <View > */}
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {this.hideModalVisible() }}>
               <ScrollView>
               <Block style={styles.modalBlock}>
                 <Text style={{fontSize:30}}>Add Address</Text>
                   <Block>
                      <TextInput style={styles.input} placeholder='Name' iconContent={<Block />} shadowless
                        onChangeText={val => this.onChangeText('name', val)}>
                      </TextInput>
                    </Block>
                    <Block style={styles.textAreaContainer}>
                      <TextInput style={styles.textArea} placeholder='Address' iconContent={<Block />} numberOfLines={5} shadowless
                        onChangeText={val => this.onChangeText('address', val)}>
                      </TextInput>
                    </Block>
                    <Block>
                      <TextInput style={styles.input} placeholder='Landmark' iconContent={<Block />} shadowless
                        onChangeText={val => this.onChangeText('landmark', val)}>
                      </TextInput>
                    </Block>
                    <Block>
                      <TextInput style={styles.input} placeholder='City' iconContent={<Block />} shadowless
                        onChangeText={val => this.onChangeText('city', val)}>
                      </TextInput>
                    </Block>
                    <Block>
                      <TextInput style={styles.input} placeholder='State' iconContent={<Block />} shadowless
                        onChangeText={val => this.onChangeText('state', val)}>
                      </TextInput>
                    </Block>
                    <Block>
                      <TextInput style={styles.input} placeholder='Mobile Number' iconContent={<Block />} shadowless
                        onChangeText={val => this.onChangeText('mobile_number', val)}>
                      </TextInput>
                    </Block>
                    <Block style={{flexDirection:'row'}}>
                      <RadioButton value="Home" status={addr_type === 'Home' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ addr_type: 'Home' }); }}>
                      </RadioButton>
                      <Text size={20} color="blue">Home</Text>
                    </Block>
                    <Block style={{flexDirection:'row'}} >
                      <RadioButton value="Office" status={addr_type === 'Office' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ addr_type: 'Office' }); }}>
                      </RadioButton>
                      <Text size={20} color="blue">Office</Text>
                    </Block>
                    <Block>
                      <TextInput style={styles.input} placeholder='Pincode' iconContent={<Block />} shadowless
                        onChangeText={val => this.onChangeText('pincode', val)}>
                      </TextInput>
                    </Block>
                    <Block style={{width:'40%',marginTop:20,justifyContent:"space-between",flexDirection:'row'}}>
                      <Button title="Save" color="#006400" borderRadius='14' style={{ width:60, height: 66, marginHorizontal: 5,}}
                        round onPress={()=>{this.saveAddress();this.hideModalVisible()}}> 
                      </Button>
                      <Button title="Close" color="#ff4500" borderRadius='14' style={{ width:60, height:66, marginHorizontal: 5,}}
                        round onPress={() =>{this.hideModalVisible()}}>  
                      </Button>
                    </Block>
                 </Block>
               </ScrollView>
            </Modal>
          {/* </View>
         </Block> */}
        


         {/* // model for update address */}
        
        {/* <Block>
        <View > */}
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisible1} onRequestClose={() => {this.hideModalVisible() }}>
              <ScrollView>
                <Block style={styles.modalBlock}>
                   <Text style={{fontSize:30}}>
                     Edit Address
                   </Text>
                  <Block>
                    <TextInput style={styles.input} placeholder='Name' iconContent={<Block />} defaultValue={this.state.name} shadowless
                      onChangeText={(text) =>this.setState({name:text})}>
                    </TextInput>
                  </Block>
                  <Block style={styles.textAreaContainer}>
                    <TextInput style={styles.textArea} placeholder='Address' iconContent={<Block />} numberOfLines={5} shadowless
                      defaultValue={this.state.address} onChangeText={(text) =>this.setState({address:text})}>
                    </TextInput>
                  </Block>
                  <Block>
                    <TextInput style={styles.input} placeholder='Landmark' iconContent={<Block />} shadowless
                      defaultValue={this.state.landmark} onChangeText={(text) =>this.setState({landmark:text})}>
                    </TextInput>
                  </Block>
                  <Block>
                    <TextInput style={styles.input} placeholder='City' iconContent={<Block />} defaultValue={this.state.city} shadowless
                      onChangeText={(text) =>this.setState({city:text})}>
                    </TextInput>
                  </Block>
                  <Block>
                    <TextInput style={styles.input} placeholder='State' iconContent={<Block />} shadowless
                      defaultValue={this.state.state} onChangeText={(text) =>this.setState({state:text})}>
                    </TextInput>
                  </Block>
                  <Block>
                    <TextInput style={styles.input} placeholder='Mobile Number' iconContent={<Block />} shadowless
                      defaultValue={this.state.mobile_number} onChangeText={(text) =>this.setState({mobile_number:text})}>
                    </TextInput>
                  </Block>
                  <Block style={{flexDirection:'row'}}>
                    <RadioButton value="Home" status={addr_type === 'Home' ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ addr_type: 'Home' }); }}>
                    </RadioButton>
                    <Text size={20} color="blue">Home</Text>
                  </Block>
                  <Block style={{flexDirection:'row'}} >
                    <RadioButton value="Office" status={addr_type === 'Office' ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ addr_type: 'Office' }); }}>
                    </RadioButton>
                    <Text size={20} color="blue">Office</Text>
                  </Block>
                  <Block>
                    <TextInput style={styles.input} placeholder='Pincode' iconContent={<Block />} shadowless
                       defaultValue={this.state.pincode} onChangeText={(text) =>this.setState({pincode:text})}>
                    </TextInput>
                  </Block>
                  <Block style={{width:'40%',marginTop:20,justifyContent:"space-between",flexDirection:'row'}}>
                    <Button title="Save" color="#006400" style={{ width: 60, height: 55, marginHorizontal: 5, }}
                      round onPress={()=>{this.updateAddress();this.hideModalVisible()}}>
                    </Button>
                    <Button title="Close" color="#ff4500" style={{ width: 60, height: 55, marginHorizontal: 5,}} 
                      round onPress={() =>{this.hideModalVisible()}}>   
                    </Button>
                  </Block>
                </Block>
               </ScrollView>
            </Modal>
          {/* </View>
         </Block> */}
         <Block>
        </Block>
        </PTRView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:20
  },
  textAreaContainer: {
    // borderColor: "#808080",
    backgroundColor:'#808080',
    // borderWidth: 1,
    borderRadius: 14,
    // padding: 5
  },
  textArea: {
    width:350,
    height:100,
    justifyContent: "flex-start"
  },
  modalBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
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
  buttonBlock:{
      // alignContent:'flex-end',
      marginTop:20,
      flexDirection:'row',
      justifyContent:'flex-end',
      paddingRight:30
  },
  buttonBlock1:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'flex-end',
    paddingRight:30
},
  // button:{
  //   width:30,
  //   height:30,

  //   // alignItems:'flex-end'
  // },
  cardText:{
    fontSize:25,
    marginTop:20
  }
});


export default Address;
