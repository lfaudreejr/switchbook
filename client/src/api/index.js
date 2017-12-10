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

  submitATrade (request) {
    return axios.post('/api/trades/request', request, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }

  getPendingTrades () {
    return axios.get('/api/trades/pending', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }

  getRequestedTrades () {
    return axios.get('/api/trades/', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }

  getNumberPendingTrades () {
    return axios.get('/api/trades/pending/number', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }

  getNumberRequestedTrades () {
    return axios.get('/api/trades/pending/requested', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
  }
}
