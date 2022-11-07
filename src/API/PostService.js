import axios from "axios";


export default class PostService {

  static async getAll() {
    const URL = 'https://jsonplaceholder.typicode.com/posts'
    const response = await axios.get(URL)
    return response.data
  }
}