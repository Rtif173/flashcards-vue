<template>
  <header>
    <img class="logo-image" src="../../assets/img/logo-big.svg" />
    <div class="links-wrapper">
      <ul>
        <li>
          <a href="#/">Файлы</a>
        </li>
        <li>
          <a href="#/learn">Карточки</a>
        </li>
      </ul>
    </div>
  </header>
</template>
<style scoped>
header {
  position: fixed;
  top:0;
  display: flex;
  box-sizing: content-box;
  height: 2rem;
  padding: 1rem;
  backdrop-filter: blur(5px);
  width: 100%;
  background-color: #fffc;
}

.links-wrapper ul {
  display: flex;
  margin:0;
  padding:0;
}

.links-wrapper li {
  list-style-type: none;
  margin: 0 0.25rem 0 0.25rem;
}

.links-wrapper a{
  padding: .25rem;
}
.logo-image {
  margin-top: -0.3%;
  height: 100%
}
</style>