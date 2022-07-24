<template>
  <main>
    <div>
      <h1>Welcome To My Magic Book List!</h1>
      <RouterLink to="/books">
        Get In!
      </RouterLink>
    </div>
  </main>
</template>
<style lang="scss" scoped>
  h1{
    text-align: center;
    font-size: calc(100vw/40);
  }
  a {
    font-size: 2rem;
    text-align: center;
    font-size: calc(100vw/50);
  }
  main {
    margin: 0 auto;

    div {
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
