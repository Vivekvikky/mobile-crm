import {environment} from '../environment'
export const userService={
    getUserProfile,
    getUserAddress,
    addAddress,
    getUserOrdersLIst,
    getUserOrderDetails,
    editProfileData,
    editUserAddress,
    deleteUserAddress,
    approveOrderDetails
    // sendItemId
}

const BASE_URl=environment.BASE_URL

function getUserProfile(user_id){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${BASE_URl}/api/v1/user/getUserInfo/${user_id}`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

function getUserAddress(user_id){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${BASE_URl}/api/v1/user/getaddress/${user_id}`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

function addAddress(data){
    console.log(data);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(`${BASE_URl}/api/v1/user/addAddress`,requestOptions)
    .then((data) => {
        // console.log(data);
         return data
    })
}

function getUserOrdersLIst(user_id){
    // console.log(user_id)
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        
    };
    return fetch(`${BASE_URl}/api/v1/orders/getCustomerOrders/${user_id}`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        // console.log(responseText)
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

function getUserOrderDetails(order_id){
    console.log("1111111",order_id)
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${BASE_URl}/api/v1/orders/getOrderDetails/${order_id}`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        // console.log("22222222222",responseText)
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

function editProfileData(data){
    // console.log(data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(data)
    };
    return fetch(`${BASE_URl}/api/v1/user/updateUserInfo`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

function editUserAddress(data){
    // console.log("1111111111111----------",data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(data)
    };
    return fetch(`${BASE_URl}/api/v1/user/updateAddress`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        // console.log("222222222",responseText)
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

function deleteUserAddress(id){
    // console.log("1111111111111----------",data)
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${BASE_URl}/api/v1/user/removeAddress/${id}`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        // console.log("22222222222",responseText)
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

function approveOrderDetails(data){
    console.log("1111111111111----------",data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(data)
    };
    return fetch(`${BASE_URl}/api/v1/user/approveOrder`, requestOptions)
    .then((response) => response.text())
    .then((responseText) => {
        console.log("22222222222",responseText)
        return responseText
    })
    .catch((error) => {
        console.log("reset client error-------",error);
   });
}

// function sendItemId(id){
//    const item_id=id
//    console.log("3333333333",item_id);
//    return item_id  
// }
export default userService;