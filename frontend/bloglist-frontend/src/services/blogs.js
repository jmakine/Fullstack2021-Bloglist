/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const deleteToken = () => {
  token = null
}

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const comment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return request.data
}

export default { comment, getAllBlogs, setToken, create, update, remove , deleteToken }