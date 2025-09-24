import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);

app.use(router);
app.mount('#app');
