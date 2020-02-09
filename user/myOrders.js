import React from 'react';
import {ScrollView,StyleSheet,Dimensions,TouchableOpacity,Image,Animated,ImageBackground,
  AsyncStorage,View,Modal,Linking,ProgressBarAndroid,ToastAndroid,
  PermissionsAndroid,Alert } from 'react-native';

// Galio components
import { Block,Button, theme } from 'galio-framework'
// Now UI themed components

import userService from '../services/userService'
const { width } = Dimensions.get('screen');
import { Container, Header, Content, Card, CardItem, Thumbnail, Text,Middle, Left, Body, Right } from 'native-base';
import Moment from 'moment';
import { Icon } from 'react-native-elements'
import PTRView from 'react-native-pull-to-refresh';
import auth from '../services/auth';
class MyOrders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id:'',
      ordesList:[],
      modalVisible:false,
      isOpen:false,
      // overAllOrderDetails:[],
      userDetails:[],
      address_details:[],
      orderOverview:[],
      ordered_products:[],
      lr_s3_files:[],
      invoice_files:[],
      payments_data:[],
    };
  }

  componentDidMount(){
    auth.getToken().then(res=>{
      const user_id=res.user_id
      userService.getUserOrdersLIst(user_id).
      then(res=>{
        const result=JSON.parse(res);
        // console.log(result);
        this.setState({'ordesList':result})
      })
      this.setState({'user_id':user_id})
    })
  }

  _refresh() {
    return new Promise((resolve) => {
      setTimeout(()=>{resolve()}, 2000)
    });
  }

  openMoadl() {
    this.setState({
        'modalVisible': true,
    });
  }

  hideModalVisible() {
    this.setState({
        modalVisible: false
    });
  }

  getOrderDetails(id){
    const order_id=id
    userService.getUserOrderDetails(order_id).then(res=>{
      const data=JSON.parse(res);
      console.log(data);

      this.setState({
        // 'overAllOrderDetails':data,
        'userDetails':data.order_overview.user_details,
         'address_details':data.order_overview.address_details,
         'orderOverview':data.order_overview,
         'ordered_products':data.ordered_products,
         'lr_s3_files':data.lr_s3_files,
         'payments_data':data.payments_data,
         'invoice_files':data.invoice_files})
      
    })
  }


  approveOrder(id){
    const data={user_id:this.state.user_id,order_id:id}
    // console.log(data)
    userService.approveOrderDetails(data)
    this.getOrderDetails(id);
    this.openMoadl();
  }

  getDateFormat(date){
    // console.log(date);
    Moment.locale('en');
    var dt = date;
    return <Text> {Moment(dt).format('DD-MM-YYYY')} </Text>
  }

  getDispatchDateFormat(date){
  Moment.locale('en');
  var dt = date;
  if(dt){
    return <Text> {Moment(dt).format('DD-MM-YYYY')} </Text>
  }
  else{
    return <Text>N/A</Text>
  }
  }

  getOrderStetus(status){
  if(status == 1){
   return <Text>Darft</Text>
  }
  if(status == 2){
   return <Text>Order Accepted</Text>
  }
  if(status == 3){
   return <Text>Order Rejected</Text>
  }
  if(status == 4){
   return <Text>Work In Progress</Text>
  }
  if(status == 5){
   return <Text>Partially Completed & Shipped</Text>
  }
  if(status == 6){
   return <Text>Ready to Dispatch</Text>
  }
  if(status == 7){
   return <Text>Dispached</Text>
  }
  if(status == 8){
   return <Text>Problem Alert</Text>
  }
  }

  addressDetails_mobile_number(addressDetais){
    if(addressDetais == null){
    return <Text style={{color:'#87cefa'}}>Not Provide</Text>
    }
    else{
    return <Text style={{color:'#87cefa'}}>{addressDetais.mobile_number}</Text>
    }
  }

  getPaymenttatus(status){
    if(status == 0){
      return <Text style={{color:'#ff0000'}}>Pending</Text>
    }
    if(status == 1){
      return <Text style={{color:'#006400'}} >Paid</Text>
    }
    if(status == 2){
      return <Text style={{color:'#ffa500'}}>Partially Paid</Text>
    }
  }


  showOrderApprovedOrNot(approve){
    // console.log(approve)
    if(approve == null){
      return <Text >Approve Order</Text>
    }
    else{
      return <Text >Order Approved</Text>
    }
  }


  handleShowImageModal = () => {
    this.setState({ isOpen: true });
  };

  hideImageModalVisible=()=>{
    this.setState({isOpen:false})
  }

  loadPdfInBrowser(data){
    Linking.openURL(data).catch(err => console.error("Couldn't load page", err));
  };

  loadImageInBrowser(data){
    Linking.openURL(data).catch(err => console.error("Couldn't load page", err));
  };

  render(){
    const{userDetails,orderOverview,address_details,colorr}=this.state
    console.log("sssssssssssss-----------",this.state.user_id)
    return(
      <Container>
        <PTRView onRefresh={this._refresh}>
        <Content style={{marginTop:15}} >
        {(this.state.ordesList.length > 0) ? this.state.ordesList.map((order,index) => {
          return(
            <Card key={index}>
              <CardItem>
                  <Body>
                  <TouchableOpacity
                    shadowless
                     onPress={() =>{this.getOrderDetails(order.id);this.openMoadl()}}>
                    <Text>Order Id : {order.id}</Text>
                    <Text>Order Status : {this.getOrderStetus(order.order_status)}</Text>
                    <Text>Ordered On : {this.getDateFormat(order.created_at)}</Text>
                    <Text>Payment Status : {this.getPaymenttatus(order.paid)}</Text>
                    <Text>Total Amount : {order.total}/-</Text>
                  </TouchableOpacity>
                 </Body>
              </CardItem>
            </Card>);}): <Card><CardItem><Body><Text colSpan="5">Loading</Text></Body></CardItem></Card>} 

            {/* modal start */}
            <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {this.hideModalVisible()}}>
              <Container>
                <Block style={styles.container}>
                <Text style={{fontSize:40}}>
                    Order Details 
                </Text>
                </Block>
              <Content style={{marginTop:20}}>
                <Block style={{marginTop:15}}>
                <Text style={{fontSize:20,marginHorizontal:20}}>Customer Details</Text>
                <Card>
                  <CardItem>
                      <Body >
                        <Block style={{flexDirection:'row',width:'30%'}}>
                        <Icon
                              reverse
                              name='ios-person'
                              type='ionicon'
                              size={15}
                              color='#808080'
                            />
                        <Text style={{width:400,height:40,marginHorizontal:5,marginTop:10,color:'#87cefa'}}>{userDetails.name}</Text>
                        </Block>
                        <Block style={{flexDirection:'row',width:'30%'}}>
                        <Icon
                              reverse
                              name='ios-mail'
                              type='ionicon'
                              size={15}
                              color='#808080'
                            />
                        <Text style={{width:400,height:40,marginHorizontal:5,marginTop:10,color:'#87cefa'}}>{userDetails.email}</Text>
                        </Block>
                        <Block style={{flexDirection:'row',width:'30%'}}>
                        <Icon
                              reverse
                              name='md-call'
                              type='ionicon'
                              size={15}
                              color='#808080'
                            /> 
                        <Text style={{width:400,height:40,marginHorizontal:5,marginTop:10,color:'#87cefa'}}>
                         {this.addressDetails_mobile_number(address_details)}
                        </Text>
                        </Block>
                    </Body>
                  </CardItem>
                </Card> 
                </Block>
                <Block style={{marginTop:15,backgroundColor:'#fafad2'}}>
                <Text style={{fontSize:20,marginHorizontal:20}}>Order Details</Text>
                <Card>
                  <CardItem>
                      <Body>

                     {/* Order Details------------------------------- */}
                      <Text >Order id : {orderOverview.id}</Text>
                      <Text style={{marginTop:10,fontSize:20}}>Your Invoice :-</Text>
                      {/* <Block style={{flexDirection:'row',width:'20%'}}> */}
                       {this.state.invoice_files.map((invoice_file,index)=>{
                         return(
                          <View key={index} style={{flexDirection:'row',width:'20%'}}>
                            <Text style={{width:100,marginTop:12}}>Invoice :</Text>
                          <TouchableOpacity style={{marginTop:7}}>
                           <Icon
                              reverse
                              name='ios-eye'
                              type='ionicon'
                              size={12}
                              color='#4682b4'
                              onPress={()=>{this.loadPdfInBrowser(invoice_file.s3_file_ObjectURL)}}
                            />
                          </TouchableOpacity></View>)
                       })} 
                      {/* </Block> */}
                      <Text style={{marginTop:15}}>Order Date : {this.getDateFormat(orderOverview.created_at)}</Text>
                      <Text>Exp Date : {orderOverview.ext_date ? orderOverview.ext_date:'N/A'}</Text>
                      <Text>Dispached On : {this.getDispatchDateFormat(orderOverview.dispatched_on)}</Text>
                      <Text>Status : {this.getOrderStetus(orderOverview.order_status)}</Text>
                      <Block style={{flexDirection:'row',width:'20%',marginTop:10}}>
                      <Text style={{fontSize:18,width:170,marginTop:7}}>Approve Order :</Text>
                       <Button
                           style={{width:180,height:40}}
                           shadowless
                           color='#d3d3d3'
                           onPress={()=>{this.approveOrder(orderOverview.id)}}
                           ><Text>{this.showOrderApprovedOrNot(orderOverview.customer_approve_date)}</Text></Button>
                      </Block>
                    </Body>
                  </CardItem>
                </Card> 
                </Block>

                {/* Address Details------------------------------------------ */}
                <Block style={{marginTop:15,backgroundColor:'#d8bfd8'}}>
                <Text style={{fontSize:20,marginHorizontal:20}}>Address Details</Text>
                {(address_details != null) ?
                  <Card>
                  <CardItem>
                      <Body>
                      <Text>{address_details.name}</Text>
                      <Text>{address_details.address}</Text>
                      <Text>{address_details.city}</Text>
                      <Text >{address_details.mobile_number}</Text>
                    </Body>
                  </CardItem>
                </Card> : <Card><CardItem><Body><Text>No Data Provided</Text></Body></CardItem></Card> }
                </Block>

                {/* Product Details------------------------------------------------ */}
                <Block style={{ backgroundColor:'rgba(50, 115, 220, 0.3)',marginTop:15}}>
                <Text style={{fontSize:20,marginHorizontal:20}}>Product Details</Text>
                <Content>
                  {(this.state.ordered_products.length > 0) ?this.state.ordered_products.map((product,index)=>{
                    const idcard_details=product.idcard_details;
                    return(  
                    <Card key={index}>
                      <CardItem>
                          <Body>
                           <Block>
                            <Text>Product name : {idcard_details.name} </Text>
                            <Text>Quantity : {product.quantity} </Text>
                            <Text>Unit Price : {product.price} </Text>
                            <Text>Product Total : {(product.quantity)*(product.price)}</Text>
                           </Block>
                        </Body>
                      </CardItem>
                    </Card>)
                  }) : <Card><CardItem><Body><Text>No Data Available</Text></Body></CardItem></Card>}
                  </Content>
                  <Content> 
                    <Card>
                      <CardItem>
                          <Body>
                           <Block>
                            <Text>Delivery Charge : {orderOverview.delivery_charge} </Text>
                            <Text>Total Amount : {orderOverview.total} </Text>
                           </Block>
                        </Body>
                      </CardItem>
                    </Card>
                  </Content>
                </Block>

                {/* LR File Details--------------------------------------- */}
                <Block style={{ backgroundColor:'#eee8aa',marginTop:15}}>
                <Text style={{fontSize:20,marginHorizontal:20}}>LR Files</Text>
                <Content>
                  {(this.state.lr_s3_files.length > 0) ? this.state.lr_s3_files.map((lr_file,index)=>{
                    return(  
                    <Card key={index}>
                      <CardItem>
                          <Body>
                           <Block>
                            <Text>LR File : {lr_file.s3_file_name} </Text>
                            <Text>Uploaded Date : {this.getDateFormat(lr_file.s3_file_updated_at)} </Text>
                            <Block style={{width:'20%',marginTop:20,justifyContent:"space-between",flexDirection:'row'}}>
                               <Button
                                style={{width:60,height:40,marginHorizontal:30}}
                                shadowless
                                color='#66cdaa'
                                onPress={this.handleShowImageModal}
                              ><Text>View</Text></Button>
                              <Modal animationType="slide" transparent={false} visible={this.state.isOpen}
                               onRequestClose={() => {this.hideImageModalVisible()}}>
                                  <Container>
                                    <Content>
                                      <Card>
                                        <CardItem>
                                          <Body style={{alignItems:'center'}}>
                                              <Image
                                                style={{width: '100%', height:600}}
                                                source={{uri:lr_file.s3_file_ObjectURL}} />
                                                <Block style={{marginTop:60,marginBottom:50,flexDirection:'row'}}>
                                                <Button
                                                     style={{width:120,height:40,marginHorizontal:5}}
                                                    shadowless
                                                    color='#dcdcdc'
                                                    onPress={()=>this.loadImageInBrowser(lr_file.s3_file_ObjectURL)}
                                                  ><Text>Downloaded</Text></Button>
                                                  <Button
                                                     style={{width:100,height:40,marginHorizontal:5}}
                                                    shadowless
                                                    color='#dcdcdc'
                                                    onPress={this.hideImageModalVisible}
                                                  ><Text>Close</Text></Button>
                                                </Block>
                                               </Body>
                                           </CardItem>
                                      </Card>
                                    </Content>
                                  </Container>
                               </Modal>
                           </Block>
                           </Block>
                        </Body>
                      </CardItem>
                    </Card> )
                  }) : <Card><CardItem><Body><Text>No Data Available</Text></Body></CardItem></Card>}
                  </Content>
                </Block>

                {/* Payment Details--------------------------------------------- */}
                <Block style={{ backgroundColor:'#ffc0cb',marginTop:15}}>
                <Text style={{fontSize:20,marginHorizontal:20}}>Payments History</Text>
                <Content >
                  {(this.state.payments_data.length > 0) ? this.state.payments_data.map((payment,index)=>{
                    const bank_details=payment.bank_details
                    return(  
                    <Card key={index}>
                      <CardItem>
                          <Body>
                           <Block>
                            <Text>Amount : {payment.amount} </Text>
                            <Text>Payment Mode : {bank_details.bank_name} </Text>
                            <Text>Date : {payment.payment_received_date}</Text>
                            <Text> </Text>
                           </Block>
                        </Body>
                      </CardItem>
                    </Card> )
                  }) : <Card><CardItem><Body><Text>No Data Available</Text></Body></CardItem></Card>}
                  </Content>
                </Block>
                </Content>
                </Container>
            </Modal>          
          </Content>
          </PTRView>
       </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 44,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#20b2aa'
  },
  modalBlock: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
});

export default MyOrders;
