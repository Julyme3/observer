<template>
  <div>
    <div class="input-field col s12">
      <input id="email" type="email" 
        class="form-control" placeholder="Поиск" 
        v-model="search">
      <label for="email">{{ title }}</label>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!this.reports.length">Список отчетов пуст.</p>
    <div v-else class="collection">
      <router-link active-class="active" exact 
        :to="{ name: 'groupelems', params: { name: report.name } }" 
        v-for="report in filteredList" 
        class="collection-item" :key="report.name"
      >
        <div>
          <strong class="title">{{ report.name }}</strong>
          <div class="date">{{ report.date }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize.min.js";
//import {eventBus} from "@/main.js";

//var eventBus = new Vue();
export default {
  data: function () {
    return {
      title: "Отчёты",
      search: "",
      reports: null,
      loading: true
    }
  },
  async mounted() {
    try {
      this.reports = await this.$store.dispatch('fetchReporst') // делаем запрос на отчеты
      this.loading = false
    } catch(e){}

    M.updateTextFields();
  },
  computed: {
    filteredList() { // фильтруем список по названию
      if (this.reports && this.reports.length) {
        return this.reports.filter(report => { return report.name.toLowerCase().includes(this.search.toLowerCase() )})
      }
    }
  },
  methods: {
    debug() {
    //  console.log('click')
    }
  }
}
</script>

<style lang="scss">
.title {
  color: rgba(0,0,0,.73);
}
.date {
  color: rgba(0,0,0,.55);
}

.title,
.date {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.sidebar-wrapper .input-field {
  padding: 0;
}
</style>
