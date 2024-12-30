import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import VueResizable from 'vue-resizable';
import 'primeicons/primeicons.css'

const app = createApp(App)

app.component('VueResizable', VueResizable);
app.directive('tooltip', Tooltip);

app.use(router).use(store).use(PrimeVue, {
    theme: {
        preset: Aura
    }
}).use(ToastService);

app.mount('#app')
