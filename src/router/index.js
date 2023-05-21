import { createRouter, createWebHistory } from 'vue-router';
import { scrollBehaviour } from './scrollBehaviour.js';
import { authGuard } from './authGuard.js';

/** @type {import('vue-router').RouteRecordRaw[]} */

export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/PageMeetups.vue'),
  },
  {
    path: '/meetups',
    name: 'meetups',
    redirect: { name: 'index' },
  },
  {
    path: '/meetups/:meetupId(\\d+)',
    name: 'meetup',
    meta: {
      showReturnToMeetups: true,
    },
    props: (to) => ({
      meetupId: +to.params.meetupId,
    }),
    redirect: (to) => ({ name: 'meetup.description', params: to.params }),
    component: () => import('../views/PageMeetup.vue'),
    children: [
      {
        path: '',
        alias: 'description',
        name: 'meetup.description',
        component: () => import('../views/PageMeetupDescription.vue'),
      },
      {
        path: 'agenda',
        name: 'meetup.agenda',
        component: () => import('../views/PageMeetupAgenda.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireGuest: true,
    },
    props: (to) => ({
      from: to.query.from,
    }),
    component: () => import('../views/PageLogin.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      requireGuest: true,
    },
    component: () => import('../views/PageRegister.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior,
});

router.beforeEach(authGuard);
