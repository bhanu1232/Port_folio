<script setup lang="ts">
import { ref, onMounted } from "vue";
import { previews } from "../../../content/projects/previews";
import PreviewCard from "../../projects/components/PreviewCard.vue";
import NotchSection from "../../../components/NotchSection.vue";
import Banner from "../../../components/Banner.vue";
import { t } from "../../../i18n/utils/translate";

import type { ProjectPreview } from "../../../content/types";

const loadedPreviews = ref<ProjectPreview[] | null>(null);

const emit = defineEmits<{
  (e: "loaded", previews: ProjectPreview[]): void;
}>();

onMounted(async () => {
  const module = await previews.en();
  loadedPreviews.value = module.default as unknown as ProjectPreview[];
  emit("loaded", module.default as unknown as ProjectPreview[]);
});
</script>

<template>
  <div class="projects">
    <NotchSection class="projects-notch-start" />
    <div class="grid">
      <div class="projects-title">
        <Banner class="projects-title-banner" :copy="t('selected')" size="sm" animated />
        <h2 class="projects-title-copy">{{ t("projects") }}</h2>
        <div class="projects-title-line"></div>
      </div>
    </div>
    <div class="grid">
      <div class="projects-cards">
        <PreviewCard v-for="preview in loadedPreviews" :key="preview.title" :preview="preview" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  gap: var(--space-xl);
  padding-left: var(--space-outer);
  padding-right: var(--space-outer);
  background-color: var(--color-background-400);
  min-height: calc(var(--lvh) * 100 + var(--radius-xxl));
  padding-top: 96px;
  padding-bottom: 96px;

  @include mixins.mq("md") {
    padding-top: 144px;
    padding-bottom: 144px;
    gap: var(--space-xxl);
  }

  @include mixins.mq("lg") {
    gap: var(--space-xxxl);
  }

  &-title {
    position: relative;
    padding-top: var(--space-md);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 1 / 10;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 8;
    }

    &-copy {
      font-weight: 900;
      letter-spacing: 0.02em;
      font-size: var(--font-size-title-md);
      line-height: 1;
      color: var(--color-white-400);
      text-shadow: var(--glow-primary);

      @include mixins.mq("sm") {
        font-size: var(--font-size-title-lg);
      }

      @include mixins.mq("xl") {
        font-size: var(--font-size-title-xl);
      }
    }

    &-line {
      margin-top: var(--space-sm);
      height: 3px;
      width: 48px;
      background: var(--color-orange-400);
      border-radius: 100px;

      @include mixins.mq("md") {
        width: 64px;
        margin-top: var(--space-md);
      }
    }

    &-banner {
      position: absolute;
      top: 0;
      left: -8px;
      transform: translate(0, -20%) rotate(-4deg);

      @include mixins.mq("lg") {
        left: -16px;
        transform: translate(0, -20%) rotate(-6deg);
      }
    }
  }

  &-notch {
    &-start {
      position: absolute;
      top: 0;
      left: 0;
      transform: translateY(-100%);
      color: var(--color-background-400);
      --icon-color: var(--color-background-400);
    }
  }

  &-cards {
    max-width: 100%;
    flex: 1;
    grid-column: 1 / span 12;
    display: grid;
    gap: var(--space-xl);
    grid-template-columns: 1fr;

    @include mixins.mq("md") {
      grid-column: 1 / span 12;
      grid-template-columns: repeat(2, 1fr);
    }

    @include mixins.mq("lg") {
      grid-template-columns: repeat(3, 1fr);
      grid-column: 2 / span 10;
    }

    @include mixins.mq("xl") {
      grid-template-columns: repeat(3, 1fr);
      grid-column: 2 / span 10;
    }

    & > :nth-child(5) {
      @include mixins.mq("lg") {
        grid-column: span 2;
      }
    }
  }
}
</style>
