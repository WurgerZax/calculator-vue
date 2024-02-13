<template>
  <div class="tw-mockup-phone" :data-theme="darkTheme ? '' : 'nord'">
    <div class="tw-camera"></div>
    <label id="bookBtn" for="my_modal_6" class="tw-absolute tw-cursor-pointer">📔</label>
    <div class="tw-display">
      <div class="tw-artboard tw-artboard-demo tw-phone-1 tw-justify-between">
        <div class="tw-flex tw-items-center tw-mt-8 tw-justify-between tw-bg-base-100 tw-rounded-lg tw-w-full tw-h-20">
          <img src="./assets/logo.png" class="tw-w-8 tw-h-8 tw-cursor-pointer tw-transition-all tw-duration-500" :class="[darkTheme ? '' : 'tw-brightness-80 tw-hue-rotate-60 tw-rotate-180' ]" @click="darkTheme=!darkTheme"/>
          <div class="tw-flex tw-flex-col tw-w-11/12 tw-h-full tw-gap-1 tw-justify-center">
            <p class="tw-text-xs tw-text-right tw-transition-all tw-duration-500">{{ currentOperation }}</p>
            <p class="tw-text-xl tw-text-right" :class="currentResult === 'Write correct operation' ? 'tw-text-red-500' : ''">{{ currentResult }}</p>
          </div>
        </div>
        <div class="tw-flex tw-flex-wrap tw-justify-center tw-gap-3 tw-bg-base-100 tw-w-full tw-h-fit tw-p-2 tw-rounded-lg">
          <BtnComponent class="tw-transition-all tw-duration-1000" v-for="btn in btnValuesArray" :key="btn.type" :btnData="btn" @sended-BtnValue="handleInfo"/>
        </div>
      </div>
    </div>
    <input type="checkbox" id="my_modal_6" class="tw-modal-toggle" />
    <div class="tw-modal" role="dialog">
      <div class="tw-modal-box tw-w-80 tw-h-96">
        <div class="tw-flex tw-justify-between">
          <h3 class="tw-font-bold tw-text-lg tw-text-info">History of Operations</h3>
          <label for="my_modal_6" class="tw-cursor-pointer tw-relative tw-right-0">✖</label>
        </div>
        <ul>
          <li v-for="operation in operationsHistory" :key="operation.result" class="tw-border-dashed tw-border-2 tw-border-primary tw-w-fit tw-p-1 tw-overflow-auto">
            <i class="tw-text-warning">Operation: <b class="tw-text-success">{{ operation.operation }}</b></i>
            <br>
            <i class="tw-text-warning">Result</i>: <b class="tw-text-success"> {{ operation.result }}</b>
          </li>
        </ul>
        
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BtnComponent from "./components/BtnComponent.vue";
import Button from "./types/btnType";
import HistoryOperation from "./types/historyOperation";

export default defineComponent({
  name: "App",
  components: {
    BtnComponent,
  },
  setup(){
    const btnWidth1 = 'tw-w-16' as string;
    const btnWidth2 = 'tw-w-36' as string;

    const btnValuesArray = ref<Button[]>([
      { type: '(', width: btnWidth1, special: 'operation'},
      { type: ')', width: btnWidth1, special: 'operation'},
      { type: 'RESET', width: btnWidth2, special: 'command'},
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
      { type: '*', width: btnWidth1, special: 'operation'},
      { type: '/', width: btnWidth1, special: 'operation'},
      { type: '=', width: btnWidth2, special: 'command'},
    ])

    const operationsHistory = ref<HistoryOperation[]>([])
    return { btnValuesArray, operationsHistory }
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
          try{
            this.currentResult = eval(this.currentOperation);

            this.operationsHistory.push({operation: this.currentOperation, result: this.currentResult as string})

            this.currentOperation = '';
          } catch{
            this.currentResult = 'Write correct operation';
            setTimeout(()=>{
              this.currentResult = '';
              this.currentOperation = '';
            }, 1500);
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
          if ((value === '.' || value === '*' || value === '/' || value === '+' || value === '-') && this.currentOperation.slice(-1) === '.') return;
          this.currentOperation += value;
          return;
        }
      }
    }
  }
});
</script>
<style scoped>
  .tw-phone-1{
    height: 580px !important;
  }
  #bookBtn{
    transform: translate(300px, 0px)
  }
</style>