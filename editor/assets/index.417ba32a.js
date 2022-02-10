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
import { l as localforage, V as VuexPersistence, c as clone, a as createStore, b as createLogger, o as over, d as lensPath, m as mergeRight, _ as __, H as Hashids, e as omit, f as defineComponent, g as computed, h as createElementBlock, i as createBaseVNode, F as Fragment, r as renderList, u as unref, p as pushScopeId, j as popScopeId, k as useStore, n as resolveComponent, q as openBlock, t as toDisplayString, s as createVNode, w as withCtx, v as createTextVNode, x as normalizeClass, y as watch, z as onMounted, A as onUnmounted, B as createCommentVNode, C as useRouter, D as view, E as withDirectives, G as vModelText, I as isRef, J as always, K as mergeWith, L as mergeAll, M as lib, N as match, O as vModelSelect, P as createBlock, Q as normalizeStyle, R as renderSlot, S as reactive, T as vShow, U as useRoute, W as createRouter, X as createWebHashHistory, Y as createApp } from "./vendor.07cc82dc.js";
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
function randomIdentifier(len) {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (v) => v.toString(32).padStart(2, "0")).join("");
}
const database$1 = localforage.exports.createInstance({
  name: "home",
  storeName: "data",
  driver: localforage.exports.INDEXEDDB,
  description: "Projects Storage"
});
const persistence$1 = new VuexPersistence({
  key: "home",
  storage: database$1,
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
      const projectId = randomIdentifier(4);
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
function removeFromParent(state, objId) {
  const parentId = state.parents[objId];
  if (parentId) {
    const idx = state.children[parentId].indexOf(objId);
    if (idx !== -1) {
      state.children[parentId].splice(idx, 1);
    }
  }
}
function removeParent(state, objId) {
  delete state.parents[objId];
}
function removeChildren(state, objId) {
  const children = state.children[objId];
  if (children) {
    children.forEach((childId) => {
      removeChildren(state, childId);
      removeParent(state, childId);
      removeObject(state, childId);
    });
  }
  delete state.children[objId];
}
function removeObject(state, objId) {
  delete state.objects[objId];
}
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
      updateObject(state, { objectId, path, data }) {
        state.objects[objectId] = over(lensPath(path || []), mergeRight(__, data), state.objects[objectId]);
      },
      removeChildren(state, objectId) {
        removeChildren(state, objectId);
      },
      removeObject(state, objectId) {
        removeFromParent(state, objectId);
        removeParent(state, objectId);
        removeChildren(state, objectId);
        removeObject(state, objectId);
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
        const HID = new Hashids(state.key, 5);
        commit("genNextId", elementType);
        const counter = state.genCounters[elementType];
        const objectId = `${elementType}_${HID.encode(counter)}`;
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
const database = localforage.exports.createInstance({
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
  storage: database,
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
    project: ProjectModule(database)
  },
  state() {
    return new EditorData();
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
const _withScopeId$6 = (n) => (pushScopeId("data-v-669926e0"), n = n(), popScopeId(), n);
const _hoisted_1$9 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("h1", null, "Moirai", -1));
const _hoisted_2$9 = { class: "projects" };
const _hoisted_3$8 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("div", { class: "header" }, [
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-name" }, "Project"),
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-key" }, "Key"),
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-actions" }, "Actions")
], -1));
const _hoisted_4$8 = { class: "project" };
const _hoisted_5$7 = { class: "proj-name" };
const _hoisted_6$6 = { class: "proj-key" };
const _hoisted_7$5 = { class: "proj-actions btn-group" };
const _hoisted_8$5 = /* @__PURE__ */ createTextVNode("Edit ");
const _hoisted_9$4 = /* @__PURE__ */ createTextVNode("View ");
const _hoisted_10$4 = ["onClick"];
const _hoisted_11$4 = ["onClick"];
const _hoisted_12$4 = { class: "tools" };
const _hoisted_13$4 = { class: "btn-group" };
const _hoisted_14$4 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createBaseVNode("a", { id: "export-link" }, null, -1));
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const store = useStore(homeStoreKey);
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
    function exportProject(projectId) {
      const jsonData = localStorage.getItem(`projects/${projectId}`);
      if (jsonData) {
        const projectData = JSON.parse(jsonData);
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
        _hoisted_1$9,
        createBaseVNode("div", _hoisted_2$9, [
          _hoisted_3$8,
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(projects), (project) => {
            return openBlock(), createElementBlock("div", _hoisted_4$8, [
              createBaseVNode("span", _hoisted_5$7, toDisplayString(project.name), 1),
              createBaseVNode("span", _hoisted_6$6, toDisplayString(project.key), 1),
              createBaseVNode("div", _hoisted_7$5, [
                createVNode(_component_router_link, {
                  class: "btn btn-outline-success",
                  to: { name: "edit", params: { projectId: project.key } }
                }, {
                  default: withCtx(() => [
                    _hoisted_8$5
                  ]),
                  _: 2
                }, 1032, ["to"]),
                createVNode(_component_router_link, {
                  class: "btn btn-outline-success",
                  to: { name: "view", params: { projectId: project.key } }
                }, {
                  default: withCtx(() => [
                    _hoisted_9$4
                  ]),
                  _: 2
                }, 1032, ["to"]),
                createBaseVNode("button", {
                  class: "btn btn-outline-primary",
                  onClick: ($event) => exportProject(project.key)
                }, "Export", 8, _hoisted_10$4),
                createBaseVNode("button", {
                  class: "btn btn-outline-danger",
                  onClick: ($event) => removeProject(project.key)
                }, "Remove", 8, _hoisted_11$4)
              ])
            ]);
          }), 256)),
          createBaseVNode("div", _hoisted_12$4, [
            createBaseVNode("div", _hoisted_13$4, [
              createBaseVNode("button", {
                onClick: createProject,
                class: "btn btn-primary"
              }, "Create"),
              createBaseVNode("button", {
                onClick: _cache[0] || (_cache[0] = (...args) => _ctx.importProject && _ctx.importProject(...args)),
                class: "btn btn-primary"
              }, "Import")
            ])
          ])
        ]),
        _hoisted_14$4
      ], 64);
    };
  }
});
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-669926e0"]]);
function persist(props) {
  return Reflect.metadata("persist:props", props);
}
function inner(props) {
  return Reflect.metadata("persist:inner", props);
}
function defaults(props) {
  return Reflect.metadata("persist:defaults", props);
}
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
let PageStyle = class {
  constructor() {
    __publicField(this, "name");
    __publicField(this, "children");
  }
};
PageStyle = __decorateClass$1([
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
SectionStyle = __decorateClass$1([
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
ChoiceStyle = __decorateClass$1([
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
OptionStyle = __decorateClass$1([
  persist(["name"])
], OptionStyle);
const DefaultOptionStyle = {
  name: "default"
};
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
  constructor(id, title, headerText = "", footerText = "", conditions = [], style = new PageStyle()) {
    __publicField(this, "type", ElementType.Page);
    this.id = id;
    this.title = title;
    this.headerText = headerText;
    this.footerText = footerText;
    this.conditions = conditions;
    this.style = style;
  }
};
Page = __decorateClass([
  persist(["id", "title", "headerText", "footerText", "conditions", "style"]),
  inner({ "style": PageStyle }),
  defaults({ "style": DefaultPageStyle })
], Page);
let Section = class {
  constructor(id, title, headerText = "", footerText = "", conditions = [], style = new SectionStyle()) {
    __publicField(this, "type", ElementType.Section);
    this.id = id;
    this.title = title;
    this.headerText = headerText;
    this.footerText = footerText;
    this.conditions = conditions;
    this.style = style;
  }
};
Section = __decorateClass([
  persist(["id", "title", "headerText", "footerText", "conditions", "style"]),
  inner({ "style": SectionStyle }),
  defaults({ "style": DefaultSectionStyle })
], Section);
let Choice = class {
  constructor(id, title, text, scores = [], conditions = [], style = new ChoiceStyle()) {
    __publicField(this, "type", ElementType.Choice);
    this.id = id;
    this.title = title;
    this.text = text;
    this.scores = scores;
    this.conditions = conditions;
    this.style = style;
  }
};
Choice = __decorateClass([
  persist(["id", "title", "text", "scores", "conditions", "style"]),
  inner({ "style": ChoiceStyle }),
  defaults({ "style": DefaultChoiceStyle })
], Choice);
let Option = class {
  constructor(id, title, text, scores = [], conditions = [], style = new OptionStyle()) {
    __publicField(this, "type", ElementType.Option);
    this.id = id;
    this.title = title;
    this.text = text;
    this.scores = scores;
    this.conditions = conditions;
    this.style = style;
  }
};
Option = __decorateClass([
  persist(["id", "title", "text", "scores", "conditions", "style"]),
  inner({ "style": OptionStyle }),
  defaults({ "style": DefaultOptionStyle })
], Option);
const _sfc_main$b = {
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
var Editor_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$8 = {
  key: 0,
  id: "editor-main"
};
const _hoisted_2$8 = { class: "toolbar" };
const _hoisted_3$7 = { class: "nav nav-pills nav-fill editor-tabs" };
const _hoisted_4$7 = /* @__PURE__ */ createTextVNode(" Home ");
const _hoisted_5$6 = /* @__PURE__ */ createTextVNode(" Pages ");
const _hoisted_6$5 = { class: "nav-item dropdown" };
const _hoisted_7$4 = /* @__PURE__ */ createTextVNode(" Sections ");
const _hoisted_8$4 = {
  class: "dropdown-menu",
  "aria-labelledby": "dropdownMenuLink"
};
const _hoisted_9$3 = { class: "object-id" };
const _hoisted_10$3 = /* @__PURE__ */ createTextVNode(" Settings ");
const _hoisted_11$3 = { class: "editor-actions" };
const _hoisted_12$3 = { class: "btn-toolbar" };
const _hoisted_13$3 = { class: "btn-group" };
const _hoisted_14$3 = /* @__PURE__ */ createTextVNode(" New Page ");
const _hoisted_15$3 = /* @__PURE__ */ createTextVNode(" New Section ");
const _hoisted_16$3 = /* @__PURE__ */ createTextVNode(" New Score ");
const _hoisted_17$2 = /* @__PURE__ */ createTextVNode(" New Style ");
const _hoisted_18$1 = { id: "editor-current" };
const _hoisted_19$1 = {
  key: 1,
  id: "editor-loader"
};
const _hoisted_20$1 = /* @__PURE__ */ createBaseVNode("div", { class: "loader" }, [
  /* @__PURE__ */ createBaseVNode("div", {
    class: "spinner-border",
    style: { "width": "5rem", "height": "5rem" },
    role: "status"
  }, [
    /* @__PURE__ */ createBaseVNode("span", { class: "visually-hidden" }, "Loading...")
  ]),
  /* @__PURE__ */ createBaseVNode("p", null, "Loading Project ...")
], -1);
const _hoisted_21$1 = [
  _hoisted_20$1
];
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String,
    pageId: String
  },
  setup(__props) {
    const props = __props;
    const $router = useRouter();
    const store = useStore(editorStoreKey);
    const project = computed(() => store.state.project);
    const findPageIds = computed(() => store.getters["project/findChildrenIds"]("__pages__"));
    function findPage(pageId) {
      return store.getters["project/findElement"](pageId);
    }
    function createPage() {
      store.dispatch("project/insertElement", {
        elementType: ElementType.Page,
        parentId: "__pages__",
        build: (pageId, counter) => new Page(pageId, `Page ${counter}`)
      });
    }
    function createSection() {
      if (!props.pageId)
        return;
      store.dispatch("project/insertElement", {
        elementType: ElementType.Section,
        parentId: props.pageId,
        build: (sectionId, counter) => new Section(sectionId, `Page ${counter}`)
      });
    }
    watch(() => props.projectId, (newValue) => {
      if (newValue)
        reloadProject(newValue);
    });
    async function reloadProject(projectId) {
      console.log(`Loading project ${projectId}`);
      const homeStore2 = useStore(homeStoreKey);
      const projectInfo = homeStore2.getters["findProject"](projectId);
      await store.dispatch("project/restoreProject", {
        projectId,
        projectInfo
      });
      await sleep(500);
    }
    onMounted(async () => {
      if (props.projectId)
        await reloadProject(props.projectId);
    });
    onUnmounted(() => {
      store.commit("project/unloadProject");
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock(Fragment, null, [
        unref(project).key ? (openBlock(), createElementBlock("div", _hoisted_1$8, [
          createBaseVNode("div", _hoisted_2$8, [
            createBaseVNode("nav", _hoisted_3$7, [
              createVNode(_component_router_link, {
                class: "nav-link",
                to: { name: "home" }
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$b, { name: "chevron-left" }),
                  _hoisted_4$7
                ]),
                _: 1
              }),
              createVNode(_component_router_link, {
                class: "nav-link",
                to: { name: "edit_pages", params: _ctx.$route.params },
                "active-class": "active"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$b, { name: "file-multiple" }),
                  _hoisted_5$6
                ]),
                _: 1
              }, 8, ["to"]),
              createBaseVNode("div", _hoisted_6$5, [
                createBaseVNode("a", {
                  class: normalizeClass(["nav-link", { disabled: !unref(findPageIds) || unref(findPageIds).length === 0 }, "dropdown-toggle"]),
                  href: "#",
                  role: "button",
                  id: "dropdownMenuLink",
                  "data-bs-toggle": "dropdown",
                  "aria-expanded": "false"
                }, [
                  createVNode(_sfc_main$b, { name: "layers-triple" }),
                  _hoisted_7$4
                ], 2),
                createBaseVNode("ul", _hoisted_8$4, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findPageIds), (pageId) => {
                    return openBlock(), createElementBlock("li", null, [
                      createVNode(_component_router_link, {
                        class: "dropdown-item",
                        to: { name: "edit_section", params: __spreadProps(__spreadValues({}, _ctx.$route.params), { pageId }) },
                        "active-class": "active"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(findPage(pageId).title) + " / ", 1),
                          createBaseVNode("span", _hoisted_9$3, toDisplayString(pageId), 1)
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
                  createVNode(_sfc_main$b, { name: "cog" }),
                  _hoisted_10$3
                ]),
                _: 1
              }, 8, ["to"])
            ]),
            createBaseVNode("div", _hoisted_11$3, [
              createBaseVNode("div", _hoisted_12$3, [
                createBaseVNode("div", _hoisted_13$3, [
                  createBaseVNode("button", {
                    class: "btn btn-primary",
                    onClick: createPage
                  }, [
                    createVNode(_sfc_main$b, { name: "file-plus" }),
                    _hoisted_14$3
                  ]),
                  createBaseVNode("button", {
                    class: normalizeClass(["btn btn-primary", { disabled: unref($router).currentRoute.value.name !== "edit_section" }]),
                    onClick: createSection
                  }, [
                    createVNode(_sfc_main$b, { name: "layers-plus" }),
                    _hoisted_15$3
                  ], 2),
                  createBaseVNode("button", {
                    class: "btn btn-primary",
                    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.createScore && _ctx.createScore(...args))
                  }, [
                    createVNode(_sfc_main$b, { name: "numeric-9-plus-box" }),
                    _hoisted_16$3
                  ]),
                  createBaseVNode("button", {
                    class: "btn btn-primary",
                    onClick: _cache[1] || (_cache[1] = (...args) => _ctx.screateStyle && _ctx.screateStyle(...args))
                  }, [
                    createVNode(_sfc_main$b, { name: "palette-swatch-outline" }),
                    _hoisted_17$2
                  ])
                ])
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_18$1, [
            createVNode(_component_router_view)
          ])
        ])) : createCommentVNode("", true),
        !unref(project).key ? (openBlock(), createElementBlock("div", _hoisted_19$1, _hoisted_21$1)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
function updatePropsFor(store, { type, prop, objectId }) {
  function computedPropFor(key, path = [], defaultValue = void 0) {
    return [`M_${key}`, computed({
      get: () => {
        const cur = view(lensPath([...path, key]), prop.value);
        return cur !== void 0 ? cur : defaultValue;
      },
      set: (value) => {
        let _objectId = objectId();
        if (!_objectId)
          return;
        store.commit("project/updateObject", {
          objectId: _objectId,
          path,
          data: { [key]: value }
        });
      }
    })];
  }
  function computedProps(type2, path = [], defaultValues = {}) {
    const propsToPersist = Reflect.getMetadata("persist:props", type2);
    const innerProps = Reflect.getMetadata("persist:inner", type2);
    const defaults2 = Reflect.getMetadata("persist:defaults", type2);
    return Object.fromEntries(propsToPersist.map((key) => {
      if (innerProps && key in innerProps) {
        return [key, computedProps(innerProps[key], [...path, key], clone(defaults2[key]))];
      } else {
        return computedPropFor(key, path, defaultValues[key]);
      }
    }));
  }
  return computedProps(type, []);
}
var OptionView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$5 = (n) => (pushScopeId("data-v-7766e74d"), n = n(), popScopeId(), n);
const _hoisted_1$7 = { class: "option" };
const _hoisted_2$7 = { class: "opt-header" };
const _hoisted_3$6 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("div", { class: "opt-conditions" }, null, -1));
const _hoisted_4$6 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createBaseVNode("div", { class: "opt-scores" }, null, -1));
const _hoisted_5$5 = { class: "opt-actions" };
const _hoisted_6$4 = { class: "opt-id" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  props: {
    optionId: String
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const option = computed(() => store.getters["project/findElement"](props.optionId));
    const { M_title, M_text } = updatePropsFor(store, {
      type: Option,
      prop: option,
      objectId: () => props.optionId
    });
    async function deleteOption() {
      store.commit("project/removeObject", props.optionId);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createBaseVNode("div", _hoisted_2$7, [
          withDirectives(createBaseVNode("input", {
            class: "form-control opt-title",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_title) ? M_title.value = $event : null)
          }, null, 512), [
            [vModelText, unref(M_title)]
          ]),
          _hoisted_3$6,
          _hoisted_4$6
        ]),
        createBaseVNode("div", _hoisted_5$5, [
          createBaseVNode("span", _hoisted_6$4, toDisplayString(unref(option).id), 1),
          createBaseVNode("button", {
            class: "btn btn-sm btn-outline-danger",
            onClick: deleteOption
          }, [
            createVNode(_sfc_main$b, { name: "delete-outline" })
          ])
        ]),
        withDirectives(createBaseVNode("textarea", {
          class: "form-control opt-text",
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_text) ? M_text.value = $event : null)
        }, null, 512), [
          [vModelText, unref(M_text)]
        ])
      ]);
    };
  }
});
var OptionView = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-7766e74d"]]);
var ChoiceView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$4 = (n) => (pushScopeId("data-v-010c0506"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "ch-header" };
const _hoisted_2$6 = {
  key: 0,
  class: "ch-conditions"
};
const _hoisted_3$5 = {
  key: 1,
  class: "ch-scores"
};
const _hoisted_4$5 = { class: "form-floating" };
const _hoisted_5$4 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("label", null, "Choice Text", -1));
const _hoisted_6$3 = { class: "ch-style" };
const _hoisted_7$3 = { class: "form-floating" };
const _hoisted_8$3 = ["value"];
const _hoisted_9$2 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("label", null, "Style", -1));
const _hoisted_10$2 = { class: "ch-grid-area" };
const _hoisted_11$2 = { class: "form-floating" };
const _hoisted_12$2 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("label", null, "Col Span", -1));
const _hoisted_13$2 = { class: "form-floating" };
const _hoisted_14$2 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createBaseVNode("label", null, "Row Span", -1));
const _hoisted_15$2 = {
  key: 0,
  class: "ch-options"
};
const _hoisted_16$2 = { class: "ch-actions" };
const _hoisted_17$1 = { class: "ch-id" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  props: {
    choiceId: String,
    defaultStyle: { type: Object, default: DefaultChoiceStyle }
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const choice = computed(() => store.getters["project/findElement"](props.choiceId));
    const options = computed(() => store.getters["project/findChildrenIds"](props.choiceId));
    const styles = computed(() => ["default", "Style 1", "Style 2"]);
    const { M_title, M_text, style: { M_name: M_style_name, M_colSpan, M_rowSpan } } = updatePropsFor(store, {
      type: Choice,
      prop: choice,
      objectId: () => props.choiceId
    });
    const containerStyle = computed(() => {
      const EMPTY = always({});
      const style = mergeWith((a, b) => b || a, props.defaultStyle, choice.value.style);
      console.log("Merged Style", style, props.defaultStyle, choice.value.style);
      return mergeAll([
        lib.match(style.colSpan).with(void 0, EMPTY).with(lib.__.number, (colSpan) => {
          return { "grid-column": `span ${colSpan}` };
        }).with(lib.__.string, match(/^\d+$/), (colSpan) => {
          return { "grid-column": `span ${colSpan}` };
        }).otherwise(EMPTY),
        lib.match(style.rowSpan).with(void 0, EMPTY).with(lib.__.number, (colSpan) => {
          return { "grid-row": `span ${colSpan}` };
        }).with(lib.__.string, match(/^\d+$/), (colSpan) => {
          return { "grid-row": `span ${colSpan}` };
        }).otherwise(EMPTY)
      ]);
    });
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
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "choice",
        style: normalizeStyle(unref(containerStyle))
      }, [
        createBaseVNode("div", _hoisted_1$6, [
          withDirectives(createBaseVNode("input", {
            class: "form-control ch-title",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_title) ? M_title.value = $event : null)
          }, null, 512), [
            [vModelText, unref(M_title)]
          ]),
          unref(choice).conditions ? (openBlock(), createElementBlock("div", _hoisted_2$6)) : createCommentVNode("", true),
          unref(choice).scores ? (openBlock(), createElementBlock("div", _hoisted_3$5)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$5, [
            withDirectives(createBaseVNode("textarea", {
              class: "form-control ch-text",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_text) ? M_text.value = $event : null)
            }, null, 512), [
              [vModelText, unref(M_text)]
            ]),
            _hoisted_5$4
          ])
        ]),
        createBaseVNode("div", _hoisted_6$3, [
          createBaseVNode("div", _hoisted_7$3, [
            withDirectives(createBaseVNode("select", {
              class: "form-select ch-style-select",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(M_style_name) ? M_style_name.value = $event : null)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(styles), (style) => {
                return openBlock(), createElementBlock("option", { value: style }, toDisplayString(style), 9, _hoisted_8$3);
              }), 256))
            ], 512), [
              [vModelSelect, unref(M_style_name)]
            ]),
            _hoisted_9$2
          ]),
          createBaseVNode("div", _hoisted_10$2, [
            createBaseVNode("div", _hoisted_11$2, [
              withDirectives(createBaseVNode("input", {
                class: "form-control sec-grid-cols",
                type: "text",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(M_colSpan) ? M_colSpan.value = $event : null)
              }, null, 512), [
                [vModelText, unref(M_colSpan)]
              ]),
              _hoisted_12$2
            ]),
            createBaseVNode("div", _hoisted_13$2, [
              withDirectives(createBaseVNode("input", {
                class: "form-control sec-grid-rows",
                type: "text",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(M_rowSpan) ? M_rowSpan.value = $event : null)
              }, null, 512), [
                [vModelText, unref(M_rowSpan)]
              ]),
              _hoisted_14$2
            ])
          ])
        ]),
        unref(options) && unref(options).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_15$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(options), (optionId) => {
            return openBlock(), createBlock(OptionView, { optionId }, null, 8, ["optionId"]);
          }), 256))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_16$2, [
          createBaseVNode("span", _hoisted_17$1, toDisplayString(unref(choice).id), 1),
          createBaseVNode("button", {
            class: "btn btn-sm btn-outline-primary",
            onClick: createOption
          }, [
            createVNode(_sfc_main$b, { name: "plus-circle" })
          ]),
          createBaseVNode("button", {
            class: "btn btn-sm btn-outline-danger",
            onClick: deleteChoice
          }, [
            createVNode(_sfc_main$b, { name: "delete-outline" })
          ])
        ])
      ], 4);
    };
  }
});
var ChoiceView = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-010c0506"]]);
class Condition {
  constructor(test, state) {
    this.test = test;
    this.state = state;
  }
}
const _hoisted_1$5 = ["id"];
const _hoisted_2$5 = { class: "modal-dialog modal-dialog-centered" };
const _hoisted_3$4 = { class: "modal-content" };
const _hoisted_4$4 = { class: "modal-header" };
const _hoisted_5$3 = {
  class: "modal-title",
  id: "exampleModalLabel"
};
const _hoisted_6$2 = /* @__PURE__ */ createBaseVNode("button", {
  type: "button",
  class: "btn-close",
  "data-bs-dismiss": "modal",
  "aria-label": "Close"
}, null, -1);
const _hoisted_7$2 = { class: "modal-body" };
const _hoisted_8$2 = {
  key: 0,
  class: "modal-footer"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  props: {
    modalId: String,
    title: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "modal fade",
        id: __props.modalId,
        tabindex: "-1",
        "aria-hidden": "true"
      }, [
        createBaseVNode("div", _hoisted_2$5, [
          createBaseVNode("div", _hoisted_3$4, [
            createBaseVNode("div", _hoisted_4$4, [
              createBaseVNode("h5", _hoisted_5$3, toDisplayString(__props.title), 1),
              _hoisted_6$2
            ]),
            createBaseVNode("div", _hoisted_7$2, [
              renderSlot(_ctx.$slots, "default")
            ]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
              renderSlot(_ctx.$slots, "footer")
            ])) : createCommentVNode("", true)
          ])
        ])
      ], 8, _hoisted_1$5);
    };
  }
});
var SectionView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$3 = (n) => (pushScopeId("data-v-2b28882a"), n = n(), popScopeId(), n);
const _hoisted_1$4 = { class: "section" };
const _hoisted_2$4 = { class: "sec-actions" };
const _hoisted_3$3 = { class: "object-id" };
const _hoisted_4$3 = { class: "btn-toolbar" };
const _hoisted_5$2 = { class: "btn-group me-2" };
const _hoisted_6$1 = /* @__PURE__ */ createTextVNode(" Choice ");
const _hoisted_7$1 = { class: "btn-group me-2" };
const _hoisted_8$1 = ["data-bs-target"];
const _hoisted_9$1 = /* @__PURE__ */ createTextVNode(" Requirements ");
const _hoisted_10$1 = ["data-bs-target"];
const _hoisted_11$1 = /* @__PURE__ */ createTextVNode(" Style ");
const _hoisted_12$1 = { class: "btn-group" };
const _hoisted_13$1 = {
  key: 0,
  class: "sec-header"
};
const _hoisted_14$1 = { class: "sec-text" };
const _hoisted_15$1 = { class: "form-floating sec-header-text" };
const _hoisted_16$1 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("label", null, "Header Text", -1));
const _hoisted_17 = { class: "form-floating sec-footer-text" };
const _hoisted_18 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("label", null, "Footer Text", -1));
const _hoisted_19 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "sec-meta" }, [
  /* @__PURE__ */ createBaseVNode("b", null, "Choices"),
  /* @__PURE__ */ createBaseVNode("label", null, "Maximum Selected"),
  /* @__PURE__ */ createBaseVNode("input", {
    class: "form-control",
    type: "number"
  })
], -1));
const _hoisted_20 = { class: "sec-style" };
const _hoisted_21 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("b", null, "Section Style", -1));
const _hoisted_22 = ["value"];
const _hoisted_23 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("b", null, "Choices Style (default)", -1));
const _hoisted_24 = ["value"];
const _hoisted_25 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("b", null, "Grid", -1));
const _hoisted_26 = { class: "sec-grid" };
const _hoisted_27 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("label", null, "Direction", -1));
const _hoisted_28 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("option", null, "row", -1));
const _hoisted_29 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("option", null, "column", -1));
const _hoisted_30 = [
  _hoisted_28,
  _hoisted_29
];
const _hoisted_31 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("label", null, "Columns", -1));
const _hoisted_32 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("label", null, "Rows", -1));
const _hoisted_33 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("label", null, "Default Width", -1));
const _hoisted_34 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("label", null, "Default Height", -1));
const _hoisted_35 = { class: "sec-conditions" };
const _hoisted_36 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("b", null, "Conditions", -1));
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  props: {
    sectionId: String
  },
  setup(__props) {
    const props = __props;
    const store = useStore(editorStoreKey);
    const _state = reactive({
      collapsed: false
    });
    const section = computed(() => store.getters["project/findElement"](props.sectionId));
    const choices = computed(() => store.getters["project/findChildrenIds"](props.sectionId));
    const styles = computed(() => ["default", "Style 1", "Style 2"]);
    const {
      M_title,
      M_headerText,
      M_footerText,
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
    const EMPTY = always({});
    const choicesContainerStyle = computed(() => {
      return mergeAll([
        lib.match(section.value.style.gridCols).with(void 0, EMPTY).with(lib.__.string, match(/^\d+$/), (numCols) => {
          return { "grid-template-columns": `repeat(${numCols}, 1fr)` };
        }).otherwise(EMPTY),
        lib.match(section.value.style.gridRows).with(void 0, EMPTY).with(lib.__.string, match(/^\d+$/), (numCols) => {
          return { "grid-template-rows": `repeat(${numCols}, 1fr)` };
        }).otherwise(EMPTY),
        lib.match(section.value.style.gridFlow).with(void 0, EMPTY).with(lib.__.string, match(/^row|column$/), (flow) => {
          return { "grid-auto-flow": flow };
        }).otherwise(EMPTY)
      ]);
    });
    const defaultChoiceStyle = computed(() => {
      return mergeAll([
        DefaultChoiceStyle,
        lib.match(section.value.style.gridDefaultColSpan).with(void 0, EMPTY).with(lib.__.number, (colSpan) => {
          return { colSpan };
        }).with(lib.__.string, match(/^\d+$/), (colSpan) => {
          return { colSpan: Number.parseInt(colSpan) };
        }).otherwise(EMPTY),
        lib.match(section.value.style.gridDefaultRowSpan).with(void 0, EMPTY).with(lib.__.number, (rowSpan) => {
          return { rowSpan };
        }).with(lib.__.string, match(/^\d+$/), (rowSpan) => {
          return { rowSpan: Number.parseInt(rowSpan) };
        }).otherwise(EMPTY)
      ]);
    });
    function toggleSection() {
      _state.collapsed = !_state.collapsed;
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
        createBaseVNode("section", _hoisted_1$4, [
          createBaseVNode("div", _hoisted_2$4, [
            createBaseVNode("button", {
              class: "btn btn-sm btn-link",
              onClick: toggleSection
            }, [
              withDirectives(createVNode(_sfc_main$b, { name: "eye" }, null, 512), [
                [vShow, unref(_state).collapsed]
              ]),
              withDirectives(createVNode(_sfc_main$b, { name: "eye-off" }, null, 512), [
                [vShow, !unref(_state).collapsed]
              ])
            ]),
            createBaseVNode("span", _hoisted_3$3, toDisplayString(unref(section).id), 1),
            createBaseVNode("div", _hoisted_4$3, [
              createBaseVNode("div", _hoisted_5$2, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-primary",
                  onClick: createChoice
                }, [
                  createVNode(_sfc_main$b, { name: "plus-circle" }),
                  _hoisted_6$1
                ])
              ]),
              createBaseVNode("div", _hoisted_7$1, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-primary",
                  "data-bs-toggle": "modal",
                  "data-bs-target": `#cond_${props.sectionId}`
                }, [
                  createVNode(_sfc_main$b, { name: "key" }),
                  _hoisted_9$1
                ], 8, _hoisted_8$1),
                createBaseVNode("button", {
                  type: "button",
                  class: "btn btn-sm btn-outline-primary",
                  "data-bs-toggle": "modal",
                  "data-bs-target": `#style_${props.sectionId}`
                }, [
                  createVNode(_sfc_main$b, { name: "palette-swatch" }),
                  _hoisted_11$1
                ], 8, _hoisted_10$1)
              ]),
              createBaseVNode("div", _hoisted_12$1, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-danger wide",
                  onClick: deleteSection
                }, [
                  createVNode(_sfc_main$b, { name: "delete-outline" })
                ])
              ])
            ])
          ]),
          !unref(_state).collapsed ? (openBlock(), createElementBlock("div", _hoisted_13$1, [
            createBaseVNode("div", _hoisted_14$1, [
              withDirectives(createBaseVNode("input", {
                class: "form-control sec-title",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_title) ? M_title.value = $event : null)
              }, null, 512), [
                [vModelText, unref(M_title)]
              ]),
              createBaseVNode("div", _hoisted_15$1, [
                withDirectives(createBaseVNode("textarea", {
                  class: "form-control",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_headerText) ? M_headerText.value = $event : null),
                  placeholder: "..."
                }, null, 512), [
                  [vModelText, unref(M_headerText)]
                ]),
                _hoisted_16$1
              ]),
              createBaseVNode("div", _hoisted_17, [
                withDirectives(createBaseVNode("textarea", {
                  class: "form-control",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(M_footerText) ? M_footerText.value = $event : null),
                  placeholder: "..."
                }, null, 512), [
                  [vModelText, unref(M_footerText)]
                ]),
                _hoisted_18
              ])
            ]),
            _hoisted_19
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
        createVNode(_sfc_main$7, {
          modalId: `style_${props.sectionId}`,
          title: "Style Editor"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_20, [
              _hoisted_21,
              withDirectives(createBaseVNode("select", {
                class: "form-select sec-style-select",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(M_style_name) ? M_style_name.value = $event : null)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(styles), (style) => {
                  return openBlock(), createElementBlock("option", { value: style }, toDisplayString(style), 9, _hoisted_22);
                }), 256))
              ], 512), [
                [vModelSelect, unref(M_style_name)]
              ]),
              _hoisted_23,
              withDirectives(createBaseVNode("select", {
                class: "form-select sec-style-select",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(M_style_children) ? M_style_children.value = $event : null)
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(styles), (style) => {
                  return openBlock(), createElementBlock("option", { value: style }, toDisplayString(style), 9, _hoisted_24);
                }), 256))
              ], 512), [
                [vModelSelect, unref(M_style_children)]
              ]),
              _hoisted_25,
              createBaseVNode("div", _hoisted_26, [
                _hoisted_27,
                withDirectives(createBaseVNode("select", {
                  class: "form-select sec-style-dir span3",
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => isRef(M_gridFlow) ? M_gridFlow.value = $event : null)
                }, _hoisted_30, 512), [
                  [vModelSelect, unref(M_gridFlow)]
                ]),
                _hoisted_31,
                withDirectives(createBaseVNode("input", {
                  class: "form-control sec-grid-cols",
                  type: "text",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => isRef(M_gridCols) ? M_gridCols.value = $event : null)
                }, null, 512), [
                  [vModelText, unref(M_gridCols)]
                ]),
                _hoisted_32,
                withDirectives(createBaseVNode("input", {
                  class: "form-control sec-grid-rows",
                  type: "text",
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => isRef(M_gridRows) ? M_gridRows.value = $event : null)
                }, null, 512), [
                  [vModelText, unref(M_gridRows)]
                ]),
                _hoisted_33,
                withDirectives(createBaseVNode("input", {
                  class: "form-control sec-grid-cols",
                  type: "text",
                  "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => isRef(M_gridDefaultColSpan) ? M_gridDefaultColSpan.value = $event : null)
                }, null, 512), [
                  [vModelText, unref(M_gridDefaultColSpan)]
                ]),
                _hoisted_34,
                withDirectives(createBaseVNode("input", {
                  class: "form-control sec-grid-rows",
                  type: "text",
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => isRef(M_gridDefaultRowSpan) ? M_gridDefaultRowSpan.value = $event : null)
                }, null, 512), [
                  [vModelText, unref(M_gridDefaultRowSpan)]
                ])
              ])
            ])
          ]),
          _: 1
        }, 8, ["modalId"]),
        createVNode(_sfc_main$7, {
          modalId: `cond_${props.sectionId}`,
          title: "Requirements"
        }, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_35, [
              _hoisted_36,
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-primary",
                onClick: addCondition
              }, [
                createVNode(_sfc_main$b, { name: "key-plus" })
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
var SectionView = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-2b28882a"]]);
var SectionsTab_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$2 = (n) => (pushScopeId("data-v-3a540889"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { key: 0 };
const _hoisted_2$3 = { key: 1 };
const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("p", null, "No Sections", -1));
const _hoisted_4$2 = [
  _hoisted_3$2
];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("h1", null, toDisplayString(unref(page).title) + " - Sections", 1),
        unref(findSections) && unref(findSections).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findSections), (sectionId) => {
            return openBlock(), createBlock(SectionView, { sectionId }, null, 8, ["sectionId"]);
          }), 256))
        ])) : createCommentVNode("", true),
        !unref(findSections) || unref(findSections).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2$3, _hoisted_4$2)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var EditorSections = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-3a540889"]]);
