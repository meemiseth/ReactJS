import React,{Component} from 'react';
import '../template/css/style.css';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {Table} from 'antd';
class Home extends Component {
    constructor() {
        super();
        //this.logout= this.logout.bind(this);
    }
    /* logout(){
         sessionStorage.clear();
            this.props.history.push('/');
         }*/


    componentDidMount() {
        if(sessionStorage.getItem('sessionItem')==null){
            this.props.history.push('/');
        }
        this.props.dispatch({type: "API_CONTACT_FULL_REQUEST"});
    }

    render()
    {
        const cols =[
            {
                title: 'Name',
                dataIndex:'contact_name'
            },
            {
                title: 'Address',
                dataIndex:'contact_address'
            },
            {
                title: 'Phone',
                dataIndex:'phone'
            },
            {
                title:'Update',
                dataIndex:'update'
            },
            {
                title:'History',
                dataIndex:'history'
            },

        ];
        const data = [];
        const {totalContacts,edit_id} = this.props;
        if(totalContacts!=null && totalContacts.length >0) {
            for (var i = 0; i < totalContacts.length; i++) {
                data.push({
                    contact_name:totalContacts[i].contact_name,
                    contact_address:totalContacts[i].contact_address,
                    phone:totalContacts[i].phone,
                    update:<Link to={{pathname:"/updateContact",query:{edit_id:totalContacts[i].contact_id,totalContacts:totalContacts}}}><img src={require("../template/images/edit-icon.png")}></img></Link>,
                    history:<Link to={{pathname:"/Audit",query:{edit_id:totalContacts[i].contact_id}}}><img src={require("../template/images/61122.png")}></img></Link>
                })
            }
        }

        return (
            <div className="Home">
               
                <Link to={{pathname:"/newContact"}} className="btn"><img src={require("../template/images/add.png")}/><b>Add New Contact</b></Link>
                <Table dataSource={data} columns={cols} />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        totalContacts:state.totalcontacts,
        edit_id:state.edit_id
    };
};
export default connect(mapStateToProps)(Home);