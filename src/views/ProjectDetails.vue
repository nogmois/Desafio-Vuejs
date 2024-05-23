<template>
  <v-container>
    <v-card>
      <v-card-title>{{ project.title }}</v-card-title>
      <v-card-text>{{ project.description }}</v-card-text>
      <v-list>
        <v-list-item v-for="task in project.tasks" :key="task._id">
          <v-list-item-content>
            <v-list-item-title>{{ task.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
  name: 'ProjectDetails',
  setup() {
    const route = useRoute();
    const project = ref(null);

    onMounted(async () => {
      const projectId = route.params.id;
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/${projectId}`);
        project.value = response.data;
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    });

    return {
      project
    };
  }
};
</script>
