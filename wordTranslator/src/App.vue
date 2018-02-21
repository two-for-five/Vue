<template>
  <div id="app" class="text-center">
    <h1>Word Translator</h1>
    <h5>Powered By Vue.js</h5>
    <TranslateForm v-on:formSubmit="translateText"></TranslateForm>
    <TranslateOutput v-text="translatedText"></TranslateOutput>
  </div>
</template>

<script>
import TranslateForm from './components/TranslateForm';
import TranslateOutput from './components/translateOutput';

export default {
  name: 'App',
  components:{
    TranslateForm,
    TranslateOutput
  },
  data: function(){
    return{
      translatedText:''
    }
  },
  methods:{
    translateText: function(text, language){
      this.$http.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180221T052803Z.c9db1f8f6e202fdb.f527bbf56ffe8584f7610fbab732b8f25c2c082c&lang=${language}&text=${text}`)
      .then((response) =>{
        this.translatedText=response.body.text[0];
      });
    }
  }
}
</script>

<style>
#body {
  background: #fefefe;
}
</style>
