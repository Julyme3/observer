import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Paginate from 'vuejs-paginate'
import messagesPlugin from '@/utils/messages.plugin'
import Loader from '@/components/app/Loader'
import VueZoomer from 'vue-zoomer'
import 'materialize-css/dist/js/materialize.min.js'
import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.use(Vuelidate)
Vue.use(messagesPlugin)
Vue.use(VueZoomer)
//export const eventBus = new Vue()


firebase.initializeApp({
  apiKey: "AIzaSyDH6k8K4hGFmhCFPsNJ3ejKL0GpEGK77Gs",
  authDomain: "observer-abc33.firebaseapp.com",
  databaseURL: "https://observer-abc33.firebaseio.com",
  projectId: "observer-abc33",
  storageBucket: "observer-abc33.appspot.com",
  messagingSenderId: "815340792240",
  appId: "1:815340792240:web:2dee19e7b31bfb7bbc8e75"
});

let app;
firebase.auth().onAuthStateChanged(()=>{
  if (!app) {
   app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app') 
  }
});
