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
          <button class="btn btn-vote" v-if="forChoices">Add Choices</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import vmodal from 'vue-js-modal';
import Vue from 'vue';

Vue.use(vmodal);
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
    };
  },
  methods: {
    show() {
      this.$modal.show('edit-question');
    },
    hide() {
      this.$modal.hide('edit-question');
    },

    showQuestionsForUpdateOrDelete() {
      this.forChoices = false;
      this.forUpdateOrDelete = !this.forUpdateOrDelete;
      console.log('for update/delete');
    },

    showForNewQuestion() {
      this.forNewQuestion = !this.forNewQuestion;
      console.log('for new ques');
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

@media screen and (max-width: 640px) {
  .pollcards {
    display: flex;
    align-items: center;
    flex-direction: column;
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
