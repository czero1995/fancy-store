<template>
	<transition name="slide-back">		
		<div class="page">
			<headersec tabname="个人信息"></headersec>
			<div class="container">
					<nopage></nopage>			
			</div>
		</div>
	</transition>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	export default {				
		components: {
			Headersec,
			Nopage
		},		
	}
</script>
