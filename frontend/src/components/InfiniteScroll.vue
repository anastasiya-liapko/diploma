<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const infiniteScrollWrapper = ref();
const props = withDefaults(defineProps<{ root?: any; rootMargin?: string; threshold?: number }>(), {
    root: null,
    rootMargin: "300px",
    threshold: 0.0,
});
const emit = defineEmits(["on-intersect"]);

let observer = {
    observe(_target: Element) { },
    disconnect() { },
};

onMounted(() => {
    observer = new IntersectionObserver(([item], _observer) => {
        if (!!item && item.isIntersecting) {
            emit("on-intersect");
        }
    }, props);

    observer.observe(infiniteScrollWrapper.value);
});

onBeforeUnmount(() => {
    observer.disconnect();
});
</script>

<template>
    <div ref="infiniteScrollWrapper" style="height: 20px">
        <slot></slot>
    </div>
</template>