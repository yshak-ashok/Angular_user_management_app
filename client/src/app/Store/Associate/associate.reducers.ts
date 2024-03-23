import { createReducer, on } from '@ngrx/store';
import { AssociateState } from './associate.state';
import { addAssociateSuccess, deleteUserSuccess, getEditUserSuccess, loadAssociateFail, loadAssociateSuccess, openPopup, updateUserSuccess } from './associate.actions';

const _AssociateReducer = createReducer(
  AssociateState,
  on(loadAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: '',
    };
  }),
  on(loadAssociateFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage,
    };
  }),
  on(addAssociateSuccess, (state, action) => {
    const _userData = { ...action.inputData };
    _userData._id = action.id;
    return {
      ...state,
      list: [...state.list, _userData],
      errorMessage: '',
    };
  }),
  on(updateUserSuccess,(state,action)=>{
    let data = {...action.userData};
   const _newData = state.list.map((user)=>{
      return user._id === data._id?data:user;
   })
   return{
      ...state,
      list:_newData,
      errorMessage:''
   }
  }),
  on(openPopup, (state) => {
    return {
      ...state,
      associateobj: {
        name: '',
        email: '',
        password: '',
        phone: ''
      },
    };
  }),

  on(deleteUserSuccess,(state,action)=>{
    const _userData = state.list.filter((user)=>{
      return user._id !== action.id;
    })
    console.log(_userData);
    return{
      ...state,
      list:_userData,
      errorMessage:''
    }
  }),
  on(getEditUserSuccess, (state, action) => {
    // console.log(`edit User success : `,action);
    return {
      ...state,
      associateobj: {...action.obj},
      errorMessage: '',
    };
  }),

);

export function AssociateReducer(state: any, action: any) {
  return _AssociateReducer(state, action);
}
