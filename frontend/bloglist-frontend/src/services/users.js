/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/users'

const deleteUser = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.data
}

const getAllUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAllUsers, deleteUser } 