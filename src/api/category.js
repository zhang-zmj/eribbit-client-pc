// 定义分类相关的API接口与函数
import request from '@/utils/request'

// 获取所有分类（顶级、二级、对应的商品） return Promise

export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
