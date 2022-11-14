import {configureStore} from '@reduxjs/toolkit';
import appReducer from './appReducer';
import {Action, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";


export type RootState = ReturnType<typeof rootReducer>

type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType

export type AppStateType = ReturnType<RootReducerType>

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


let rootReducer = combineReducers({
  app: appReducer,
});

const store = configureStore({reducer: rootReducer});

export default store;
