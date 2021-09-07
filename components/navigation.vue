<template>
	<div class="top-nav active">
	        <div class="content">
	          <div class="back" onClick={back}></div>
	          <div class="title">{{title}}</div>
	          <div class="menu">
	            <div onClick={intoSetting}>
	              <div></div>
	              <div></div>
	              <div></div>
	            </div>
	          </div>
	        </div>
	      </div>
</template>

<script>
	export default {
		name:'navigation',
		props:{
			title:String
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.top-nav {
	  width: 100vw;
	  height: 44px;
	  position: fixed;
	  top: 0;
	  left: 0;
	  z-index: 100;
	
	  .content {
	    width: 100vw;
	    height: 44px;
	    display: flex;
	    justify-content: space-between;
	
	    .back {
	      width: 44px;
	      height: 44px;
	      display: flex;
	      align-items: center;
	      justify-content: center;
	
	      &::after {
	        display: block;
	        content: ' ';
	        width: 10px;
	        height: 10px;
	        border-top: solid 2px #ffffff;
	        border-left: solid 2px #ffffff;
	        transform: rotate(-45deg);
	      }
	    }
	
	    .title {
	      flex: 1;
	      font-size: 17px;
	      font-family: PingFangSC-Regular, PingFang SC;
	      font-weight: 400;
	      color: #FFFFFF;
	      line-height: 44px;
	      text-align: center;
	    }
	
	    .menu {
	      width: 44px;
	      height: 44px;
	      display: flex;
	      align-items: center;
	      justify-content: center;
	
	      > div {
	        display: block;
	        content: '';
	        width: 22px;
	        height: 22px;
	        color: #ffffff;
	        border-radius: 22px;
	        border: solid 1px #ffffff;
	        text-align: center;
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        padding: 2px;
	        box-sizing: border-box;
	
	        > div {
	          width: 4px;
	          height: 4px;
	          background-color: #ffffff;
	          display: block;
	          centent: ' ';
	          border-radius: 4px;
	        }
	      }
	    }
	  }
	
	  .menu-list {
	
	  }
	}
	.top-nav.active{
	  background-color: #FFFFFF;
	  position: relative;
	  .back {
	    width: 44px;
	    height: 44px;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	
	    &::after {
	      border-top: solid 2px #000000;
	      border-left: solid 2px #000000;
	    }
	  }
	  .title{
	    color: #000000;
	  }
	  .menu{
	    >div{
	      display: none;
	    }
	  }
	}
</style>
