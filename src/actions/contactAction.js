import * as actionType from './actionType';

export const createContact = (contact) =>{
    return{
        type: actionType.CREATE_NEW_CONTACT,
        contact: contact
    }
}

export const deleteContact = (index) =>{
    return{
        type: actionType.DELETE_CONTACT,
        index: index
    }
}

