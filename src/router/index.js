import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import BoardView from '@/views/BoardView.vue'
import ContactsView from '@/views/ContactsView.vue'
import ImprintView from '@/views/ImprintView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        title: 'Dashboard | Join'
      }
    },
    {
      path: '/board',
      name: 'board',
      component: BoardView,
      meta: {
        title: 'Board | Join'
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
      meta: {
        title: 'Contacts | Join'
      }
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: ImprintView,
      meta: {
        title: 'Imprint | Join'
      }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
      meta: {
        title: 'Privacy | Join'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: '404 Not Found | Join'
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Join';
  next();
});

export default router
