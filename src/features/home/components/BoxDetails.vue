<script setup lang="ts">
import { t } from "../../../i18n/utils/translate";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import PinIcon from "../../../components/icons/Pin.vue";
import ProjectedElement from "../../../components/ProjectedElement.vue";

const point = new Vector3(-0.76, 3.6, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  // Clean up previous matchMedia
  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

  // Initialize GSAP matchMedia
  matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
      isLandscape: `(min-aspect-ratio: 1)`,
    },
    (context) => {
      const { conditions } = context;
      const { isLandscape } = conditions as { isMobile: boolean; isDesktop: boolean; isLandscape: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on landscape (animations disabled on portrait)
      if (isLandscape) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "none" },
          0,
        );
      } else {
        // On portrait, set clipPath immediately without animation
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      // Only add timeline animations on landscape
      if (isLandscape) {
        for (let i = 0; i < timelines.value.length; i++) {
          const item = timelines.value[i];
          if (!item) continue;
          tl.add(() => {
            item.timeline.restart(true);
          }, item.delay + 0.25);
        }
      }

      emit("timeline:created", tl);

      // Return cleanup function
      return () => {
        tl.kill();
      };
    },
  );

  onInvalidate(() => {
    if (matchMedia) {
      matchMedia.revert();
      matchMedia = null;
    }
  });
});

onBeforeUnmount(() => {
  if (matchMedia) {
    matchMedia.revert();
  }
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  const updatedTimelines = [...timelines.value, { timeline, delay }];
  timelines.value = updatedTimelines;
};
</script>

<template>
  <ProjectedElement :point="point">
    <div ref="wrapperRef" class="box-details">
      <div class="box-details-content">
        <div class="hologram-scanner"></div>
        <div class="box-details-title">
          <AppearingText
            text="Bhanu Prakash"
            :steps="1"
            :duration="0.35"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
          />
        </div>
        <div class="box-details-items">
          <div class="box-details-item">
            <PinIcon class="box-details-icon" />
            <AppearingText
              v-if="t('germany')"
              class="box-details-content-copy"
              :text="t('germany')"
              :steps="3"
              :duration="0.35"
              @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.1)"
            />
          </div>
          <div class="box-details-item">
            <span class="box-details-status-dot"></span>
            <AppearingText
              class="box-details-content-copy box-details-status-text"
              text="Available for Hire"
              :steps="3"
              :duration="0.35"
              @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.2)"
            />
          </div>
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-details {
  --line-length: min(48px, calc(var(--svw) * 5));

  display: none;

  @include mixins.landscape {
    display: block;
    position: absolute;
    padding-bottom: 3px;
    padding-right: var(--line-length);
    width: 240px;
    max-width: calc(var(--svw) * 30);
    transform: translate(-100%, -50%);
  }

  @include mixins.landscape-large {
    width: 240px;
  }

  &::after,
  &::before {
    display: none;

    @include mixins.landscape {
      display: block;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 11px;
    height: 11px;
    background-color: var(--color-cyan-400);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--color-cyan-400);
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: var(--line-length);
    height: 0;
    border-bottom: 1px solid rgba(52, 191, 255, 0.7);
    filter: drop-shadow(0 0 2px rgba(52, 191, 255, 0.8));
  }

  &-content {
    position: relative;
    border: 1px solid rgba(52, 191, 255, 0.5);
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, rgba(0, 53, 133, 0.55) 0%, rgba(0, 82, 145, 0.25) 100%);
    backdrop-filter: blur(12px) saturate(120%);
    -webkit-backdrop-filter: blur(12px) saturate(120%);
    box-shadow: 
      0 8px 32px 0 rgba(0, 0, 0, 0.3),
      inset 0 0 15px rgba(52, 191, 255, 0.2),
      0 0 20px rgba(52, 191, 255, 0.15);
    background-image: 
      linear-gradient(rgba(52, 191, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(52, 191, 255, 0.04) 1px, transparent 1px);
    background-size: 16px 16px;
    gap: var(--space-xs);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: var(--space-sm) var(--space-md);
    overflow: hidden;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      border-color: rgba(52, 191, 255, 0.85);
      border-style: solid;
      pointer-events: none;
    }
    
    &::before {
      top: -1px;
      left: -1px;
      border-width: 2px 0 0 2px;
      border-top-left-radius: 4px;
    }
    
    &::after {
      bottom: -1px;
      right: -1px;
      border-width: 0 2px 2px 0;
      border-bottom-right-radius: 4px;
    }

    @include mixins.landscape {
      flex-direction: column;
      justify-content: flex-start;
      padding: var(--space-xs) var(--space-sm);
    }

    @include mixins.mq("md") {
      padding: var(--space-sm) var(--space-md);
    }
  }

  &-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-direction: row;
    white-space: nowrap;
    height: var(--icon-size-sm);
  }

  &-icon {
    width: var(--icon-size-xxs);
    transform: translateY(-1px);
    --icon-color: var(--color-white-400);

    @include mixins.mq("md") {
      width: var(--icon-size-xs);
    }
  }

  &-title {
    font-size: var(--font-size-title-xxs);
    font-weight: 700;
    color: var(--color-white-400);
    text-shadow: 0 0 8px rgba(52, 191, 255, 0.5);

    @include mixins.mq("md") {
      font-size: var(--font-size-title-sm);
    }
  }

  &-items {
    display: flex;
    font-size: var(--font-size-sm);
    flex-direction: column;
    gap: var(--space-xxs);

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }
  }

  &-status-dot {
    width: 6px;
    height: 6px;
    background-color: #00ff88;
    border-radius: 50%;
    box-shadow: 0 0 8px #00ff88;
    animation: pulse-green 2s infinite alternate;
    flex-shrink: 0;
  }

  &-status-text {
    color: #b3ffd6 !important;
    text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
  }
}

.hologram-scanner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(52, 191, 255, 0.8), transparent);
  animation: scan-sweep 6s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes scan-sweep {
  0% {
    top: 0%;
    opacity: 0;
  }
  5% {
    opacity: 0.8;
  }
  95% {
    opacity: 0.8;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

@keyframes pulse-green {
  0% {
    transform: scale(0.9);
    box-shadow: 0 0 4px rgba(0, 255, 136, 0.5);
  }
  100% {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 255, 136, 1);
  }
}
</style>
