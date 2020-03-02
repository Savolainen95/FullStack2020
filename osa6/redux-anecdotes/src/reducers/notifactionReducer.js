const messageAtStart = null

const notifactionReducer = (state = messageAtStart, action) => {
    switch(action.type) {
        case 'MESSAGE':
            return action.message
        case 'NOMESSAGE':
            return null
        default: return state
    }
}

export  const setMessage =  (message) => {

    
    return {
        type: 'MESSAGE',
        message
    }
}

export const hideMessage =  () => {
    return {
        type: 'NOMESSAGE',
    }
}

export default notifactionReducer