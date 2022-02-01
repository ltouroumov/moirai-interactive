import {createLogger, createStore} from 'vuex'
import {IElement} from "../data/model/element";
import {Database, State} from "../data/state";
import {PersistPlugin} from "./persist";

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
    addObject<T extends IElement<any>>(state: State, obj: T) {
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
    removeObject(state: State, objectId: string) {
      function removeFromParent(objId: string) {
        const parentId = state.database.parents[objId]
        if (parentId) {
          const idx = state.database.children[parentId].indexOf(objId)
          if (idx !== -1) {
            state.database.children[parentId].splice(idx, 1)
          }
        }
      }

      function removeParent(objId: string) {
        delete state.database.parents[objId]
      }

      function removeChildren(objId: string) {
        const children = state.database.children[objId]
        if (children) {
          children.forEach(childId => {
            removeChildren(childId)
            removeParent(childId)
            removeObject(childId)
          })
        }
        delete state.database.children[objId]
      }

      function removeObject(objId: string) {
        delete state.database.objects[objId]
      }

      removeFromParent(objectId)
      removeParent(objectId)
      removeChildren(objectId)
      removeObject(objectId)
    }
  },
  actions: {
    async genNextId({commit, state}, idType: string) {
      commit('genNextId', idType)
      return state.genCounters[idType]
    },


  }
})