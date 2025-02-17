import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state=[], action) => {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.data)
        case 'LIKE':
            return state.map(blog => blog.id !== action.data.id ? blog : { ...action.data })
        case 'DELETE':
            return state.filter((blog) => blog.id !== action.data)
        case 'INIT_BLOGS':
            return action.data
        case 'COMMENT':
            return state.map(blog => blog.id !== action.data.id ? blog : action.data)
        default: 
            return state
    }
}

export const commentBlog = (id, comment) => {
    return async dispatch => {
        try {
            const commentedBlog = await blogService.comment(id, comment)
            dispatch({
                type: 'COMMENT',
                data: commentedBlog
            })
        } catch (error) {
            dispatch(setNotification(`Error: ${console.error()}`, 5))
        }
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        try {
            const allBlogs = await blogService.getAllBlogs()
            dispatch({
                type: 'INIT_BLOGS',
                data: allBlogs
            })
        } catch (error) {
            dispatch(setNotification(
                `Error:  ${console.error()}`
                , 5)
            )
        }
    }
}

export const createBlog = (content) => {
    
    return async dispatch => {

        try {            
            const createdBlog = await blogService.create(content)
            dispatch({
                type: 'CREATE',
                data: createdBlog
            })
           
        } catch (error) {
            dispatch(setNotification(
            `Error:  ${console.error()}`
            , 5)
            )
        }
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {

        try {
              await blogService.remove(id)
              dispatch({
                  type: 'DELETE',
                  data: id
              })    
              
        } catch (error) {
            dispatch(setNotification(`Error: ${console.error()}`, 5))
        }
    }
}

export const likeBlog = (content) => {
    return async dispatch => {

        try{
        const likedBlog = {
            ...content,
            user: content.user.id,
            likes: (content.likes += 1)
        }
        const updatedBlog = await blogService.update(content.id, likedBlog)
        dispatch({
            type: 'LIKE',
            data: updatedBlog
        })

        } catch (error) {
            dispatch(setNotification(
                `Error: ${console.error()}`
                , 5)
            )
        }
    }
}


export default reducer