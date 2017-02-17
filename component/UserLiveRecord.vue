//用户直播记录组件

<template>
<div class="content-main">
  <div class="ml10 bold">Live Record</div>
  <div class="list-wrap">
    <PagingList :onePageNum="onePageNum" :isShowPaging="true" :listHeight="listHeight" :data="liveRecordList" :listHeader="listHeader" :rowsWidth="rowsWidth" :listType="listType"></PagingList>
  </div>
</div>
</template>

<script>
import PagingList from './PagingList.vue'

export default {
  name: 'UserLiveRecord',
  data(){
  	return{
  		liveRecordFetchUrl: 'http://admin.ushow.media/livetime/stat/livetime/Acu.php?a=getUserInfos',
  		liveRecordList: null,
      onePageNum: 19,
      rowsWidth: ['80%','20%'],
      listHeader:['Calculate Time','ACU'],
      listType:'liveRecord',
      listHeight:'765px'
  	}
  },
  components:{
    PagingList
  },
  mounted(){
  	var ts = this;
  	ts.$http.jsonp(ts.liveRecordFetchUrl, {
  		"params":{
  			"uid": this.$route.params.uid
  		},
  		"jsonp": "callback"
  	}).then((response) => {
	    //console.log(response.data)
      ts.liveRecordList = response.data.data.reverse();
	  }, (response) => {
	    console.log('An error occurred while getting the record!')
	 });
  }
}
</script>

<style scoped>

</style>
