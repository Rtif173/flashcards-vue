import { createApp } from 'vue';
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import '/assets/css/pico.css';
import '/assets/css/style.css'
import App from './App.vue'
import Vue3TouchEvents from "vue3-touch-events";
import PrimeVue from 'primevue/config';

const app = createApp(App);

app.use(Vue3TouchEvents)
app.use(PrimeVue);
app.mount('#app');
