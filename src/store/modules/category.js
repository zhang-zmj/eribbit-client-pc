// 分类
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state () {
    return {
      // 如果默认是[]数组，看不见默认的9个分类，等你数据加载完毕才会看到。
      // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类函数
  mutations: {
    setList (state, headCategory) {
      state.list = headCategory
    },
    // 修改当前一级分类下的open数据为true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  // 获取分类函数
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const { result } = await findAllCategory()
      console.log('--------------', result)
      result.forEach(item => {
        /*
          * 给每一个一级分类定义控制显示隐藏的数据，open：布尔类型，通过open设置类名控制显示隐藏
          * 当进入一级分类的时候，将open改为true
          * 当离开一级分类的时候，将open改为false
          * 点击一级分类，二级分类，将open改为false
        */
        item.open = false
      })
      // 获取数据成功，提交mutations进行数据修改
      commit('setList', result)
    }
  }
}
