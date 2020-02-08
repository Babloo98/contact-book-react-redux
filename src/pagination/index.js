import React from 'react';
import * as contactAction from '../actions/contactAction';
import { connect } from 'react-redux' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      dataPerPage: 5,
      index: ''
    };
  }

      handleClick = (event) => {
          console.log(event.target.id)
        this.setState({
          currentPage: Number(event.target.id)
        });
      };

      handleDelete = (e,index) =>{
        this.notify();
          this.setState({
            index: +(index)
          });
          this.props.deleteContact(index);
      }

      notify = () => toast.error("Contact deleted Successfully!!", {
        position: toast.POSITION.TOP_RIGHT, autoClose: 1500
      });

      render() {
        const { currentPage, dataPerPage } = this.state;
        const { data } = this.props;

        const indexOfLastTodo = currentPage * dataPerPage;
        const indexOfFirstTodo = indexOfLastTodo - dataPerPage;
        
        const currentData = data.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderContact = currentData.map((data, index) => {
            return(
                <div className="media single-detail">
                  <div>
                   <img src= "https://www.w3schools.com/howto/img_avatar.png" className="mr-3 mt-3 rounded-circle"></img>
                  </div>
                  <div className="media-body">  
                    <h4>{data['name']}</h4> 
                    <p>{data['email']}</p>
                    <h4>{data['number']}</h4>
                  </div>
                  <div className="actions">
                    <span onClick={e=>this.handleDelete(e,index)} className="close">
                      &times;
                    </span>
                  </div>  
                  <ToastContainer />
                </div>
            )
        });

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / dataPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
              className="pages"
            >
              {number}
            </li>
          );
        });

        return (
          <div>
            <ul>
              {renderContact}
            </ul>
            <ul id="page-numbers">
              {renderPageNumbers}
            </ul>
          </div>
        );
      }
    }

const mapDispatchToProps = (dispatch) => {
  return {
    deleteContact: index => dispatch(contactAction.deleteContact(index))
  }
};

export default connect(null,mapDispatchToProps)(Pagination);
