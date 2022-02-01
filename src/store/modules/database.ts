import {Module} from "vuex";
import {Database, Project, RootState, StateModules} from "../../data/state";
import {AnyElement} from "../../data/model/element";

function removeFromParent(state: Database, objId: string) {
  const parentId = state.parents[objId]
  if (parentId) {
    const idx = state.children[parentId].indexOf(objId)
    if (idx !== -1) {
      state.children[parentId].splice(idx, 1)
    }
  }
}

function removeParent(state: Database, objId: string) {
  delete state.parents[objId]
}

function removeChildren(state: Database, objId: string) {
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

function removeObject(state: Database, objId: string) {
  delete state.objects[objId]
}

const defaultState = () => new Database()

export const DatabaseModule: Module<Database, RootState> = {
  namespaced: true,
  state(): Database {
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
    genNextId(state: Database, idType: string) {
      if (!state.genCounters.hasOwnProperty(idType))
        state.genCounters[idType] = 0

      state.genCounters[idType] += 1
      return state.genCounters[idType]
    },
    addObject<T extends AnyElement>(state: Database, obj: T) {
      state.objects[obj.id] = obj
    },
    addChild(state: Database, {parentId, childId}) {
      if (!state.children.hasOwnProperty(parentId)) {
        state.children[parentId] = []
      }
      if (state.children[parentId].indexOf(childId) === -1) {
        state.children[parentId].push(childId)
      }
      state.parents[childId] = parentId
    },
    updateObject(state: Database, {objectId, data}) {
      const current = state.objects[objectId]
      state.objects[objectId] = {...current, ...data}
    },
    removeChildren(state: Database, objectId: string) {
      removeChildren(state, objectId)
    },
    removeObject(state: Database, objectId: string) {
      removeFromParent(state, objectId)
      removeParent(state, objectId)
      removeChildren(state, objectId)
      removeObject(state, objectId)
    },

    setupProject(state: Database, data: Project) {
      state.key = data.key
      state.name = data.name
    },
    loadProject(state: Database, data: Database) {
      Object.assign(state, data)
    },
    unloadProject(state: Database) {
      Object.assign(state, defaultState())
    },
  },
  actions: {
    async genNextId({commit, state}, idType: string) {
      commit('genNextId', idType)
      return state.genCounters[idType]
    },
  }
}