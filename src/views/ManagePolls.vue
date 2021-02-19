<template>
  <div class="polls">
    <!-- <button class="btn btn-grey" @click="show">Show Modal</button> -->
    <modal name="edit-question">
      <!-- <button @click="hide">hide</button> -->
      <div style="padding: 2rem;">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          quod et minima eligendi enim est magnam iste aut, nostrum voluptate
          cupiditate quidem illum incidunt atque officiis deleniti quas sapiente
          quis eum dolore expedita fugit ex. Quod molestias illo unde eligendi
          minus magni praesentium id sint?
        </p>
      </div>
    </modal>

    <modal name="add-choice">
      <!-- <button @click="hide">hide</button> -->
      <div style="padding: 2rem;" v-if="selectedQuestionForChoices !== null">
        <form @submit.prevent="createNewChoiceForQuestion">
          <h2 class="mb-1">
            Add A New Choice to Question #{{ selectedQuestionForChoices.id }}
          </h2>
          <p>
            {{ selectedQuestionForChoices.question_text }}
          </p>

          <div class="form-group">
            <label for="newChoice">Choice</label>
            <input
              required
              type="text"
              id="newChoice"
              v-model="choice_text"
              placeholder="Enter new choice"
              class="form-control"
            />
          </div>

          <input
            type="submit"
            value="Create New Choice"
            class="btn btn-block btn-vote mt-3"
          />
        </form>
      </div>
    </modal>

    <modal name="new-question">
      <!-- <button @click="hide">hide</button> -->
      <div style="padding: 2rem;">
        <form @submit.prevent="createNewQuestion">
          <h2 class="mb-1">Create A New Poll Question</h2>
          <div class="form-group">
            <label for="question_text">Question</label>
            <input
              type="text"
              id="question_text"
              v-model="question_text"
              class="form-control"
              placeholder="Enter new question"
              required
            />
          </div>

          <div class="form-group">
            <label for="pub_date">Date published</label>
            <input
              type="date"
              v-model="pub_date"
              required
              id="pub_date"
              class="form-control"
            />
          </div>

          <input
            type="submit"
            value="Create New Question"
            class="btn btn-block btn-vote mt-3"
          />
        </form>
      </div>
    </modal>
    <div class="d-flex mt-3">
      <button class="btn btn-results mr" @click="showForNewChoices">
        Add choices to a question
      </button>
      <button class="btn btn-vote mr" @click="showForNewQuestion">
        Add a new question
      </button>
      <button class="btn btn-results" @click="showQuestionsForUpdateOrDelete">
        Update or Delete a question
      </button>
    </div>

    <div
      class="pollcards"
      v-if="!isLoading && (forUpdateOrDelete || forChoices)"
    >
      <div v-for="(question, index) in questions" :key="'q' + index">
        <div class="card">
          <h3 class="mb-3">{{ question.question_text }}</h3>
          <button class="btn btn-vote mr" v-if="forUpdateOrDelete">
            Edit
          </button>
          <button v-if="forUpdateOrDelete" class="btn btn-results">
            Delete
          </button>
          <button
            class="btn btn-vote"
            v-if="forChoices"
            @click="prefillNewChoiceModal(question)"
          >
            Add Choices
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import vmodal from 'vue-js-modal';
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(vmodal);
Vue.use(VueToast);

