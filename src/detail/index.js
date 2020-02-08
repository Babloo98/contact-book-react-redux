import React from 'react';
import { connect } from 'react-redux' ;
import * as contactAction from '../actions/contactAction';
import Pagination from '../pagination';

class Detail extends React.Component{
        constructor(props){
        super(props);
        this.state ={
            contact: []
        }
    }

    componentDidMount = () =>{
        const { contacts } = this.props;
        console.log('props',this.props.contacts);
        this.setState({
            contact: contacts
        });
    }

    render(){
        return(
            <div className="detail">
                <Pagination
                    data = {this.props.contacts}
                />
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
      contacts: state.contacts
    }
  };

const mapDispatchToProps = (dispatch) => {
return {
    createContact: contact => dispatch(contactAction.createContact(contact))
}
};
  

export default connect(mapStateToProps, mapDispatchToProps)(Detail);