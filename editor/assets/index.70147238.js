var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { H as Hashids, l as localforage, V as VuexPersistence, c as clone, a as createStore, b as createLogger, s as set, d as lensPath, o as over, m as mergeRight, _ as __, e as lib, f as always, g as omit, h as defineComponent, i as openBlock, j as createElementBlock, k as createBaseVNode, t as toDisplayString, r as renderSlot, n as createCommentVNode, p as normalizeClass, u as useStore, q as reactive, v as computed, w as resolveComponent, F as Fragment, x as renderList, y as unref, z as createVNode, A as withCtx, B as pushScopeId, C as popScopeId, D as createTextVNode, E as useRouter, G as watch, I as onMounted, J as onUnmounted, K as view, L as ref, M as lensProp, N as withDirectives, O as vModelText, P as isRef, Q as marked, R as toRefs, S as h, T as vShow, U as createBlock, W as mergeWith, X as mergeAll, Y as match, Z as vModelSelect, $ as normalizeStyle, a0 as __$1, a1 as test, a2 as useRoute, a3 as createStaticVNode, a4 as withModifiers, a5 as createRouter, a6 as createWebHashHistory, a7 as createApp } from "./vendor.ae76ec85.js";
const p = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p();
class ProjectInfo {
  constructor(key, name) {
    this.key = key;
    this.name = name;
  }
}
class HomeState {
  constructor() {
    __publicField(this, "items", {});
  }
}
const HID = new Hashids("projects", 8);
function randomIdentifier() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return HID.encode(bytes[0]);
}
const database = localforage.exports.createInstance({
  name: "home",
  storeName: "data",
  driver: localforage.exports.INDEXEDDB,
  description: "Projects Storage"
});
const persistence$1 = new VuexPersistence({
  key: "home",
  storage: database,
  asyncStorage: true,
  reducer: clone
});
const homeStoreKey = Symbol("home");
const homeStore = createStore({
  plugins: [createLogger(), persistence$1.plugin],
  state() {
    return new HomeState();
  },
  getters: {
    findProject: (state) => (projectId) => {
      return state.items[projectId];
    }
  },
  mutations: {
    createProject(state) {
      const projectId = randomIdentifier();
      state.items[projectId] = new ProjectInfo(projectId, "Untitled Project");
    },
    removeProject(state, projectId) {
      delete state.items[projectId];
    }
  },
  actions: {
    removeProject({ commit }, projectId) {
      commit("removeProject", projectId);
      localStorage.removeItem(`vuex/projects/${projectId}`);
    }
  }
});
class EditorData {
}
class Project {
  constructor() {
    __publicField(this, "key");
    __publicField(this, "name");
    __publicField(this, "scores", {});
    __publicField(this, "objects", {});
    __publicField(this, "children", {});
    __publicField(this, "parents", {});
    __publicField(this, "genCounters", {});
  }
}
function sealed(type, extract, components) {
  Reflect.defineMetadata("persist:sealed", { extract, components }, type);
}
function persist(props) {
  return Reflect.metadata("persist:props", props);
}
function inner(props) {
  return Reflect.metadata("persist:inner", props);
}
function defaults(props) {
  return Reflect.metadata("persist:defaults", props);
}
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
let PageStyle = class {
  constructor() {
    __publicField(this, "name");
    __publicField(this, "children");
  }
};
PageStyle = __decorateClass$2([
  persist(["name", "children"])
], PageStyle);
const DefaultPageStyle = {
  name: "default",
  children: "default"
};
let SectionStyle = class {
  constructor() {
    __publicField(this, "name");
    __publicField(this, "children");
    __publicField(this, "gridCols");
    __publicField(this, "gridRows");
    __publicField(this, "gridFlow");
    __publicField(this, "gridDefaultColSpan");
    __publicField(this, "gridDefaultRowSpan");
  }
};
SectionStyle = __decorateClass$2([
  persist(["name", "children", "gridCols", "gridRows", "gridFlow", "gridDefaultColSpan", "gridDefaultRowSpan"])
], SectionStyle);
const DefaultSectionStyle = {
  name: "default",
  children: "default",
  gridCols: "4",
  gridRows: "auto",
  gridFlow: "row",
  gridDefaultColSpan: 1,
  gridDefaultRowSpan: 1
};
let ChoiceStyle = class {
  constructor() {
    __publicField(this, "name");
    __publicField(this, "children");
    __publicField(this, "colSpan");
    __publicField(this, "rowSpan");
  }
};
ChoiceStyle = __decorateClass$2([
  persist(["name", "children", "colSpan", "rowSpan"])
], ChoiceStyle);
const DefaultChoiceStyle = {
  name: "default",
  children: "default",
  colSpan: 1,
  rowSpan: 1
};
let OptionStyle = class {
  constructor() {
    __publicField(this, "name");
  }
};
OptionStyle = __decorateClass$2([
  persist(["name"])
], OptionStyle);
const DefaultOptionStyle = {
  name: "default"
};
let SimpleContentStyle = class {
  constructor() {
    __publicField(this, "name");
  }
};
SimpleContentStyle = __decorateClass$2([
  persist(["name"])
], SimpleContentStyle);
const DefaultSimpleContentStyle = {
  name: "default"
};
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
var ContentType;
(function(ContentType2) {
  ContentType2["Empty"] = "empty";
  ContentType2["Simple"] = "simple";
})(ContentType || (ContentType = {}));
class BaseContent {
  constructor(type) {
    this.type = type;
  }
}
class EmptyContent extends BaseContent {
  constructor() {
    super(ContentType.Empty);
  }
}
let SimpleContent = class extends BaseContent {
  constructor(title, body, image, style) {
    super(ContentType.Simple);
    this.title = title;
    this.body = body;
    this.image = image;
    this.style = style;
  }
};
SimpleContent = __decorateClass$1([
  persist(["title", "body", "image", "style"]),
  inner({ style: SimpleContentStyle }),
  defaults({ style: DefaultSimpleContentStyle })
], SimpleContent);
sealed(BaseContent, (content) => content.type, {
  [ContentType.Empty]: EmptyContent,
  [ContentType.Simple]: SimpleContent
});
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
var ElementType;
(function(ElementType2) {
  ElementType2["Page"] = "page";
  ElementType2["Section"] = "section";
  ElementType2["Choice"] = "choice";
  ElementType2["Option"] = "option";
})(ElementType || (ElementType = {}));
let Page = class {
  constructor(id, name, headerContent, footerContent, conditions = [], style = new PageStyle()) {
    __publicField(this, "type", ElementType.Page);
    this.id = id;
    this.name = name;
    this.headerContent = headerContent;
    this.footerContent = footerContent;
    this.conditions = conditions;
    this.style = style;
  }
};
Page = __decorateClass([
  persist(["id", "name", "headerContent", "footerContent", "conditions", "style"]),
  inner({
    style: PageStyle,
    headerContent: BaseContent,
    footerContent: BaseContent
  }),
  defaults({ style: DefaultPageStyle })
], Page);
let Section = class {
  constructor(id, name, headerContent, footerContent, conditions = [], style = new SectionStyle()) {
    __publicField(this, "type", ElementType.Section);
    this.id = id;
    this.name = name;
    this.headerContent = headerContent;
    this.footerContent = footerContent;
    this.conditions = conditions;
    this.style = style;
  }
};
Section = __decorateClass([
  persist(["id", "name", "headerContent", "footerContent", "conditions", "style"]),
  inner({
    style: SectionStyle,
    headerContent: BaseContent,
    footerContent: BaseContent
  }),
  defaults({ style: DefaultSectionStyle })
], Section);
let Choice = class {
  constructor(id, name, content, scores = [], conditions = [], style = new ChoiceStyle()) {
    __publicField(this, "type", ElementType.Choice);
    this.id = id;
    this.name = name;
    this.content = content;
    this.scores = scores;
    this.conditions = conditions;
    this.style = style;
  }
};
Choice = __decorateClass([
  persist(["id", "name", "content", "scores", "conditions", "style"]),
  inner({ style: ChoiceStyle, content: SimpleContent }),
  defaults({ style: DefaultChoiceStyle })
], Choice);
let Option = class {
  constructor(id, name, content, scores = [], conditions = [], style = new OptionStyle()) {
    __publicField(this, "type", ElementType.Option);
    this.id = id;
    this.name = name;
    this.content = content;
    this.scores = scores;
    this.conditions = conditions;
    this.style = style;
  }
};
Option = __decorateClass([
  persist(["id", "name", "content", "scores", "conditions", "style"]),
  inner({ style: OptionStyle, content: SimpleContent }),
  defaults({ style: DefaultOptionStyle })
], Option);
const utils = {
  removeFromParent(state, objId) {
    const parentId = state.parents[objId];
    if (parentId) {
      const idx = state.children[parentId].indexOf(objId);
      if (idx !== -1) {
        state.children[parentId].splice(idx, 1);
      }
    }
  },
  removeParent(state, objId) {
    delete state.parents[objId];
  },
  removeChildren(state, objId) {
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
  removeObject(state, objId) {
    delete state.objects[objId];
  },
  generateIdForElement(projectKey, elementType, counter) {
    const HID2 = new Hashids(projectKey || "project", 5);
    const elementTypeIdx = lib.match(elementType).with(ElementType.Page, always(1)).with(ElementType.Section, always(2)).with(ElementType.Choice, always(3)).with(ElementType.Option, always(4)).exhaustive();
    return HID2.encode(elementTypeIdx, counter);
  }
};
const defaultState = () => new Project();
const ProjectModule = (database2) => {
  return {
    namespaced: true,
    state() {
      return defaultState();
    },
    getters: {
      findScore: (state) => (id) => {
        return state.scores[id];
      },
      findElement: (state) => (id) => {
        return state.objects[id];
      },
      findChildrenIds: (state) => (id) => {
        return state.children[id];
      }
    },
    mutations: {
      genNextId(state, idType) {
        if (!state.genCounters.hasOwnProperty(idType))
          state.genCounters[idType] = 0;
        state.genCounters[idType] += 1;
        return state.genCounters[idType];
      },
      addObject(state, obj) {
        state.objects[obj.id] = obj;
      },
      addChild(state, { parentId, childId }) {
        if (!state.children.hasOwnProperty(parentId)) {
          state.children[parentId] = [];
        }
        if (state.children[parentId].indexOf(childId) === -1) {
          state.children[parentId].push(childId);
        }
        state.parents[childId] = parentId;
      },
      updateObject(state, { objectId, path, data, replace }) {
        if (replace) {
          state.objects[objectId] = set(lensPath(path || []), data, state.objects[objectId]);
        } else {
          state.objects[objectId] = over(lensPath(path || []), mergeRight(__, data), state.objects[objectId]);
        }
      },
      moveObject(state, { objectId, relative, afterIdx, beforeIdx }) {
        if (!state.parents.hasOwnProperty(objectId))
          return;
        const parentId = state.parents[objectId];
        if (!state.children.hasOwnProperty(parentId))
          return;
        const children = state.children[parentId];
        const childIdx = children.indexOf(objectId);
        if (childIdx === -1)
          return;
        if (relative) {
          const swapIdx = lib.match(relative).with("prev", always(childIdx - 1)).with("next", always(childIdx + 1)).exhaustive();
          if (swapIdx < 0 || swapIdx >= children.length)
            return;
          const element = children[childIdx];
          children.splice(childIdx, 1);
          children.splice(swapIdx, 0, element);
        } else if (afterIdx) {
          if (afterIdx < 0 || afterIdx > children.length)
            return;
          const element = children[childIdx];
          children.splice(childIdx, 1);
          children.splice(afterIdx, 0, element);
        } else if (beforeIdx) {
          if (beforeIdx < 0 || beforeIdx > children.length)
            return;
          const element = children[childIdx];
          children.splice(childIdx, 1);
          children.splice(beforeIdx - 1, 0, element);
        }
      },
      removeChildren(state, objectId) {
        utils.removeChildren(state, objectId);
      },
      removeObject(state, objectId) {
        utils.removeFromParent(state, objectId);
        utils.removeParent(state, objectId);
        utils.removeChildren(state, objectId);
        utils.removeObject(state, objectId);
      },
      addCondition(state, { objectId, data }) {
        const current = state.objects[objectId];
        state.objects[objectId] = __spreadProps(__spreadValues({}, current), {
          conditions: current.conditions ? [...current.conditions, data] : [data]
        });
      },
      setupProject(state, data) {
        state.key = data.key;
        state.name = data.name;
      },
      loadProject(state, data) {
        Object.assign(state, data);
      },
      unloadProject(state) {
        Object.assign(state, defaultState());
      }
    },
    actions: {
      insertElement({ commit, state }, { elementType, parentId, build }) {
        commit("genNextId", elementType);
        const counter = state.genCounters[elementType];
        const objectId = utils.generateIdForElement(state.key, elementType, counter);
        commit("addObject", build(objectId, counter));
        commit("addChild", { parentId, childId: objectId });
      },
      async restoreProject({ state, commit, getters }, { projectId, projectInfo }) {
        console.log(`Loading project ${projectId}`);
        const projectData = await database2.getItem(`projects/${projectId}`);
        if (projectData) {
          commit("loadProject", projectData);
          console.log("Loaded from storage");
        }
        if (!state.key) {
          console.log("Project requires setup");
          commit("setupProject", projectInfo);
        }
      }
    }
  };
};
const PROJECTS_BASE = `projects`;
async function parseOrDefault(storage, key, defaultF) {
  const data = await storage.getItem(key);
  if (data)
    return data;
  else
    return defaultF();
}
const projectsDatabase = localforage.exports.createInstance({
  name: "projects",
  storeName: "data",
  driver: localforage.exports.INDEXEDDB,
  description: "Projects Storage"
});
async function persistProject(storage, key, project) {
  if (project.key) {
    await storage.setItem(`${PROJECTS_BASE}/${project.key}`, project);
  }
}
const persistence = new VuexPersistence({
  key: "projects",
  storage: projectsDatabase,
  asyncStorage: true,
  reducer: clone,
  async saveState(key, state, storage) {
    if (!storage)
      return;
    if (state.project) {
      await persistProject(storage, key, state.project);
    }
    await storage.setItem(key, omit(["project"], state));
  },
  async restoreState(key, storage) {
    if (storage) {
      return await parseOrDefault(storage, key, () => new EditorData());
    } else {
      return void 0;
    }
  }
});
const editorStoreKey = Symbol("editor");
const editorStore = createStore({
  plugins: [createLogger(), persistence.plugin],
  modules: {
    project: ProjectModule(projectsDatabase)
  },
  state() {
    return new EditorData();
  }
});
const _hoisted_1$i = ["id"];
const _hoisted_2$h = { class: "modal-content" };
const _hoisted_3$g = { class: "modal-header" };
const _hoisted_4$c = { class: "modal-title" };
const _hoisted_5$b = /* @__PURE__ */ createBaseVNode("button", {
  type: "button",
  class: "btn-close",
  "data-bs-dismiss": "modal",
  "aria-label": "Close"
}, null, -1);
const _hoisted_6$8 = { class: "modal-body" };
const _hoisted_7$8 = {
  key: 0,
  class: "modal-footer"
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  props: {
    modalId: { type: String, required: true },
    title: { type: String, required: true },
    size: String
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: __props.modalId,
        class: "modal fade",
        tabindex: "-1",
        "aria-hidden": "true"
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["modal-dialog modal-dialog-centered", [props.size !== 0 ? props.size : ""]])
        }, [
          createBaseVNode("div", _hoisted_2$h, [
            createBaseVNode("div", _hoisted_3$g, [
              createBaseVNode("h5", _hoisted_4$c, toDisplayString(__props.title), 1),
              _hoisted_5$b
            ]),
            createBaseVNode("div", _hoisted_6$8, [
              renderSlot(_ctx.$slots, "default")
            ]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_7$8, [
              renderSlot(_ctx.$slots, "footer")
            ])) : createCommentVNode("", true)
          ])
        ], 2)
      ], 8, _hoisted_1$i);
    };
  }
});
var Home_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _withScopeId$6 = (n) => (pushScopeId("data-v-592edd81"), n = n(), popScopeId(), n);
const _hoisted_1$h = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("h1", null, "Moirai", -1));
const _hoisted_2$g = { class: "projects" };
const _hoisted_3$f = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", { class: "header" }, [
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-name" }, "Project"),
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-key" }, "Key"),
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-actions" }, "Actions")
], -1));
const _hoisted_4$b = { class: "project" };
const _hoisted_5$a = { class: "proj-name" };
const _hoisted_6$7 = { class: "proj-key" };
const _hoisted_7$7 = { class: "proj-actions btn-group" };
const _hoisted_8$6 = /* @__PURE__ */ createTextVNode("Edit ");
const _hoisted_9$6 = /* @__PURE__ */ createTextVNode("View ");
const _hoisted_10$5 = ["onClick"];
const _hoisted_11$5 = ["onClick"];
const _hoisted_12$3 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("button", {
  class: "btn btn-primary",
  "data-bs-toggle": "modal",
  "data-bs-target": "#import-project-dialog"
}, " Import ", -1));
const _hoisted_13$3 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("a", { id: "export-link" }, null, -1));
const _hoisted_14$3 = { key: 0 };
const _hoisted_15$1 = { key: 1 };
const _hoisted_16$1 = { class: "object-id" };
const _hoisted_17$1 = { class: "btn-group" };
const _hoisted_18$1 = { key: 2 };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const store = useStore(homeStoreKey);
    const _state = reactive({
      projectFile: void 0,
      projectData: void 0,
      projectErrors: []
    });
    const projects = computed(() => store.state.items);
    function createProject() {
      store.commit("createProject");
    }
    function downloadFile(file) {
      const link = document.getElementById("export-link");
      if (link) {
        const url = URL.createObjectURL(file);
        link.href = url;
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(url);
      }
    }
    function loadFile({ target }) {
      const files = target.files;
      if (files && files.length === 1) {
        _state.projectFile = files[0];
      } else {
        _state.projectFile = void 0;
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
      const input = document.getElementById("import-file");
      if (input) {
        input.value = "";
        _state.projectFile = void 0;
      }
    }
    async function exportProject(projectId) {
      const projectData = await projectsDatabase.getItem(`projects/${projectId}`);
      if (projectData) {
        const file = new File([JSON.stringify(projectData, null, 2)], `project-${projectId}.json`, { type: "application/json" });
        downloadFile(file);
      }
    }
    function removeProject(projectId) {
      store.dispatch("removeProject", projectId);
    }
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1$h,
        createBaseVNode("div", _hoisted_2$g, [
          _hoisted_3$f,
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(projects), (project) => {
            return openBlock(), createElementBlock("div", _hoisted_4$b, [
              createBaseVNode("span", _hoisted_5$a, toDisplayString(project.name), 1),
              createBaseVNode("span", _hoisted_6$7, toDisplayString(project.key), 1),
              createBaseVNode("div", _hoisted_7$7, [
                createVNode(_component_router_link, {
                  class: "btn btn-outline-success",
                  to: { name: "edit_home", params: { projectId: project.key } }
                }, {
                  default: withCtx(() => [
                    _hoisted_8$6
                  ]),
                  _: 2
                }, 1032, ["to"]),
                createVNode(_component_router_link, {
                  class: "btn btn-outline-success",
                  to: { name: "view", params: { projectId: project.key } }
                }, {
                  default: withCtx(() => [
                    _hoisted_9$6
                  ]),
                  _: 2
                }, 1032, ["to"]),
                createBaseVNode("button", {
                  class: "btn btn-outline-primary",
                  onClick: ($event) => exportProject(project.key)
                }, "Export", 8, _hoisted_10$5),
                createBaseVNode("button", {
                  class: "btn btn-outline-danger",
                  onClick: ($event) => removeProject(project.key)
                }, "Remove", 8, _hoisted_11$5)
              ])
            ]);
          }), 256)),
          createBaseVNode("div", { class: "tools" }, [
            createBaseVNode("div", { class: "btn-group" }, [
              createBaseVNode("button", {
                onClick: createProject,
                class: "btn btn-primary"
              }, "Create"),
              _hoisted_12$3
            ])
          ])
        ]),
        _hoisted_13$3,
        createVNode(_sfc_main$m, {
          modalId: "import-project-dialog",
          title: "Import Project"
        }, {
          default: withCtx(() => {
            var _a, _b, _c, _d, _e;
            return [
              unref(_state).projectFile ? (openBlock(), createElementBlock("div", _hoisted_14$3, [
                createBaseVNode("p", null, [
                  createBaseVNode("b", null, toDisplayString((_a = unref(_state).projectFile) == null ? void 0 : _a.name) + " (" + toDisplayString((_b = unref(_state).projectFile) == null ? void 0 : _b.size) + " bytes)", 1)
                ]),
                createBaseVNode("p", null, toDisplayString((_c = unref(_state).projectFile) == null ? void 0 : _c.type), 1)
              ])) : createCommentVNode("", true),
              unref(_state).projectData && !unref(_state).projectErrors ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
                createTextVNode(toDisplayString((_d = unref(_state).projectData) == null ? void 0 : _d.name) + " / ", 1),
                createBaseVNode("span", _hoisted_16$1, toDisplayString((_e = unref(_state).projectData) == null ? void 0 : _e.key), 1)
              ])) : createCommentVNode("", true),
              createBaseVNode("input", {
                id: "import-file",
                type: "file",
                class: "form-control",
                onChange: loadFile
              }, null, 32),
              createBaseVNode("div", _hoisted_17$1, [
                createBaseVNode("button", {
                  class: normalizeClass(["btn btn-success", { disabled: !unref(_state).projectFile }]),
                  type: "button",
                  onClick: previewFile
                }, " Preview ", 2),
                createBaseVNode("button", {
                  class: normalizeClass(["btn btn-success", { disabled: !unref(_state).projectFile || !unref(_state).projectData }]),
                  type: "button",
                  onClick: importFile
                }, " Import ", 2),
                createBaseVNode("button", {
                  class: normalizeClass(["btn btn-danger", { disabled: !unref(_state).projectFile }]),
                  type: "button",
                  onClick: clearFile
                }, " Clear ", 2)
              ]),
              unref(_state).projectErrors ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(_state).projectErrors, (error) => {
                    return openBlock(), createElementBlock("li", null, toDisplayString(error), 1);
                  }), 256))
                ])
              ])) : createCommentVNode("", true)
            ];
          }),
          _: 1
        })
      ], 64);
    };
  }
});
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-592edd81"]]);
const _sfc_main$k = {
  props: {
    name: { type: String, required: true },
    size: { type: String, default: void 0 },
    rotate: { type: String, default: void 0 },
    color: { type: String, default: void 0 },
    flipH: { type: Boolean, default: false },
    flipV: { type: Boolean, default: false },
    spin: { type: Boolean, default: false },
    inactive: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const cssClasses = computed(() => {
      const classes = ["mdi", `mdi-${props.name}`];
      if (props.size)
        classes.push(`mdi-${props.size}`);
      if (props.rotate)
        classes.push(`mdi-rotate-${props.rotate}`);
      if (props.color)
        classes.push(`mdi-${props.color}`);
      if (props.flipH)
        classes.push(`mdi-flip-h`);
      if (props.flipV)
        classes.push(`mdi-flip-v`);
      if (props.spin)
        classes.push(`mdi-spin`);
      if (props.inactive)
        classes.push(`mdi-inactive`);
      return classes;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", {
        class: normalizeClass(unref(cssClasses))
      }, null, 2);
    };
  }
};
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
async function reloadProject(projectId) {
  console.log(`Loading project ${projectId}`);
  const homeStore2 = useStore(homeStoreKey);
  const projectInfo = homeStore2.getters["findProject"](projectId);
  const store = useStore(editorStoreKey);
  await store.dispatch("project/restoreProject", {
    projectId,
    projectInfo
  });
}
var Editor_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$g = {
  key: 0,
  id: "editor-main"
};
const _hoisted_2$f = { class: "toolbar" };
const _hoisted_3$e = { class: "nav nav-pills nav-fill editor-tabs" };
const _hoisted_4$a = /* @__PURE__ */ createTextVNode(" Home ");
const _hoisted_5$9 = /* @__PURE__ */ createTextVNode(" Pages ");
const _hoisted_6$6 = { class: "nav-item dropdown" };
const _hoisted_7$6 = /* @__PURE__ */ createTextVNode(" Sections ");
const _hoisted_8$5 = {
  class: "dropdown-menu",
  "aria-labelledby": "dropdownMenuLink"
};
const _hoisted_9$5 = { class: "object-id" };
const _hoisted_10$4 = /* @__PURE__ */ createTextVNode(" Settings ");
const _hoisted_11$4 = { class: "editor-actions" };
const _hoisted_12$2 = {
  key: 1,
  id: "editor-loader"
};
const _hoisted_13$2 = /* @__PURE__ */ createBaseVNode("div", { class: "loader" }, [
  /* @__PURE__ */ createBaseVNode("div", {
    class: "spinner-border",
    style: { "width": "5rem", "height": "5rem" },
    role: "status"
  }, [
    /* @__PURE__ */ createBaseVNode("span", { class: "visually-hidden" }, "Loading...")
  ]),
  /* @__PURE__ */ createBaseVNode("p", null, "Loading Project ...")
], -1);
const _hoisted_14$2 = [
  _hoisted_13$2
];
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String,
    pageId: String
  },
  setup(__props) {
    const props = __props;
    const _state = reactive({
      loaded: false
    });
    useRouter();
    const store = useStore(editorStoreKey);
    computed(() => store.state.project);
    const findPageIds = computed(() => store.getters["project/findChildrenIds"]("__pages__"));
    function findPage(pageId) {
      return store.getters["project/findElement"](pageId);
    }
    watch(() => props.projectId, (newValue) => {
      if (newValue)
        reloadProject(newValue);
    });
    onMounted(async () => {
      _state.loaded = false;
      if (props.projectId) {
        await Promise.all([
          reloadProject(props.projectId),
          sleep(200)
        ]);
        _state.loaded = true;
      }
    });
    onUnmounted(() => {
      store.commit("project/unloadProject");
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_router_view = resolveComponent("router-view");
      return unref(_state).loaded ? (openBlock(), createElementBlock("div", _hoisted_1$g, [
        createBaseVNode("div", _hoisted_2$f, [
          createBaseVNode("nav", _hoisted_3$e, [
            createVNode(_component_router_link, {
              class: "nav-link",
              to: { name: "home" }
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$k, { name: "chevron-left" }),
                _hoisted_4$a
              ]),
              _: 1
            }),
            createVNode(_component_router_link, {
              class: "nav-link",
              to: { name: "edit_pages", params: _ctx.$route.params },
              "active-class": "active"
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$k, { name: "file-multiple" }),
                _hoisted_5$9
              ]),
              _: 1
            }, 8, ["to"]),
            createBaseVNode("div", _hoisted_6$6, [
              createBaseVNode("a", {
                class: normalizeClass(["nav-link", { disabled: !unref(findPageIds) || unref(findPageIds).length === 0 }, "dropdown-toggle"]),
                href: "#",
                role: "button",
                id: "dropdownMenuLink",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false"
              }, [
                createVNode(_sfc_main$k, { name: "layers-triple" }),
                _hoisted_7$6
              ], 2),
              createBaseVNode("ul", _hoisted_8$5, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findPageIds), (pageId) => {
                  return openBlock(), createElementBlock("li", null, [
                    createVNode(_component_router_link, {
                      class: "dropdown-item",
                      to: { name: "edit_section", params: __spreadProps(__spreadValues({}, _ctx.$route.params), { pageId }) },
                      "active-class": "active"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(findPage(pageId).name) + " / ", 1),
                        createBaseVNode("span", _hoisted_9$5, toDisplayString(pageId), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ]);
                }), 256))
              ])
            ]),
            createVNode(_component_router_link, {
              class: "nav-link",
              to: { name: "edit_settings", params: _ctx.$route.params },
              "active-class": "active"
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$k, { name: "cog" }),
                _hoisted_10$4
              ]),
              _: 1
            }, 8, ["to"])
          ]),
          createBaseVNode("div", _hoisted_11$4, [
            createVNode(_component_router_view, { name: "tools" })
          ])
        ]),
        createVNode(_component_router_view, { id: "editor-current" })
      ])) : (openBlock(), createElementBlock("div", _hoisted_12$2, _hoisted_14$2));
    };
  }
});
var HomeTab_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$5 = (n) => (pushScopeId("data-v-f890549a"), n = n(), popScopeId(), n);
const _hoisted_1$f = { class: "editor-home" };
const _hoisted_2$e = { class: "card" };
const _hoisted_3$d = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("div", { class: "card-img-top" }, null, -1));
const _hoisted_4$9 = { class: "card-body" };
const _hoisted_5$8 = { class: "card-title" };
const _hoisted_6$5 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("p", { class: "card-text" }, "Some quick example text to build on the card title and make up the bulk of the card's content.", -1));
const _hoisted_7$5 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("a", {
  href: "#",
  class: "btn btn-primary"
}, "Go somewhere", -1));
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        (openBlock(), createElementBlock(Fragment, null, renderList(8, (idx) => {
          return createBaseVNode("div", _hoisted_2$e, [
            _hoisted_3$d,
            createBaseVNode("div", _hoisted_4$9, [
              createBaseVNode("h5", _hoisted_5$8, "Card title " + toDisplayString(idx), 1),
              _hoisted_6$5,
              _hoisted_7$5
            ])
          ]);
        }), 64))
      ]);
    };
  }
});
var HomeTab = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-f890549a"]]);
function updatePropsFor(store, { type, prop, provider, objectId, path }) {
  const _provider = provider || (() => prop == null ? void 0 : prop.value);
  function computedPropFor(key, path2 = [], defaultValue = void 0) {
    return [
      `M_${key}`,
      computed({
        get: () => {
          let obj = _provider();
          const cur = view(lensPath([...path2, key]), obj);
          return cur !== void 0 ? cur : defaultValue;
        },
        set: (value) => {
          let _objectId = objectId();
          if (!_objectId)
            return;
          store.commit("project/updateObject", {
            objectId: _objectId,
            path: path2,
            data: { [key]: value }
          });
        }
      })
    ];
  }
  function computedProps(type2, path2 = [], defaultValues = {}) {
    const sealed2 = Reflect.getOwnMetadata("persist:sealed", type2);
    if (sealed2) {
      return {};
    } else {
      const propsToPersist = Reflect.getMetadata("persist:props", type2);
      const innerProps = Reflect.getMetadata("persist:inner", type2);
      const defaults2 = Reflect.getMetadata("persist:defaults", type2);
      return Object.fromEntries(propsToPersist.map((key) => {
        if (innerProps && key in innerProps) {
          return [key, computedProps(innerProps[key], [...path2, key], clone(defaults2[key]))];
        } else {
          return computedPropFor(key, path2, defaultValues[key]);
        }
      }));
    }
  }
  return computedProps(type, path || []);
}
var EmptyContentView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$4 = (n) => (pushScopeId("data-v-bb8a8b56"), n = n(), popScopeId(), n);
const _hoisted_1$e = { class: "empty-content-edit ph-empty" };
const _hoisted_2$d = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("div", { class: "ph-empty-text" }, "No content", -1));
const _hoisted_3$c = [
  _hoisted_2$d
];
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  props: {
    name: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$e, _hoisted_3$c);
    };
  }
});
var EmptyContentView = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-bb8a8b56"]]);
var ModalSize;
(function(ModalSize2) {
  ModalSize2[ModalSize2["Default"] = 0] = "Default";
  ModalSize2["Small"] = "modal-sm";
  ModalSize2["Large"] = "modal-lg";
  ModalSize2["ExtraLarge"] = "modal-xl";
})(ModalSize || (ModalSize = {}));
function genModalId(parts) {
  const prefix = parts.join("_");
  return function(suffix, trigger = false) {
    return `${trigger ? "#" : ""}${prefix}_${suffix}`;
  };
}
var SimpleContentView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$d = { class: "simple-content-edit" };
const _hoisted_2$c = { class: "btn btn-outline-primary" };
const _hoisted_3$b = /* @__PURE__ */ createTextVNode(" Style ");
const _hoisted_4$8 = ["data-bs-target"];
const _hoisted_5$7 = ["src", "alt"];
const _hoisted_6$4 = {
  key: 1,
  class: "ph-empty-text"
};
const _hoisted_7$4 = ["data-bs-target"];
const _hoisted_8$4 = ["innerHTML"];
const _hoisted_9$4 = {
  key: 1,
  class: "ph-empty-text"
};
const _hoisted_10$3 = /* @__PURE__ */ createTextVNode(" Edit Image ");
const _hoisted_11$3 = { class: "body-editor" };
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  props: {
    objectId: { type: String, required: true },
    contentProp: { type: String, required: true },
    name: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const modalId = genModalId(["edit", props.contentProp, props.objectId]);
    const bodyPreviewFrame = ref(void 0);
    const content = computed(() => {
      const element = store.getters["project/findElement"](props.objectId);
      return view(lensProp(props.contentProp), element);
    });
    const {
      M_title,
      M_body
    } = updatePropsFor(store, {
      type: SimpleContent,
      provider: () => store.getters["project/findElement"](props.objectId),
      objectId: () => props.objectId,
      path: [props.contentProp]
    });
    function updateBodyPreview() {
      var _a, _b;
      const bodyElement = (_b = (_a = bodyPreviewFrame.value) == null ? void 0 : _a.contentWindow) == null ? void 0 : _b.document.body;
      if (bodyElement) {
        bodyElement.innerHTML = marked.parse(content.value.body);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$d, [
        withDirectives(createBaseVNode("input", {
          class: "form-control content-title",
          type: "text",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_title) ? M_title.value = $event : null),
          placeholder: "Title"
        }, null, 512), [
          [vModelText, unref(M_title)]
        ]),
        createBaseVNode("button", _hoisted_2$c, [
          createVNode(_sfc_main$k, { name: "palette-swatch" }),
          _hoisted_3$b
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["content-image", { "ph-empty": !unref(content).image }])
        }, [
          createBaseVNode("button", {
            class: "btn btn-outline-primary edit-btn",
            "data-bs-toggle": "modal",
            "data-bs-target": unref(modalId)("image", true)
          }, [
            createVNode(_sfc_main$k, { name: "image-edit-outline" })
          ], 8, _hoisted_4$8),
          unref(content).image ? (openBlock(), createElementBlock("img", {
            key: 0,
            src: unref(content).image,
            alt: unref(content).title,
            class: "img-thumbnail"
          }, null, 8, _hoisted_5$7)) : (openBlock(), createElementBlock("div", _hoisted_6$4, "No Image"))
        ], 2),
        createBaseVNode("div", {
          class: normalizeClass(["content-body", { "ph-empty": !unref(content).body }])
        }, [
          createBaseVNode("button", {
            class: "btn btn-outline-primary edit-btn",
            "data-bs-toggle": "modal",
            "data-bs-target": unref(modalId)("body", true)
          }, [
            createVNode(_sfc_main$k, { name: "playlist-edit" })
          ], 8, _hoisted_7$4),
          unref(content).body ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "content-body-render",
            innerHTML: unref(marked).parse(unref(content).body)
          }, null, 8, _hoisted_8$4)) : (openBlock(), createElementBlock("div", _hoisted_9$4, "No content"))
        ], 2),
        createVNode(_sfc_main$m, {
          "modal-id": unref(modalId)("image"),
          title: "Image Editor"
        }, {
          default: withCtx(() => [
            _hoisted_10$3
          ]),
          _: 1
        }, 8, ["modal-id"]),
        createVNode(_sfc_main$m, {
          "modal-id": unref(modalId)("body"),
          size: unref(ModalSize).ExtraLarge,
          title: "Body Editor"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_11$3, [
              withDirectives(createBaseVNode("textarea", {
                class: "form-control body-html",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_body) ? M_body.value = $event : null),
                onInput: updateBodyPreview
              }, null, 544), [
                [vModelText, unref(M_body)]
              ]),
              createBaseVNode("iframe", {
                class: "body-preview",
                ref: (el) => {
                  bodyPreviewFrame.value = el;
                }
              }, null, 512)
            ])
          ]),
          _: 1
        }, 8, ["modal-id", "size"])
      ]);
    };
  }
});
var SimpleContentView = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-6982b959"]]);
var ContentView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$f = defineComponent({
  name: "ContentView",
  components: { EmptyContentView, SimpleContentView },
  props: {
    objectId: { type: String, required: true },
    contentProp: { type: String, required: true },
    name: { type: String, required: true }
  },
  setup(props) {
    const store = useStore(editorStoreKey);
    const { objectId, contentProp } = toRefs(props);
    const contentType = computed({
      get: () => {
        const element = store.getters["project/findElement"](objectId.value);
        const content = view(lensProp(contentProp.value), element);
        return (content == null ? void 0 : content.type) || ContentType.Empty;
      },
      set: (value) => {
        store.commit("project/updateObject", {
          objectId: objectId.value,
          path: [contentProp.value],
          data: { type: value },
          replace: true
        });
      }
    });
    return {
      contentType
    };
  },
  render() {
    return h("div", { class: "content-editor" }, [
      h("span", { class: "editor-name" }, this.$props.name),
      h("select", {
        class: "form-select content-type",
        value: this.contentType,
        onChange: (evt) => {
          console.log("Select Changed", evt);
          this.contentType = evt.target.value;
        }
      }, Object.values(ContentType).map((key) => {
        return h("option", { value: key }, key);
      })),
      lib.match(this.contentType).with(ContentType.Empty, () => h(EmptyContentView, __spreadValues({ class: "editor-view" }, this.$props))).with(ContentType.Simple, () => h(SimpleContentView, __spreadValues({ class: "editor-view" }, this.$props))).exhaustive()
    ]);
  }
});
var ContentView = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-838540a4"]]);
var PageView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$c = { class: "page" };
const _hoisted_2$b = { class: "page-actions" };
const _hoisted_3$a = { class: "page-id" };
const _hoisted_4$7 = { class: "btn-toolbar" };
const _hoisted_5$6 = { class: "btn-group me-2" };
const _hoisted_6$3 = ["data-bs-target"];
const _hoisted_7$3 = /* @__PURE__ */ createTextVNode(" Requirements ");
const _hoisted_8$3 = ["data-bs-target"];
const _hoisted_9$3 = /* @__PURE__ */ createTextVNode(" Style ");
const _hoisted_10$2 = { class: "btn-group" };
const _hoisted_11$2 = {
  key: 0,
  class: "page-content"
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  props: {
    pageId: String
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const _state = reactive({
      collapsed: false
    });
    const page = computed(() => store.getters["project/findElement"](props.pageId));
    const {
      M_name
    } = updatePropsFor(store, {
      type: Page,
      prop: page,
      objectId: () => props.pageId
    });
    function togglePage() {
      _state.collapsed = !_state.collapsed;
    }
    function movePage(relative) {
      store.commit("project/moveObject", {
        objectId: props.pageId,
        relative
      });
    }
    async function deletePage() {
      store.commit("project/removeObject", props.pageId);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createBaseVNode("div", _hoisted_2$b, [
          createBaseVNode("button", {
            class: "btn btn-sm btn-link",
            onClick: togglePage
          }, [
            withDirectives(createVNode(_sfc_main$k, { name: "eye" }, null, 512), [
              [vShow, unref(_state).collapsed]
            ]),
            withDirectives(createVNode(_sfc_main$k, { name: "eye-off" }, null, 512), [
              [vShow, !unref(_state).collapsed]
            ])
          ]),
          createBaseVNode("button", {
            class: "btn btn-sm btn-link",
            onClick: _cache[0] || (_cache[0] = ($event) => movePage("prev"))
          }, [
            createVNode(_sfc_main$k, { name: "arrow-up" })
          ]),
          createBaseVNode("button", {
            class: "btn btn-sm btn-link",
            onClick: _cache[1] || (_cache[1] = ($event) => movePage("next"))
          }, [
            createVNode(_sfc_main$k, { name: "arrow-down" })
          ]),
          createBaseVNode("span", _hoisted_3$a, toDisplayString(unref(page).name) + " / " + toDisplayString(unref(page).id), 1),
          createBaseVNode("div", _hoisted_4$7, [
            createBaseVNode("div", _hoisted_5$6, [
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-primary",
                "data-bs-toggle": "modal",
                "data-bs-target": `#cond_${props.sectionId}`
              }, [
                createVNode(_sfc_main$k, { name: "key" }),
                _hoisted_7$3
              ], 8, _hoisted_6$3),
              createBaseVNode("button", {
                type: "button",
                class: "btn btn-sm btn-outline-primary",
                "data-bs-toggle": "modal",
                "data-bs-target": `#style_${props.sectionId}`
              }, [
                createVNode(_sfc_main$k, { name: "palette-swatch" }),
                _hoisted_9$3
              ], 8, _hoisted_8$3)
            ]),
            createBaseVNode("div", _hoisted_10$2, [
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-danger wide",
                onClick: deletePage
              }, [
                createVNode(_sfc_main$k, { name: "delete-outline" })
              ])
            ])
          ])
        ]),
        !unref(_state).collapsed ? (openBlock(), createElementBlock("div", _hoisted_11$2, [
          withDirectives(createBaseVNode("input", {
            class: "form-control page-name",
            type: "text",
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(M_name) ? M_name.value = $event : null)
          }, null, 512), [
            [vModelText, unref(M_name)]
          ]),
          createVNode(ContentView, {
            "object-id": props.pageId,
            "content-prop": "headerContent",
            name: "Page Header",
            class: "page-header"
          }, null, 8, ["object-id"]),
          createVNode(ContentView, {
            "object-id": props.pageId,
            "content-prop": "footerContent",
            name: "Page Footer",
            class: "page-footer"
          }, null, 8, ["object-id"])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var PageView = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-3e818e0e"]]);
var PagesTab_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-2e64a4f6"), n = n(), popScopeId(), n);
const _hoisted_1$b = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("h1", null, "Pages", -1));
const _hoisted_2$a = { key: 0 };
const _hoisted_3$9 = { key: 1 };
const _hoisted_4$6 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("p", null, "No Pages", -1));
const _hoisted_5$5 = [
  _hoisted_4$6
];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String,
    pageId: String
  },
  setup(__props) {
    const store = useStore(editorStoreKey);
    const findPages = computed(() => store.getters["project/findChildrenIds"]("__pages__"));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        _hoisted_1$b,
        unref(findPages) && unref(findPages).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$a, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findPages), (pageId) => {
            return openBlock(), createBlock(PageView, { pageId }, null, 8, ["pageId"]);
          }), 256))
        ])) : createCommentVNode("", true),
        !unref(findPages) || unref(findPages).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3$9, _hoisted_5$5)) : createCommentVNode("", true)
      ]);
    };
  }
});
var PagesTab = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-2e64a4f6"]]);
const _hoisted_1$a = { class: "btn-toolbar" };
const _hoisted_2$9 = { class: "btn-group" };
const _hoisted_3$8 = /* @__PURE__ */ createTextVNode(" New Page ");
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String
  },
  setup(__props) {
    const store = useStore(editorStoreKey);
    function createPage() {
      store.dispatch("project/insertElement", {
        elementType: ElementType.Page,
        parentId: "__pages__",
        build: (pageId, counter) => new Page(pageId, `Page ${counter}`)
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createBaseVNode("div", _hoisted_2$9, [
          createBaseVNode("button", {
            class: "btn btn-primary",
            onClick: createPage
          }, [
            createVNode(_sfc_main$k, { name: "file-plus" }),
            _hoisted_3$8
          ])
        ])
      ]);
    };
  }
});
var OptionView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$9 = { class: "option" };
const _hoisted_2$8 = { class: "opt-actions" };
const _hoisted_3$7 = { class: "ch-id" };
const _hoisted_4$5 = { class: "btn-group" };
const _hoisted_5$4 = { class: "opt-header" };
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  props: {
    optionId: String
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const _state = reactive({
      collapsed: false
    });
    const option = computed(() => store.getters["project/findElement"](props.optionId));
    const { M_name, M_text } = updatePropsFor(store, {
      type: Option,
      prop: option,
      objectId: () => props.optionId
    });
    async function deleteOption() {
      store.commit("project/removeObject", props.optionId);
    }
    function moveOption(relative) {
      store.commit("project/moveObject", {
        objectId: props.optionId,
        relative
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("div", _hoisted_2$8, [
          createBaseVNode("button", {
            class: "btn btn-sm btn-link",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.toggleOptions && _ctx.toggleOptions(...args))
          }, [
            withDirectives(createVNode(_sfc_main$k, { name: "eye" }, null, 512), [
              [vShow, unref(_state).collapsed]
            ]),
            withDirectives(createVNode(_sfc_main$k, { name: "eye-off" }, null, 512), [
              [vShow, !unref(_state).collapsed]
            ])
          ]),
          createBaseVNode("button", {
            class: "btn btn-sm btn-link",
            onClick: _cache[1] || (_cache[1] = ($event) => moveOption("prev"))
          }, [
            createVNode(_sfc_main$k, { name: "arrow-up" })
          ]),
          createBaseVNode("button", {
            class: "btn btn-sm btn-link",
            onClick: _cache[2] || (_cache[2] = ($event) => moveOption("next"))
          }, [
            createVNode(_sfc_main$k, { name: "arrow-down" })
          ]),
          createBaseVNode("span", _hoisted_3$7, toDisplayString(unref(option).name) + " / " + toDisplayString(unref(option).id), 1),
          createBaseVNode("div", _hoisted_4$5, [
            createBaseVNode("button", {
              class: "btn btn-sm btn-outline-danger",
              onClick: deleteOption
            }, [
              createVNode(_sfc_main$k, { name: "delete-outline" })
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_5$4, [
          withDirectives(createBaseVNode("input", {
            class: "form-control opt-title",
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(M_name) ? M_name.value = $event : null)
          }, null, 512), [
            [vModelText, unref(M_name)]
          ])
        ]),
        createVNode(ContentView, {
          name: "Option Content",
          "object-id": props.optionId,
          "content-prop": "content"
        }, null, 8, ["object-id"])
      ]);
    };
  }
});
var OptionView = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-342b0602"]]);
var ElementToolbar_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$8 = { class: "element-toolbar" };
const _hoisted_2$7 = { class: "ch-id" };
const _hoisted_3$6 = { class: "btn-toolbar" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  props: {
    element: null,
    collapsed: { type: Boolean },
    collapseDisabled: { type: Boolean },
    arrows: null
  },
  emits: ["toggle", "move"],
  setup(__props, { emit }) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createBaseVNode("button", {
          class: normalizeClass(["btn btn-sm btn-link", { disabled: props.collapseDisabled }]),
          onClick: _cache[0] || (_cache[0] = ($event) => emit("toggle"))
        }, [
          withDirectives(createVNode(_sfc_main$k, { name: "eye" }, null, 512), [
            [vShow, props.collapsed]
          ]),
          withDirectives(createVNode(_sfc_main$k, { name: "eye-off" }, null, 512), [
            [vShow, !props.collapsed]
          ])
        ], 2),
        createBaseVNode("button", {
          class: "btn btn-sm btn-link",
          onClick: _cache[1] || (_cache[1] = ($event) => emit("move", "prev"))
        }, [
          createVNode(_sfc_main$k, {
            name: props.arrows === "vertical" ? "arrow-up" : "arrow-left"
          }, null, 8, ["name"])
        ]),
        createBaseVNode("button", {
          class: "btn btn-sm btn-link",
          onClick: _cache[2] || (_cache[2] = ($event) => emit("move", "next"))
        }, [
          createVNode(_sfc_main$k, {
            name: props.arrows === "vertical" ? "arrow-down" : "arrow-right"
          }, null, 8, ["name"])
        ]),
        createBaseVNode("span", _hoisted_2$7, toDisplayString(__props.element.name) + " / " + toDisplayString(__props.element.id), 1),
        createBaseVNode("div", _hoisted_3$6, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ])
      ]);
    };
  }
});
var ElementToolbar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-d61bc648"]]);
var ChoiceView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-3921170f"), n = n(), popScopeId(), n);
const _hoisted_1$7 = { class: "btn-group" };
const _hoisted_2$6 = ["data-bs-target"];
const _hoisted_3$5 = ["data-bs-target"];
const _hoisted_4$4 = { class: "ch-header" };
const _hoisted_5$3 = {
  key: 0,
  class: "ch-options"
};
const _hoisted_6$2 = { class: "ch-style" };
const _hoisted_7$2 = { class: "form-floating" };
const _hoisted_8$2 = ["value"];
const _hoisted_9$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("label", null, "Style", -1));
const _hoisted_10$1 = { class: "ch-grid-area" };
const _hoisted_11$1 = { class: "form-floating" };
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("label", null, "Col Span", -1));
const _hoisted_13$1 = { class: "form-floating" };
const _hoisted_14$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("label", null, "Row Span", -1));
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  props: {
    choiceId: { type: String, required: true },
    defaultStyle: { type: Object, default: DefaultChoiceStyle }
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const _state = reactive({
      collapsed: false
    });
    const modalId = genModalId(["edit", props.choiceId]);
    const choice = computed(() => store.getters["project/findElement"](props.choiceId));
    const options = computed(() => store.getters["project/findChildrenIds"](props.choiceId));
    const styles = computed(() => ["default", "Style 1", "Style 2"]);
    const { M_name, M_text, style: { M_name: M_style_name, M_colSpan, M_rowSpan } } = updatePropsFor(store, {
      type: Choice,
      prop: choice,
      objectId: () => props.choiceId
    });
    const containerStyle = computed(() => {
      const EMPTY2 = always({});
      const style = mergeWith((a, b) => b || a, props.defaultStyle, choice.value.style);
      console.log("Merged Style", style, props.defaultStyle, choice.value.style);
      return mergeAll([
        lib.match(style.colSpan).with(void 0, EMPTY2).with(lib.__.number, (colSpan) => {
          return { "grid-column": `span ${colSpan}` };
        }).with(lib.__.string, match(/^\d+$/), (colSpan) => {
          return { "grid-column": `span ${colSpan}` };
        }).otherwise(EMPTY2),
        lib.match(style.rowSpan).with(void 0, EMPTY2).with(lib.__.number, (colSpan) => {
          return { "grid-row": `span ${colSpan}` };
        }).with(lib.__.string, match(/^\d+$/), (colSpan) => {
          return { "grid-row": `span ${colSpan}` };
        }).otherwise(EMPTY2)
      ]);
    });
    function toggleOptions() {
      _state.collapsed = !_state.collapsed;
    }
    function createOption() {
      store.dispatch("project/insertElement", {
        elementType: ElementType.Option,
        parentId: props.choiceId,
        build: (optionId, counter) => new Option(optionId, `Option ${counter}`, "Bar")
      });
    }
    async function deleteChoice() {
      store.commit("project/removeObject", props.choiceId);
    }
    function moveChoice(relative) {
      store.commit("project/moveObject", {
        objectId: props.choiceId,
        relative
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "choice",
        style: normalizeStyle(unref(containerStyle))
      }, [
        createVNode(ElementToolbar, {
          class: "ch-actions",
          element: unref(choice),
          collapsed: unref(_state).collapsed,
          arrows: "horizontal",
          onToggle: toggleOptions,
          onMove: moveChoice
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$7, [
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-primary",
                onClick: createOption
              }, [
                createVNode(_sfc_main$k, { name: "plus-circle" })
              ]),
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-primary",
                "data-bs-toggle": "modal",
                "data-bs-target": unref(modalId)("content", true)
              }, [
                createVNode(_sfc_main$k, { name: "playlist-edit" })
              ], 8, _hoisted_2$6),
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-primary",
                "data-bs-toggle": "modal",
                "data-bs-target": unref(modalId)("style", true)
              }, [
                createVNode(_sfc_main$k, { name: "palette-swatch" })
              ], 8, _hoisted_3$5),
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-danger",
                onClick: deleteChoice
              }, [
                createVNode(_sfc_main$k, { name: "delete-outline" })
              ])
            ])
          ]),
          _: 1
        }, 8, ["element", "collapsed"]),
        createBaseVNode("div", _hoisted_4$4, [
          withDirectives(createBaseVNode("input", {
            class: "form-control ch-title object-id",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_name) ? M_name.value = $event : null)
          }, null, 512), [
            [vModelText, unref(M_name)]
          ])
        ]),
        !unref(_state).collapsed && unref(options) && unref(options).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(options), (optionId) => {
            return openBlock(), createBlock(OptionView, { optionId }, null, 8, ["optionId"]);
          }), 256))
        ])) : createCommentVNode("", true),
        createVNode(_sfc_main$m, {
          "modal-id": unref(modalId)("style"),
          title: "Style Editor"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_6$2, [
              createBaseVNode("div", _hoisted_7$2, [
                withDirectives(createBaseVNode("select", {
                  class: "form-select ch-style-select",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_style_name) ? M_style_name.value = $event : null)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(styles), (style) => {
                    return openBlock(), createElementBlock("option", { value: style }, toDisplayString(style), 9, _hoisted_8$2);
                  }), 256))
                ], 512), [
                  [vModelSelect, unref(M_style_name)]
                ]),
                _hoisted_9$2
              ]),
              createBaseVNode("div", _hoisted_10$1, [
                createBaseVNode("div", _hoisted_11$1, [
                  withDirectives(createBaseVNode("input", {
                    class: "form-control sec-grid-cols",
                    type: "text",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(M_colSpan) ? M_colSpan.value = $event : null)
                  }, null, 512), [
                    [vModelText, unref(M_colSpan)]
                  ]),
                  _hoisted_12$1
                ]),
                createBaseVNode("div", _hoisted_13$1, [
                  withDirectives(createBaseVNode("input", {
                    class: "form-control sec-grid-rows",
                    type: "text",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(M_rowSpan) ? M_rowSpan.value = $event : null)
                  }, null, 512), [
                    [vModelText, unref(M_rowSpan)]
                  ]),
                  _hoisted_14$1
                ])
              ])
            ])
          ]),
          _: 1
        }, 8, ["modal-id"]),
        createVNode(_sfc_main$m, {
          title: "Content Editor",
          "modal-id": unref(modalId)("content")
        }, {
          default: withCtx(() => [
            createVNode(ContentView, {
              "content-prop": "content",
              "object-id": props.choiceId,
              name: "Choice Content"
            }, null, 8, ["object-id"])
          ]),
          _: 1
        }, 8, ["modal-id"])
      ], 4);
    };
  }
});
var ChoiceView = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-3921170f"]]);
class Condition {
  constructor(test2, state) {
    this.test = test2;
    this.state = state;
  }
}
const EMPTY = always({});
function computeGridStyle(style) {
  return mergeAll([
    computeGridTemplate(style.gridCols, "grid-template-columns"),
    computeGridTemplate(style.gridRows, "grid-template-rows"),
    computeGridFlow(style.gridFlow)
  ]);
}
function computeGridTemplate(value, property) {
  return lib.match(value).with(void 0, EMPTY).with(__$1.string, test(/^\d+$/), (numCols) => {
    return { [property]: `repeat(${numCols}, minmax(max-content, 1fr))` };
  }).with(__$1.string, test(/^repeat\(.+\)$/), (repeatExpr) => {
    return { [property]: repeatExpr };
  }).otherwise(EMPTY);
}
function computeGridFlow(value) {
  return lib.match(value).with(void 0, EMPTY).with(__$1.string, match(/^row|column$/), (flow) => {
    return { "grid-auto-flow": flow };
  }).otherwise(EMPTY);
}
function computeGridSpan(value, property) {
  return lib.match(value).with(void 0, EMPTY).with(__$1.number, (value2) => {
    return { [property]: value2 };
  }).with(__$1.string, match(/^\d+$/), (value2) => {
    return { [property]: Number.parseInt(value2) };
  }).otherwise(EMPTY);
}
function computeDefaultGridSpans(containerStyle) {
  return mergeAll([
    computeGridSpan(containerStyle.gridDefaultColSpan, "colSpan"),
    computeGridSpan(containerStyle.gridDefaultRowSpan, "rowSpan")
  ]);
}
var SectionView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-3a5e448f"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "section" };
const _hoisted_2$5 = { class: "btn-group me-2" };
const _hoisted_3$4 = /* @__PURE__ */ createTextVNode(" Choice ");
const _hoisted_4$3 = { class: "btn-group me-2" };
const _hoisted_5$2 = ["data-bs-target"];
const _hoisted_6$1 = /* @__PURE__ */ createTextVNode(" Requirements ");
const _hoisted_7$1 = ["data-bs-target"];
const _hoisted_8$1 = /* @__PURE__ */ createTextVNode(" Style ");
const _hoisted_9$1 = { class: "btn-group" };
const _hoisted_10 = {
  key: 0,
  class: "sec-header"
};
const _hoisted_11 = { class: "sec-text" };
const _hoisted_12 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "sec-meta" }, [
  /* @__PURE__ */ createBaseVNode("b", null, "Choices"),
  /* @__PURE__ */ createBaseVNode("label", null, "Maximum Selected"),
  /* @__PURE__ */ createBaseVNode("input", {
    class: "form-control",
    type: "number"
  })
], -1));
const _hoisted_13 = { class: "sec-style" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("b", null, "Section Style", -1));
const _hoisted_15 = ["value"];
const _hoisted_16 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("b", null, "Choices Style (default)", -1));
const _hoisted_17 = ["value"];
const _hoisted_18 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("b", null, "Grid", -1));
const _hoisted_19 = { class: "sec-grid" };
const _hoisted_20 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Direction", -1));
const _hoisted_21 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("option", null, "row", -1));
const _hoisted_22 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("option", null, "column", -1));
const _hoisted_23 = [
  _hoisted_21,
  _hoisted_22
];
const _hoisted_24 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Columns", -1));
const _hoisted_25 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Rows", -1));
const _hoisted_26 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Default Width", -1));
const _hoisted_27 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Default Height", -1));
const _hoisted_28 = { class: "sec-conditions" };
const _hoisted_29 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("b", null, "Conditions", -1));
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  props: {
    sectionId: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const _state = reactive({
      collapsed: false
    });
    const modalId = genModalId(["edit", props.sectionId]);
    const section = computed(() => store.getters["project/findElement"](props.sectionId));
    const choices = computed(() => store.getters["project/findChildrenIds"](props.sectionId));
    const styles = computed(() => ["default", "Style 1", "Style 2"]);
    const {
      M_name,
      style: {
        M_name: M_style_name,
        M_children: M_style_children,
        M_gridCols,
        M_gridRows,
        M_gridFlow,
        M_gridDefaultColSpan,
        M_gridDefaultRowSpan
      }
    } = updatePropsFor(store, {
      type: Section,
      prop: section,
      objectId: () => props.sectionId
    });
    const choicesContainerStyle = computed(() => {
      return computeGridStyle(section.value.style);
    });
    const defaultChoiceStyle = computed(() => {
      return mergeAll([
        DefaultChoiceStyle,
        computeDefaultGridSpans(section.value.style)
      ]);
    });
    function toggleSection() {
      _state.collapsed = !_state.collapsed;
    }
    function moveSection(relative) {
      store.commit("project/moveObject", {
        objectId: props.sectionId,
        relative
      });
    }
    function createChoice() {
      store.dispatch("project/insertElement", {
        elementType: ElementType.Choice,
        parentId: props.sectionId,
        build: (choiceId, counter) => new Choice(choiceId, `Choice ${counter}`, "Bar")
      });
    }
    function addCondition() {
      store.commit("project/addCondition", {
        objectId: props.sectionId,
        data: new Condition("always", "enabled")
      });
    }
    async function deleteSection() {
      store.commit("project/removeObject", props.sectionId);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("section", _hoisted_1$6, [
          createVNode(ElementToolbar, {
            class: "sec-actions",
            element: unref(section),
            collapsed: unref(_state).collapsed,
            arrows: "vertical",
            onToggle: toggleSection,
            onMove: moveSection
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2$5, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-primary",
                  onClick: createChoice
                }, [
                  createVNode(_sfc_main$k, { name: "plus-circle" }),
                  _hoisted_3$4
                ])
              ]),
              createBaseVNode("div", _hoisted_4$3, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-primary",
                  "data-bs-toggle": "modal",
                  "data-bs-target": unref(modalId)("cond", true)
                }, [
                  createVNode(_sfc_main$k, { name: "key" }),
                  _hoisted_6$1
                ], 8, _hoisted_5$2),
                createBaseVNode("button", {
                  type: "button",
                  class: "btn btn-sm btn-outline-primary",
                  "data-bs-toggle": "modal",
                  "data-bs-target": unref(modalId)("style", true)
                }, [
                  createVNode(_sfc_main$k, { name: "palette-swatch" }),
                  _hoisted_8$1
                ], 8, _hoisted_7$1)
              ]),
              createBaseVNode("div", _hoisted_9$1, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-danger wide",
                  onClick: deleteSection
                }, [
                  createVNode(_sfc_main$k, { name: "delete-outline" })
                ])
              ])
            ]),
            _: 1
          }, 8, ["element", "collapsed"]),
          !unref(_state).collapsed ? (openBlock(), createElementBlock("div", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, [
              withDirectives(createBaseVNode("input", {
                class: "form-control sec-title",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_name) ? M_name.value = $event : null)
              }, null, 512), [
                [vModelText, unref(M_name)]
              ]),
              createVNode(ContentView, {
                "object-id": props.sectionId,
                "content-prop": "headerContent",
                name: "Section Header"
              }, null, 8, ["object-id"]),
              createVNode(ContentView, {
                "object-id": props.sectionId,
                "content-prop": "footerContent",
                name: "Section Footer"
              }, null, 8, ["object-id"])
            ]),
            _hoisted_12
          ])) : createCommentVNode("", true),
          !unref(_state).collapsed ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "sec-choices",
            style: normalizeStyle(unref(choicesContainerStyle))
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(choices), (choiceId) => {
              return openBlock(), createBlock(ChoiceView, {
                choiceId,
                defaultStyle: unref(defaultChoiceStyle)
              }, null, 8, ["choiceId", "defaultStyle"]);
            }), 256))
          ], 4)) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$m, {
          modalId: unref(modalId)("style"),
          title: "Style Editor"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_13, [
              _hoisted_14,
              withDirectives(createBaseVNode("select", {
                class: "form-select sec-style-select",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_style_name) ? M_style_name.value = $event : null)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(styles), (style) => {
                  return openBlock(), createElementBlock("option", { value: style }, toDisplayString(style), 9, _hoisted_15);
                }), 256))
              ], 512), [
                [vModelSelect, unref(M_style_name)]
              ]),
              _hoisted_16,
              withDirectives(createBaseVNode("select", {
                class: "form-select sec-style-select",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(M_style_children) ? M_style_children.value = $event : null)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(styles), (style) => {
                  return openBlock(), createElementBlock("option", { value: style }, toDisplayString(style), 9, _hoisted_17);
                }), 256))
              ], 512), [
                [vModelSelect, unref(M_style_children)]
              ]),
              _hoisted_18,
              createBaseVNode("div", _hoisted_19, [
                _hoisted_20,
                withDirectives(createBaseVNode("select", {
                  class: "form-select sec-style-dir span3",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(M_gridFlow) ? M_gridFlow.value = $event : null)
                }, _hoisted_23, 512), [
                  [vModelSelect, unref(M_gridFlow)]
                ]),
                _hoisted_24,
                withDirectives(createBaseVNode("input", {
                  class: "form-control sec-grid-cols",
                  type: "text",
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(M_gridCols) ? M_gridCols.value = $event : null)
                }, null, 512), [
                  [vModelText, unref(M_gridCols)]
                ]),
                _hoisted_25,
                withDirectives(createBaseVNode("input", {
                  class: "form-control sec-grid-rows",
                  type: "text",
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => isRef(M_gridRows) ? M_gridRows.value = $event : null)
                }, null, 512), [
                  [vModelText, unref(M_gridRows)]
                ]),
                _hoisted_26,
                withDirectives(createBaseVNode("input", {
                  class: "form-control sec-grid-cols",
                  type: "text",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => isRef(M_gridDefaultColSpan) ? M_gridDefaultColSpan.value = $event : null)
                }, null, 512), [
                  [vModelText, unref(M_gridDefaultColSpan)]
                ]),
                _hoisted_27,
                withDirectives(createBaseVNode("input", {
                  class: "form-control sec-grid-rows",
                  type: "text",
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(M_gridDefaultRowSpan) ? M_gridDefaultRowSpan.value = $event : null)
                }, null, 512), [
                  [vModelText, unref(M_gridDefaultRowSpan)]
                ])
              ])
            ])
          ]),
          _: 1
        }, 8, ["modalId"]),
        createVNode(_sfc_main$m, {
          modalId: unref(modalId)("cond"),
          title: "Requirements"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_28, [
              _hoisted_29,
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-primary",
                onClick: addCondition
              }, [
                createVNode(_sfc_main$k, { name: "key-plus" })
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(section).conditions, (cond) => {
                return openBlock(), createElementBlock("div", null, "IF " + toDisplayString(cond.test) + " THEN " + toDisplayString(cond.state), 1);
              }), 256))
            ])
          ]),
          _: 1
        }, 8, ["modalId"])
      ], 64);
    };
  }
});
var SectionView = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-3a5e448f"]]);
var SectionsTab_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-56450fb2"), n = n(), popScopeId(), n);
const _hoisted_1$5 = { key: 0 };
const _hoisted_2$4 = { key: 1 };
const _hoisted_3$3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "No Sections", -1));
const _hoisted_4$2 = [
  _hoisted_3$3
];
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String,
    pageId: String
  },
  setup(__props) {
    const props = __props;
    useRoute();
    const store = useStore(editorStoreKey);
    const page = computed(() => store.getters["project/findElement"](props.pageId));
    const findSections = computed(() => store.getters["project/findChildrenIds"](props.pageId));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("h1", null, toDisplayString(unref(page).name) + " - Sections", 1),
        unref(findSections) && unref(findSections).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findSections), (sectionId) => {
            return openBlock(), createBlock(SectionView, { sectionId }, null, 8, ["sectionId"]);
          }), 256))
        ])) : createCommentVNode("", true),
        !unref(findSections) || unref(findSections).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2$4, _hoisted_4$2)) : createCommentVNode("", true)
      ]);
    };
  }
});
var SectionsTab = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-56450fb2"]]);
const _hoisted_1$4 = { class: "btn-toolbar" };
const _hoisted_2$3 = { class: "btn-group" };
const _hoisted_3$2 = /* @__PURE__ */ createTextVNode(" New Section ");
const _hoisted_4$1 = /* @__PURE__ */ createTextVNode(" New Score ");
const _hoisted_5$1 = /* @__PURE__ */ createTextVNode(" New Style ");
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String,
    pageId: String
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    function createSection() {
      if (!props.pageId)
        return;
      store.dispatch("project/insertElement", {
        elementType: ElementType.Section,
        parentId: props.pageId,
        build: (sectionId, counter) => new Section(sectionId, `Section ${counter}`)
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$3, [
          createBaseVNode("button", {
            class: "btn btn-primary",
            onClick: createSection
          }, [
            createVNode(_sfc_main$k, { name: "layers-plus" }),
            _hoisted_3$2
          ]),
          createBaseVNode("button", {
            class: "btn btn-primary",
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.createScore && _ctx.createScore(...args))
          }, [
            createVNode(_sfc_main$k, { name: "numeric-9-plus-box" }),
            _hoisted_4$1
          ]),
          createBaseVNode("button", {
            class: "btn btn-primary",
            onClick: _cache[1] || (_cache[1] = (...args) => _ctx.screateStyle && _ctx.screateStyle(...args))
          }, [
            createVNode(_sfc_main$k, { name: "palette-swatch-outline" }),
            _hoisted_5$1
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$3 = /* @__PURE__ */ createBaseVNode("b", null, "Settings", -1);
const _hoisted_2$2 = [
  _hoisted_1$3
];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, _hoisted_2$2);
    };
  }
});
const _hoisted_1$2 = { class: "content-title" };
const _hoisted_2$1 = ["src"];
const _hoisted_3$1 = ["innerHTML"];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  props: {
    objectId: { type: String, required: true },
    contentProp: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const content = computed(() => {
      const element = store.getters["project/findElement"](props.objectId);
      return view(lensProp(props.contentProp), element);
    });
    const contentHtml = computed(() => {
      return marked.parse(content.value.body);
    });
    function resolveMedia(image) {
      return "#";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("span", _hoisted_1$2, toDisplayString(unref(content).title), 1),
        unref(content).image ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: resolveMedia(unref(content).image)
        }, null, 8, _hoisted_2$1)) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: "content-body",
          innerHTML: unref(contentHtml)
        }, null, 8, _hoisted_3$1)
      ]);
    };
  }
});
var ContentDisplay_vue_vue_type_style_index_0_scoped_true_lang = "";
const _sfc_main$3 = defineComponent({
  name: "ContentDisplay",
  components: { SimpleContentDisplay: _sfc_main$4 },
  props: {
    objectId: { type: String, required: true },
    contentProp: { type: String, required: true }
  },
  setup(props) {
    const store = useStore(editorStoreKey);
    const { objectId, contentProp } = toRefs(props);
    const contentType = computed(() => {
      const element = store.getters["project/findElement"](objectId.value);
      const content = view(lensProp(contentProp.value), element);
      return (content == null ? void 0 : content.type) || ContentType.Empty;
    });
    return {
      contentType
    };
  },
  render() {
    return lib.match(this.contentType).with(ContentType.Empty, () => null).with(ContentType.Simple, () => h(_sfc_main$4, __spreadValues({ class: "editor-view" }, this.$props))).exhaustive();
  }
});
var ContentDisplay = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-7d74615c"]]);
const _hoisted_1$1 = { class: "top-page-display" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    pageId: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    computed(() => store.getters["project/findElement"](props.pageId));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(ContentDisplay, {
          "object-id": props.pageId,
          "content-prop": "headerContent"
        }, null, 8, ["object-id"]),
        createVNode(ContentDisplay, {
          "object-id": props.pageId,
          "content-prop": "footerContent"
        }, null, 8, ["object-id"])
      ]);
    };
  }
});
var Viewer_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = {
  key: 0,
  id: "viewer-main"
};
const _hoisted_2 = { class: "navbar navbar-expand-lg navbar-light bg-light" };
const _hoisted_3 = { class: "container-fluid" };
const _hoisted_4 = { class: "navbar-nav me-auto mb-2 mb-lg-0" };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = /* @__PURE__ */ createStaticVNode('<div class="mb-2 mb-lg-0"><span class="points-display"><span class="points-entry">Shard Points: <span class="points-value">100 SP</span></span><span class="points-entry">Character Points: <span class="points-value">100 CP</span></span></span></div>', 1);
const _hoisted_7 = {
  key: 1,
  id: "viewer-loader"
};
const _hoisted_8 = /* @__PURE__ */ createBaseVNode("div", { class: "loader" }, [
  /* @__PURE__ */ createBaseVNode("div", {
    class: "spinner-border",
    style: { "width": "5rem", "height": "5rem" },
    role: "status"
  }, [
    /* @__PURE__ */ createBaseVNode("span", { class: "visually-hidden" }, "Loading...")
  ]),
  /* @__PURE__ */ createBaseVNode("p", null, "Loading Project ...")
], -1);
const _hoisted_9 = [
  _hoisted_8
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String
  },
  setup(__props) {
    const props = __props;
    const _state = reactive({
      loaded: false,
      topPageId: void 0
    });
    const store = useStore(editorStoreKey);
    computed(() => store.state.project);
    const topPageIds = computed(() => store.getters["project/findChildrenIds"]("__pages__"));
    function findPage(pageId) {
      return store.getters["project/findElement"](pageId);
    }
    function showPage(pageId) {
      _state.topPageId = pageId;
    }
    watch(() => props.projectId, (newValue) => {
      if (newValue)
        reloadProject(newValue);
    });
    onMounted(async () => {
      _state.loaded = false;
      if (props.projectId) {
        await Promise.all([
          reloadProject(props.projectId),
          sleep(200)
        ]);
        _state.loaded = true;
      }
    });
    onUnmounted(() => {
      store.commit("project/unloadProject");
    });
    return (_ctx, _cache) => {
      return unref(_state).loaded ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("nav", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(topPageIds), (pageId) => {
                return openBlock(), createElementBlock("a", {
                  class: normalizeClass(["nav-link btn btn-link", { active: unref(_state).topPageId === pageId }]),
                  onClick: withModifiers(($event) => showPage(pageId), ["prevent"])
                }, toDisplayString(findPage(pageId).name), 11, _hoisted_5);
              }), 256))
            ]),
            _hoisted_6
          ])
        ]),
        unref(_state).topPageId ? (openBlock(), createBlock(_sfc_main$2, {
          key: 0,
          "page-id": unref(_state).topPageId
        }, null, 8, ["page-id"])) : createCommentVNode("", true)
      ])) : (openBlock(), createElementBlock("div", _hoisted_7, _hoisted_9));
    };
  }
});
const routes = [
  { name: "home", path: "/", component: Home },
  {
    name: "edit",
    path: "/edit/:projectId",
    component: _sfc_main$j,
    props: true,
    children: [
      { name: "edit_home", path: "", components: { default: HomeTab } },
      {
        name: "edit_pages",
        path: "pages",
        components: { default: PagesTab, tools: _sfc_main$c },
        props: true
      },
      {
        name: "edit_section",
        path: "pages/:pageId/sections",
        components: { default: SectionsTab, tools: _sfc_main$6 },
        props: true
      },
      {
        name: "edit_settings",
        path: "settings",
        component: _sfc_main$5,
        props: true
      }
    ]
  },
  { name: "view", path: "/view/:projectId", component: _sfc_main$1, props: true }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createBlock(_component_router_view);
    };
  }
});
var common = "";
var colors = "";
var materialdesignicons = "";
var bootstrap = "";
const app = createApp(_sfc_main);
app.use(homeStore, homeStoreKey);
app.use(editorStore, editorStoreKey);
app.use(router);
app.mount("#app");