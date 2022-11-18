import axios from "axios";

export default class PostService {

  static async getAll(limit = 10, page = 1) {
    const URL = 'https://jsonplaceholder.typicode.com/posts'
    const response = await axios.get(URL, {
      params: {
        _limit: limit,
        _page: page
      }
    })
    return response
  }
}