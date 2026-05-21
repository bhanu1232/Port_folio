<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenis } from "../composables/useScroll";
import { t } from "../i18n/utils/translate";

gsap.registerPlugin(ScrollTrigger);

const progress = ref(0);
const activeLink = ref<string | null>(null);
const isHovered = ref(false);

const sections = ["about", "projects", "contact"];
let ctx: gsap.Context;

const handleLinkClick = (link: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(link);
};

onMounted(() => {
  ctx = gsap.context(() => {
    // Overall page progress
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progress.value = Math.round(self.progress * 100);
      },
    });

    // Active section tracking
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: section === "about" ? "top 22.5%" : "top center",
        end: "bottom center",
        onEnter: () => (activeLink.value = section),
        onEnterBack: () => (activeLink.value = section),
        onLeave: () => {
          if (activeLink.value === section) activeLink.value = null;
        },
        onLeaveBack: () => {
          if (activeLink.value === section) activeLink.value = null;
        },
      });
    });
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

const strokeDashoffset = computed(() => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  return circumference - (progress.value / 100) * circumference;
});
</script>

<template>
  <div
    class="side-nav-bubble-container"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Always visible active section label -->
    <div class="side-nav-active-label" :class="{ 'is-hidden': isHovered }">
      {{ activeLink ? t(activeLink) : 'HOME' }}
    </div>

    <!-- Hover Menu Links -->
    <div class="side-nav-links" :class="{ 'is-visible': isHovered }">
      <button
        v-for="section in sections"
        :key="section"
        class="side-nav-link"
        :class="{ 'is-active': activeLink === section }"
        @click="handleLinkClick('#' + section)"
      >
        <span class="side-nav-dot"></span>
        <span class="side-nav-text">{{ t(section) }}</span>
      </button>
    </div>

    <!-- The 3D Bubble -->
    <div class="side-nav-bubble" :class="{ 'is-hovered': isHovered }">
      <div class="side-nav-bubble-glass"></div>
      <svg class="side-nav-progress-ring" width="70" height="70">
        <circle
          class="side-nav-progress-ring-bg"
          stroke="rgba(255, 255, 255, 0.1)"
          stroke-width="4"
          fill="transparent"
          r="28"
          cx="35"
          cy="35"
        />
        <circle
          class="side-nav-progress-ring-fill"
          stroke="#f43f5e"
          stroke-width="4"
          stroke-linecap="round"
          fill="transparent"
          r="28"
          cx="35"
          cy="35"
          :style="{ strokeDasharray: 2 * Math.PI * 28, strokeDashoffset }"
        />
      </svg>
      <div class="side-nav-progress-text">{{ progress }}%</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.side-nav-bubble-container {
  position: fixed;
  left: var(--space-xl);
  top: 50%;
  transform: translateY(-50%);
  z-index: var(--z-index-header);
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.side-nav-bubble {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  &.is-hovered {
    transform: scale(1.1);
  }

  &-glass {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05) 60%, rgba(244, 63, 94, 0.2) 100%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: inset 0 0 20px rgba(244, 63, 94, 0.4), inset 2px 2px 10px rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
    z-index: 1;
  }
}

.side-nav-progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transform: rotate(-90deg);

  &-fill {
    transition: stroke-dashoffset 0.1s linear;
    filter: drop-shadow(0 0 8px rgba(244, 63, 94, 0.8));
  }
}

.side-nav-progress-text {
  position: relative;
  z-index: 3;
  color: var(--color-white-400);
  font-weight: 800;
  font-size: 14px;
  text-shadow: 0 0 10px rgba(244, 63, 94, 0.8);
}

.side-nav-active-label {
  position: absolute;
  top: 80px;
  left: 50%;
  color: var(--color-white-400);
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.3s ease, transform 0.3s ease;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: translateX(-50%);
  
  &.is-hidden {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
}

.side-nav-links {
  position: absolute;
  left: 80px; 
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  opacity: 0;
  transform: translateX(-20px);
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  background: rgba(26, 22, 37, 0.8);
  backdrop-filter: blur(12px);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &.is-visible {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
}

.side-nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  background: transparent;
  border: none;
  color: var(--color-text-400);
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: var(--space-xs) 0;

  &:hover, &.is-active {
    color: #f43f5e;

    .side-nav-dot {
      background-color: #f43f5e;
      box-shadow: 0 0 10px #f43f5e;
      transform: scale(1.5);
    }
  }
}

.side-nav-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--color-text-400);
  transition: all 0.2s ease;
}

@media (max-width: 1024px) {
  .side-nav-bubble-container {
    transform: scale(0.8) translateY(-50%);
    left: var(--space-sm);
  }
}
</style>
