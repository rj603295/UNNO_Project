import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/all.scss'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
library.add(faPenToSquare)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
