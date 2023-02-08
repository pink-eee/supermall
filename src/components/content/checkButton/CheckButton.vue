<template>
  <div class="check-button" :class="{check:checked}">
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    props: {
		  value: {
		    type: Boolean,
        default: true
      }
    },
    data: function () {
		  return {
		    checked: this.value
      }
    },
    watch: {
		  value: function (newValue) {
        this.checked = newValue;
      }
    }
}
</script>

<style>
.check-button{
    border-radius: 50%;
    border: 2px solid #aaa

}

.check{
    border-color: red;
    background-color: red;
}
</style>