import { useStore } from "vuex";
import { homeStoreKey } from "./home";
import { editorStoreKey } from "./editor";

export async function reloadProject(projectId: string) {
  console.log(`Loading project ${projectId}`);

  const homeStore = useStore(homeStoreKey);
  const projectInfo = homeStore.getters["findProject"](projectId);

  const store = useStore(editorStoreKey)
  await store.dispatch("project/restoreProject", {
    projectId,
    projectInfo
  });
}