import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const userState = {
    loggedUser: null,
    usersList: []
}

const reducer = (state = userState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, loggedUser: action.data}
        case 'INIT_USERS':
            return {...state, usersList: action.data}            
        case 'LOGOUT':
            return {...state, loggedUser: null }
        default:
            return state
    }
}

export const setUser = () => {
    return (dispatch) => {
        try {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'SET_USER',
                data: user
            })
        }
        } catch (error) {
            dispatch(setNotification(`Error: ${console.error()}`, 5))
        }
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        try {
            const users = await userService.getAllUsers()
            dispatch({
                type: 'INIT_USERS',
                data: users
            })
        } catch (error) {
            dispatch(setNotification(`Error: ${console.error()}`, 5))
        }
    }
}

export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({username, password})
        
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )        
            blogService.setToken(user.token)
            dispatch(setUser())

        } catch (error) {
            dispatch(setNotification(`Error: ${console.error()}`, 5))
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        try {
            window.localStorage.removeItem('loggedBlogAppUser')
            dispatch({
                type: 'LOGOUT'
            })
        } catch (error) {
            dispatch(setNotification(`Error: ${console.error()}`, 5))
        }
    }
}

export default reducer