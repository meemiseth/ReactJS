import {takeLatest,call,put,select,fork} from "redux-saga/effects";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import React from 'react';
import * as selectors from "../selectors/selectors";
export function* rootSaga () {
    yield [
        fork(watcherSaga),
        fork(watchContactSaga),
        fork(watchFullContactSaga),
        fork(watchFetchContactSaga),
        fork(watchFetchAuditSaga)
    ];
}
 function* watcherSaga() {
    yield takeLatest("API_CALL_REQUEST",workerSaga);

}
 function* watchContactSaga(){
    yield takeLatest("API_CONTACT_NEW_REQUEST",contactWorkerSaga);
}
function * watchFullContactSaga(){
    yield takeLatest("API_CONTACT_FULL_REQUEST",fullContactWorkerSaga);
}
function * watchFetchContactSaga(){
    yield takeLatest("API_CONTACT_EDIT_REQUEST",editContactWorkerSaga);
}
function * watchFetchAuditSaga(){
    yield takeLatest("API_FETCH_AUDIT_REQUEST",fetchAuditWorkerSaga);
}
 function fetchKey(bodyFormData){
    return axios({
        method: "post",
        url: "http://localhost/user/read/login",
        data:bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    });
}
function addContact(bodyFormData){
    return axios({
        method:"post",
        url:"http://localhost/user/read/insertval",
        data:bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        });
}
function fetchFullContact() {
  return axios({
      method:"post",
      url:"http://localhost/user/read/showcontacts",
      config: { headers: {'Content-Type': 'multipart/form-data' }}
  });
}
function editContact(bodyFormData){
    return axios({
        method:"post",
        url:"http://localhost/user/read/editcontact",
        data:bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    });
}
function fetchAudit(bodyFormData){

    return axios({
        method:"post",
        url:"http://localhost/user/read/fetchAudit",
        data:bodyFormData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    });
}
 function* workerSaga() {
   try{

        const username = yield select(selectors.username);
        const password = yield select(selectors.password);
         var bodyFormData =  new FormData();
         bodyFormData.set("username", username);
         bodyFormData.set("password", password);


       const response = yield call(fetchKey,bodyFormData);

       const responseData = response.data.userData;
       const token=responseData.token;
       const userId = responseData.user_id;
       if(token){
           sessionStorage.setItem('sessionItem',token+","+userId);
           //alert(sessionStorage.getItem('sessionItem'));

       }
       yield put({type:"API_CALL_SUCCESS",token});
   }catch (error){
       yield put({type:"API_CALL_FAILURE",error});
   }
}
function * fullContactWorkerSaga(){
    try{
        const responseContact = yield call(fetchFullContact);
        const totalcontacts = responseContact.data.contact_data;
        yield put({type:"API_CONTACT_FULL_SUCCESS",totalcontacts});
    }
    catch (error){
        yield put({type:"API_CONTACT_FULL_FAILURE"});
    }
}
function* contactWorkerSaga(){
    var flag="";
try{
    const contactname = yield select(selectors.contactname);
    const caddress = yield select(selectors.caddress);
    const cphone = yield select(selectors.cphone);

    var bodyFormData =  new FormData();
    bodyFormData.set("contactname", contactname);
    bodyFormData.set("caddress", caddress);
    bodyFormData.set("cphone", cphone);
    bodyFormData.set("ctoken",sessionStorage.getItem('sessionItem'));
    //alert(sessionStorage.getItem('sessionItem'));
    const responsecont = yield call(addContact,bodyFormData);
     flag = responsecont.data.flag;
     //alert(flag);
    yield put({type:"API_CONTACT_ADD_SUCCESS",flag});
}catch (error){
    yield put({type:"API_CONTACT_ADD_FAILURE",flag});
}
}
function * editContactWorkerSaga(){
    var edit_flag;
    try{
            const edit_id = yield select(selectors.edit_id);
            const edit_contactname= yield select(selectors.edit_contactname);
            const edit_address=yield select(selectors.edit_address);
            const edit_cphone=yield select(selectors.edit_cphone);

            var bodyFormData = new FormData();
            bodyFormData.set("edit_id",edit_id);
            bodyFormData.set("edit_name",edit_contactname);
            bodyFormData.set("edit_address",edit_address);
            bodyFormData.set("edit_phone",edit_cphone);
            bodyFormData.set("ctoken",sessionStorage.getItem('sessionItem'));
            const editResponse = yield call(editContact,bodyFormData);
            edit_flag = editResponse.data.flag;
            yield put({type:"API_CONTACT_EDIT_SUCCESS",edit_flag});

    }catch (error){
        yield put({type:"API_CONTACT_EDIT_FAILURE",edit_flag});
    }
}
function * fetchAuditWorkerSaga() {

    try{
        const audit_id = yield select(selectors.edit_id);
        var bodyFormData = new FormData();
        bodyFormData.set("audit_id",audit_id);
        const auditResponse = yield call(fetchAudit,bodyFormData);
        const audit = auditResponse.data.audit_data;
        yield put({type:"API_FETCH_AUDIT_SUCCESS",audit});
    }catch (error){
        yield put({type:"API_FETCH_AUDIT_FAILURE"});
    }
}
