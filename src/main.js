
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; 

import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './assets/styles.css';
import { createPinia } from 'pinia'; // Importar o Pinia

// Cria a instância do Pinia
const pinia = createPinia();

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(pinia); // Usar o Pinia na aplicação

app.mount('#app');
