import React,{Component} from 'react';
import  './Login.css';
import {connect} from "react-redux";
import {Button,Form,Input} from 'antd';
const FormItem = Form.Item;
class AddNew extends Component {
    constructor() {
        super();
    }
    render(){
        const myHorizontalLoginForm = Form.create()(AddNew);
        const {getFieldDecorator}=this.props.form;
        return(
            <div className="AddNew">
             <myHorizontalLoginForm inline onSubmit={this.onSubmit}>
                <FormItem>
                    {
                        getFieldDecorator('Name',{
                            rules:[{required:true,message:'Please enter your name'}],
                            })(
                                <Input id="contactname"/>
                        )}
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('Address',{
                            rules:[{required:true,message:'Please enter your address'}],
                            })(
                                <Input id="caddress"/>
                        )}
                </FormItem>
                 <FormItem>
                     
                 </FormItem>
             </myHorizontalLoginForm>
            </div>
        )
    }
}
export default connect(AddNew);