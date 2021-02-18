import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/polls',
    name: 'Polls',
    component: () => import('../views/Polls.vue'),
  },
  {
    path: '/polls/:questionId',
    name: 'PollDetail',
    component: () => import('../views/PollDetail.vue'),
  },
  {
    path: '/results/:pollId',
    name: 'Results',
    component: () => import('../views/Results.vue'),
  },
  {
    path: '/manage-polls',
    name: 'Manage Polls',
    component: () => import('../views/ManagePolls.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
