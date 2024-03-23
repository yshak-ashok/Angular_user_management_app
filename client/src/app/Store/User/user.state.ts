import { createEntityAdapter } from '@ngrx/entity';
import { Users } from '../Model/user.model';

export const UserAdapter = createEntityAdapter<Users>();
export const UserState = UserAdapter.getInitialState({
  isDuplicate:false,
  userObj:{
     id:'',
     name:'',
     email:'',
     image:'',
  }
});