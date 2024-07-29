/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import config from '../../config/config';
import { IUserInfo } from '../../types';
import { query } from '../../utils/cache';

const getAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export function getUser(id: string) {
  return axios.get(`${config.apiAddress}/users/${id}`);
}

export async function getUsers() {
  return query('userList', () => {
    return axios.get(`${config.apiAddress}/users`);
  });
}

export function updateMe(data: IUserInfo, token: string) {
  return axios.put(`${config.apiAddress}/account/me`, data, getAuthHeader(token));
}
