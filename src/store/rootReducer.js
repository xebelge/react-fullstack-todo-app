import { combineReducers } from '@reduxjs/toolkit';
import TodoSlice from '../features/TodoSlice';

const rootReducer = combineReducers({
    todo: TodoSlice,
});

export default rootReducer;