<template>
  <button class="tw-btn tw-h-16 tw-rounded-xl" @click="sendBtnValue(btnData.type)"
    :class="[btnData.width, btnData.special === 'number' ? 'tw-btn-primary' : btnData.special === 'operation' ? 'tw-btn-default' : 'tw-btn-warning']">{{ btnData.type }}</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BtnType from "@/types/btnType"

export default defineComponent({
  setup() {
    return {};
  },
  props: {
    btnData: {
      required: true,
      type: Object as PropType<BtnType>
    }
  },
  methods: {
    sendBtnValue(value: BtnType["type"]){
      this.$emit('sended-BtnValue', value);
    }
  }
});
</script>
