import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '@/views/BoardView.vue'
import ImprintView from '@/views/ImprintView.vue'
import ContactsView from '@/views/ContactsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/imprint',
      name: 'imprint',
      component: ImprintView
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView
    }
    
    
  ],
})

export default router
