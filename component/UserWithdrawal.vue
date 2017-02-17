//用户提现组件

<template>
<transition name="slide">
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
            </div>More than 0 stars can apply for cash withdrawal 
            can be submitted at any time to withdraw the 
            application, but need to complete a transaction before 
            they can submit the next pen, each mention is to 1 stars
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
</transition>
</template>

<script>
import PagingList from './PagingList.vue'
import Loading from './Loading.vue'

export default {
  name: 'UserWithdrawal',
  data(){
  	return{
  		cashRecordFetchUrl: this.$store.state.domain + '/wdrecord.php',
      withdrawalUrl: this.$store.state.domain + '/apply.php',
  		cashRecordList: [
      ],
      withdrawalNumber: "",
      preWithdraw: {
        gold: 0,
        withdraw: 0,
        withdraw_accept: true
      },

      //这一段是数据表格配置
      onePageNum: 9,
      rowsWidth: ['40%', '40%', '20%'],
      listHeader:['Amount', 'Submission', 'Status'],
      listType:'cashRecord',
      listHeight:'425px',

      isShowTip: false,
      isAccept: true,
      loadingData: true,
      isWdLoading: false
  	}
  },
  components:{
    PagingList,
    Loading
  },
  created(){
  },
  mounted(){
  	this.getCashRecord();
    this.getPre();
  },
  methods:{
    //显示tip
    showTip(){
      this.isShowTip = true;
    },

    //隐藏tip
    closeTip(){
      this.isShowTip = false;
    },

    //请求可提金额等
    getPre(){
      //模拟请求数据
      this.preWithdraw = {gold: "39500", withdraw: 200, withdraw_accept: true}
    },

    //提现逻辑处理
    applyWithdrawals: function(){
      let ts = this;
      let diamonds = ts.preWithdraw.gold;
      
      //未填写数目
      if(ts.withdrawalNumber == ""){
        alert("Please fill in the numbers.");
        return false;
      }

      if(ts.isWdLoading){ //如果在加载中
        return false;
      }

      if(!/^\d+$/.test(ts.withdrawalNumber)){ //是否都为数字
        alert('Please fill in the correct number!');
        return false;
      }

      if(+diamonds <= 0){ //当前钻石数小于0
        alert("The current diamond number is less than 40000!");
        return false;
      }

      if(+ts.withdrawalNumber>+diamonds){ //提现金额大于当前钻石数
        alert(ts.getWord('Cash is greater than the current number of stars!'));
        return false;
      }

      this.$router.push('/bank-info/'); //填写一些信息
      return false;
      
      //从上面的return来看在示例中实际上是到达不到这一步的
      //实际开发会做一些是否需要填写信息的判断，最后可能会到达这一步
      ts.gotoWithdrawal() 

    },

    //提现请求
    gotoWithdrawal(){
      let ts = this;
      ts.isWdLoading = true;
      setTimeout(()=>{
        ts.isWdLoading = false;
      },2000)

    },

    //获取提现记录
    getCashRecord(){
      var ts = this;

      //模拟请求数据
      setTimeout(function(){
        ts.loadingData = false;
        ts.cashRecordList = [{
          gold: 10,
          ctime: '2017-01-12',
          status: 1
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 2
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 3
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 2
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 2
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 2
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 1
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 2
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 3
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 2
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 2
        },{
          gold: 20,
          ctime: '2017-01-11',
          status: 1
        }];
      },1000)
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
