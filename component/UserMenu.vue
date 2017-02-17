<template>
<div class="menu">
	<ul class="menu-ul">
		<!-- <router-link class="menu-link" to="/withdrawal/" tag="li">Personnal Center</router-link> -->
		<router-link class="menu-link" :to="{ path: '/live-record/' + uid}" tag="li">Live Record</router-link>
		<router-link class="menu-link" to="/recharge/" tag="li">Recharge</router-link>
		<!-- <router-link class="menu-link" to="/4" tag="li">Anchor Certification</router-link> -->
	</ul>
</div>
</template>

<script>
export default {
  name: 'UserMenu',
  data(){
  	return {
  	}
  },
  props:['uid']
}
</script>

<style scoped>
.menu{background: #fff; width: 300px; height: 740px; margin-top: 15px; text-align: left; color: #737373}
.menu-ul{padding: 0; margin: 0;}
.router-link-active{font-weight: bold; color: #353535; background: #DCF9F5;}
.menu-link{list-style-type: none; height: 60px; cursor: pointer; line-height: 60px; padding: 0 0 0 25px; transition: all .4s;}
</style>