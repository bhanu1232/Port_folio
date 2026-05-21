<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
import PinIcon from "../../../components/icons/Pin.vue";

const point = new Vector3(-0.9, 2, 6.75);

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
    },
    (context) => {
      const { conditions } = context;
      const { isMobile } = conditions as { isMobile: boolean; isDesktop: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on desktop
      if (!isMobile) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "none" },
          0,
        );
      } else {
        // On mobile, ensure clipPath is set to visible immediately
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      for (let i = 0; i < timelines.value.length; i++) {
        const item = timelines.value[i];
        if (!item) continue;
        tl.add(() => {
          item.timeline.restart(true);
        }, item.delay + 0.15);
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
    <div ref="wrapperRef" class="box-description">
      <div class="box-description-content">
        <!-- Sci-Fi Scanline bar -->
        <div class="hologram-scanner"></div>
        
        <div class="box-description-details">
          <p class="box-description-details-name">Bhanu</p>
          <div class="box-description-details-location">
            <PinIcon class="box-description-details-location-icon" />
            <p class="box-description-details-location-copy">{{ t("germany") }}</p>
          </div>
        </div>
        <div class="box-description-line"></div>
        <div class="box-description-copy">
          <AppearingText
            :text="t('about-tagline')"
            :steps="3"
            :duration="0.7"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
          />
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-description {
  --line-length: min(48px, calc(var(--svw) * 5));

  gap: var(--space-xxs);
  position: absolute;
  bottom: var(--count-height);
  width: calc(100% - var(--space-outer) * 2);
  left: var(--space-outer);

  @include mixins.landscape {
    position: relative;
    left: 0;
    bottom: 0;
    width: 480px;
    max-width: calc(var(--svw) * 38);
    transform: translate(-100%, -50%);
    padding-top: 3px;
    padding-right: var(--line-length);
  }

  @include mixins.landscape-large {
    width: 410px;
    max-width: calc(var(--svw) * 32);
  }

  &-line {
    width: 100%;
    height: 1px;
    background-color: var(--color-cyan-400);

    @include mixins.landscape {
      display: none;
    }
  }

  &-details {
    padding: var(--space-sm) var(--space-md);
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mixins.landscape {
      display: none;
    }

    &-name {
      font-size: var(--font-size-title-xs);
      font-weight: 700;
    }

    &-location {
      display: flex;
      align-items: center;
      gap: var(--space-xs);

      &-icon {
        width: var(--icon-size-xs);
        --icon-color: var(--color-white-400);
        transform: translateY(-1px);
      }

      &-copy {
        font-size: var(--font-size-md);
      }
    }
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
    border-top: 1px solid rgba(52, 191, 255, 0.7);
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
      padding: var(--space-xs) var(--space-sm);

      @include mixins.mq("md") {
        padding: var(--space-sm) var(--space-md);
      }
    }
  }

  &-copy {
    will-change: opacity;
    font-size: var(--font-size-md);
    padding: var(--space-sm) var(--space-md);
    color: var(--color-text-cyan-400);

    @include mixins.landscape {
      padding: 0;
      font-size: var(--font-size-sm);
    }

    @include mixins.landscape-large {
      font-size: var(--font-size-lg);
    }
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
</style>
