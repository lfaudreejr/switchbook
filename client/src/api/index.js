import axios from 'axios';
import AuthService from '../auth/AuthService';

const auth = new AuthService();

// const PROFILE = JSON.parse(localStorage.getItem('profile'))

export default class ApiService {

  submitBook (book) {
    return axios.post('/api/user/books',
      {
        title: book.title,
        author: book.author
      },
      {
        headers: {
          Authorization: `Bearer ${auth.getToken()}`,
          Profile: auth.getProfile()
        }
      });
  }

  getAllBooks () {
    return axios.get('/api/books', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  getBookById (id) {
    return axios.get('/api/books/' + id, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  getBooksByUser () {
    return axios.get('/api/user/books', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  submitATrade (request) {
    return axios.post('/api/trades/request', request, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  getPendingTrades () {
    return axios.get('/api/trades/pending', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  getRequestedTrades () {
    return axios.get('/api/trades/', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  getNumberPendingTrades () {
    return axios.get('/api/trades/pending/incoming', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  getNumberRequestedTrades () {
    return axios.get('/api/trades/pending/requested', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  declineATrade (id) {
    return axios.delete(`/api/trades/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  acceptATrade (request) {
    return axios.post('/api/trades/accept', request, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

  findABook (book) {
    return axios.post('/api/books/search', book, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
        Profile: auth.getProfile()
      }
    });
  }

}
