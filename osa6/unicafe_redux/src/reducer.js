const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const changeGood = {
        ...state,
        good: state.good +1
      }
      return changeGood
    case 'OK':
      const changeOk = {
        ...state,
        ok: state.ok + 1
      }
      return changeOk
    case 'BAD':
      const changeBad = {
        ...state,
        bad: state.bad + 1
      }
      return changeBad
    case 'ZERO':
      const changeToZero = {
        ...state,
        good: 0,
        ok: 0,
        bad: 0
      }
      return changeToZero
    default: return state
  }
  
}

export default counterReducer