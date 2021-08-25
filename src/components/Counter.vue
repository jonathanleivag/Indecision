<template>
  <h2>{{titleDefault}}</h2>
  <p>{{counter}} <sup>2</sup> = {{squareValue}} </p>
  <p data-test-id="counter" >{{counter}} </p>
  <div>
      <button @click="increase">+1</button>
      <button @click="decrease">-1</button>
  </div>
</template>

<script>
export default {
    props:{
        start: {
            type: Number,
            default: 100,
            validator(value){
                return value >= 0
            }
        },
        title: {
            type: String
        }
    },
    name:'counter',
    data(){
        return {
            counter: this.start
        }
    },
    methods: {
        increase(){
            this.counter++
        },
        decrease(){
            this.counter--
        }
    },
    computed: {
        squareValue(){
            return this.counter*this.counter
        },
        titleDefault(){
            return this.title || 'Contador'
        }
    }
}
</script>

<style>

button {
    background-color: #64bb87;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 15px;
    transition: 0.3s ease-in-out;
}

button:hover{
    background-color: #5aa67b;
    transition: 0.3s ease-in-out;
}

</style>