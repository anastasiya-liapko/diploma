// Composables
import { createRouter, createWebHistory } from 'vue-router'

const authGuard = (to: any, from: any) => {
  if (!to.name) {
    return {
      name: 'Catalog',
    };
  }

  if (to.meta?.requiresAuth && !localStorage.getItem('os_at')) {
    return {
      name: 'Catalog',
    };
  }
};

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Catalog',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Catalog.vue'),
      },
      {
        path: '/:id',
        name: 'CatalogItem',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/CatalogItem.vue'),
      },
      {
        path: '/lk',
        name: 'LK',
        meta: {
          requiresAuth: true,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/LK.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        meta: {
          requiresAuth: true,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Cart.vue'),
      },
      {
        path: '/order',
        name: 'Order',
        meta: {
          requiresAuth: true,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Order.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((from, to) => authGuard(from, to));

export default router
