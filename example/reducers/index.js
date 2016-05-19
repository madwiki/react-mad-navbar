import { combineReducers } from 'redux'

function windowResize(state = {}, action) {
  switch (action.type){
    case 'windowResize':
      return {
        width: action.size.width,
        height: action.size.height
      }
    default:
      return state
  }
}

function windowInitialSize(state = {}, action) {
  switch (action.type){
    case 'windowInitialSize':
      return {
        width: action.initialSize.width,
        height: action.initialSize.height
      }
    default:
      return state
  }
}

const reducers = combineReducers({
  windowResize,
  windowInitialSize
})

export default reducers