<template>
  <h1>Moirai</h1>
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
        <router-link class="btn btn-outline-success" :to="{ name: 'edit', params: { projectId: project.key }}">Edit
        </router-link>
        <router-link class="btn btn-outline-success" :to="{ name: 'view', params: { projectId: project.key }}">View
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

  <a id="export-link" />
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";
import { homeStoreKey } from "../store/home";

const store = useStore(homeStoreKey);

const projects = computed(() => store.state.items);

function createProject() {
  store.commit("createProject");
}

function downloadFile(file: File) {
  const link = document.getElementById("export-link") as HTMLLinkElement;
  if (link) {
    const url = URL.createObjectURL(file);
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }
}

function exportProject(projectId: string) {
  const jsonData = localStorage.getItem(`projects/${projectId}`);
  if (jsonData) {
    const projectData = JSON.parse(jsonData)
    const file = new File(
      [JSON.stringify(projectData, null, 2)],
      `project-${projectId}.json`,
      { type: "application/json" }
    );

    downloadFile(file);
  }
}

function removeProject(projectId: string) {
  store.dispatch("removeProject", projectId);
}
</script>

<style scoped>
h1 {
  text-align: center;
}

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

#export-link {
  display: none;
}
</style>