<template>
  <div>
    <div class="polls-2">
      <button class="btn btn-grey mt-2">
        <router-link to="/polls">
          Back To Polls
        </router-link>
      </button>
    </div>
    <div class="polls">
      <div class="sk-chase" v-if="isLoading">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>

      <form
        @submit.prevent="voteForQuestion"
        class="card mt-3"
        v-if="questionDetail !== null"
      >
        <h1>Question #{{ this.$route.params.questionId }}</h1>
        <h3 class="mb-2">{{ questionDetail.question_text }}</h3>

        <div v-if="questionDetail.choices">
          <div v-if="questionDetail.choices.length > 0">
            <div>
              <label
                :for="index"
                v-for="(choice, index) in questionDetail.choices"
                :key="'ch' + index"
              >
                <input
                  type="radio"
                  :id="index"
                  class="mb-1"
                  :value="choice.id"
                  :checked="choice.id == selectedChoiceId"
                  v-model="selectedChoiceId"
                />
                {{ choice.choice_text }}

                <br />
              </label>
            </div>
          </div>

          <div v-else>
            <p>No choices yet</p>
          </div>

          <button
            :disabled="selectedChoiceId === null"
            type="submit"
            class="btn btn-block mt-2 btn-results"
          >
            Vote
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueToast from 'vue-toast-notification';
import Vue from 'vue';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);
export default {
  name: 'PollDetail',
  components: {},
  data: () => {
    return {
      questionDetail: {},
      isLoading: false,
      selectedChoiceId: null,
    };
  },
  methods: {
    getQuestionDetails(quesId) {
      this.isLoading = true;
      axios
        .get(`http://127.0.0.1:8001/api/v1/polls/questions/${quesId}/`)
        .then((res) => {
          if (res.data) {
            this.questionDetail = { ...res.data };
            console.log('q: ', this.questionDetail);
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.log('error: ', error);
          this.isLoading = false;
        });
    },

    goToResultsDetail(quesId) {
      this.$router.push({
        name: 'Results',
        params: { pollId: quesId },
      });
    },

    voteForQuestion() {
      const newVote = {
        choice_id: this.selectedChoiceId,
        questionId: this.$route.params.questionId,
      };

      if (newVote) {
        axios
          .patch(
            `http://127.0.0.1:8001/api/v1/polls/questions/${newVote.questionId}/vote/`,
            {
              choice_id: newVote.choice_id,
            },
          )
          .then((res) => {
            if (res.data) {
              Vue.$toast.open({
                message: res.data.message,
                type: 'success',
              });
            }
            this.goToResultsDetail(newVote.questionId);
          })
          .catch((error) => {
            console.log('error: ', error);
            Vue.$toast.open({
              message: 'An error occurred',
              type: 'error',
            });
          });
      }
    },
  },

  created() {
    let questionId = this.$route.params.questionId;
    this.getQuestionDetails(questionId);
  },
};
</script>

<style scoped></style>
