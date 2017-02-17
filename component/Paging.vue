//分页组件

<template>
  <div class="pager">
    <a href="javascript:;" :class="'btn btn-pager ' +(currentPage <=1 ?'disabled':'')" @click="prePage"><i class="icons icon-prev"></i></a>
    <span v-if="totalPage !== 1" :class="'page-index '+(1 == currentPage ? 'active':'')" @click="goPage(1)">1</span>
    <span v-if="preClipped" class="page-index not-pointed">...</span>
    <span v-for="index in pages" :class="'page-index '+(index == currentPage ? 'active':'')" @click="goPage(index)" v-text="index"></span>
    <span v-if="backClipped" class="page-index not-pointed">...</span>
    <span :class="'page-index '+(totalPage == currentPage ? 'active':'')" @click="goPage(totalPage)" v-text="totalPage"></span>
    <a href="javascript:;" :class="'btn btn-pager ' + (currentPage >= totalPage?'disabled':'')" :disabled="this.currentPage == totalPage" @click="nextPage"><i class="icons icon-next"></i></a>
  </div>
</template>
<script>
export default {
  props: {
    // 用于记录总页码，可由父组件传过来
    totalPage: {
      type: Number,
      default: 1
    },
    goToCallback:{
    }
  },
  data: function () {
    return {
      // 用于判断省略号是否显示
      backClipped: true, 
      preClipped: false,
      currentPage: 1
    }
  },
  methods: {
    prePage () {
      // 上一页
      if(this.currentPage<=1) return false;
      this.currentPage--
      this.goToCallback(this.currentPage)
    },
    nextPage () {
      // 下一页
      if(this.currentPage>=this.totalPage) return false;
      this.currentPage++;
      this.goToCallback(this.currentPage)
    },
    goPage (index) {
      // 跳转到相应页面
      if (index !== this.currentPage) {
        this.currentPage = index
      }
      this.goToCallback(this.currentPage)
    }
  },
  computed: {
    // 使用计算属性来得到每次应该显示的页码
    pages: function () {
      let ret = []
      if (this.currentPage > 3) {
        // 当前页码大于三时，显示当前页码的前2个
        ret.push(this.currentPage - 2)
        ret.push(this.currentPage - 1)
        if (this.currentPage > 4) {
          // 当前页与第一页差距4以上时显示省略号
          this.preClipped = true
        }
      } else {
        this.preClipped = false
        for (let i = 2; i < this.currentPage; i++) {
          ret.push(i)
        }
      }
      if (this.currentPage !== this.totalPage && this.currentPage !== 1) {
        ret.push(this.currentPage)
      }
      if (this.currentPage < (this.totalPage - 2)) {
        // 显示当前页码的后2个
        ret.push(this.currentPage + 1)
        ret.push(this.currentPage + 2)
        if (this.currentPage <= (this.totalPage - 3)) {
          //当前页与最后一页差距3以上时显示省略号
          this.backClipped = true
        }
      } else {
        this.backClipped = false
        for (let i = (this.currentPage + 1); i < this.totalPage; i++) {
          ret.push(i)
        }
      }
      // 返回整个页码组
      return ret
    }
  }
}
</script>
<style scoped>
.pager {
  -webkit-user-select: none;
  user-select: none;
  transition: all .3s;
  margin-top: 30px;
  text-align: right;
  color: #D2D2D2;
  font-size: 13px;
}
.btn-pager {
  padding: 0px;
  text-align: center;
  vertical-align: middle;
  color: #D2D2D2;
  border: 0;
  background: none;
  border-radius: 0px;
  display: inline-block;
}
.btn-pager:first-child{
  margin-right: 12px;
}
.btn-pager:last-child{
  margin-left: 12px;
}
.btn-pager:hover {
  color: #50E3CE;
}
.btn-pager .icons{
  vertical-align: middle;
}
.page-index {
  text-align: center;
  vertical-align: middle;
  display: inline-block;
  margin-left: 4px;
  padding: 0 7px;
  height: 22px;
  line-height: 22px;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  -o-border-radius: 100%;
  border-radius: 100%;
  cursor: pointer;
}
.not-pointed{
  cursor: default; 
}
.active {
  color: #ffffff;
  background-color: #50E3CE;
}
.disabled{
  cursor: not-allowed;
}
</style>

