<template>
  <div class="header-wrapper">
    <nav>
      <ul>
        <li>
          <picture>
            <source media="(min-width:420px)" srcset="../../assets/img/logo-big.svg">
            <source media="(min-width:260px)" srcset="/logo-small.svg">
            <img class="logo-image" src="/logo-extra-small.svg" />
          </picture>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#/">Файлы</a>
        </li>
        <li>
          <a href="#/learn">Карточки</a>
        </li>
      </ul>
    </nav>
    <div class="under-header"></div>
  </div>
</template>
<style scoped>
.header-wrapper {
  --header-height: 2rem;
  position: fixed;
  height: fit-content;
  width: 100%;
  top: 0;
  backdrop-filter: blur(5px);
  border-bottom: var(--border-width) solid var(--muted-border-color);
  padding: 0 var(--big-padding);
}

.under-header {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--background-color);
  opacity: 0.5;
  z-index: -1;
}

/* header {
  position: fixed;
  top: 0;
  display: flex;
  box-sizing: content-box;
  height: 2rem;
  padding: 1rem;
  backdrop-filter: blur(5px);
  width: 100%;
  z-index: 3;
} */

/* .links-wrapper ul {
  display: flex;
  margin: 0;
  padding: 0;
}

.links-wrapper li {
  list-style-type: none;
  margin: 0 0.25rem 0 0.25rem;
}

.links-wrapper a {
  padding: .25rem;
} */

.logo-image {
  margin-top: -0.3%;
  max-height: var(--header-height);
}
</style>