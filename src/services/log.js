import { request, config } from 'utils'
const { api } = config;
const { log } = api;
export async function query (params) {
  return request({
    url: log,
    method: 'post',
    data: params,
  })
}
