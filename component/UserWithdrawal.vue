//用户提现组件

<template>
<div class="content-main cash">
  <Loading v-if="loadingData"></Loading>
  <div class="con" v-if="!loadingData">
    <div class="header">
    <div class="cols">
      <!-- <div class="col">
        <p class="col-top">
          <i class="icons diamond"></i> <span class="col-h">0</span>
        </p>
        <p class="col-down">Current stars</p>
      </div><div class="break"></div> --><div class="col">
        <p class="col-top">
          <i class="icons star"></i> <span class="col-h" v-text="preWithdraw.gold || 0"></span>
        </p>
        <p class="col-down">Can be mentioned stars</p>
      </div><div class="break"></div><div class="col">
        <p class="col-top">
          <span class="col-h" v-text="'$ ' + preWithdraw.withdraw || 0"></span>
        </p>
        <p class="col-down">Total revenue</p>
      </div>
    </div>

    <div class="form" v-if="preWithdraw">
      <div class="is-accept" v-if="preWithdraw.withdraw_accept || true">
        <input type="number" class="input" placeholder="Please enter number." v-model="withdrawalNumber">
        <a href="javascript:;" :class="'btn-lg' + (isWdLoading?' btn-loading':'')" @click="applyWithdrawals()">Withdrawal</a>
        <a class="tip" @mouseover="showTip" @mouseout="closeTip">
          <span class="dib">Withdrawal Rule</span><i :class="'icons ' + (isShowTip? 'info-focus' : 'info')"></i>
        </a>
        <transition name="fade">
          <div class="tip-tag" v-if="isShowTip">
            <div class="arrow">
               <em></em><span></span>
            </div>More than 40000 stars can apply for cash withdrawal 
            can be submitted at any time to withdraw the 
            application, but need to complete a transaction before 
            they can submit the next pen, each mention is to 10,000 stars
          </div>
        </transition>
      </div>
      <div class="no-accept" v-if="!preWithdraw.withdraw_accept || false">
        <div class="ml10 bold mt">The last mention</div>
        <div class="noaccept-bg"></div>
        <div class="noaccept-text"><span class="text text1">Submit</span><span class="text text2">Processing</span><span class="text text3">Success</span>
        </div>
      </div>
    </div>
  </div>
  <div class="record">
    <div class="ml10 bold mt">Withdrawals record</div>
    <PagingList :onePageNum="onePageNum" :isShowPaging="true" :listHeight="listHeight" :data="cashRecordList" :listHeader="listHeader" :rowsWidth="rowsWidth" :listType="listType"></PagingList>
  </div>
  </div>
</div>
</template>

<script>
import PagingList from './PagingList.vue'
import Loading from './Loading.vue'

export default {
  name: 'UserWithdrawal',
  data(){
  	return{
  		cashRecordFetchUrl: this.domain + '/mobile/proxy/mgr/WithdrawHistory.php',
      getUserWdInfoUrl:this.domain + '/mobile/proxy/mgr/WithdrawInfo.php',
      preUrl:this.domain + '/mobile/proxy/payment/PreWithdraw.php',
      withdrawalUrl: this.domain + '/mobile/proxy/payment/WithdrawApply.php',
  		cashRecordList: [
      ],
      UserWdInfo:0,
      withdrawalNumber: "",
      preWithdraw: {
        gold: 0,
        withdraw: 0,
        withdraw_accept: true
      },
      onePageNum: 9,
      rowsWidth: ['40%', '40%', '20%'],
      listHeader:['Amount', 'Submission', 'Status'],
      listType:'cashRecord',
      listHeight:'425px',
      isShowTip: false,
      isAccept: true,
      loadingData: true,
      uid: '',
      sid: '',
      isWdLoading: false
  	}
  },
  components:{
    PagingList,
    Loading
  },
  created(){
    this.sid = this.getCookie('session');
    this.uid = this.getCookie('uid');
  },
  mounted(){
  	this.getCashRecord();
    this.getPre();
    this.getUserWdInfo();
  },
  methods:{
    showTip(){
      this.isShowTip=true;
    },
    closeTip(){
      this.isShowTip=false;
    },

    //获取金额等
    getPre(){
      var ts = this;
      ts.$http.get(ts.preUrl, {
        "params":{
          "sid": ts.sid,
          "uid": ts.uid
        }
      }).then((response) => {
        let res = JSON.parse(response.data);
        //console.log(res.data);
        ts.preWithdraw = res.data;
      }, (response) => {
        console.log('An error occurred while getting the record!')
     });
    },

    getUserWdInfo: function(){
      let ts= this;
      ts.$http.get(ts.getUserWdInfoUrl,{
        "params":{
          "sid": ts.sid,
          "uid": ts.uid
        }
      }).then((response) => {
        let counter = 0;
        let res =JSON.parse(response.data);
        for(let i in res.data){
          counter++
        }
        ts.UserWdInfo = ( counter==0 ? 0:res.data );
      }, (response) => {
        console.log('An error occurred while getting the "getUserWdInfo"!')
      });
    },

    //提现处理
    applyWithdrawals: function(){
      let ts = this;
      let diamonds = ts.preWithdraw.gold;
      //console.log(that.isAccept)
      if(ts.withdrawalNumber == ""){
        alert("Please fill in the numbers.");
        return false;
      }
      if(ts.isWdLoading){
        return false;
      }
      if(ts.UserWdInfo == 0){ //当前钻石数小于40000
        this.$router.push('/bank-info/');
        return false;
      }
      if(!/^\d+$/.test(ts.withdrawalNumber)){ //是否都为数字
        alert('Please fill in the correct number!');
        return false;
      }
      if(+diamonds<40000){ //当前钻石数小于40000
        alert("The current diamond number is less than 40000!");
        return false;
      }
      if(+ts.withdrawalNumber<40000){ //提现金额小于40000
        alert('Cash withdrawal amount is less than 40000!');
        return false;
      }
      if(+ts.withdrawalNumber%10!=0){ //提现金额不是10000的整数倍
        alert('Cash withdrawal is not an integer multiple of 10000!'); 
        return false;
      }
      if(+ts.withdrawalNumber>+diamonds){ //提现金额大于当前钻石数
        alert(that.getWord('Cash is greater than the current number of stars!'));
        return false;
      }
      if(!ts.preWithdraw.withdraw_accept){ //服务器是否接收提现
        alert("You have an application that is still under review!");
        return false;
      }

      if(+ts.withdrawalNumber < 40000){ //当前钻石数小于40000
        alert("The current star number is less than 40000");
        return false;
      }
      
      ts.gotoWithdrawal()

    },

    //提现请求
    gotoWithdrawal(){
      let ts = this;
      ts.isWdLoading = true;
      ts.$http.jsonp(ts.withdrawalUrl, {
        "params":{
          "gold": ts.withdrawalNumber,
          "uid": ts.uid,
          "sandbox": 1
        },
        "jsonp": "callback"
      }).then((response) => {
        that.isWdLoading = false;
        //console.log(response.data)
        if(res.dm_error === 0){ //成功
            alert("Cash withdrawal application submitted");
          }else if(res.dm_error === 1){
            alert('Cash withdrawal amount is less than 40000');
          }else if(res.dm_error === 2){
            alert('Cash withdrawal is not an integer multiple of 10000');
          }else{
            alert(res.error_msg);
          }
      }, (response) => {
        that.isWdLoading = false;
        console.log('An error occurred while getting the record!')
      });

    },

    //获取提现记录
    getCashRecord(){
      var ts = this;
      /*setTimeout(function(){
        ts.loadingData=false;
      },1000)
      return;*/
      ts.$http.get(ts.cashRecordFetchUrl, {
        "params":{
          "uid": ts.uid,
          "sid": ts.sid
        }
      }).then((response) => {
        let res = JSON.parse(response.data);
        ts.loadingData=false;
        ts.cashRecordList = res.data;
      }, (response) => {
        ts.loadingData=false;
        console.log('An error occurred while getting the record!')
      });
    }
  }
}
</script>

