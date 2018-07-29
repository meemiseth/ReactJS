import React,{Component} from 'react';
import '../template/css/style.css';
import {connect} from "react-redux";
import {Table} from 'antd';
class Audit extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(sessionStorage.getItem('sessionItem')==null){
            this.props.history.push('/');
        }
        try {
            const id = this.props.location.query.edit_id;
            this.props.dispatch({type: "API_FETCH_AUDIT_REQUEST", edit_id: id});
        }
        catch(Exception){
            this.props.history.push('/home');
        }
    }
    render(){
        const cols=[
            {
                title: 'SLNo',
                dataIndex:'SLNo'
            },
            {
                title: 'Details',
                dataIndex:'Details'

            }
        ];
        const {audit} = this.props;
        const audit_data =[];
        if(audit!=null && audit.length >0) {
            this.rows = [];
            for (var i = 0; i < audit.length; i++) {
                audit_data.push({
                    SLNo: i+1,
                    Details: "Contact "+audit[i].contact_name+" "+audit[i].operation+" by "+audit[i].user_name+" at  "+audit[i].time
                });
            }
        }
        return(
            <div className="Audit">
                <Table dataSource={audit_data} columns={cols} />
            </div>
        );

    }
}
const mapStateToProps = state => {
    return {
        edit_id: state.edit_id,
        audit:state.audit
    };
};
export default connect(mapStateToProps)(Audit);