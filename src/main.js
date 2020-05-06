import Vue from 'vue'
import App from './App.vue'
import router from './router'
// Import firebase
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from "./firebase.config"

const fb = firebase.initializeApp(firebaseConfig);
const db = fb.firestore()

Vue.prototype.$db = db
Vue.prototype.$questions = db.collection("questions")

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
