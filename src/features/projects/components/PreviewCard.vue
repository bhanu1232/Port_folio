<script setup lang="ts">
import Link from "../../../components/Link.vue";
import ArrowRightLong from "../../../components/icons/ArrowRightLong.vue";
import gsap from "gsap";
import { onMounted, onUnmounted, ref } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ButtonRound from "../../../components/ButtonRound.vue";
import { t } from "../../../i18n/utils/translate";
import { social } from "../../../content/social";
import Plus from "../../../components/icons/Plus.vue";

import type { ProjectPreview } from "../../../content/types";

const tlRef = ref<gsap.core.Timeline | null>(null);
const wrapperRef = ref<HTMLDivElement | null>(null);
const imageRef = ref<HTMLImageElement | null>(null);

const props = defineProps<{
  preview?: ProjectPreview;
}>();

onMounted(async () => {
  if (!wrapperRef.value || ScrollTrigger.isInViewport(wrapperRef.value)) {
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: "top bottom",
    },
  });
  tl.fromTo(wrapperRef.value, { scale: 0.8 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);
  tl.fromTo(imageRef.value, { scale: 1.2 }, { scale: 1, duration: 0.4, ease: "power1.out" }, 0);

  tlRef.value = tl;
});

onUnmounted(() => {
  if (tlRef.value) {
    tlRef.value.kill();
    tlRef.value = null;
  }
});
</script>

<template>
  <Link
    class="preview-card children-unclickable"
    :to="`/project/${props.preview.slug}`"
    :aria-label="t('switch-to-project', { project: props.preview.title })"
    data-cursor="arrow"
    data-sound="click"
    data-hoversound="hover"
    v-if="props.preview"
  >
    <div class="preview-card-top" ref="wrapperRef">
      <div class="preview-card-image-wrapper">
        <div class="preview-card-image-container">
          <img :src="props.preview.thumbnail" :alt="props.preview.title" class="preview-card-image" ref="imageRef" />
        </div>
      </div>
    </div>
    <div class="preview-card-content">
      <div class="preview-card-copys">
        <h3 class="preview-card-title">{{ props.preview.title }}</h3>
        <p class="preview-card-description">{{ props.preview.description }}</p>
      </div>
      <ButtonRound class="preview-card-button" variant="accent" renderAs="div">
        <ArrowRightLong class="preview-card-button-arrow" />
      </ButtonRound>
    </div>
  </Link>

  <Link
    v-else
    class="preview-card children-unclickable"
    data-cursor="arrow-external"
    data-hoversound="hover"
    external
    :href="social[0].url"
  >
    <div class="preview-card-top preview-card-top-empty">
      <Plus class="preview-card-top-empty-icon" />
    </div>
    <div class="preview-card-content">
      <div class="preview-card-copys">
        <h3 class="preview-card-title">{{ t("start-a-new-project") }}</h3>
      </div>
    </div>
  </Link>
</template>

<style scoped lang="scss">
.preview-card {
  --hover: 0;
  position: relative;
  border-radius: var(--radius-xl);
  z-index: var(--z-index-layout);
  background: #1a1625;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.4s var(--ease-power2-out);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::after {
    display: none;
  }

  @include mixins.hover {
    &:hover {
      --hover: 1;
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.1);
    }
  }

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: var(--space-xl);
    flex: 1;
  }

  &-button {
    flex-shrink: 0;
    margin-left: var(--space-md);
    background-color: #f43f5e !important;
    border-color: #f43f5e !important;
    color: white !important;

    &-arrow {
      transition: transform 0.1s ease-in-out;
      width: 100%;
      transform: rotate(calc(var(--hover) * -45deg));
    }
  }

  &-image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &-container {
      transition: transform 0.1s ease-in-out;
      transform: scale(calc(1 + var(--hover) * 0.02));
      aspect-ratio: 16/9;
    }

    &-wrapper {
      overflow: hidden;
      background-color: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
  }

  &-top {
    position: relative;
    width: 100%;
    aspect-ratio: 16/9;
    overflow: hidden;

    &-empty {
      border: 2px dashed rgba(0, 198, 255, 0.4);
      border-radius: var(--radius-lg);
      background-color: rgba(29, 15, 61, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--color-cyan-400);
        box-shadow: inset var(--glow-primary);
      }

      &-icon {
        width: var(--icon-size-lg);
        color: var(--color-text-300);
        --icon-color: var(--color-text-300);
        --stroke-width: 4px;
      }
    }
  }

  &-copys {
    display: flex;
    flex-direction: column;
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 700;
    color: var(--color-white-400);
    text-shadow: 0 0 10px rgba(0, 198, 255, 0.3);
  }

  &-description {
    font-size: var(--font-size-md);
    color: var(--color-text-300);
    font-weight: 500;
  }
}
</style>
