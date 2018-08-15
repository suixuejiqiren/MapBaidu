<template>
  <label class="mainInput">
    <span>
      {{label}}
    </span>
    <input  class="map-input" v-model="inputValue">
  </label>

</template>

<script>
    export default {
        name: "mapInput",
      props:{
        value:{
          type:String,
          require:true
        },
        label:{
          type: String,
          default:'text'
        },
        type: {
          type: String
        }
      },
      data(){
          return{
            inputValue:this.value
          }
      },
      watch:{
          value(val){
            this.inputValue=val;
          },
        inputValue(val){
            this.$emit('input',val)
        }
      }
    }
</script>

<style scoped>
  .mainInput{
    display: flex;
    border-radius: 4px;
    padding: 5px;
    border: 1px solid #ddd;
    margin: 10px;
    height: 40px;
  }
  .mainInput .map-input{
    flex-grow: 1;
    font-size: 14px;
    outline: none;
    border: none;
  }
  .mainInput span{
    height: 40px;
    line-height: 40px;
    width: 60px;
    font-weight: 500;
  }
</style>
