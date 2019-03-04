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
  },
  getprovince () {
    return Api().get('provinces')
  },
  getkota (id) {
    return Api().get('cities?province_id=' + id)
  },
  getcamat (cityid) {
    return Api().get('districts?city_id=' + cityid)
  },
  addaddress (token, credentials) {
    return Api().post('addresses?token=' + token, credentials)
  },
  getaddress (token) {
    return Api().get('addresses?token=' + token)
  }
}
