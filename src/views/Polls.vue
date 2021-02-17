<template>
  <div class="polls">
    <div class="pollcard">
    <PollCard />
    <PollCard />
    </div>
  </div>
</template>

<script>
import PollCard from '@/components/PollCard.vue'
export default {
  name: 'Polls',
  components: {
    PollCard,
  }
}
</script>

<style scoped>
.polls {
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
}

.pollcard {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 1rem;
  width: 70vw;
  max-width: 70%;
}

</style>
