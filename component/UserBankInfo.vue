//用户提现组件

<template>
<transition name="slide">
<div class="conent-main bank-info">
  <!-- Personal imformation -->
  <h2 class="bold">Bind the bank card</h2>
  <div class="form">
            <div class="form-head"><h4>Personal information</h4><!-- <span class="c-red">带*为必填项目</span> --></div>
            <div class="form-content">
                <div class="form-one">
                    <label><span class="c-red">*</span>Full name</label>
                    <input type="text" class="line" v-model="info.name" maxlength="50" required="" autofocus="">
                    <!-- <span class="line tip c-red">* Required items.</span> -->
                </div>
                <div class="form-one inline">
                    <span class="c-red">*</span>
                    <label data-wordkey="withdrawals-phone">Phone number</label>
                    <input type="text" class="line" v-model="info.phone" maxlength="30" required="">
                </div>  
                <div class="form-one inline ml19">
                    <span class="c-red">*</span>
                    <label data-wordkey="withdrawals-addr">Home address</label>
                    <input type="text" class="line" v-model="info.address" maxlength="70" required="">
                </div>
                <div class="form-one">
                    <span class="c-red">*</span>
                    <label data-wordkey="withdrawals-idcard">Identification number</label>
                    <input type="text" class="line" v-model="info.user_id" maxlength="40" required="">
                </div>
            </div>
        </div>

        <!-- Account information -->
        <div class="form">
            <div class="form-head"><h4>Account details</h4><!-- <span class="c-red">带*为必填项目</span> --></div>
            <div class="form-content">
                <div class="form-one">
                    <span class="c-red">*</span>
                    <label>Bank name</label>
                    <input type="text" class="line" v-model="info.bank_name" maxlength="60" required="">
                </div>
                <div class="form-one">
                    <span class="c-red">*</span>
                    <label data-wordkey="withdrawals-bank-holder">Account holder</label>
                    <input type="text" class="line" v-model="info.account_owner" maxlength="50" required="">
                </div>  
                <div class="form-one">
                    <span class="c-red">*</span>
                    <label data-wordkey="withdrawals-bank-acc">Bank account number</label>
                    <input type="text" class="line" v-model="info.bank_account" maxlength="50" required="">
                </div>
                <div class="form-one">
                    <span class="c-red">*</span>
                    <label data-wordkey="withdrawals-bank-addr">Bank address</label>
                    <input type="text" class="line" v-model="info.bank_address" maxlength="70" required="">
                </div>
                <div class="form-one inline">
                    <span class="c-red">*</span>
                    <label>Swift code</label>
                    <input type="text" class="line" v-model="info.swift_code" maxlength="60" required="">
                </div>
                <div class="form-one form-one-long inline ml19">
                    <label data-wordkey="withdrawals-bank-branch">Bank branch name</label>
                    <input type="text" v-model="info.bank_branch" class="line" maxlength="60">
                </div>
            </div>
        </div>

        <!-- subscription information -->
        <div class="form">
            <div class="form-head"><h4>Agreement information</h4><!-- <span class="c-red">第二项填写格式为数字</span> --></div>
            <div class="form-content">
                <div class="form-one">
                    <span class="c-red">*</span>
                    <label data-wordkey="withdrawals-info-text1">Your agency:</label>
                    <input type="text" class="line" v-model="info.agency" maxlength="100" required="">
                </div>
                
                <div class="form-one w2">
                    <label data-wordkey="withdrawals-info-text3">Have you signed a paper contract with It'sMe?</label>
                    <input class="ml20" id="radio1" type="radio" name="input-contract" value="1" @click="info.contract=1">Yes <input class="ml10" @click="info.contract=0" type="radio"  id="radio2" name="input-contract" value="0">No
                </div>
            </div>
        </div>

        <!-- c-btn -->
        <div class="c-btn">
            <a href="javascript:;" class="btn" @click="saveUserBankInfo">Save</a>
            <router-link class="btn gray ml20" to="/withdrawal/">Cancel</router-link>
        </div>

    </div>
</transition>
</template>

<script>

export default {
  name: 'UserBankInfo',
  data(){
  	return {
  	  bankInfoFetchUrl: this.domain + 'mobile/proxy/mgr/WithdrawInfo.php',
      info:{
      	name:'',
      	phone:'',
      	address:'',
      	user_id:'',
      	bank_name:'',
      	account_owner:'',
      	bank_account:'',
      	bank_address:'',
      	swift_code:'',
      	bank_branch:'',
      	agency:'',
      	contract: 0,
      	sid:'',
      	uid:''
      }

  	}
  },
  components:{
  },
  created(){
    this.info.sid = this.getCookie('session');
    this.info.uid = this.getCookie('uid');
  },
  mounted(){

  },
  watch:{
  	"info.contract": (val, oldval) => {
  		//console.log(val, oldval);
  		let radio1 = document.getElementById('radio1');
  		let radio2 = document.getElementById('radio2');

  		val == 1? radio1.checked = true : radio2.checked = true
  	} 
  },
  methods:{
    saveUserBankInfo(){
    	
    	if(this.info.name=='' || this.info.phone=="" || this.info.user_id=="" ||this.info.address=="" ||this.info.bank_name=="" || this.info.account_owner=="" || this.info.bank_account=="" || this.info.bank_address=="" || this.info.swift_code=="" || this.info.agency==""){
    		alert('Please fill in the required!')
    		return false;
    	}else{
    		this.sendUserBankInfo();
    	}
    },
    sendUserBankInfo(){
      var ts = this;
      ts.$http.get(ts.bankInfoFetchUrl, {
        "params":{
          "sid": ts.info.sid,
          "uid": ts.info.uid
        }
      }).then((response) => {
        let res = JSON.parse(response.data);
        if(res.dm_error==0){
        	//alert('Save success!');
        	ts.$router.push('/withdrawal')
        }
      }, (response) => {
        console.log('An error occurred while getting the record!')
     });

    }

  }
}
</script>

<style scoped>
.bank-info{width: 600px; margin:35px auto;}
.c-red{color: #FF6B8B;position: relative; top: 2px; margin-right: 2px;}
.line{width: 578px; padding: 0 10px; margin-top: 10px;background: #fff;color: #333; height: 39px; line-height: 39px; border-radius: 5px; border: 1px solid #E3E3E3; overflow:hidden; margin-top: }
.line.warn{border: 1px solid #f88787;}
.form-one{margin-top: 20px;font-size: 13px; width: 100%;}
.form-one.inline{display: inline-block; width: 288px;}
.inline .line{width: 266px;}
.form-head{margin:30px 0 10px;}
.c-btn{
	margin-top:50px;
}
.btn{width: 200px;
    display: inline-block;
    background-color: #50E3CE;
    text-align: center;
    line-height: 40px;
    margin: 0 auto 15px;
    height: 40px;
    color: #fff;
    font-size: 14px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    position: relative;
}
.btn.gray{
	color: #727272;
	border: 1px solid #F0F0F0;
	background-color: transparent;
}

</style>