var PageView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-41f5c5e1"), n = n(), popScopeId(), n);
const _hoisted_1$2 = { class: "page" };
const _hoisted_2$2 = { class: "page-actions" };
const _hoisted_3$1 = { class: "page-id" };
const _hoisted_4$1 = { class: "btn-toolbar" };
const _hoisted_5$1 = { class: "btn-group me-2" };
const _hoisted_6 = ["data-bs-target"];
const _hoisted_7 = /* @__PURE__ */ createTextVNode(" Requirements ");
const _hoisted_8 = ["data-bs-target"];
const _hoisted_9 = /* @__PURE__ */ createTextVNode(" Style ");
const _hoisted_10 = { class: "btn-group" };
const _hoisted_11 = {
  key: 0,
  class: "page-header"
};
const _hoisted_12 = { class: "page-text" };
const _hoisted_13 = { class: "form-floating" };
const _hoisted_14 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Header Text", -1));
const _hoisted_15 = { class: "form-floating" };
const _hoisted_16 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Footer Text", -1));
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
      M_title,
      M_headerText,
      M_footerText
    } = updatePropsFor(store, {
      type: Page,
      prop: page,
      objectId: () => props.pageId
    });
    function togglePage() {
      _state.collapsed = !_state.collapsed;
    }
    async function deletePage() {
      store.commit("project/removeObject", props.pageId);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("button", {
            class: "btn btn-sm btn-link",
            onClick: togglePage
          }, [
            withDirectives(createVNode(_sfc_main$b, { name: "eye" }, null, 512), [
              [vShow, unref(_state).collapsed]
            ]),
            withDirectives(createVNode(_sfc_main$b, { name: "eye-off" }, null, 512), [
              [vShow, !unref(_state).collapsed]
            ])
          ]),
          createBaseVNode("span", _hoisted_3$1, toDisplayString(unref(page).id), 1),
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-primary",
                "data-bs-toggle": "modal",
                "data-bs-target": `#cond_${props.sectionId}`
              }, [
                createVNode(_sfc_main$b, { name: "key" }),
                _hoisted_7
              ], 8, _hoisted_6),
              createBaseVNode("button", {
                type: "button",
                class: "btn btn-sm btn-outline-primary",
                "data-bs-toggle": "modal",
                "data-bs-target": `#style_${props.sectionId}`
              }, [
                createVNode(_sfc_main$b, { name: "palette-swatch" }),
                _hoisted_9
              ], 8, _hoisted_8)
            ]),
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("button", {
                class: "btn btn-sm btn-outline-danger wide",
                onClick: deletePage
              }, [
                createVNode(_sfc_main$b, { name: "delete-outline" })
              ])
            ])
          ])
        ]),
        !unref(_state).collapsed ? (openBlock(), createElementBlock("div", _hoisted_11, [
          createBaseVNode("div", _hoisted_12, [
            withDirectives(createBaseVNode("input", {
              class: "form-control page-title",
              type: "text",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_title) ? M_title.value = $event : null)
            }, null, 512), [
              [vModelText, unref(M_title)]
            ]),
            createBaseVNode("div", _hoisted_13, [
              withDirectives(createBaseVNode("textarea", {
                class: "form-control page-header",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_headerText) ? M_headerText.value = $event : null),
                placeholder: "..."
              }, null, 512), [
                [vModelText, unref(M_headerText)]
              ]),
              _hoisted_14
            ]),
            createBaseVNode("div", _hoisted_15, [
              withDirectives(createBaseVNode("textarea", {
                class: "form-control page-footer",
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(M_footerText) ? M_footerText.value = $event : null),
                placeholder: "..."
              }, null, 512), [
                [vModelText, unref(M_footerText)]
              ]),
              _hoisted_16
            ])
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var PageView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-41f5c5e1"]]);
var PagesTab_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-2d0942ac"), n = n(), popScopeId(), n);
const _hoisted_1$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("h1", null, "Pages", -1));
const _hoisted_2$1 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("p", null, "No Pages", -1));
const _hoisted_5 = [
  _hoisted_4
];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String,
    pageId: String
  },
  setup(__props) {
    const store = useStore(editorStoreKey);
    const findPages = computed(() => store.getters["project/findChildrenIds"]("__pages__"));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1$1,
        unref(findPages) && unref(findPages).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_2$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findPages), (pageId) => {
            return openBlock(), createBlock(PageView, { pageId }, null, 8, ["pageId"]);
          }), 256))
        ])) : createCommentVNode("", true),
        !unref(findPages) || unref(findPages).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_3, _hoisted_5)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var EditorPages = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-2d0942ac"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    projectId: String
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("b", null, "Settings");
    };
  }
});
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("h1", null, "Viewer", -1);
const _hoisted_2 = [
  _hoisted_1
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    useStore();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, _hoisted_2);
    };
  }
});
const routes = [
  { name: "home", path: "/", component: Home },
  {
    name: "edit",
    path: "/edit/:projectId",
    component: _sfc_main$a,
    props: true,
    children: [
      {
        name: "edit_pages",
        path: "pages",
        alias: "",
        component: EditorPages,
        props: true
      },
      {
        name: "edit_section",
        path: "pages/:pageId/sections",
        component: EditorSections,
        props: true
      },
      {
        name: "edit_settings",
        path: "settings",
        component: _sfc_main$2,
        props: true
      }
    ]
  },
  { name: "view", path: "/view/:projectId", component: _sfc_main$1 }
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
