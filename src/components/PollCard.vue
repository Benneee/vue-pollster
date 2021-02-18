<template>
  <div class="card">
    <h3 class="mb-3">{{ question.question_text }}</h3>
    <button class="btn btn-vote mr" @click="goToQuestionDetail">
      Vote Now
    </button>
    <button class="btn btn-results">Results</button>
  </div>
</template>

<script>
export default {
  name: 'PollCard',
  components: {},
  props: ['question'],
  methods: {
    goToQuestionDetail() {
      console.log('Q-ID: ', this.question.id);
    },
  },
};
</script>

<style>
.card {
  width: 30vw;
  /* text-align: center; */
  height: 98px;
  padding: 1.25rem 1rem 2.2rem 1rem;
  box-shadow: 0 1.5px 3px 0 rgba(182, 11, 11, 0.2);
  transition: 0.3s;
  background-color: rgb(228, 208, 208);
}

.card h1 {
  border-bottom: 3px solid rgb(206, 48, 48);
  margin-bottom: 1.5rem;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 648px) {
  .card {
    width: 80vw;
    height: 20vh;
  }
}
</style>
