<template>
<div class="content-main">
	<h2>{{'This is Menu'+$route.params.menuId+'!'}}</h2>
	<Loading></Loading>
</div>
</template>

<script>
import Loading from './Loading.vue'

export default {
  name: 'UserContentMain',
  components:{
  	Loading
  }
}
</script>

<style scoped>

</style>
