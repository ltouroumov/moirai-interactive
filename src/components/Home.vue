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
        <button class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#import-project-dialog">
          Import
        </button>
      </div>
    </div>
  </div>

  <a id="export-link" />

  <bs-modal modalId="import-project-dialog" title="Import Project">
    <div v-if="_state.projectFile">
      <p><b>{{ _state.projectFile?.name }} ({{ _state.projectFile?.size }} bytes)</b></p>
      <p>{{ _state.projectFile?.type }}</p>
    </div>
    <div v-if="_state.projectData && !_state.projectErrors">
      {{ _state.projectData?.name }} / <span class="object-id">{{ _state.projectData?.key }}</span>
    </div>
    <input id="import-file" type="file" class="form-control" @change="loadFile">
    <div class="btn-group">
      <button class="btn btn-success" :class="{ disabled: !_state.projectFile }" type="button" @click="previewFile">
        Preview
      </button>
      <button class="btn btn-success" :class="{ disabled: !_state.projectFile || !_state.projectData }" type="button"
              @click="importFile">
        Import
      </button>
      <button class="btn btn-danger" :class="{ disabled: !_state.projectFile }" type="button" @click="clearFile">
        Clear
      </button>
    </div>
    <div v-if="_state.projectErrors">
      <ul>
        <li v-for="error in _state.projectErrors">{{ error }}</li>
      </ul>
    </div>
  </bs-modal>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import { homeStoreKey } from "../store/home";
import MdiIcon from "./utils/mdi-icon.vue";
import BsModal from "./utils/bs-modal.vue";
import { Project } from "../data/model/project";

const store = useStore(homeStoreKey);

interface State {
  projectFile?: File;
  projectData?: Project;
  projectErrors: string[];
}

const _state = reactive<State>({
  projectFile: undefined,
  projectData: undefined,
  projectErrors: []
});

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

function loadFile({ target }: Event) {
  const files = (target as HTMLInputElement).files;
  if (files && files.length === 1) {
    _state.projectFile = files[0];
  } else {
    _state.projectFile = undefined;
  }
}

async function previewFile() {
  if (_state.projectFile) {
    const data = await _state.projectFile.text();
    _state.projectData = JSON.parse(data);
  }
}

function importFile() {

}

function clearFile() {
  const input = document.getElementById("import-file") as HTMLInputElement;
  if (input) {
    input.value = "";
    _state.projectFile = undefined;
  }
}

function exportProject(projectId: string) {
  const jsonData = localStorage.getItem(`projects/${projectId}`);
  if (jsonData) {
    const projectData = JSON.parse(jsonData);
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