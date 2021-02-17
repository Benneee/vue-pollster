<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  name: 'app',
  components: {
    Header,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
#app {
  font-family: 'Josefin Sans', sans-serif;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nav .title a.router-link-exact-active,
.nav .links a.router-link-exact-active {
  text-decoration: underline;
}

.sk-chase {
  width: 40px;
  height: 40px;
  position: relative;
  margin: 2rem auto;
  animation: sk-chase 2.5s infinite linear both;
}

.sk-chase-dot {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
}

.sk-chase-dot:before {
  content: '';
  display: block;
  width: 25%;
  height: 25%;
  background-color: red;
  border-radius: 100%;
  animation: sk-chase-dot-before 2s infinite ease-in-out both;
}

.sk-chase-dot:nth-child(1) {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2) {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3) {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4) {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5) {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6) {
  animation-delay: -0.6s;
}
.sk-chase-dot:nth-child(1):before {
  animation-delay: -1.1s;
}
.sk-chase-dot:nth-child(2):before {
  animation-delay: -1s;
}
.sk-chase-dot:nth-child(3):before {
  animation-delay: -0.9s;
}
.sk-chase-dot:nth-child(4):before {
  animation-delay: -0.8s;
}
.sk-chase-dot:nth-child(5):before {
  animation-delay: -0.7s;
}
.sk-chase-dot:nth-child(6):before {
  animation-delay: -0.6s;
}

@keyframes sk-chase {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot {
  80%,
  100% {
    transform: rotate(360deg);
  }
}

@keyframes sk-chase-dot-before {
  50% {
    transform: scale(0.4);
  }
  100%,
  0% {
    transform: scale(1);
  }
}

.mb-2 {
  margin-bottom: 1.5rem;
}
.mb-1 {
  margin-bottom: 1rem;
}

.mb-3 {
  margin-bottom: 2rem;
}

.my-2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.mr {
  margin-right: 1rem;
}
.ml {
  margin-left: 1rem;
}
.btn-vote {
  padding: 0.3rem;
  color: #fff;
  border-radius: 3px;
  border-color: grey;
  background-color: rgb(70, 176, 70);
}

.btn-results {
  padding: 0.3rem;
  color: #fff;
  border-radius: 3px;
  border-color: #fff;
  background-color: rgb(167, 60, 60) ;
}
</style>
