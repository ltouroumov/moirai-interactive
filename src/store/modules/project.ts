import { Module } from "vuex";
import { Project } from "../../data/model/project";
import { AnyElement, ElementType, IConditionContainer } from "../../data/model/element";
import { EditorData } from "../../data/state/editor";
import { ProjectInfo } from "../../data/state/home";
import * as R from "ramda";
import Hashids from "hashids";
import { AsyncStorage } from "vuex-persist";
import { match } from "ts-pattern";

const utils = {
  removeFromParent(state: Project, objId: string) {
    const parentId = state.parents[objId];
    if (parentId) {
      const idx = state.children[parentId].indexOf(objId);
      if (idx !== -1) {
        state.children[parentId].splice(idx, 1);
      }
    }
  },

  removeParent(state: Project, objId: string) {
    delete state.parents[objId];
  },

  removeChildren(state: Project, objId: string) {
    const children = state.children[objId];
    if (children) {
      children.forEach((childId) => {
        utils.removeChildren(state, childId);
        utils.removeParent(state, childId);
        utils.removeObject(state, childId);
      });
    }
    delete state.children[objId];
  },

  removeObject(state: Project, objId: string) {
    delete state.objects[objId];
  },

  generateIdForElement(projectKey: string | undefined, elementType: ElementType, counter: number) {
    const HID = new Hashids(projectKey || "project", 5);

    const elementTypeIdx: number = match<ElementType>(elementType)
      .with(ElementType.Page, R.always(1))
      .with(ElementType.Section, R.always(2))
      .with(ElementType.Choice, R.always(3))
      .with(ElementType.Option, R.always(4))
      .exhaustive();

    return HID.encode(elementTypeIdx, counter);
  },
};

const defaultState = () => new Project();

type InsertArgs = {
  elementType: ElementType;
  parentId: string;
  build: (objectId: string, counter: number) => AnyElement;
};

export const ProjectModule: (database: AsyncStorage) => Module<Project, EditorData> = (database: AsyncStorage) => {
  return {
    namespaced: true,
    state(): Project {
      return defaultState();
    },
    getters: {
      findScore: (state) => (id: string) => {
        return state.scores[id];
      },
      findElement: (state) => (id: string) => {
        return state.objects[id];
      },
      findChildrenIds: (state) => (id: string) => {
        return state.children[id];
      },
    },
    mutations: {
      genNextId(state: Project, idType: string) {
        if (!state.genCounters.hasOwnProperty(idType)) state.genCounters[idType] = 0;

        state.genCounters[idType] += 1;
        return state.genCounters[idType];
      },
      addObject<T extends AnyElement>(state: Project, obj: T) {
        state.objects[obj.id] = obj;
      },
      addChild(state: Project, { parentId, childId }) {
        if (!state.children.hasOwnProperty(parentId)) {
          state.children[parentId] = [];
        }
        if (state.children[parentId].indexOf(childId) === -1) {
          state.children[parentId].push(childId);
        }
        state.parents[childId] = parentId;
      },
      updateObject(state: Project, { objectId, path, data, replace }) {
        if (replace) {
          state.objects[objectId] = R.set(R.lensPath(path || []), data, state.objects[objectId]);
        } else {
          state.objects[objectId] = R.over(R.lensPath(path || []), R.mergeRight(R.__, data), state.objects[objectId]);
        }
      },
      moveObject(state: Project, { objectId, relative, afterIdx, beforeIdx }) {
        if (!state.parents.hasOwnProperty(objectId)) return;
        const parentId = state.parents[objectId];
        if (!state.children.hasOwnProperty(parentId)) return;

        const children = state.children[parentId];
        const childIdx = children.indexOf(objectId);
        if (childIdx === -1) return;

        if (relative) {
          const swapIdx = match<"prev" | "next">(relative)
            .with("prev", R.always(childIdx - 1))
            .with("next", R.always(childIdx + 1))
            .exhaustive();

          if (swapIdx < 0 || swapIdx >= children.length) return;

          const element = children[childIdx];
          children.splice(childIdx, 1);
          children.splice(swapIdx, 0, element);
        } else if (afterIdx) {
          if (afterIdx < 0 || afterIdx > children.length) return;

          const element = children[childIdx];
          children.splice(childIdx, 1);
          children.splice(afterIdx, 0, element);
        } else if (beforeIdx) {
          if (beforeIdx < 0 || beforeIdx > children.length) return;

          const element = children[childIdx];
          children.splice(childIdx, 1);
          children.splice(beforeIdx - 1, 0, element);
        }
      },

      removeChildren(state: Project, objectId: string) {
        utils.removeChildren(state, objectId);
      },
      removeObject(state: Project, objectId: string) {
        utils.removeFromParent(state, objectId);
        utils.removeParent(state, objectId);
        utils.removeChildren(state, objectId);
        utils.removeObject(state, objectId);
      },

      addCondition(state: Project, { objectId, data }) {
        const current = state.objects[objectId] as AnyElement & IConditionContainer;
        state.objects[objectId] = {
          ...current,
          conditions: current.conditions ? [...current.conditions, data] : [data],
        } as any;
      },

      setupProject(state: Project, data: ProjectInfo) {
        state.key = data.key;
        state.name = data.name;
      },
      loadProject(state: Project, data: Project) {
        Object.assign(state, data);
      },
      unloadProject(state: Project) {
        Object.assign(state, defaultState());
      },
    },
    actions: {
      insertElement({ commit, state }, { elementType, parentId, build }: InsertArgs) {
        commit("genNextId", elementType);
        const counter = state.genCounters[elementType];
        const objectId = utils.generateIdForElement(state.key, elementType, counter);
        commit("addObject", build(objectId, counter));
        commit("addChild", { parentId, childId: objectId });
      },

      async restoreProject(
        { state, commit, getters },
        { projectId, projectInfo }: { projectId: string; projectInfo: ProjectInfo }
      ) {
        console.log(`Loading project ${projectId}`);
        const projectData = await database.getItem<Project>(`projects/${projectId}`);
        if (projectData) {
          commit("loadProject", projectData);
          console.log("Loaded from storage");
        }

        if (!state.key) {
          console.log("Project requires setup");
          commit("setupProject", projectInfo);
        }
      },
    },
  };
};
