---
title: How the app is being built
date: 2026-11-02 23:09 -0600
topic: app
authors:
  - Evan R. Reumann
---

Minnesota Cardboard is a native desktop app written in C++ with
[wxWidgets](https://www.wxwidgets.org/). wxWidgets uses each system's own
buttons, menus and windows, so the app looks and feels at home on Windows,
macOS and Linux, from one codebase.

The plan is a single main window that holds everything, the way VS Code or a
web browser does, instead of a pile of separate windows.

The project is set up and built with
[QCDX](https://github.com/cooldood155/QCDX), my open-source kit for C and C++
projects. It handles the CMake and Conan setup, and its `pk` command creates,
builds and checks projects, so the app's own code can stay focused on cards.

More technical posts like this one will go under the App tab as the app takes
shape.
