<template>
  <div class="polls">
    <div class="sk-chase" v-if="isLoading">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Results',
  components: {},
  data: () => {
    return {
      isLoading: false,
      resultDetail: null,
    };
  },
  methods: {
    getQuestionResults(pollId) {
      this.isLoading = true;
      axios
        .get(`http://127.0.0.1:8001/api/v1/polls/questions/${pollId}/result/`)
        .then((res) => {
          if (res.data) {
            console.log('deets: ', res.data);
            this.resultDetail = { ...res.data };
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.log('error: ', error);
          this.isLoading = false;
        });
    },
  },
  created() {
    let pollId = this.$route.params.pollId;
    this.getQuestionResults(pollId);
  },
};
</script>

<style scoped>
.polls {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
