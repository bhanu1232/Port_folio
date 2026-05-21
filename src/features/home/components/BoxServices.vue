<script setup lang="ts">
import { computed, ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { t } from "../../../i18n/utils/translate";
import AppearingText from "../../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../../components/ProjectedElement.vue";

const point = new Vector3(0.75, 2.75, 6.75);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const subRefs = ref<HTMLParagraphElement[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

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
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "none" },
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
        }, item.delay + 0.25);
      }

      // Only fade in on desktop
      if (!isMobile && subRefs.value.length > 0) {
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          tl.fromTo(subItems, { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.1 }, 0.3);
        }
      } else if (isMobile && subRefs.value.length > 0) {
        // On mobile, ensure opacity is 1 immediately
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          gsap.set(subItems, { opacity: 1 });
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

const SERVICES = [
  { name: "Node.js & WebSockets" },
  { name: "React & Next.js" },
  { name: "Docker & Redis" },
  { name: "Python & JavaScript" },
  { name: "Tailwind CSS" },
] as const satisfies { name: string }[];

const services = computed(() => SERVICES);
</script>

<template>
  <ProjectedElement :point="point">
    <div ref="wrapperRef" class="box-services">
      <div class="box-services-content">
        <!-- Sci-Fi Scanline bar -->
        <div class="hologram-scanner"></div>
        
        <div class="box-services-title">
          <AppearingText
            :text="t('services')"
            :steps="1"
            :duration="0.35"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
          />
        </div>
        <div class="box-services-list">
          <div class="box-services-list-item" v-for="(service, index) in services" :key="service.name">
            <p class="box-services-list-item-name">
              <AppearingText
                :text="service.name"
                :steps="1"
                :duration="0.35"
                @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.15 + index * 0.1)"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-services {
  --line-length: min(48px, calc(var(--svw) * 5));

  position: absolute;
  bottom: var(--count-height);
  width: calc(100% - var(--space-outer) * 2);
  left: var(--space-outer);

  @include mixins.landscape {
    width: 480px;
    max-width: calc(var(--svw) * 37);
    padding-left: var(--line-length);
    position: relative;
    left: 0;
    bottom: 0;
    padding-top: 3px;
    transform: translate(0, -50%);
  }

  @include mixins.landscape-large {
    width: 380px;
    max-width: calc(var(--svw) * 36);
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
    left: 0;
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
    left: 0;
    height: 0;
    border-top: 1px solid rgba(52, 191, 255, 0.7);
    filter: drop-shadow(0 0 2px rgba(52, 191, 255, 0.8));

    @include mixins.landscape {
      width: var(--line-length);
    }
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
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
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
      padding: var(--space-xs) var(--space-sm);
    }

    @include mixins.mq("md") {
      padding: var(--space-sm) var(--space-md);
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    &-item {
      display: flex;
      flex-direction: column;
      padding-left: 18px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 2px;
        top: 50%;
        transform: translateY(-50%);
        width: 5px;
        height: 5px;
        background-color: var(--color-cyan-400);
        box-shadow: 0 0 5px var(--color-cyan-400);
        transform-origin: center;
        rotate: 45deg;
      }

      &-name {
        font-size: var(--font-size-md);
        color: var(--color-text-cyan-400);

        @include mixins.landscape {
          font-size: var(--font-size-sm);
        }

        @include mixins.landscape-large {
          font-size: var(--font-size-lg);
        }
      }
    }
  }

  &-title {
    font-size: var(--font-size-title-xs);
    font-weight: 700;
    color: var(--color-white-400);
    text-shadow: 0 0 8px rgba(52, 191, 255, 0.5);

    @include mixins.landscape {
      font-size: var(--font-size-title-xxs);
    }

    @include mixins.landscape-large {
      font-size: var(--font-size-title-xs);
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
