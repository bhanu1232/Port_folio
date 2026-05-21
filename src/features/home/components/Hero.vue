<script setup>
import Button from "../../../components/Button.vue";
import Banner from "../../../components/Banner.vue";
import { preloaderVisible } from "../../../composables/usePreloader";
import { t } from "../../../i18n/utils/translate";
import { lenis } from "../../../composables/useScroll";

const scrollToProjects = () => {
  if (!lenis.value) return;
  lenis.value.scrollTo("#projects");
};
</script>

<template>
  <div class="hero">
    <div class="hero-content grid">
      <div class="hero-content-inner" id="hero-content-inner">
        <div class="hero-content-copys">
          <Banner class="hero-banner" :copy="t('job-title')" v-if="!preloaderVisible" animated />
          <h1 class="hero-title">Bhanu <br />Prakash</h1>
          <p class="hero-subtitle" v-if="!preloaderVisible">
            TCS CodeVita &nbsp;·&nbsp; Global Rank&nbsp;#172
          </p>
        </div>
        <Button
          v-if="!preloaderVisible"
          class="hero-cta"
          variant="accent"
          size="md"
          @click="scrollToProjects"
          data-cursor="circle-white"
          data-sound="click"
          data-hoversound="hover"
        >
          See My Work ↓
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hero {
  max-height: calc(var(--lvh) * 100);
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;

  &-content {
    align-items: center;
    justify-content: center;
    height: 46%;

    @include mixins.landscape {
      height: 100%;

      @include mixins.mq("md") {
        padding-bottom: 30%;
      }

      @include mixins.mq("lg") {
        padding-bottom: 5%;
      }
    }

    &-inner {
      transform-origin: center center;
      grid-column: 1 / 13;
      gap: var(--space-xl);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: fit-content;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      @include mixins.landscape {
        left: 0;
        transform: translateX(0);
        grid-column: 2 / 13;
        width: fit-content;
      }
    }

    &-copys {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);

      @include mixins.mq("md") {
        gap: var(--space-md);
      }
    }

    &-button {
      width: fit-content;
    }
  }

  &-title {
    font-weight: 900;
    letter-spacing: 0.02em;
    font-size: var(--font-size-title-lg);
    /* Subtle gradient shimmer on the name */
    background: linear-gradient(
      135deg,
      var(--color-text-400) 0%,
      var(--color-text-300) 40%,
      var(--color-text-400) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @include mixins.landscape {
      font-size: var(--font-size-title-lg);
    }

    @include mixins.landscape-large {
      @include mixins.mq("sm") {
        font-size: var(--font-size-title-xl);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xxl);
      }
    }
  }

  &-subtitle {
    font-size: var(--font-size-sm);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-300);
    opacity: 0.85;
    margin-top: calc(var(--space-xxs) * -1);
    white-space: nowrap;
    animation: fadeSlideUp 0.7s ease-out 0.4s both;

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }
  }

  &-cta {
    width: fit-content;
    animation: fadeSlideUp 0.7s ease-out 0.6s both;
    margin-top: var(--space-xs);
    /* Slight pulse to draw eye */
    &:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease;
    }
  }

  &-banner {
    width: fit-content;
    z-index: 10;
    animation: fadeSlideUp 0.7s ease-out 0.2s both;
  }
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

