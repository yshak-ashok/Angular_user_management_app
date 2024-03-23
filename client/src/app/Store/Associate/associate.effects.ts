import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addAssociate,
  addAssociateSuccess,
  deleteUser,
  deleteUserSuccess,
  getEditUser,
  getEditUserSuccess,
  loadAssociate,
  loadAssociateFail,
  loadAssociateSuccess,
  updateUser,
  updateUserSuccess,
} from './associate.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AssociateService } from '../../Services/associate.service';
import { showAlert } from '../Common/app.action';

@Injectable()
export class AssociateEffect {
  constructor(private action$: Actions, private service: AssociateService) {}

  _loadAssociate = createEffect(() =>
    this.action$.pipe(
      ofType(loadAssociate),
      exhaustMap((action) => {
        return this.service.getAllUsers().pipe(
          map((data) => {
            return loadAssociateSuccess({ list: data });
          }),
          catchError((_error) =>
            of(loadAssociateFail({ errorMessage: _error.message }))
          )
        );
      })
    )
  );
  _addAssociate = createEffect(() =>
    this.action$.pipe(
      ofType(addAssociate),
      switchMap((action) => {
        console.log('admin user new data', action.inputData);

        return this.service.createUser(action.inputData).pipe(
          switchMap((data) => {
            return of(
              addAssociateSuccess({
                inputData: action.inputData,
                id: data._id as string,
              }),
              showAlert({ message: 'Successfully created', resultType: 'pass' })
            );
          }),
          catchError((_error) =>
            of(showAlert({ message: 'Failed to create', resultType: 'fail' }))
          )
        );
      })
    )
  );

  _updateUser = createEffect(() =>
    this.action$.pipe(
      ofType(updateUser),
      switchMap((action) => {
        return this.service.updateUser(action.id, action.inputData).pipe(
          switchMap((data) => {
            return of(
              updateUserSuccess({ userData: data }),
              showAlert({ message: 'Sucessfully Updated', resultType: 'pass' })
            );
          }),
          catchError((_error) =>
            of(showAlert({ message: 'Failed to update', resultType: 'fail' }))
          )
        );
      })
    )
  );

  _deleteUser = createEffect(() =>
    this.action$.pipe(
      ofType(deleteUser),
      switchMap((action) => {
        return this.service.deleteUser(action.id).pipe(
          switchMap((data) => {
            return of(deleteUserSuccess({ id: action.id }));
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to delete User',
                resultType: 'Fail',
              })
            )
          )
        );
      })
    )
  );

  _getEditUser = createEffect(() =>
    this.action$.pipe(
      ofType(getEditUser),
      exhaustMap((action) => {
        return this.service.editUser(action.id).pipe(
          map((data) => {
            return getEditUserSuccess({ obj: data });
          }),
          catchError((_error) =>
            of(
              showAlert({ message: 'Failed to fetch data', resultType: 'fail' })
            )
          )
        );
      })
    )
  );
}
