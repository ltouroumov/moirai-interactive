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
import { V as VuexPersistence, c as createStore, a as createLogger, o as over, l as lensPath, m as mergeRight, _ as __, b as omit, d as defineComponent, e as computed, f as createElementBlock, g as createBaseVNode, F as Fragment, r as renderList, u as unref, p as pushScopeId, h as popScopeId, i as useStore, j as resolveComponent, k as openBlock, t as toDisplayString, n as createVNode, w as withCtx, q as createTextVNode, s as normalizeClass, v as onMounted, x as onUnmounted, y as onBeforeRouteUpdate, z as useRouter, A as useRoute, B as clone, C as view, D as withDirectives, E as vModelText, G as isRef, H as always, I as mergeWith, J as mergeAll, K as lib, L as match, M as createCommentVNode, N as vModelSelect, O as createBlock, P as normalizeStyle, Q as renderSlot, R as reactive, S as vShow, T as createRouter, U as createWebHashHistory, W as createApp } from "./vendor.13e1ccbb.js";
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
const persistence$1 = new VuexPersistence({
  key: "home",
  storage: window.localStorage
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
const ProjectModule = {
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
    async genNextId({ commit, state }, idType) {
      commit("genNextId", idType);
      return state.genCounters[idType];
    }
  }
};
function parseOrDefault(storage, key, defaultF) {
  const data = storage.getItem(key);
  if (data)
    return JSON.parse(data);
  else
    return defaultF();
}
const persistence = new VuexPersistence({
  key: "projects",
  storage: window.localStorage,
  saveState(key, state, storage) {
    if (state.project.key && storage) {
      const projectKey = state.project.key;
      const projectJson = JSON.stringify(state.project);
      storage.setItem(`projects/${projectKey}`, projectJson);
      const editorData = omit(["project"], state);
      storage.setItem(key, JSON.stringify(editorData));
    }
  },
  restoreState(key, storage) {
    if (storage) {
      return parseOrDefault(storage, key, () => new EditorData());
    } else {
      return void 0;
    }
  }
});
const editorStoreKey = Symbol("editor");
const editorStore = createStore({
  plugins: [createLogger(), persistence.plugin],
  modules: {
    project: ProjectModule
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
const _withScopeId$3 = (n) => (pushScopeId("data-v-6cdf1c3a"), n = n(), popScopeId(), n);
const _hoisted_1$8 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("h1", null, "Moirai", -1));
const _hoisted_2$7 = { class: "projects" };
const _hoisted_3$6 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createBaseVNode("div", { class: "header" }, [
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-name" }, "Project"),
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-key" }, "Key"),
  /* @__PURE__ */ createBaseVNode("span", { class: "proj-actions" }, "Actions")
], -1));
const _hoisted_4$6 = { class: "project" };
const _hoisted_5$5 = { class: "proj-name" };
const _hoisted_6$5 = { class: "proj-key" };
const _hoisted_7$4 = { class: "proj-actions btn-group" };
const _hoisted_8$4 = /* @__PURE__ */ createTextVNode("Edit ");
const _hoisted_9$3 = /* @__PURE__ */ createTextVNode("View ");
const _hoisted_10$3 = ["onClick"];
const _hoisted_11$3 = ["onClick"];
const _hoisted_12$3 = { class: "tools" };
const _hoisted_13$3 = { class: "btn-group" };
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const store = useStore(homeStoreKey);
    const projects = computed(() => store.state.items);
    function createProject() {
      store.commit("createProject");
    }
    function removeProject(projectId) {
      store.dispatch("removeProject", projectId);
    }
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1$8,
        createBaseVNode("div", _hoisted_2$7, [
          _hoisted_3$6,
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(projects), (project) => {
            return openBlock(), createElementBlock("div", _hoisted_4$6, [
              createBaseVNode("span", _hoisted_5$5, toDisplayString(project.name), 1),
              createBaseVNode("span", _hoisted_6$5, toDisplayString(project.key), 1),
              createBaseVNode("div", _hoisted_7$4, [
                createVNode(_component_router_link, {
                  class: "btn btn-outline-success",
                  to: { name: "edit", params: { project: project.key } }
                }, {
                  default: withCtx(() => [
                    _hoisted_8$4
                  ]),
                  _: 2
                }, 1032, ["to"]),
                createVNode(_component_router_link, {
                  class: "btn btn-outline-success",
                  to: { name: "view", params: { project: project.key } }
                }, {
                  default: withCtx(() => [
                    _hoisted_9$3
                  ]),
                  _: 2
                }, 1032, ["to"]),
                createBaseVNode("button", {
                  class: "btn btn-outline-primary",
                  onClick: ($event) => _ctx.exportProject(project.key)
                }, "Export", 8, _hoisted_10$3),
                createBaseVNode("button", {
                  class: "btn btn-outline-danger",
                  onClick: ($event) => removeProject(project.key)
                }, "Remove", 8, _hoisted_11$3)
              ])
            ]);
          }), 256)),
          createBaseVNode("div", _hoisted_12$3, [
            createBaseVNode("div", _hoisted_13$3, [
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
        ])
      ], 64);
    };
  }
});
var Home = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-6cdf1c3a"]]);
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
const _sfc_main$a = {
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
var Editor_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$7 = { class: "toolbar" };
const _hoisted_2$6 = { class: "nav nav-pills nav-fill editor-tabs" };
const _hoisted_3$5 = /* @__PURE__ */ createTextVNode(" Home ");
const _hoisted_4$5 = /* @__PURE__ */ createTextVNode(" Pages ");
const _hoisted_5$4 = { class: "nav-item dropdown" };
const _hoisted_6$4 = /* @__PURE__ */ createTextVNode(" Sections ");
const _hoisted_7$3 = {
  class: "dropdown-menu",
  "aria-labelledby": "dropdownMenuLink"
};
const _hoisted_8$3 = /* @__PURE__ */ createTextVNode(" Settings ");
const _hoisted_9$2 = { class: "editor-actions" };
const _hoisted_10$2 = { class: "btn-toolbar" };
const _hoisted_11$2 = { class: "btn-group" };
const _hoisted_12$2 = /* @__PURE__ */ createTextVNode(" New Page ");
const _hoisted_13$2 = /* @__PURE__ */ createTextVNode(" New Section ");
const _hoisted_14$2 = /* @__PURE__ */ createTextVNode(" New Score ");
const _hoisted_15$2 = /* @__PURE__ */ createTextVNode(" New Style ");
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const $router = useRouter();
    const store = useStore(editorStoreKey);
    const findPageIds = computed(() => store.getters["project/findChildrenIds"]("__pages__"));
    async function createPage() {
      const childCounter = await store.dispatch("project/genNextId", ElementType.Page);
      const childId = `${ElementType.Page}_${childCounter}`;
      console.log("New Page", childId);
      store.commit("project/addObject", new Section(childId, `Page ${childCounter}`));
      store.commit("project/addChild", { parentId: "__pages__", childId });
    }
    async function createSection() {
      if ($router.currentRoute.value.name !== "edit_section")
        return;
      const parentId = $router.currentRoute.value.params["pageId"];
      const childCounter = await store.dispatch("project/genNextId", ElementType.Section);
      const childId = `${ElementType.Section}_${childCounter}`;
      console.log("New Section", childId);
      store.commit("project/addObject", new Section(childId, `Section ${childCounter}`));
      store.commit("project/addChild", { parentId, childId });
    }
    function reloadProject(route) {
      const projectId = route.params["project"];
      console.log(`Loading project ${projectId}`);
      const jsonData = localStorage.getItem(`projects/${projectId}`);
      if (jsonData) {
        const project = JSON.parse(jsonData);
        store.commit("project/loadProject", project);
        console.log("Loaded from storage");
      }
      if (!store.state.project.key) {
        console.log("Project requires setup");
        const homeStore2 = useStore(homeStoreKey);
        const projectData = homeStore2.getters["findProject"](projectId);
        if (projectData) {
          store.commit("project/setupProject", projectData);
        } else {
          $router.push({ name: "home" });
        }
      }
    }
    onMounted(() => {
      const route = useRoute();
      reloadProject(route);
    });
    onUnmounted(() => {
      store.commit("project/unloadProject");
    });
    onBeforeRouteUpdate((to, from, next) => {
      console.log(`Route change`, from, to);
      if (from.params["project"] === to.params["project"])
        next();
      else
        reloadProject(to);
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$7, [
          createBaseVNode("nav", _hoisted_2$6, [
            createVNode(_component_router_link, {
              class: "nav-link",
              to: { name: "home" }
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$a, { name: "chevron-left" }),
                _hoisted_3$5
              ]),
              _: 1
            }),
            createVNode(_component_router_link, {
              class: "nav-link",
              to: { name: "edit_pages", params: _ctx.$route.params },
              "active-class": "active"
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$a, { name: "file-multiple" }),
                _hoisted_4$5
              ]),
              _: 1
            }, 8, ["to"]),
            createBaseVNode("div", _hoisted_5$4, [
              createBaseVNode("a", {
                class: normalizeClass(["nav-link", { disabled: !unref(findPageIds) || unref(findPageIds).length === 0 }, "dropdown-toggle"]),
                href: "#",
                role: "button",
                id: "dropdownMenuLink",
                "data-bs-toggle": "dropdown",
                "aria-expanded": "false"
              }, [
                createVNode(_sfc_main$a, { name: "layers-triple" }),
                _hoisted_6$4
              ], 2),
              createBaseVNode("ul", _hoisted_7$3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findPageIds), (pageId) => {
                  return openBlock(), createElementBlock("li", null, [
                    createVNode(_component_router_link, {
                      class: "dropdown-item",
                      to: { name: "edit_section", params: __spreadProps(__spreadValues({}, _ctx.$route.params), { pageId }) },
                      "active-class": "active"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(pageId), 1)
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
                createVNode(_sfc_main$a, { name: "cog" }),
                _hoisted_8$3
              ]),
              _: 1
            }, 8, ["to"])
          ]),
          createBaseVNode("div", _hoisted_9$2, [
            createBaseVNode("div", _hoisted_10$2, [
              createBaseVNode("div", _hoisted_11$2, [
                createBaseVNode("button", {
                  class: "btn btn-primary",
                  onClick: createPage
                }, [
                  createVNode(_sfc_main$a, { name: "file-plus" }),
                  _hoisted_12$2
                ]),
                createBaseVNode("button", {
                  class: normalizeClass(["btn btn-primary", { disabled: unref($router).currentRoute.value.name !== "edit_section" }]),
                  onClick: createSection
                }, [
                  createVNode(_sfc_main$a, { name: "layers-plus" }),
                  _hoisted_13$2
                ], 2),
                createBaseVNode("button", {
                  class: "btn btn-primary",
                  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.createScore && _ctx.createScore(...args))
                }, [
                  createVNode(_sfc_main$a, { name: "numeric-9-plus-box" }),
                  _hoisted_14$2
                ]),
                createBaseVNode("button", {
                  class: "btn btn-primary",
                  onClick: _cache[1] || (_cache[1] = (...args) => _ctx.screateStyle && _ctx.screateStyle(...args))
                }, [
                  createVNode(_sfc_main$a, { name: "palette-swatch-outline" }),
                  _hoisted_15$2
                ])
              ])
            ])
          ])
        ]),
        createVNode(_component_router_view)
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
const _withScopeId$2 = (n) => (pushScopeId("data-v-7766e74d"), n = n(), popScopeId(), n);
const _hoisted_1$6 = { class: "option" };
const _hoisted_2$5 = { class: "opt-header" };
const _hoisted_3$4 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "opt-conditions" }, null, -1));
const _hoisted_4$4 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("div", { class: "opt-scores" }, null, -1));
const _hoisted_5$3 = { class: "opt-actions" };
const _hoisted_6$3 = { class: "opt-id" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
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
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createBaseVNode("div", _hoisted_2$5, [
          withDirectives(createBaseVNode("input", {
            class: "form-control opt-title",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_title) ? M_title.value = $event : null)
          }, null, 512), [
            [vModelText, unref(M_title)]
          ]),
          _hoisted_3$4,
          _hoisted_4$4
        ]),
        createBaseVNode("div", _hoisted_5$3, [
          createBaseVNode("span", _hoisted_6$3, toDisplayString(unref(option).id), 1),
          createBaseVNode("button", {
            class: "btn btn-sm btn-outline-danger",
            onClick: deleteOption
          }, [
            createVNode(_sfc_main$a, { name: "delete-outline" })
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
var OptionView = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-7766e74d"]]);
var ChoiceView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId$1 = (n) => (pushScopeId("data-v-e1ebef2e"), n = n(), popScopeId(), n);
const _hoisted_1$5 = { class: "ch-header" };
const _hoisted_2$4 = {
  key: 0,
  class: "ch-conditions"
};
const _hoisted_3$3 = {
  key: 1,
  class: "ch-scores"
};
const _hoisted_4$3 = { class: "form-floating" };
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Choice Text", -1));
const _hoisted_6$2 = { class: "ch-style" };
const _hoisted_7$2 = { class: "form-floating" };
const _hoisted_8$2 = ["value"];
const _hoisted_9$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Style", -1));
const _hoisted_10$1 = { class: "ch-grid-area" };
const _hoisted_11$1 = { class: "form-floating" };
const _hoisted_12$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Col Span", -1));
const _hoisted_13$1 = { class: "form-floating" };
const _hoisted_14$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("label", null, "Row Span", -1));
const _hoisted_15$1 = {
  key: 0,
  class: "ch-options"
};
const _hoisted_16$1 = { class: "ch-actions" };
const _hoisted_17$1 = { class: "ch-id" };
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  props: {
    choiceId: String,
    defaultStyle: { type: ChoiceStyle, default: DefaultChoiceStyle }
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
        }).when(match(/^\d+$/), (colSpan) => {
          return { "grid-column": `span ${colSpan}` };
        }).run(),
        lib.match(style.rowSpan).with(void 0, EMPTY).with(lib.__.number, (colSpan) => {
          return { "grid-row": `span ${colSpan}` };
        }).when(match(/^\d+$/), (colSpan) => {
          return { "grid-row": `span ${colSpan}` };
        }).run()
      ]);
    });
    async function createOption() {
      const childCounter = await store.dispatch("project/genNextId", ElementType.Option);
      const childId = `${ElementType.Option}_${childCounter}`;
      console.log("New Choice", childId);
      store.commit("project/addObject", new Option(childId, `Option ${childCounter}`, "Bar"));
      store.commit("project/addChild", { parentId: props.choiceId, childId });
    }
    async function deleteChoice() {
      store.commit("project/removeObject", props.choiceId);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "choice",
        style: normalizeStyle(unref(containerStyle))
      }, [
        createBaseVNode("div", _hoisted_1$5, [
          withDirectives(createBaseVNode("input", {
            class: "form-control ch-title",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_title) ? M_title.value = $event : null)
          }, null, 512), [
            [vModelText, unref(M_title)]
          ]),
          unref(choice).conditions ? (openBlock(), createElementBlock("div", _hoisted_2$4)) : createCommentVNode("", true),
          unref(choice).scores ? (openBlock(), createElementBlock("div", _hoisted_3$3)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$3, [
            withDirectives(createBaseVNode("textarea", {
              class: "form-control ch-text",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_text) ? M_text.value = $event : null)
            }, null, 512), [
              [vModelText, unref(M_text)]
            ]),
            _hoisted_5$2
          ])
        ]),
        createBaseVNode("div", _hoisted_6$2, [
          createBaseVNode("div", _hoisted_7$2, [
            withDirectives(createBaseVNode("select", {
              class: "form-select ch-style-select",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(M_style_name) ? M_style_name.value = $event : null)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(styles), (style) => {
                return openBlock(), createElementBlock("option", { value: style }, toDisplayString(style), 9, _hoisted_8$2);
              }), 256))
            ], 512), [
              [vModelSelect, unref(M_style_name)]
            ]),
            _hoisted_9$1
          ]),
          createBaseVNode("div", _hoisted_10$1, [
            createBaseVNode("div", _hoisted_11$1, [
              withDirectives(createBaseVNode("input", {
                class: "form-control sec-grid-cols",
                type: "text",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(M_colSpan) ? M_colSpan.value = $event : null)
              }, null, 512), [
                [vModelText, unref(M_colSpan)]
              ]),
              _hoisted_12$1
            ]),
            createBaseVNode("div", _hoisted_13$1, [
              withDirectives(createBaseVNode("input", {
                class: "form-control sec-grid-rows",
                type: "text",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(M_rowSpan) ? M_rowSpan.value = $event : null)
              }, null, 512), [
                [vModelText, unref(M_rowSpan)]
              ]),
              _hoisted_14$1
            ])
          ])
        ]),
        unref(options) && unref(options).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_15$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(options), (optionId) => {
            return openBlock(), createBlock(OptionView, { optionId }, null, 8, ["optionId"]);
          }), 256))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_16$1, [
          createBaseVNode("span", _hoisted_17$1, toDisplayString(unref(choice).id), 1),
          createBaseVNode("button", {
            class: "btn btn-sm btn-outline-primary",
            onClick: createOption
          }, [
            createVNode(_sfc_main$a, { name: "plus-circle" })
          ]),
          createBaseVNode("button", {
            class: "btn btn-sm btn-outline-danger",
            onClick: deleteChoice
          }, [
            createVNode(_sfc_main$a, { name: "delete-outline" })
          ])
        ])
      ], 4);
    };
  }
});
var ChoiceView = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-e1ebef2e"]]);
class Condition {
  constructor(test, state) {
    this.test = test;
    this.state = state;
  }
}
const _hoisted_1$4 = ["id"];
const _hoisted_2$3 = { class: "modal-dialog modal-dialog-centered" };
const _hoisted_3$2 = { class: "modal-content" };
const _hoisted_4$2 = { class: "modal-header" };
const _hoisted_5$1 = {
  class: "modal-title",
  id: "exampleModalLabel"
};
const _hoisted_6$1 = /* @__PURE__ */ createBaseVNode("button", {
  type: "button",
  class: "btn-close",
  "data-bs-dismiss": "modal",
  "aria-label": "Close"
}, null, -1);
const _hoisted_7$1 = { class: "modal-body" };
const _hoisted_8$1 = {
  key: 0,
  class: "modal-footer"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
        createBaseVNode("div", _hoisted_2$3, [
          createBaseVNode("div", _hoisted_3$2, [
            createBaseVNode("div", _hoisted_4$2, [
              createBaseVNode("h5", _hoisted_5$1, toDisplayString(__props.title), 1),
              _hoisted_6$1
            ]),
            createBaseVNode("div", _hoisted_7$1, [
              renderSlot(_ctx.$slots, "default")
            ]),
            _ctx.$slots.footer ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
              renderSlot(_ctx.$slots, "footer")
            ])) : createCommentVNode("", true)
          ])
        ])
      ], 8, _hoisted_1$4);
    };
  }
});
var SectionView_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-2777ce2c"), n = n(), popScopeId(), n);
const _hoisted_1$3 = { class: "section" };
const _hoisted_2$2 = { class: "sec-actions" };
const _hoisted_3$1 = { class: "sec-id" };
const _hoisted_4$1 = { class: "btn-toolbar" };
const _hoisted_5 = { class: "btn-group me-2" };
const _hoisted_6 = /* @__PURE__ */ createTextVNode(" Choice ");
const _hoisted_7 = { class: "btn-group me-2" };
const _hoisted_8 = ["data-bs-target"];
const _hoisted_9 = /* @__PURE__ */ createTextVNode(" Requirements ");
const _hoisted_10 = ["data-bs-target"];
const _hoisted_11 = /* @__PURE__ */ createTextVNode(" Style ");
const _hoisted_12 = { class: "btn-group" };
const _hoisted_13 = {
  key: 0,
  class: "sec-header"
};
const _hoisted_14 = { class: "sec-text" };
const _hoisted_15 = { class: "form-floating" };
const _hoisted_16 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", null, "Header Text", -1));
const _hoisted_17 = { class: "form-floating" };
const _hoisted_18 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", null, "Footer Text", -1));
const _hoisted_19 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "sec-meta" }, [
  /* @__PURE__ */ createBaseVNode("b", null, "Choices"),
  /* @__PURE__ */ createBaseVNode("label", null, "Maximum Selected"),
  /* @__PURE__ */ createBaseVNode("input", {
    class: "form-control",
    type: "number"
  })
], -1));
const _hoisted_20 = { class: "sec-style" };
const _hoisted_21 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "Section Style", -1));
const _hoisted_22 = ["value"];
const _hoisted_23 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "Choices Style (default)", -1));
const _hoisted_24 = ["value"];
const _hoisted_25 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "Grid", -1));
const _hoisted_26 = { class: "sec-grid" };
const _hoisted_27 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", null, "Direction", -1));
const _hoisted_28 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("option", null, "row", -1));
const _hoisted_29 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("option", null, "column", -1));
const _hoisted_30 = [
  _hoisted_28,
  _hoisted_29
];
const _hoisted_31 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", null, "Columns", -1));
const _hoisted_32 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", null, "Rows", -1));
const _hoisted_33 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", null, "Default Width", -1));
const _hoisted_34 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("label", null, "Default Height", -1));
const _hoisted_35 = { class: "sec-conditions" };
const _hoisted_36 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("b", null, "Conditions", -1));
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
      style: { M_name: M_style_name, M_children: M_style_children, M_gridCols, M_gridRows, M_gridFlow, M_gridDefaultColSpan, M_gridDefaultRowSpan }
    } = updatePropsFor(store, {
      type: Section,
      prop: section,
      objectId: () => props.sectionId
    });
    const EMPTY = always({});
    const choicesContainerStyle = computed(() => {
      return mergeAll([
        lib.match(section.value.style.gridCols).with(void 0, EMPTY).when(match(/^\d+$/), (numCols) => {
          return { "grid-template-columns": `repeat(${numCols}, 1fr)` };
        }).otherwise(EMPTY),
        lib.match(section.value.style.gridRows).with(void 0, EMPTY).when(match(/^\d+$/), (numCols) => {
          return { "grid-template-rows": `repeat(${numCols}, 1fr)` };
        }).otherwise(EMPTY),
        lib.match(section.value.style.gridFlow).with(void 0, EMPTY).when(match(/^row|column$/), (flow) => {
          return { "grid-auto-flow": flow };
        }).otherwise(EMPTY)
      ]);
    });
    const defaultChoiceStyle = computed(() => {
      return mergeAll([
        DefaultChoiceStyle,
        lib.match(section.value.style.gridDefaultColSpan).with(void 0, EMPTY).with(lib.__.number, (colSpan) => {
          return { colSpan };
        }).when(match(/^\d+$/), (colSpan) => {
          return { colSpan: Number.parseInt(colSpan) };
        }).otherwise(EMPTY),
        lib.match(section.value.style.gridDefaultRowSpan).with(void 0, EMPTY).with(lib.__.number, (rowSpan) => {
          return { rowSpan };
        }).when(match(/^\d+$/), (rowSpan) => {
          return { rowSpan: Number.parseInt(rowSpan) };
        }).otherwise(EMPTY)
      ]);
    });
    function toggleSection() {
      _state.collapsed = !_state.collapsed;
    }
    async function createChoice() {
      const childCounter = await store.dispatch("project/genNextId", ElementType.Choice);
      const childId = `${ElementType.Choice}_${childCounter}`;
      console.log("New Choice", childId);
      store.commit("project/addObject", new Choice(childId, `Choice ${childCounter}`, "Bar"));
      store.commit("project/addChild", { parentId: props.sectionId, childId });
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
        createBaseVNode("section", _hoisted_1$3, [
          createBaseVNode("div", _hoisted_2$2, [
            createBaseVNode("button", {
              class: "btn btn-sm btn-link",
              onClick: toggleSection
            }, [
              withDirectives(createVNode(_sfc_main$a, { name: "eye" }, null, 512), [
                [vShow, unref(_state).collapsed]
              ]),
              withDirectives(createVNode(_sfc_main$a, { name: "eye-off" }, null, 512), [
                [vShow, !unref(_state).collapsed]
              ])
            ]),
            createBaseVNode("span", _hoisted_3$1, toDisplayString(unref(section).id), 1),
            createBaseVNode("div", _hoisted_4$1, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-primary",
                  onClick: createChoice
                }, [
                  createVNode(_sfc_main$a, { name: "plus-circle" }),
                  _hoisted_6
                ])
              ]),
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-primary",
                  "data-bs-toggle": "modal",
                  "data-bs-target": `#cond_${props.sectionId}`
                }, [
                  createVNode(_sfc_main$a, { name: "key" }),
                  _hoisted_9
                ], 8, _hoisted_8),
                createBaseVNode("button", {
                  type: "button",
                  class: "btn btn-sm btn-outline-primary",
                  "data-bs-toggle": "modal",
                  "data-bs-target": `#style_${props.sectionId}`
                }, [
                  createVNode(_sfc_main$a, { name: "palette-swatch" }),
                  _hoisted_11
                ], 8, _hoisted_10)
              ]),
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("button", {
                  class: "btn btn-sm btn-outline-danger wide",
                  onClick: deleteSection
                }, [
                  createVNode(_sfc_main$a, { name: "delete-outline" })
                ])
              ])
            ])
          ]),
          !unref(_state).collapsed ? (openBlock(), createElementBlock("div", _hoisted_13, [
            createBaseVNode("div", _hoisted_14, [
              withDirectives(createBaseVNode("input", {
                class: "form-control sec-header-title",
                type: "text",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(M_title) ? M_title.value = $event : null)
              }, null, 512), [
                [vModelText, unref(M_title)]
              ]),
              createBaseVNode("div", _hoisted_15, [
                withDirectives(createBaseVNode("textarea", {
                  class: "form-control sec-header-text",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(M_headerText) ? M_headerText.value = $event : null),
                  placeholder: "..."
                }, null, 512), [
                  [vModelText, unref(M_headerText)]
                ]),
                _hoisted_16
              ]),
              createBaseVNode("div", _hoisted_17, [
                withDirectives(createBaseVNode("textarea", {
                  class: "form-control sec-header-text",
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
        createVNode(_sfc_main$6, {
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
        createVNode(_sfc_main$6, {
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
                createVNode(_sfc_main$a, { name: "key-plus" })
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
var SectionView = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-2777ce2c"]]);
const _hoisted_1$2 = { key: 0 };
const _hoisted_2$1 = { key: 1 };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("p", null, "No Sections", -1);
const _hoisted_4 = [
  _hoisted_3
];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  props: {
    pageId: String
  },
  setup(__props) {
    const props = __props;
    useRoute();
    const store = useStore(editorStoreKey);
    const findSections = computed(() => store.getters["project/findChildrenIds"](props.pageId));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        unref(findSections) && unref(findSections).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(findSections), (sectionId) => {
            return openBlock(), createBlock(SectionView, { sectionId }, null, 8, ["sectionId"]);
          }), 256))
        ])) : createCommentVNode("", true),
        !unref(findSections) || unref(findSections).length === 0 ? (openBlock(), createElementBlock("div", _hoisted_2$1, _hoisted_4)) : createCommentVNode("", true)
      ], 64);
    };
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  setup(__props) {
    const store = useStore(editorStoreKey);
    const findPages = computed(() => store.getters["project/findChildrenIds"]("__pages__"));
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(unref(findPages), (pageId) => {
        return openBlock(), createElementBlock("div", null, toDisplayString(pageId), 1);
      }), 256);
    };
  }
});
const _sfc_main$2 = {};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("b", null, "Settings");
}
var EditorSettings = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render]]);
const _hoisted_1$1 = /* @__PURE__ */ createBaseVNode("h1", null, "Viewer", -1);
const _hoisted_2 = [
  _hoisted_1$1
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
    path: "/edit/:project",
    component: _sfc_main$9,
    children: [
      { name: "edit_pages", path: "pages", alias: "", component: _sfc_main$3 },
      {
        name: "edit_section",
        path: "pages/:pageId/sections",
        component: _sfc_main$4,
        props: true
      },
      { name: "edit_settings", path: "settings", component: EditorSettings }
    ]
  },
  { name: "view", path: "/view/:project", component: _sfc_main$1 }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
var App_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { id: "app" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_router_view)
      ]);
    };
  }
});
var materialdesignicons_min = "";
var bootstrap_min = "";
const app = createApp(_sfc_main);
app.use(homeStore, homeStoreKey);
app.use(editorStore, editorStoreKey);
app.use(router);
app.mount("#app");
