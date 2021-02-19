<template>
  <div>
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

    <div v-if="resultDetail !== null" class="mt-3 d-center">
      <div class="card">
        <h1>Results For Question #{{ this.$route.params.pollId }}</h1>
        <h3 class="mb-2">{{ resultDetail.question_text }}</h3>

        <div v-if="resultDetail.choices">
          <div v-if="resultDetail.choices.length > 0">
            <div
              class="d-flex"
              v-for="(choice, index) in resultDetail.choices"
              :key="'ch' + index"
            >
              <p>
                {{ choice.choice_text }}
              </p>
              <p>
                {{ choice.votes }} <span v-if="choice.votes > 1">votes</span>
                <span v-if="choice.votes <= 1">vote</span>
              </p>
            </div>
          </div>
          <div v-else>
            <p>No results for this question yet</p>
          </div>
        </div>
      </div>
    </div>
    <div class="d-center mt-2" v-if="resultDetail !== null">
      <button class="btn btn-grey mr">
        <router-link to="/polls">Back To Polls</router-link>
      </button>
      <button class="btn btn-vote" @click="goToQuestionDetail">
        Vote Again
      </button>
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
            // console.log('deets: ', res.data);
            this.resultDetail = { ...res.data };
            this.isLoading = false;
          }
        })
        .catch((error) => {
          if (error) {
            // console.log('error: ', error);
            this.isLoading = false;
            return;
          }
        });
    },

    goToQuestionDetail() {
      this.$router.push({
        name: 'PollDetail',
        params: { questionId: this.$route.params.pollId },
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
.d-flex {
  display: flex;
  justify-content: space-between;
}

.d-left {
  text-align: left;
}

.d-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
