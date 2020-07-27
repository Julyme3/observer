export default {
  state: {
    reports: []
  },
  mutations: {
    setReports(state, reports) {
      state.reports = reports
    },
    clearReports(state) {
      state.reports = []
    }
  },
  actions: {
    async fetchReporst({commit}) {
      try {
        const reports = (await (await fetch('http://observer.dpl.wb.ru:8081/results')).json()).results || []
        commit('setReports', reports)
        return reports
        // return Object.keys(reports.results).map((el, i) => ({
        //   id: i,
        //   ...reports.results[i]
        // }));
      } catch(e) {
        commit('setError', e);
        throw e
      }
    }
  },
  getters: {
    reports (state) {
      return state.reports
    }
  }
}
