import React from 'react'

const Notification = ({message}) => {
    if(message !== null && message[1]) {
        return <p className= 'error'>{message}</p>
    } else if (message !== null && !message[1]){
        return <p className ='true'>{message}</p>

    } else {
        return null
    }
}

export default Notification