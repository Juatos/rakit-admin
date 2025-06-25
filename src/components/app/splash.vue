<script lang="ts" setup>
</script>

<template>
  <n-config-provider
    class="w-full h-full"
  >
    <n-el tag="div" class="flex flex-col items-center justify-center w-full h-full bg-[var(--body-color)]">
      <n-icon size="120">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="145" height="145" style="shape-rendering: auto; display: block; background: var(--body-color);"><g><circle fill="#4d6bfe" r="10" cy="50" cx="84">
          <animate begin="0s" keySplines="0 0.5 0.5 1" values="8;0" keyTimes="0;1" calcMode="spline" dur="1.0416666666666665s" repeatCount="indefinite" attributeName="r" />
          <animate begin="0s" values="#4d6bfe;#34d353;#f9505c;#f1c72d;#4d6bfe" keyTimes="0;0.25;0.5;0.75;1" calcMode="discrete" dur="4.166666666666666s" repeatCount="indefinite" attributeName="fill" />
        </circle><circle fill="#4d6bfe" r="10" cy="50" cx="16">
          <animate begin="0s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="0;0;8;8;8" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="4.166666666666666s" repeatCount="indefinite" attributeName="r" />
          <animate begin="0s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="4.166666666666666s" repeatCount="indefinite" attributeName="cx" />
        </circle><circle fill="#f1c72d" r="10" cy="50" cx="50">
          <animate begin="-1.0416666666666665s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="0;0;8;8;8" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="4.166666666666666s" repeatCount="indefinite" attributeName="r" />
          <animate begin="-1.0416666666666665s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="4.166666666666666s" repeatCount="indefinite" attributeName="cx" />
        </circle><circle fill="#f9505c" r="10" cy="50" cx="84">
          <animate begin="-2.083333333333333s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="0;0;8;8;8" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="4.166666666666666s" repeatCount="indefinite" attributeName="r" />
          <animate begin="-2.083333333333333s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="4.166666666666666s" repeatCount="indefinite" attributeName="cx" />
        </circle><circle fill="#34d353" r="10" cy="50" cx="16">
          <animate begin="-3.1249999999999996s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="0;0;8;8;8" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="4.166666666666666s" repeatCount="indefinite" attributeName="r" />
          <animate begin="-3.1249999999999996s" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" values="16;16;16;50;84" keyTimes="0;0.25;0.5;0.75;1" calcMode="spline" dur="4.166666666666666s" repeatCount="indefinite" attributeName="cx" />
        </circle><g /></g></svg>
      </n-icon>
      <n-gradient-text type="info" size="20">
        系统加载中...
      </n-gradient-text>
    </n-el>
  </n-config-provider>
</template>
