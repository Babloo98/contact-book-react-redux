import React, { Component } from 'react';
import './main.css'
import * as contactAction from './actions/contactAction';
import { connect } from 'react-redux' ;
import Detail from './detail';
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      number: '',
      email: '',
      seeDetail: true,
    }
  }

  handleChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value 
    })
  };

  handleSubmit = (e) =>{
    const { name, number, email} = this.state; 
    e.preventDefault();
    this.notify();
    let contact = {
      name: name,
      number: number,
      email: email
    }
    this.props.createContact(contact);
  };

  notify = () => toast.success("Contact created Successfully!!", {
    position: toast.POSITION.TOP_RIGHT, autoClose: 2000
  });

  showDetail = (e) =>{
    e.preventDefault();
    const { seeDetail } = this.state;
    this.setState({
      seeDetail: !seeDetail
    },()=>console.log('hey===>',seeDetail))
  }

  render(){
    const { seeDetail } = this.state;
    console.log(this.props)
    return (
      <div className="Appwrapper">
        <div className='App'>
          <Header/>
          <div className='form'>    
            <h3 className=' app-heading'>Add to contact</h3>
            <p>#Add your contact here and see the saved contacts within the application</p>
            {seeDetail ?
            (<form className="">
              <div className = 'form-group'>
                <label className=''>Enter Name:</label>
                <input className='form-control' name = 'name' type="text" onChange={e => this.handleChange(e)} />
              </div>
              <div className = 'form-group'>
                <label className=''>Enter Contact:</label>
                <input className='form-control' name = 'number' type="text" onChange={e => this.handleChange(e)} />
              </div>
              <div className = 'form-group'>
                <label className=''>Enter Email:</label>
                <input className='form-control' name = 'email' type="text" onChange={e => this.handleChange(e)} />
              </div>
              <button className= 'button'  onClick={e =>this.handleSubmit(e)}>Create Contact</button>
              <button className= 'button'  onClick={e =>this.showDetail(e)}>See Contacts</button>
            </form>):
            <Detail/>}
          </div>      
        </div>
        <ToastContainer />
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

