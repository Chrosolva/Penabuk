import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  getUser (token) {
    return Api().get('users?token=' + token)
  },
  getAllbooks () {
    return Api().get('books')
  },
  getBookbyId (bookid) {
    return Api().get('books/' + bookid)
  },
  ratebook (token, credentials) {
    return Api().post('books/rate?token=' + token, credentials)
  }
}
