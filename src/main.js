import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Import firebase
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from "./firebase.config"

firebase.initializeApp(firebaseConfig);

Vue.prototype.$db = firebase.firestore()

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
