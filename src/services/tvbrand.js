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

export async function create (params) {
  return request({
    url: tvbrand,
    method: 'post',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: tvbrand,
    method: 'delete',
    data: params,
  })
}
