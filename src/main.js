import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vClickOutside } from './directives/click-outside'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('click-outside', vClickOutside)

app.mount('#app')