<style scoped>
.cash{margin: 20px 0;}
.cash .con{background: #f1f1f1; margin: 20px 0;}
.header,.record{padding: 0 20px;}
.header{background-color: #fff; padding-bottom: 25px;}
.cols{text-align: center;}
.col{display: inline-block; width: 49%; text-align: center; height: 90px; vertical-align: middle;}
.col-h{font-size: 29px; color: #333333; vertical-align: middle;}
.col-top{margin-top: 16px;}
.col-down{margin-top: 4px;}
.col-top .icons{vertical-align: middle; margin-right: 5px;}
.break{border-left: 1px  solid #EAEAEA; height: 40px; display: inline-block;  vertical-align: middle;}
.col-down{font-size: 15px; color: #8D8D8D;}
/* .btn-lg{ display: block;width:300px; margin: 0 auto;background: #50E3CE;color: #fff;height: 41px;line-height: 41px;border-radius: 5px;margin-top:20px;} */

.no-accept{padding-top:20px;}
.noaccept-bg{ width: 560px; height: 60px; margin: 0 auto; margin-top:20px; background-image: url(../images/noaccept.png);}
.noaccept-text{width: 560px; font-size: 13px; margin: 0 auto; margin-top:20px;}
.noaccept-text .text{width: 33.3%; display: inline-block; margin: 0 auto;}
.noaccept-text .text1{text-align: left;}
.noaccept-text .text2{text-align: center;}
.noaccept-text .text3{text-align: right; color: #DADADA}

.is-accept{font-size: 13px; text-align: center;}
.form{background-color: #F8F8F8; height: 186px; margin-top: 23px;}
/* .input{width: 278px; padding: 0 10px; margin: 0 auto; margin-top:25px;background: #fff;color: #333; height: 39px; line-height: 39px; border-radius: 5px; border: 1px solid #E3E3E3;} */
.tip{ display: block;color: #8A8A8A; width: 150px; cursor: pointer; font-size: 12px;height:18px; line-height: 18px; margin: 16px auto 0;}
.tip .icons{vertical-align: top; margin-left: 6px;}
.tip:hover{color: #50E3CE}

.tip-tag{text-align: left; color: #333; line-height: 1.6; width:380px; -webkit-box-shadow:  0px 3px 16px #cbc8c8;
box-shadow:  0px 3px 16px #cbc8c8; padding: 20px; -webkit-border-radius: 5px;
-moz-border-radius: 5px;
-ms-border-radius: 5px;
-o-border-radius: 5px;
border-radius: 5px; position:relative; background-color:#FFF; margin: 15px auto 0;}
.arrow{ position:absolute; width:10px; height:10px; top:-20px; left:200px; }
.arrow *{ display:block; border-width:10px; position:absolute; border-style:solid dashed dashed dashed; font-size:0; line-height:0; }
.arrow em{border-color:transparent transparent #aba9a9}
.arrow span{border-color:transparent transparent #FFF; top:0;}

.record{background-color: #fff; margin-top: 15px; padding-top: 30px;}
</style>
