import jwt from 'jwt-decode'
import {AsyncStorage} from 'react-native';
import {environment} from '../environment'
export const auth = {
    userLogin,
    getProductCategories,
    getProduct,
    logout,
    

    async storeToken(user) {
        try {
           await AsyncStorage.setItem("userData", JSON.stringify(user));
          //  console.log("save------------")
           this.getToken();
        } catch (error) {
          console.log("Something went wrong", error);
        }
      },

      async deleteToken() {
        try {
          await AsyncStorage.removeItem('userData')
          console.log("delete------------------")
          this.getToken();
        } catch (err) {
          console.log(`The error is: ${err}`)
        }
      },
      
      async getToken(){
        try {
          let userData = await AsyncStorage.getItem("userData");
          const data = JSON.parse(userData);
          const decodedToken = jwt(data);
          console.log("get----------",decodedToken);
          return decodedToken 
        } catch (error) {
          console.log("Something went wrong", error);
        }
      }
      // async getToken(){
      //   try {
      //     let userData = await AsyncStorage.getItem("userData");
      //     const data = JSON.parse(userData);
      //     console.log("get----------");
      //     return data
      //   } catch (error) {
      //     console.log("Something went wrong", error);
      //   }
      // }
    }

const BASE_URl=environment.BASE_URL
    
function userLogin(data) {
  console.log(data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:data.email,password:data.password})
    };
    return fetch(`${BASE_URl}/api/v1/user/login`,requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        console.log("111111111",responseText)
        const userdata=JSON.parse(responseText)
        const token = userdata.token
        if(token !== null){
         this.storeToken(token);
         return responseText
        }
        else{
            return responseText
        }
    })
//      .catch((error) => {
//         console.log("reset client error-------",error);
//    });
  //   return fetch(`${BASE_URl}/api/v1/user/login`,requestOptions)
  //   .then((response) => response.text())
  //   .then((responseText) => {
  //       console.log(responseText)
  //       const userdata=JSON.parse(responseText)
  //       const token = userdata.token
  //       const decodedToken = jwt(token);
  //       this.storeToken(decodedToken);
  //       return responseText
  //   })
  //    .catch((error) => {
  //       console.log("reset client error-------",error);
  //  });
}

function getProduct(category_id){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${BASE_URl}/api/v1/category/getCategoryproducts/${category_id}`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
      // console.log(responseText);
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

function getProductCategories(){
  const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  };
  return fetch(`${BASE_URl}/api/v1/category/getCategories`, requestOptions)
  .then((response) => response.text())
  .then((responseText) => {
    // console.log(responseText);
      return responseText
  })
  .catch((error) => {
      console.log("reset client error-------",error);
 });
}

function logout(){
  this.deleteToken();
}


export default auth