<template>
  <div class="main-content">
    <div class="row">
      <div class="navbar-wrapper">
        <Navbar />
      </div>

      <div class="col sidebar-wrapper">
        <Sidebar />
      </div>
      <div class="col main-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar'
import Navbar from '@/components/app/Navbar'
import messages from '@/utils/messages'

export default {
  name: 'main-layout',
  components: {
    Sidebar,
    Navbar
  },
  data: ()=>({
    report: null
  }),
  computed: {
    error() { // в поле кладем состояние error
      return this.$store.getters.error
    }
  },
  methods: {
  },
  watch: {
    error(fbError) { // следим за полем error
      this.$error({html: messages[fbError.code] || 'Что-то пошло не так'})
    }
  }
}
</script>

<style lang="scss">
.main {

  &-content {
    margin-top: 80px;
    min-width: 1024px;
  }

  &-wrapper {
    width: calc(100% - 277px);
    padding-top: 12px!important;
  }
}

.sidebar-wrapper {
  width: 277px;
}
</style>
