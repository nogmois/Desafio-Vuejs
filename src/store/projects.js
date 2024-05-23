
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    currentProject: null,
    currentUser: 'userID_atual'
  }),
  actions: {
    async fetchProjects() {
      try {
        const response = await axios.get('http://localhost:3000/api/projects');
        this.projects = response.data;
        if (!this.currentProject && this.projects.length > 0) {
          this.currentProject = this.projects[0];
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    async fetchProjectById(id) {
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/${id}`);
        this.currentProject = response.data;
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    },
    async addProject(project) {
      try {
        const response = await axios.post('http://localhost:3000/api/projects', project);
        this.projects.push(response.data);
        this.currentProject = response.data;
      } catch (error) {
        console.error('Error adding project:', error);
      }
    },
    async addTaskToProject(projectId, task) {
      try {
        const response = await axios.post('http://localhost:3000/api/tasks', { ...task, projectId });
        const project = this.projects.find(p => p._id === projectId);
        if (project) {
          project.tasks.push(response.data);
        }
      } catch (error) {
        console.error('Error adding task:', error);
      }
    },
    isUserAuthorized(creatorId) {
      return this.currentUser === creatorId;
    }
  }
});
