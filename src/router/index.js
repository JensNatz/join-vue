import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import BoardView from '@/views/BoardView.vue'
import ContactsView from '@/views/ContactsView.vue'
import ImprintView from '@/views/ImprintView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
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
      },{
        path: '/imprint',
      name: 'imprint',
      component: ImprintView
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView
    }

  ],
})

export default router
