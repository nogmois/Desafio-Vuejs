<template>
  <ul class="project-list">
    <li
      v-for="project in projects"
      :key="project._id"
      @click="selectProject(project)"
      class="list-item"
    >
      <div class="project-info">
        <span class="project-title">{{ project.title }}</span>
        <span class="task-count">{{ project.tasks.length }}</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ProjectList',
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  methods: {
    selectProject(project) {
      this.$emit('select-project', project);
    }
  }
}
</script>
