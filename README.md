<h1 align="center">Moirai - The Interactive CYOA Builder</h1>

<p align="center">
<a href="https://github.com/ltouroumov/moirai-interactive/actions/workflows/editor-deployment.yml">
  <img alt="GitHub Workflow Status (branch)" src="https://img.shields.io/github/workflow/status/ltouroumov/moirai-interactive/editor-deployment/main?label=Editor%20Deployment&logo=github">
</a>

<a href="https://github.com/ltouroumov/moirai-interactive/releases">
    <img src="https://img.shields.io/github/v/release/ltouroumov/moirai-interactive.svg?logo=github&style=flat&label=Release" alt="Release version badge">
</a>
</p>

<p align="center">https://ltouroumov.github.io/moirai-interactive/editor/</p>

TODO: A proper description

## Features (In Progress)

### General

* [ ] Responsive Design (Mobile & Desktop)
* [ ] Editor
* [ ] Viewer
  * [ ] View projects from DB
  * [ ] View projects from URL
  * [ ] View projects from cloud storage?
    * [ ] Google Drive
    * [ ] DropBox
    * [ ] OneDrive
* [ ] Import Project (JSON)
* [ ] Export Project (JSON)

### Structure

* [ ] Pages
  * [ ] Top Level Pages
  * [ ] Nested Pages
  * [ ] Template (can be used by Instance List)
* [ ] Sections
  * [ ] Header & Footer Text
  * [ ] Choices
  * [ ] Text Components (Titles & Descriptions)
  * [ ] Instance List (Template Page)
  * [ ] Choice List (Pick from Sub-page)
* [ ] Choices
  * [ ] Choice Groups (limit number per group)
  * [ ] Text (no-selection)
  * [ ] Form Choice (inputs)
  * [ ] Link to subpage
* [ ] Instances (of page)
  * [ ] Name & Description
  * [ ] User Image
* [ ] Options
  * [ ] Simple (sub-choice)
  * [ ] Instance List (Page)

### Interactivity

* [ ] Score Types
  * [ ] Points
  * [ ] Computed
* [ ] Expression Language
  * [ ] Control Section/Choice/Option properties with expressions
  * [ ] Use expressions to back some features transparently
    * Requirements
    * Incompatibilities
    * Auto activate / deactivate
    * Choice groups

### Content

* [ ] Markdown in descriptions
* [ ] Custom tags to reference another object
* [ ] Custom tags to display values (scores, etc.)

### Media Library

* [ ] Project-wide media library
* [ ] Interface with style system

### Style System

* [ ] Define styles per component type
  * [ ] Default styles
  * [ ] Named styles
* [ ] Each component can select a style from the library 

### Export options

* [ ] HTML Export
  * Generate static HTML from project
  * Lightweight JS library
  * Compile styles as CSS
  * Export images in a separate directory
