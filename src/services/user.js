import { request, config } from 'utils'
const { api } = config;
const { user } = api;
const {usersdetail} =api;
const { users } = api;
export async function query (params) {
  return request({
    url: user,
    method: 'post',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: usersdetail.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: usersdetail,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
