<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import messages from '@/utils/messages'
export default {
  computed: {
    error() { // в поле кладем состояние error
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) { // следим за полем error
      this.$error({html: messages[fbError.code] || 'Что-то пошло не так'})
    }
  }
}
</script>
