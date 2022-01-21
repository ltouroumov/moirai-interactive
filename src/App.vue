<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {Choice, Section} from "./data/model";
import SectionView from "./components/SectionView.vue";

const sections = [
  new Section("Section 1", "blah blah blah", [
    new Choice("Foo", "foo bar baz"),
    new Choice("Foo", "foo bar baz"),
    new Choice("Foo", "foo bar baz"),
    new Choice("Foo", "foo bar baz"),
    new Choice("Foo", "foo bar baz"),
  ]),
  new Section("Section 2", "blah blah blah", [
    new Choice("Foo", "foo bar baz"),
    new Choice("Foo", "foo bar baz"),
    new Choice("Foo", "foo bar baz"),
    new Choice("Foo", "foo bar baz"),
    new Choice("Foo", "foo bar baz"),
  ]),
]
</script>

<template>
  <SectionView v-for="section in sections" :section="section" />
</template>

<style>
.sec-objects .sec-choices {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-auto-flow: row;
  grid-gap: 5px;
}

.sec-objects .sec-choices .choice {
  justify-self: stretch;
  align-self: stretch;
  border: 2px solid black;
  border-radius: 5px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
