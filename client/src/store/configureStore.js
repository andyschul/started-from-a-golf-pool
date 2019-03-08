import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { scheduleFetchData } from '../actions';

function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
const store = configureStore();
store.dispatch(scheduleFetchData(`${process.env.REACT_APP_API_URL}/api/schedule/${new Date().getFullYear()}`));

export default store