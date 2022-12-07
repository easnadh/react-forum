import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/posts/"
export const BASE_URL = "http://localhost:3001"

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

const errorHandler = async (response) => {
  if (response.status !== 200) {
    const responseData = await response.json();
    throw Error(responseData.message);
  }
};

export const API = {
  auth: {
    login: async (data) => {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      await errorHandler(response);
    },
    logout: async () => {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: "DELETE",
        credentials: "include",
      });
      await errorHandler(response);
    },
  },
  user: {
    register: async (data) => {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      await errorHandler(response);
    },
    getCurrentUser: async () => {
      const response = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
        method: "GET"
      });
      await errorHandler(response);
      return await response.json();
    },
  },
};