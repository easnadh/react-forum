import axios from "axios";

const URL = 'https://jsonplaceholder.typicode.com/posts/'

export default class PostService {

  static async getAll(limit = 10, page = 1) {
    return await axios.get(URL, {
      params: {
        _limit: limit,
        _page: page
      }
    })
  }

  static async getById(id) {
    return await axios.get(URL + id)
  }

  static async getComments(id) {
    return await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
  }

}