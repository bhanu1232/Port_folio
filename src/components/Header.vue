<script setup lang="ts">
import Button from "./Button.vue";
import { computed, ref } from "vue";
import { t } from "../i18n/utils/translate";
import { useHeaderTheme } from "../composables/useHeaderTheme";

import { projectId } from "../composables/useRouteObserver";
import { social } from "../content/social";
import ButtonRound from "./ButtonRound.vue";
import ArrowRight from "./icons/ArrowRight.vue";
import SoundsToggle from "./SoundsToggle.vue";
import { isFeatureEnabled } from "../utils/features";
import { useRouter } from "../composables/useRouter";
import { useFirstRoute } from "../composables/useFirstRoute";

const router = useRouter();
const { isFirstRoute } = useFirstRoute();

const scrolledPastHeroVisible = ref(false);
const { isDarkTheme } = useHeaderTheme({
  onUpdate: (element, boundingClientRect, hasScrolledIntoView) => {
    if (!element || !boundingClientRect) {
      scrolledPastHeroVisible.value = false;
      return;
    }

    if (hasScrolledIntoView) {
      scrolledPastHeroVisible.value = true;
    } else {
      scrolledPastHeroVisible.value = false;
    }
  },
});

const handleBackClick = () => {
  if (isFirstRoute.value) {
    router.push("/");
  } else {
    router.back();
  }
};



const classNames = computed(() => {
  return {
    header: true,
    "header-dark": isDarkTheme.value,
    "header-scrolled": scrolledPastHeroVisible.value,
    [`project-${projectId.value}`]: projectId.value !== null,
  };
});

const getInTouchClassNames = computed(() => {
  return {
    "header-get-in-touch": true,
    "header-get-in-touch-isProjectPage": projectId.value !== null,
  };
});
</script>

<template>
  <header :class="classNames">
    <!-- Back button (project pages) -->
    <div class="header-left">
      <ButtonRound
        v-if="projectId !== null"
        variant="accent"
        size="sm"
        @click="handleBackClick"
        :aria-label="t('back-to-home')"
        :class="{ 'header-back': true, 'header-back-isProjectPage': projectId !== null }"
        data-cursor="circle-white"
        data-sound="click"
        data-hoversound="hover"
      >
        <ArrowRight class="header-back-icon" />
      </ButtonRound>
    </div>

    <!-- Removed Logo -->

    <!-- Right side -->
    <div class="header-right">
      <Button
        renderAs="a"
        variant="accent"
        size="sm"
        :aria-label="t('get-in-touch')"
        :href="social.find((item) => item.name === 'mail')?.url ?? ''"
        external
        :class="getInTouchClassNames"
        data-cursor="circle-white"
        data-hoversound="hover"
        >{{ t("get-in-touch") }}</Button
      >
      <SoundsToggle class="header-sounds-toggle" :isDarkTheme="isDarkTheme" v-if="isFeatureEnabled('sounds')" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 24px);
  max-width: 1400px;
  padding: 0 10px;
  z-index: var(--z-index-header);
  height: 48px;
  pointer-events: none;
  border-radius: 100px;

  @include mixins.mq("md") {
    top: 16px;
    height: 52px;
    width: calc(100% - 48px);
    padding: 0 14px;
  }

  --scrolled: 0;

  &-scrolled {
    --scrolled: 1;
  }

  &-back {
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.1s;
    pointer-events: auto;

    &-icon {
      width: 100%;
      transform: rotate(180deg);
    }

    &-isProjectPage {
      pointer-events: auto;
      opacity: 1;
    }
  }

  &-left {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);

    @include mixins.mq("md") {
      left: 14px;
    }
  }

  &-get-in-touch {
    width: fit-content;

    &-isProjectPage {
      opacity: 1 !important;
    }
  }

  &-right {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 8px;

    @include mixins.mq("md") {
      right: 14px;
    }
  }

  &-dark {
    color: var(--color-white-400);
    --icon-color: var(--color-white-400);
  }

  &-get-in-touch {
    display: none;

    @include mixins.mq("sm") {
      display: flex;
    }
  }

  &-logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
    opacity: var(--scrolled);
    pointer-events: none;
    /* Left-aligned, same slot as the back button */
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);

    @include mixins.mq("md") {
      left: 14px;
    }

    &-clickable {
      pointer-events: all;
    }

    &-isProjectPage {
      pointer-events: none;
      opacity: 0;
    }

    &-image {
      width: 30px;

      @include mixins.mq("md") {
        width: 34px;
      }
    }

    &-text {
      font-weight: 900;
      font-size: 16px;

      @include mixins.mq("md") {
        font-size: 18px;
      }
    }
  }
}
</style>
