import Vue from 'vue'
import Skeleton from './components/Skeleton'
export default new Vue({
    components: {
        Skeleton,
    },
    // 多骨架屏从实现上看，实际上是把多个骨架屏都加载到页面上
    // 然后通过webpackconfig中的routes配置的skeletonId确定显示某一个skeleton
    template: `
    <div>
      <skeleton id="skeleton"/>
    </div>
  `
})