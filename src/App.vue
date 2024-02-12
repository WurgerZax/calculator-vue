<template>
  <div class="tw-mockup-phone" :data-theme="darkTheme ? '' : 'nord'">
    <div class="tw-camera"></div>
    <div class="tw-display">
      <div class="tw-artboard tw-artboard-demo tw-phone-1 tw-justify-between">
        <div class="tw-flex tw-items-center tw-mt-10 tw-justify-between tw-bg-base-100 tw-rounded-lg tw-w-full tw-h-20">
          <img src="./assets/logo.png" class="tw-w-8 tw-h-8 tw-cursor-pointer tw-transition-all" :class="[darkTheme ? '' : 'tw-brightness-80 tw-hue-rotate-60 tw-rotate-180' ]" @click="darkTheme=!darkTheme"/>
          <div class="tw-flex tw-flex-col tw-w-11/12 tw-gap-3">
            <p class="tw-text-xs tw-text-right tw-transition-all">{{ currentOperation }}</p>
            <p class="tw-text-xl tw-text-right">{{ currentResult }}</p>
          </div>
        </div>
        <div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-3 tw-bg-base-100 tw-w-full tw-h-3/4 tw-p-2 tw-rounded-lg">
          <BtnComponent v-for="btn in btnValuesArray" :key="btn.type" :btnData="btn" @sended-BtnValue="handleInfo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BtnComponent from "./components/BtnComponent.vue";
import Button from "./types/btnType";

export default defineComponent({
  name: "App",
  components: {
    BtnComponent,
  },
  setup(){
    const btnWidth1 = 'tw-w-16' as string;
    const btnWidth2 = 'tw-w-32' as string;

    const btnValuesArray = ref<Button[]>([
      { type: 7, width: btnWidth1, special: 'number'},
      { type: 8, width: btnWidth1, special: 'number'},
      { type: 9, width: btnWidth1, special: 'number'},
      { type: 'DEL', width: btnWidth1, special: 'command'},
      { type: 4, width: btnWidth1, special: 'number'},
      { type: 5, width: btnWidth1, special: 'number'},
      { type: 6, width: btnWidth1, special: 'number'},
      { type: '+', width: btnWidth1, special: 'operation'},
      { type: 1, width: btnWidth1, special: 'number'},
      { type: 2, width: btnWidth1, special: 'number'},
      { type: 3, width: btnWidth1, special: 'number'},
      { type: '-', width: btnWidth1, special: 'operation'},
      { type: '.', width: btnWidth1, special: 'operation'},
      { type: 0, width: btnWidth1, special: 'number'},
      { type: '/', width: btnWidth1, special: 'operation'},
      { type: '*', width: btnWidth1, special: 'operation'},
      { type: 'RESET', width: btnWidth2, special: 'command'},
      { type: '=', width: btnWidth2, special: 'command'},
    ])

    return { btnValuesArray }
  },
  data(){
    return {
      currentOperation: '' as string,
      currentResult: '' as string | number,
      darkTheme: true as boolean
    }
  },
  methods:{
    handleInfo(value: string){
      switch(value as Button["type"]){
        case 'DEL':{
          this.currentOperation = this.currentOperation.slice(0, -1);
          break;
        }
        case '=':{
          const operator = this.currentOperation.match(/[+\-*/]/);
          if (operator) {
            const parts = this.currentOperation.split(operator[0]);
            if (parts.length === 2) {
              const leftOperand = parseFloat(parts[0]);
              const rightOperand = parseFloat(parts[1]);
              let result;

              switch (operator[0]) {
                case '+':{
                  result = leftOperand + rightOperand;
                  break;
                } 
                case '-':{
                  result = leftOperand - rightOperand;
                  break;
                }   
                case '*':{
                  result = leftOperand * rightOperand;
                  break;
                }   
                case '/':{
                  result = leftOperand / rightOperand;
                  break;
                }
                default:{
                  result = "Invalid operator";
                }
              }
              this.currentResult = result.toString();
              this.currentOperation = '';
            }
          }
          break;
        }
        case 'RESET':{
          this.currentOperation = '';
          this.currentResult = '';
          break;
        }
        default:{
          if(this.currentOperation === '' && value === '.') {
            this.currentOperation = '0.'; 
            return;
          }
          if(this.currentOperation === '' && (value === '*' || value === '/' || value === '+' || value === '-')) return;
          if (this.currentOperation.includes('*') || this.currentOperation.includes('/') || this.currentOperation.includes('+') || this.currentOperation.includes('-')) {
            if (value === '*' || value === '/' || value === '+' || value === '-') return;
          }
          if ((value === '.' || value === '*' || value === '/' || value === '+' || value === '-') && this.currentOperation.slice(-1) === '.') return;
          this.currentOperation += value;
          return;
        }
      }
    }
  }
});
</script>
