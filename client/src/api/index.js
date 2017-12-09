import axios from 'axios'
import AuthService from '../auth/AuthService'

const auth = new AuthService()

export default class ApiService {
  submitBook (book) {
    return axios.post('/user/books',
      {
        title: book.title,
        author: book.author
      },
      {
        headers: {
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
      .then((result) => {
        const { data } = result
        return data
      }).catch((err) => {
        console.error(err)
      })
  }

  getBookById (id) {
    return axios.get('/books/' + id)
  }
}
