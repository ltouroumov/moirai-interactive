<template>
  <h1>Home</h1>
  <div class="projects">
    <div class="header">
      <span class="proj-name">Project</span>
      <span class="proj-key">Key</span>
      <span class="proj-actions">Actions</span>
    </div>
    <div class="project" v-for="project in projects">
      <span class="proj-name">{{ project.name }}</span>
      <span class="proj-key">{{ project.key }}</span>
      <div class="proj-actions btn-group">
        <router-link class="btn btn-outline-success" :to="{ name: 'edit', params: { project: project.key }}">Edit
        </router-link>
        <router-link class="btn btn-outline-success" :to="{ name: 'view', params: { project: project.key }}">View
        </router-link>
        <button class="btn btn-outline-primary" @click="exportProject(project.key)">Export</button>
        <button class="btn btn-outline-danger" @click="removeProject(project.key)">Remove</button>
      </div>
    </div>
    <div class="tools">
      <div class="btn-group">
        <button @click="createProject" class="btn btn-primary">Create</button>
        <button @click="importProject" class="btn btn-primary">Import</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { RootState, StateModules } from '../data/state';
import { computed, onMounted } from 'vue';

const store = useStore<RootState>()

const projects = computed(() => store.state.projects.projects)

function createProject() {
  store.commit('projects/createProject')
}

function removeProject(projectId) {
  store.dispatch('projects/removeProject', projectId)
}
</script>

<style scoped>
.projects {
  display: grid;
  grid-template-columns: minmax(200px, auto) minmax(100px, auto) auto;
  grid-auto-flow: row;
  grid-gap: 5px;

  align-items: center;
  justify-content: center;
}

.projects div.header {
  display: contents;
  font-weight: bold;
}

.projects div.project {
  display: contents;
}

.projects div.project span.proj-key {
  font-family: monospace;
}

.projects div.tools {
  grid-column: 3 / span 1;
}

</style>