import {createLogger, createStore} from 'vuex'
import {AnyElement} from "../data/model/element";
import {Database, State} from "../data/state";
import {PersistPlugin} from "./persist";

function removeFromParent(state: State, objId: string) {
  const parentId = state.database.parents[objId]
  if (parentId) {
    const idx = state.database.children[parentId].indexOf(objId)
    if (idx !== -1) {
      state.database.children[parentId].splice(idx, 1)
    }
  }
}

function removeParent(state: State, objId: string) {
  delete state.database.parents[objId]
}

function removeChildren(state: State, objId: string) {
  const children = state.database.children[objId]
  if (children) {
    children.forEach(childId => {
      removeChildren(state, childId)
      removeParent(state, childId)
      removeObject(state, childId)
    })
  }
  delete state.database.children[objId]
}

function removeObject(state: State, objId: string) {
  delete state.database.objects[objId]
}

export default createStore<State>({
  plugins: [createLogger(), PersistPlugin],
  state(): State {
    return {
      project: 'default',
      genCounters: {},
      database: new Database()
    }
  },
  getters: {
    findScore: (state) => (id: string) => {
      return state.database.scores[id]
    },
    findElement: (state) => (id: string) => {
      return state.database.objects[id]
    },
    findChildrenIds: (state) => (id: string) => {
      return state.database.children[id]
    },
  },
  mutations: {
    genNextId(state: State, idType: string) {
      if (!state.genCounters.hasOwnProperty(idType))
        state.genCounters[idType] = 0

      state.genCounters[idType] += 1
      return state.genCounters[idType]
    },
    addObject<T extends AnyElement>(state: State, obj: T) {
      state.database.objects[obj.id] = obj
    },
    addChild(state: State, {parentId, childId}) {
      if (!state.database.children.hasOwnProperty(parentId)) {
        state.database.children[parentId] = []
      }
      if (state.database.children[parentId].indexOf(childId) === -1) {
        state.database.children[parentId].push(childId)
      }
      state.database.parents[childId] = parentId
    },
    updateObject(state: State, {objectId, data}) {
      const current = state.database.objects[objectId]
      state.database.objects[objectId] = {...current, ...data}
    },
    removeChildren(state: State, objectId: string) {
      removeChildren(state, objectId)
    },
    removeObject(state: State, objectId: string) {
      removeFromParent(state, objectId)
      removeParent(state, objectId)
      removeChildren(state, objectId)
      removeObject(state, objectId)
    }
  },
  actions: {
    async genNextId({commit, state}, idType: string) {
      commit('genNextId', idType)
      return state.genCounters[idType]
    },


  }
})