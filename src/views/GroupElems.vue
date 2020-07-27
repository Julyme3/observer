<template>
  <div>
    <HeaderTitle v-bind:header-title="this.$route.params.name" />
    <table class="highlight">
      <tbody>
        <router-link tag="tr" exact :to="{ name: 'stories', params: { name: group, report: $route.params.name } }" 
          v-for="group in setCurrentReport[0].groups" 
          v-bind:key="group">
          <td>{{ group }}</td>
        </router-link>
      </tbody>
    </table>
  </div>
</template>

<script>
//import {eventBus} from "@/main.js";
import HeaderTitle from '@/components/app/HeaderTitle'
export default {
  data: ()=>({
    title: "Результат"
  }),

  // async mounted() {
  //   this.loading = true;
  //   this.report = this.$store.getters.reports.filter((item) => item.name === this.$route.params.name);
  //   this.loading = false;
  // },
  // created() {
  //   console.log(this.folders);
  //   debugger;
  // },
  // beforeCreate() {
  //   eventBus.$on("clickReport", (value) => { // обработчик на вызываемое в сестринском компоненте событие
  //   debugger;
  //     this.folders = value.folders;
  //     console.log(this.folders);
  //   })
  // },
  // created() {
  //   this.report = this.$store.getters.reports.filter((item) => item.name === this.$route.params.name)
  //  // console.log('GroupElem', this.$store.getters.reports)
  //   return this.report
  // },
  computed: {
    setCurrentReport() {
      if (this.$store.getters.reports && !this.$store.getters.reports.length) {
        return {
          0: {
            group: ['']
          }
        }
      }
       return this.$store.getters.reports.filter((item) => item.name === this.$route.params.name)
    }
  },
  components: {
    HeaderTitle
  }
  
}
</script>

<style lang="scss" scoped>
td, th {
  padding-top: 19px;
  padding-bottom: 19px;
}
</style>>
