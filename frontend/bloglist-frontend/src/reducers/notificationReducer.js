const reducer = (state = null, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.data
        case 'HIDE':
            return null
        default:
            return state
    }
}

let timeoutId = -1
export const setNotification = (message, time) => {
    return async dispatch => {
        
        dispatch({
            type: 'MESSAGE',
            data:  message 
        })
        
        if (timeoutId) clearTimeout(timeoutId)
        
        const newTimeout = setTimeout(() => {
            dispatch({
            type: 'HIDE',
            data: ''
            })
        }, time * 1000)
        timeoutId = newTimeout
    }
}

export default reducer