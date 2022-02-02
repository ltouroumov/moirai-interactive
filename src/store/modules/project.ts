import { Module } from 'vuex';
import { Project } from '../../data/model/project';
import { AnyElement } from '../../data/model/element';
import { EditorData } from '../../data/state/editor';
import { ProjectInfo } from '../../data/state/home';

function removeFromParent(state: Project, objId: string) {
  const parentId = state.parents[objId]
  if (parentId) {
    const idx = state.children[parentId].indexOf(objId)
    if (idx !== -1) {
      state.children[parentId].splice(idx, 1)
    }
  }
}

function removeParent(state: Project, objId: string) {
  delete state.parents[objId]
}

function removeChildren(state: Project, objId: string) {
  const children = state.children[objId]
  if (children) {
    children.forEach(childId => {
      removeChildren(state, childId)
      removeParent(state, childId)
      removeObject(state, childId)
    })
  }
  delete state.children[objId]
}

function removeObject(state: Project, objId: string) {
  delete state.objects[objId]
}

const defaultState = () => new Project()

export const ProjectModule: Module<Project, EditorData> = {
  namespaced: true,
  state(): Project {
    return defaultState()
  },
  getters: {
    findScore: (state) => (id: string) => {
      return state.scores[id]
    },
    findElement: (state) => (id: string) => {
      return state.objects[id]
    },
    findChildrenIds: (state) => (id: string) => {
      return state.children[id]
    },
  },
  mutations: {
    genNextId(state: Project, idType: string) {
      if (!state.genCounters.hasOwnProperty(idType))
        state.genCounters[idType] = 0

      state.genCounters[idType] += 1
      return state.genCounters[idType]
    },
    addObject<T extends AnyElement>(state: Project, obj: T) {
      state.objects[obj.id] = obj
    },
    addChild(state: Project, { parentId, childId }) {
      if (!state.children.hasOwnProperty(parentId)) {
        state.children[parentId] = []
      }
      if (state.children[parentId].indexOf(childId) === -1) {
        state.children[parentId].push(childId)
      }
      state.parents[childId] = parentId
    },
    updateObject(state: Project, { objectId, data }) {
      const current = state.objects[objectId]
      state.objects[objectId] = { ...current, ...data }
    },
    removeChildren(state: Project, objectId: string) {
      removeChildren(state, objectId)
    },
    removeObject(state: Project, objectId: string) {
      removeFromParent(state, objectId)
      removeParent(state, objectId)
      removeChildren(state, objectId)
      removeObject(state, objectId)
    },

    setupProject(state: Project, data: ProjectInfo) {
      state.key = data.key
      state.name = data.name
    },
    loadProject(state: Project, data: Project) {
      Object.assign(state, data)
    },
    unloadProject(state: Project) {
      Object.assign(state, defaultState())
    },
  },
  actions: {
    async genNextId({ commit, state }, idType: string) {
      commit('genNextId', idType)
      return state.genCounters[idType]
    },
  }
}