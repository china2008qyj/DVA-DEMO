import { request, config } from 'utils'
const { api } = config;
const {channels} =api;
export async function query (params) {
  return request({
    url: channels,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: channels.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  const  pa ={};
  const  ur=channels.replace(':id',params.tvBrandId);
  return request({
    url:ur +"/"+params.id,
    method: 'delete',
    data: pa,
  })
}

export async function update (params) {
  return request({
    url: channels,
    method: 'patch',
    data: params,
  })
}
