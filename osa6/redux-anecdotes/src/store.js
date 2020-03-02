
import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import notifactionReducer from './reducers/notifactionReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'




const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notifactionReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)



export default store