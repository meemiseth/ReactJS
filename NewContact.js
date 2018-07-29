import React,{Component} from 'react';
import  './Login.css';
import {connect} from "react-redux";
import {Button} from 'antd';
class NewContact extends Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    componentDidMount() {
        if(sessionStorage.getItem('sessionItem')==null){
            this.props.history.push('/');
        }
    }
    onSubmit() {
        const {contactname,caddress,cphone} = this.state;
        this.inputName.value="";
        this.inputAddress.value="";
        this.inputPhone.value="";
        this.props.dispatch({type:"API_CONTACT_NEW_REQUEST",contactname:contactname,caddress:caddress,cphone:cphone});

    }
    render() {
        const{contactname,caddress,cphone,flag}=this.props;
        if(flag){
             alert(flag);
             this.props.history.push('/home');
        }
        return(
            <div>
            <div className="NewContact">
                <div className="login-wrap">
                    <div className="login-html">
                        <div className="login-form">
                            <div>

                                <div class="group">
                                    <label for="contact" class="label">Name</label>
                                    <input id="contactname" type="text" class="input" onChange={this.handleChange} ref={el => this.inputName = el}/>
                                </div>
                                <div class="group">
                                    <label for="address" class="label">Address</label>
                                    <input id="caddress" type="text" class="input" onChange={this.handleChange} ref={el => this.inputAddress = el}/>
                                </div>
                                <div class="group">
                                    <label for="Phone" class="label">Phone</label>
                                    <input id="cphone" type="text" class="input" onChange={this.handleChange} ref={el => this.inputPhone = el}/>
                                </div>
                                <div class="group">
                                    <Button type="primary" onClick={this.onSubmit}>Save</Button>
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
        flag:state.flag,
        contactname:state.contactname,
        caddress:state.caddress,
        cphone:state.cphone
    };
};
export default connect(mapStateToProps)(NewContact);