//带分页的表格组件
//包含三个子组件（Paging,List,Loading）

<template>
<div class="paging-list">
  <Loading v-if="!data"></Loading>
  <div class="empty" v-if="data&&data.length==0"> This record is empty!</div>
  <div class="list-paing" v-if="data&&data.length!=0">
    <List v-if="data" :listHeight="listHeight" :currentData="currentData" :rowsWidth="rowsWidth" :listType="listType" :listHeader="listHeader"></List>
    <Paging v-if="isShowPaging" :totalPage="totalPage" :goToCallback="goToCallback"></Paging>
  </div>
</div>
</template>

<script>
import List from './List.vue'
import Paging from './Paging.vue' 
import Loading from './Loading.vue' 

export default {
  name: 'PagingList',
  data(){
  	return{
      'currentPage':1, //当前第几页
    }
  },
  props:["onePageNum","data","rowsWidth","listHeader","listHeight","isShowPaging","listType"],
  components:{
    List,
    Paging,
    Loading
  },
  computed:{
    //根据传入的数据和每页条数算出总页数
    totalPage(){
      return Math.ceil(this.data.length/this.onePageNum);
    },

    //当前页应该显示的数据
    currentData(){
      //从总数据取出当前页的数据
      return this.data.slice(this.onePageNum * (this.currentPage - 1), this.onePageNum * this.currentPage)
    }
  },
  methods:{
    //页数改变后的回调，参数为改变后的页码
    goToCallback(index){
      let ts = this;

      //使当前页变为改变后的页码
      ts.currentPage = index; 
    }
  }
}
</script>

<style scoped>
.paging-list{width: 100%;}
.empty{margin-top: 25px; color:#979797;}
</style>
