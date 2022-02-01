<template>
  <div>
    <h1>Home</h1>
    <div class="projects">
      <div class="project" v-for="project in projects">
        <span>{{ project.name }}</span> |
        <span>{{ project.key }}</span> |
        <router-link :to="{ name: 'edit', params: { project: project.key }}">Edit</router-link> |
        <router-link :to="{ name: 'view', params: { project: project.key }}">View</router-link>
      </div>
      <button @click="createProject">Create Project</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {RootState, StateModules} from "../data/state";
import {computed, onMounted} from "vue";

const store = useStore<RootState>()

const projects = computed(() => store.state.projects.projects)

function createProject() {
  store.commit('projects/createProject')
}
</script>

<style scoped>

</style>