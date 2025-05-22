import axios from 'axios';
import { getDataFromLocal } from '../storeData/localStrorageData';
const  userKey = process.env.REACT_APP_SET_AUTH_DATA;

export const postApi = async({url, body}) => {
    try {
        const response = await axios.post(url, body).then((res) => res.data);
            return response;
    } catch (error) {
        return {
            status: false,
            message: error.response?.data?.message
        };
    }
}

const getAuthHeaders = () => {
    const token = getDataFromLocal(userKey)?.token;
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

export const postAuthApi = async({url, body}) => {
    try {
        const response = await axios.post(url, body, getAuthHeaders()).then((res) => res.data);
        return response;
      } catch (error) {
        return {
          status: false,
          message: error.response?.data?.message
        };
      }
}

export const putAuthApi = async ({ url, body }) => {
    try {
      const response = await axios.put(url, body, getAuthHeaders()).then((res) => res.data);
      return response;
    } catch (error) {
      return {
        status: false,
        message: error.response?.data?.message
      };
    }
  };
  
  export const deleteAuthApi = async ( url ) => {
    try {
      const response = await axios.delete(url, getAuthHeaders()).then((res) => res.data);
      return response;
    } catch (error) {
      return {
        status: false,
        message: error.response?.data?.message
      };
    }
  };

