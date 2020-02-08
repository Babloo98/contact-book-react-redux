import * as actionTypes from '../actions/actionType';

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.CREATE_NEW_CONTACT:
      return [
        ...state,
        Object.assign({}, action.contact)
      ];
      case actionTypes.DELETE_CONTACT:
        state.splice(action.index,1);
        console.log('state=====>',state,action.index)
        return[
          ...state
      ];
      default:
        return state;
    }
  };