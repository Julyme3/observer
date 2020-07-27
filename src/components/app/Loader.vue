<template>
  <div class="app-loader">
    <div class="preloader-wrapper big active">
      <div class="spinner-layer" v-bind:class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            colors: ['spinner-red-only', 'spinner-blue-only', 'spinner-green-only']
        }
    },
    computed: {
        color() {
            return this.colors[Math.floor(Math.random() * this.colors.length)]
        }
    }
}
</script>
