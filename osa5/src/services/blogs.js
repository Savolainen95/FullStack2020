import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
const create = async (newObjet) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObjet, config)
  return response.data
} 
const updateLikes = async (update, id) => {
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.put(`/api/blogs/${id}`,update, config)
  return response.data
}
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.delete(`/api/blogs/${id}`, config)
  return response.data
}

export default { getAll , create, setToken, updateLikes, deleteBlog}