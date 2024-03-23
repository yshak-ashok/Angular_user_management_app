import { createFeatureSelector, createSelector } from "@ngrx/store";

import { UserModel } from "../Model/user.model";

const getUserState  = createFeatureSelector<UserModel>('user');

export const isDuplicateUser = createSelector(getUserState,state=>{
   return state.isDuplicate;
})