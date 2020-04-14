import Vue from 'vue';
import Router from 'vue-router';

import AuthMiddleware from './middleware/auth';
import AuthReverseMiddleware from './middleware/auth-reverse';

import Login from './pages/login.vue';
import Frontpage from './pages/frontpage.vue';
import PlaceBet from './pages/place-bet.vue';
import MyBets from './pages/my-bets.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/login',
			name: 'Login',
			component: Login,
			beforeEnter: (to, from, next) => AuthReverseMiddleware(next),
		},
		{
			path: '/',
			name: 'Front Page',
			component: Frontpage,
			beforeEnter: (to, from, next) => AuthMiddleware(next),
		},
		{
			path: '/place-bet',
			name: 'Place Bet',
			component: PlaceBet,
			beforeEnter: (to, from, next) => AuthMiddleware(next),
		},
		{
			path: '/my-bets',
			name: 'My Bets',
			component: MyBets,
			beforeEnter: (to, from, next) => AuthMiddleware(next),
		},
	],
});
