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

    <div class="pollcards" v-if="!isLoading">
      <div v-for="(question, index) in questions" :key="'q' + index">
        <div>
          <PollCard :question="question" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PollCard from '@/components/PollCard.vue';
export default {
  name: 'Polls',
  components: {
    PollCard,
  },

  data: () => {
    return {
      questions: [],
      isLoading: false,
    };
  },
  methods: {
    getAllPolls() {
      this.isLoading = true;
      axios
        .get('http://127.0.0.1:8001/api/v1/polls/questions/')
        .then((res) => {
          if (res.data) {
            this.questions = res.data;
            // console.log('q: ', this.questions);
            this.isLoading = false;
          }
        })
        .catch((error) => {
          if (error) {
            // console.log('error: ', error);
            this.isLoading = false;
          }
        });
    },
  },

  created() {
    this.getAllPolls();
  },
};
</script>

<style scoped>
.polls {
  display: flex;
  flex-direction: column;
  align-items: center;
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
