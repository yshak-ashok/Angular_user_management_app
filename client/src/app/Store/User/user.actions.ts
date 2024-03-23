import { createAction, props } from "@ngrx/store";
import { Users, userCredential } from "../Model/user.model";

export const BEGIN_REGISTER='[auth] begin register';
export const beginRegister=createAction(BEGIN_REGISTER,props<{userData:Users}>())

export const BEGIN_LOGIN='[auth] begin login'
export const beginLogin=createAction(BEGIN_LOGIN,props<{userCredential:userCredential}>())

export const PROFILE_IMAGE_UPLOAD = '[profile] upload user image'
export const uploadUserImage = createAction(PROFILE_IMAGE_UPLOAD,props<{data:FormData}>());

export const DUPLICATE_USER = '[auth] duplicate user'
export const DUPLICATE_USER_SUCCESS = '[auth] duplicate user success'
export const duplicateUser = createAction(DUPLICATE_USER,props<{userEmail:string}>());
export const duplicateUserSuccess = createAction(DUPLICATE_USER_SUCCESS,props<{isDuplicate:boolean}>());

