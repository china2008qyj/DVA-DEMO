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
  const  ur=channels.replace(':id',params.tvBrandId);
  return request({
    url: ur,
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
  const  ur=channels.replace(':id',params.tvBrandId);
  const  pa ={};
  pa["channelName"] =params.channelName;
  pa["channelNumber"] =params.channelNumber;
  return request({
    url: ur +"/"+params.id,
    method: 'put',
    data: pa,
  })
}
