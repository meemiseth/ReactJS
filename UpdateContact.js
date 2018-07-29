import React,{Component} from 'react';
import  './Login.css';
import {connect} from "react-redux";
import {Button} from 'antd';

class UpdateContact extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    onSubmit(){
        this.props.dispatch({type: "API_CONTACT_EDIT_REQUEST",edit_id:this.props.location.query.edit_id,edit_contactname:this.inputName.value,edit_address:this.inputAddress.value,edit_cphone:this.inputPhone.value});
    }
    componentDidMount() {
        if(sessionStorage.getItem('sessionItem')==null){
            this.props.history.push('/');
        }
        try {
            const id = this.props.location.query.edit_id;
            const totalContacts = this.props.location.query.totalContacts;
            var edit_name, edit_address, edit_phone;
            for (var i = 0; i < totalContacts.length; i++) {
                if (totalContacts[i].contact_id == id) {
                    this.inputName.value = totalContacts[i].contact_name;
                    this.inputAddress.value = totalContacts[i].contact_address;
                    this.inputPhone.value = totalContacts[i].phone;
                }
            }
        }catch (Exception){
            this.props.history.push('/home');
        }

    }
    render(){
        var{edit_flag}=this.props;
        if(edit_flag!=null) {
            alert(edit_flag);
            this.props.history.push('/home');
        }
        return(
            <div>
                <div className="UpdateContact">
                    <div className="login-wrap">
                        <div className="login-html">
                            <div className="login-form">
                                <div>

                                    <div class="group">
                                        <label for="contact" class="label">Name</label>
                                        <input id="edit_name" type="text" class="input" onChange={this.handleChange} ref={el => this.inputName = el}/>
                                    </div>
                                    <div class="group">
                                        <label for="address" class="label">Address</label>
                                        <input id="edit_address" type="text" class="input" onChange={this.handleChange} ref={el => this.inputAddress = el} />
                                    </div>
                                    <div class="group">
                                        <label for="Phone" class="label">Phone</label>
                                        <input id="edit_cphone" type="text" class="input" onChange={this.handleChange} ref={el => this.inputPhone = el} />
                                    </div>
                                    <div class="group">

                                        <Button type="primary" onClick={this.onSubmit}>Update</Button>
                                    </div>
                                    <div className="hr"></div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        totalContacts:state.totalcontacts,
        edit_id:state.edit_id,
        edit_contactname:state.edit_contactname,
        edit_address:state.edit_address,
        edit_cphone:state.edit_cphone,
        edit_flag:state.edit_flag
    };
};
export default connect(mapStateToProps)(UpdateContact);