<template>
  <v-list-item>
    <v-card>
      <v-card-body class="m-card">
        <div class="task-content">
          <div>
            <div class="title">{{ task.title }}</div>
            <div class="subtitle">{{ task.description }}</div>
          </div>
          <v-btn icon @click="$emit('remove-task', task._id)">
          <i class="mdi mdi-delete"></i>
        </v-btn>
        </div>
      </v-card-body>
    </v-card>
  </v-list-item>
</template>

<script>
export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>