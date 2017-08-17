import { request, config } from 'utils'
const { api } = config;
const { tvbrand } = api;

export async function query (params) {
  return request({
    url: tvbrand,
    method: 'get',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: tvbrand,
    method: 'delete',
    data: params,
  })
}