export default {
  name: 'ManagPolls',
  components: {},
  data: () => {
    return {
      forUpdateOrDelete: false,
      forNewQuestion: false,
      forChoices: false,
      questions: [],
      isLoading: false,
      selectedQuestionForChoices: null,
      // Form controls
      question_text: '',
      pub_date: '',
      choice_text: '',
    };
  },
  methods: {
    show() {
      this.$modal.show('edit-question');
    },
    hide() {
      this.$modal.hide('edit-question');
    },

    showNewQuestionModal() {
      this.$modal.show('new-question');
    },
    hideNewQuestionModal() {
      this.$modal.hide('new-question');
    },

    showModalForNewChoice() {
      this.$modal.show('add-choice');
    },

    hideModalForNewChoice() {
      this.$modal.hide('add-choice');
    },

    showQuestionsForUpdateOrDelete() {
      this.forChoices = false;
      this.forUpdateOrDelete = !this.forUpdateOrDelete;
      console.log('for update/delete');
    },

    showForNewQuestion() {
      this.forNewQuestion = !this.forNewQuestion;
      if (this.forNewQuestion) {
        this.showNewQuestionModal();
      }
    },

    showForNewChoices() {
      this.forUpdateOrDelete = false;
      this.forChoices = !this.forChoices;
      console.log('for choices');
    },
    getAllPolls() {
      this.isLoading = true;
      axios
        .get('http://127.0.0.1:8001/api/v1/polls/questions/')
        .then((res) => {
          if (res.data) {
            this.questions = res.data;
            console.log('q: ', this.questions);
            this.isLoading = false;
          }
        })
        .catch((error) => {
          console.log('error: ', error);
          this.isLoading = false;
        });
    },

    prefillNewChoiceModal(questionSelected) {
      if (questionSelected) {
        this.selectedQuestionForChoices = questionSelected;
        this.showModalForNewChoice();
        // console.log('q: ', questionSelected);
      }
    },

    // API Calls
    sendQuestionPayload(payloadForNewQuestion) {
      if (payloadForNewQuestion) {
        const { question_text, pub_date } = payloadForNewQuestion;
        if (question_text !== '' || pub_date !== null) {
          axios
            .post(
              'http://127.0.0.1:8001/api/v1/polls/questions/',
              payloadForNewQuestion,
            )
            .then((res) => {
              if (res.data) {
                this.hideNewQuestionModal();
                this.question_text = '';
                this.pub_date = '';
                console.log('newQ: ', res);
                Vue.$toast.open({
                  message: res.data.message,
                  type: 'success',
                });
                this.getAllPolls();
              }
            })
            .catch((error) => {
              if (error) {
                console.log('error: ', error);
                if (error['pub_date']) {
                  Vue.$toast.open({
                    message: `Publish date: ${error['pub_date']}`,
                    type: 'error',
                  });
                } else {
                  Vue.$toast.open({
                    message: 'An error occurred',
                    type: 'error',
                  });
                }
              }
            });
        }
      }
    },
    sendNewChoicePayload(payload) {
      if (payload) {
        const { questionId, choice_text } = payload;
        if (questionId !== null || choice_text !== null) {
          axios
            .post(
              `http://127.0.0.1:8001/api/v1/polls/questions/${questionId}/choices/`,
              {
                choice_text: choice_text,
              },
            )
            .then((res) => {
              if (res.data) {
                if (res.data.error === true) {
                  Vue.$toast.open({
                    message: res.data.message,
                    type: 'error',
                  });
                  this.hideModalForNewChoice();
                  this.choice_text = '';
                } else {
                  this.hideModalForNewChoice();
                  Vue.$toast.open({
                    message: 'New choice added',
                    type: 'success',
                  });
                  this.choice_text = '';
                  this.getAllPolls();
                }
              }
            })
            .catch((error) => {
              console.log('error: ', error);
            });
        }
      }
    },

    createNewQuestion() {
      const payload = {
        question_text: this.question_text,
        pub_date: this.pub_date,
      };
      if (payload.pub_date) {
        payload.pub_date = payload.pub_date + 'T00:00';
      }
      console.log('payload: ', payload);
      this.sendQuestionPayload(payload);
    },

    createNewChoiceForQuestion() {
      const payload = {
        questionId: this.selectedQuestionForChoices.id,
        choice_text: this.choice_text,
      };
      console.log('payload for new choice: ', payload);
      this.sendNewChoicePayload(payload);
    },
  },

  created() {
    this.getAllPolls();
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
  justify-content: space-around;
}

.pollcards {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
  max-width: 90%;
}
.form-group:not(:last-of-type) {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
}
.form-group .form-control {
  padding: 0.5rem;
  width: 70%;
}

@media screen and (max-width: 640px) {
  .pollcards {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .d-flex {
    display: flex;
    flex-direction: column;
  }

  .d-flex button {
    margin-bottom: 0.5rem;
  }
}

@media screen and (max-width: 768px) {
  .pollcards {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
    max-width: 70%;
  }
}
</style>
