//带分页的列表组件

<template>
<div class="paging-list">
  <Loading v-if="!data"></Loading>
  <div class="empty" v-if="data&&data.length==0"> This record is empty!</div>
  <div class="list-paing" v-if="data&&data.length!=0">
    <List v-if="data" :listHeight="listHeight" :currentData="data.slice(onePageNum*(currentPage-1),onePageNum*currentPage)" :rowsWidth="rowsWidth" :listHeader="listHeader" :listType="listType"></List>
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
      'currentPage':1,
    }
  },
  props:["onePageNum","data","rowsWidth","listHeader","listType","listHeight","isShowPaging"],
  components:{
    List,
    Paging,
    Loading
  },
  computed:{
    totalPage(){
      return Math.ceil(this.data.length/this.onePageNum);
    },
  },
  methods:{
    goToCallback(index){
      let ts = this;
      ts.currentPage = index;
      //console.log('goToCallback: '+index)
    }
  }
}
</script>

<style scoped>
.paging-list{width: 100%;}
.empty{margin-top: 25px; color:#979797;}
</style>
