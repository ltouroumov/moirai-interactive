import { Module } from "vuex";
import { Project } from "../../data/model/project";
import { AnyElement, ElementType, IConditionContainer, IElement, Page } from "../../data/model/element";
import { EditorData } from "../../data/state/editor";
import { ProjectInfo } from "../../data/state/home";
import * as R from "ramda";
import Hashids from "hashids";

function removeFromParent(state: Project, objId: string) {
  const parentId = state.parents[objId];
  if (parentId) {
    const idx = state.children[parentId].indexOf(objId);
    if (idx !== -1) {
      state.children[parentId].splice(idx, 1);
    }
  }
}

function removeParent(state: Project, objId: string) {
  delete state.parents[objId];
}

function removeChildren(state: Project, objId: string) {
  const children = state.children[objId];
  if (children) {
    children.forEach(childId => {
      removeChildren(state, childId);
      removeParent(state, childId);
      removeObject(state, childId);
    });
  }
  delete state.children[objId];
}

function removeObject(state: Project, objId: string) {
  delete state.objects[objId];
}

const defaultState = () => new Project();

type InsertArgs = {
  elementType: ElementType,
  parentId: string,
  build: ((objectId: string, counter: number) => AnyElement)
};

export const ProjectModule: Module<Project, EditorData> = {
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
    }
  },
  mutations: {
    genNextId(state: Project, idType: string) {
      if (!state.genCounters.hasOwnProperty(idType))
        state.genCounters[idType] = 0;

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
    updateObject(state: Project, { objectId, path, data }) {
      state.objects[objectId] = R.over(
        R.lensPath(path || []),
        R.mergeRight(R.__, data),
        state.objects[objectId]
      );
    },
    removeChildren(state: Project, objectId: string) {
      removeChildren(state, objectId);
    },
    removeObject(state: Project, objectId: string) {
      removeFromParent(state, objectId);
      removeParent(state, objectId);
      removeChildren(state, objectId);
      removeObject(state, objectId);
    },

    addCondition(state: Project, { objectId, data }) {
      const current = state.objects[objectId] as AnyElement & IConditionContainer;
      state.objects[objectId] = {
        ...current,
        conditions: (
          current.conditions ? [...current.conditions, data] : [data]
        )
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
    }
  },
  actions: {
    insertElement({ commit, state }, { elementType, parentId, build }: InsertArgs) {
      const HID = new Hashids(state.key, 5);
      commit("genNextId", elementType);
      const counter = state.genCounters[elementType];
      const objectId = `${elementType}_${HID.encode(counter)}`;
      commit("addObject", build(objectId, counter));
      commit("addChild", { parentId, childId: objectId });
    }
  }
};