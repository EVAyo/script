<template>
  <div id="app-root">
      <router-view />
  </div>
</template>

<style>
html {
  max-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: overlay;
  overscroll-behavior: none;
}
#app-root {
  background: #2b343a;
}
</style>
