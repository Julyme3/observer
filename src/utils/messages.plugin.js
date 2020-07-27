export default {
  install(Vue) {
    Vue.prototype.$message = function({html: text}) {
      M.toast({html: text})
    }
    Vue.prototype.$error = function({html: error}) {
      M.toast({html: `[Ошибка]: ${error}`})
    }
  }
}
