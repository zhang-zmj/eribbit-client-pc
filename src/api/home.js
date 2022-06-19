import request from '@/utils/request'

export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 获取广告图
 * @returns Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get')
}

// 封装API调用接口
export const findNew = () => {
  return request('home/new', 'get')
}
