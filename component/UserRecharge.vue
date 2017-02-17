//用户充值

<template>
<div class="content-main">
  <div class="remain">
    <p class="remain-p">Number of remaining diamonds: </p> <span class="remain-span" v-text="gold || 0"></span>
  </div>
  <div class="ml10 bold">Select the recharge type</div>
  <div class="recharge-type">
    <a v-for="(item, index) in platformList" @click="selectPlatform(index)" :class="'plat-wrap' + ( index % 4 == 0?' plat-first':'')" href="javascript:;">
      <div class="plat-focus" v-if="focusIndex == index"></div>
      <div :class="'plat '+ item.className"></div>
    </a>
  </div>

  <div class="ml10 mt10 bold">Enter the card information</div>
  <div class="recharge-info">
    <input type="text" :class="'input block' + (userCardNo==''?' empty':'')" v-model="userCardNo" placeholder="Please Input your Card No.">
    <input type="text"  :class="'input block' + (userSerialNo==''?' empty':'')" v-model="userSerialNo" placeholder="Please Input your Serial Card No. ">
     <a href="javascript:;" :class="'btn-lg' + (isLoading?' btn-loading':'')" @click="recharge">Recharge</a>
  </div>
</div>
</template>

<script>
import PagingList from './PagingList.vue'
import Global from '../js/global.js'

export default {
  name: 'UserRecharge',
  data(){
  	return{
  		rechargeFetchUrl: this.adminDomain + '/payment/deposit.php',

      isLoading: false, //是否在请求中

      gold: null, //钻石数

      userCardNo:null, //用户卡号

      userSerialNo: null, //用户卡密码

      focusIndex: 0, //选中了第几个充值平台
      
      platformList: [{ 
        name: 'VNP',
        className: 'Vinaphone'
      },{
        name: 'VMS',
        className: 'MobiFone'
      },{
        name: 'FTP',
        className: 'FPTGate'
      },{
        name: 'VTT',
        className: 'Viettel'
      },{
        name: 'MGC',
        className: 'Megacard'
      },{
        name: 'ZING',
        className: 'Zing'
      },{
        name: 'ONC',
        className: 'Oncash'
      }]
  	}
  },
  mounted(){
    this.getGold();
  },
  methods: {
    selectPlatform(index){
      this.focusIndex = index;
    },

    getGold(){
      var ts = this;
      ts.gold = Global.inout.gold;
      if(ts.gold!=null){
        return;
      }else{
        setTimeout(()=>{
          ts.getGold()
        }, 300)
      }
    },

    //充值逻辑
    recharge(){
      //如果在请求中则退出，防止多次点击
      if(this.isLoading){
        return false;
      }

      //如果卡号为空
      if(this.userCardNo==null || this.userCardNo == ''){
        this.userCardNo=''
        return false;
      }

      //如果卡密码为空
      if(this.userSerialNo == null || this.userSerialNo == ''){
        this.userSerialNo='';
        return false;
      }

      //设置加载状态
      this.isLoading = true;

      //request data here 
      this.toRecharge();
    },

    //充值请求
    toRecharge(){
      let ts = this;
      ts.$http.post( ts.rechargeFetchUrl, {
        platform: 'VNPT',
        app: 'vn.media.itsme',
        provider: ts.platformList[ts.focusIndex].name,
        pin: ts.userCardNo,
        serial: ts.userSerialNo
      }).then((response) => {
          //console.log(response.data);

          //成功
          if(response.data.dm_error == 0){
            alert('Recharge success!')
            location.reload()
          }
          //该卡验证失败
          else if(response.data.th_status == 321){
            alert('Validation failed!')
          }
          //该卡已充值
          else if(response.data.th_status == 401){
            alert('The card has been Delta!')
          }

          this.isLoading = false;
      })
    }
  }
}
</script>

<style scoped>
.remain{ width: 100%; background-color: #F8F8F8; height: 100px; line-height: 100px; color: #888; font-size: 15px; margin-bottom: 20px;}
.remain-span{color: #333; font-size: 25px; margin-left: 10px; vertical-align: top;}
.remain-p{margin-left: 16px; display: inline-block; overflow:hidden;}
.recharge-type{padding-top: 20px;}
.plat-wrap{display: inline-block; margin: 0 0 13px 13px; position: relative;}
.plat{background: url(../images/recharge.png); width: 190px; height: 60px;}
.plat-focus{background: url(../images/recharge-focus.png) no-repeat; position: absolute; top:0; left: 0;  width: 190px; height: 60px;}
.plat-first{margin-left: 0;}
.TrueMoney{background-position: 0 0;}
.Call12{background-position: -203px 0;}
.HAPPY{background-position: -406px 0;}
.Vinaphone{background-position: -609px 0;}
.MobiFone{background-position: 0 -74px;}
.FPTGate{background-position: -203px -74px;}
.Viettel{background-position: -406px -74px;}
.Megacard{background-position: -609px -74px;}
.Zing{background-position: 0 -149px;}
.Oncash{background-position: -203px -149px;}
.SMS{background-position: -406px -149px;}
.MOGPlay{background-position: -609px -149px;}
.focus{}
</style>
