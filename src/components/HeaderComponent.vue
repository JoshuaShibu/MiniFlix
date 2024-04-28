<template>
  <header class="header">
    <div class="logo-div" @click="this.$router.push('/')">
      <img src="../assets/images/logo.png" alt="Logo">
      <nav class="nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">TV Shows</a></li>
        <li><a href="#">Movies</a></li>
        <li><a href="#">New & Popular</a></li>
      </ul>
    </nav>
    </div>
    <div class="search-bar">
      <input type="text" class="search-input" placeholder="Search Movies ...">
      <button class="search-button">Search</button>
    </div>
  </header>
</template>
<script>

export default {
  name: 'HeaderComponent',
}
</script>