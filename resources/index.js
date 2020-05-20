import Vue from 'vue';
import Layout from './layouts/default.vue';
import router from './router';
import store from './stores/index';
import './styles.css';


// eslint-disable-next-line no-new
new Vue({
	el: '#root',
	router,
	store,
	render: (h) => h(Layout),
});
