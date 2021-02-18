<template>
  <div class="card">
    <h3 class="mb-3">{{ question.question_text }}</h3>
    <button class="btn btn-vote mr" @click="goToQuestionDetail">
      Vote Now
    </button>
    <button class="btn btn-results" @click="goToResultsDetail">Results</button>
  </div>
</template>

<script>
export default {
  name: 'PollCard',
  components: {},
  props: ['question'],
  methods: {
    goToQuestionDetail() {
      this.$router.push({
        name: 'PollDetail',
        params: { questionId: this.question.id },
      });
    },

    goToResultsDetail() {
      this.$router.push({
        name: 'Results',
        params: { pollId: this.question.id },
      });
    },
  },
};
</script>

<style></style>
