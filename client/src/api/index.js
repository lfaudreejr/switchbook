import axios from 'axios'
import AuthService from '../auth/AuthService'

const auth = new AuthService()

export default class ApiService {

  submitBook (book) {
    return axios.post('/api/user/books',
      {
        title: book.title,
        author: book.author
      },
      {
        headers: {
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
  }

  getAllBooks () {
    return axios.get('/api/books', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }

  getBookById (id) {
    return axios.get('/api/books/' + id, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }

  getBooksByUser () {
    return axios.get('/api/user/books', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }
}
