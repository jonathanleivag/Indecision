<template>
  <img v-if="image" :src="image" alt="bg" />
  <div class="bg-dark"></div>
  <div class="indecision-container">
    <input v-model="question" type="text" placeholder="Hazme una pregunta" />
    <p>Recuerda de terminar la pregunta con un signo de interrogación (?)</p>
    <div v-if="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indecision',
  data () {
    return {
      question: null,
      answer: null,
      image: null,
      isValidQuestion: false
    }
  },
  methods: {
    async getAnswer () {
      this.answer = 'pensando...'
      try {
        const { answer, image } = await window
        .fetch('https://yesno.wtf/api')
        .then(response => response.json())
        const resSpanish = { yes: 'Si', no: 'No', maybe: 'Puede ser' }
        this.answer = resSpanish[answer]
        this.image = image
      } catch (e) {
        this.answer = 'error'
      }
    }
  },
  watch: {
    question (value) {
      console.log({value});
      if (!value.includes('?')) {
        this.isValidQuestion = false
        this.image = null
        this.answer = null
      } else {
        this.isValidQuestion = true
        this.getAnswer()
      }
    }
  }
}
</script>

<style scoped>
img,
.bg-dark {
  height: 100vh;
  left: 0px;
  max-height: 100%;
  max-width: 100%;
  position: fixed;
  top: 0px;
  width: 100vw;
}

.bg-dark {
  background-color: rgba(0, 0, 0, 0.4);
}

.indecision-container {
  position: relative;
  z-index: 99;
}

input {
  width: 250px;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
}
input:focus {
  outline: none;
}

p {
  color: white;
  font-size: 10px;
  margin-top: 10px;
}

h1,
h2 {
  color: white;
}

h2 {
  margin-top: 150px;
}
</style>
