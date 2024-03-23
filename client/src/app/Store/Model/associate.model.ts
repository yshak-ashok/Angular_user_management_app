export interface Associate{
  _id?:string;
  name:string;
  email:string;
  password:string;
  phone:string;
}
export interface AssociateModel{
  list:Associate[];
  associateobj:Associate;
  errorMessage:string;
}