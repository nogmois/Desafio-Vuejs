import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home.vue'; 
import ProjectDetails from '../views/ProjectDetails.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },  // Atualizado para o novo nome do componente
    { path: '/project/:id', component: ProjectDetails }
  ]
});

export default router;
