const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";

const API_CONTACT_FULL_REQUEST="API_CONTACT_FULL_REQUEST";
const API_CONTACT_FULL_SUCCESS="API_CONTACT_FULL_SUCCESS";
const API_CONTACT_FULL_FAILURE="API_CONTACT_FULL_FAILURE";

const API_CONTACT_NEW_REQUEST="API_CONTACT_NEW_REQUEST";
const API_CONTACT_ADD_SUCCESS="API_CONTACT_ADD_SUCCESS";
const API_CONTACT_ADD_FAILURE="API_CONTACT_ADD_FAILURE";

const API_CONTACT_EDIT_REQUEST="API_CONTACT_EDIT_REQUEST";
const API_CONTACT_EDIT_SUCCESS="API_CONTACT_EDIT_SUCCESS";
const API_CONTACT_EDIT_FAILURE="API_CONTACT_EDIT_FAILURE";

const API_FETCH_AUDIT_REQUEST = "API_FETCH_AUDIT_REQUEST";
const API_FETCH_AUDIT_SUCCESS = "API_FETCH_AUDIT_SUCCESS";
const API_FETCH_AUDIT_FAILURE = "API_FETCH_AUDIT_FAILURE";

const initialState={
    fetching : null,
    token : null,
    error : null,
    username: "",
    password: "",
    totalcontacts:[],
    redirectToReferrer:false,
    contactname:"",
    caddress:"",
    cphone:"",
    flag:null,
    edit_id : "",
    edit_contactname:"",
    edit_address:"",
    edit_cphone:"",
    edit_flag:null,
    audit:[]
};
export function reducer(state=initialState,action){
    switch(action.type){
        case API_CALL_REQUEST:
            return{...state,fetching:true,error:null,username:action.username,password:action.password,token:null};

        case API_CALL_SUCCESS:
            return{...state,fetching:false,token:action.token,redirectToReferrer:true};


        case API_CALL_FAILURE:
            return{...state,fetching:false,token:null,error:action.error,redirectToReferrer:false};

        case API_CONTACT_FULL_REQUEST:
            return{...state,flag:null,totalcontacts:null,edit_flag:null};

        case API_CONTACT_FULL_SUCCESS:
            return{...state,totalcontacts:action.totalcontacts};

        case API_CONTACT_FULL_FAILURE:
            return{...state}

        case API_CONTACT_NEW_REQUEST:
            return{...state,contactname:action.contactname,caddress:action.caddress,cphone:action.cphone,user_id:action.user_id,token:action.token,flag:null}

        case API_CONTACT_ADD_SUCCESS:
            return{...state,flag:action.flag}

        case API_CONTACT_ADD_FAILURE:
            return{...state,flag:action.flag}

        case API_CONTACT_EDIT_REQUEST:
            return{...state,edit_id:action.edit_id,edit_contactname:action.edit_contactname,edit_address:action.edit_address,edit_cphone:action.edit_cphone}

        case API_CONTACT_EDIT_SUCCESS:
            return{...state,edit_flag:action.edit_flag}

        case API_CONTACT_EDIT_FAILURE:
            return{...state,edit_flag:action.edit_flag}

        case API_FETCH_AUDIT_REQUEST:
            return{...state,edit_id:action.edit_id}

        case API_FETCH_AUDIT_SUCCESS:
            return{...state,audit:action.audit}

        case API_FETCH_AUDIT_FAILURE:
            return{...state}
        default:
            return state;



    }
}