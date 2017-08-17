import { request, config } from 'utils'
const { api } = config;
const {channel} =api;
export async function query (params) {
  return request({
    url: channel,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: channel.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: channel,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: channel,
    method: 'patch',
    data: params,
  })
}
