import { createReducer,on } from "@ngrx/store";
import { UserState } from "./user.state";
import { duplicateUserSuccess } from "./user.actions";




const _userReducer = createReducer(UserState,on(duplicateUserSuccess,(state,action)=>{
  return{
    ...state,
    isDuplicate:action.isDuplicate
  }
}),)
export function UserReducer(state:any,action:any){
  return _userReducer(state,action);
}