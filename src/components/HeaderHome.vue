<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { onMounted, ref } from "vue";
import { t } from "../i18n/utils/translate";
import { lenis } from "../composables/useScroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { projectId } from "../composables/useRouteObserver";

const handleLinkClick = (link: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(link);
};

type ActiveLink = "about" | "projects" | "contact";
const activeLink = ref<ActiveLink | null>(null);
const sections: ActiveLink[] = ["about", "projects", "contact"];
const ariaLabels = {
  about: t("about"),
  projects: t("projects"),
  contact: t("contact"),
};

const isMounted = ref(false);

const barStyle = ref({ transform: "" });
const ITEM_WIDTH = 140;

const { isDarkTheme, hasScrolledIntoView } = useHeaderTheme();

const updateBarPosition = () => {
  const index = sections.indexOf(activeLink.value as ActiveLink);
  const left = index * ITEM_WIDTH;
  barStyle.value = {
    transform: `translateX(${left}px)`,
  };
};

onMounted(() => {
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: `#${section}`,
      start: section === "about" ? "top 22.5%" : "top center",
      end: "bottom center",
      onEnter: () => {
        activeLink.value = section;
        updateBarPosition();
      },
      onEnterBack: () => {
        activeLink.value = section;
        updateBarPosition();
      },
      onLeave: () => (activeLink.value = null),
      onLeaveBack: () => (activeLink.value = null),
    });
  });

  ScrollTrigger.refresh();

  isMounted.value = true;
});
</script>

<template>
  <div :class="['header-home', { 'header-home-mounted': isMounted, 'header-home-isProjectPage': projectId !== null }]">
    <nav :class="['header-home-links', { 'header-home-links-dark': isDarkTheme }]">
      <!-- Custom sliding indicator -->
      <div
        :class="[
          'header-home-bar',
          { 'header-home-bar-active': activeLink !== null && hasScrolledIntoView, 'header-home-bar-dark': isDarkTheme },
        ]"
        :style="barStyle"
      ></div>
      <HeaderLink
        v-for="section in sections"
        :key="section"
        :is-active="activeLink === section"
        :class="[
          'header-home-link',
          { 'header-home-link-active': activeLink === section && hasScrolledIntoView },
          'children-unclickable',
        ]"
        @click="handleLinkClick('#' + section)"
        :is-dark-theme="isDarkTheme"
        :aria-label="ariaLabels[section]"
        data-sound="click"
        data-hoversound="hover"
      >
        {{ t(section) }}
      </HeaderLink>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.header-home {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-header-home);
  display: none;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    transform var(--transition-route-duration) var(--transition-route-ease);

  &-isProjectPage {
    transform: translateY(-100%);
  }

  &-mounted {
    opacity: 1;
  }

  @include mixins.mq("lg") {
    display: flex;
  }

  &-links {
    position: relative;
    display: flex;
    padding: 6px;
    height: 56px;
    align-items: center;
    background: rgba(20, 15, 35, 0.4);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    border-top: none;
    border-left: none;
    border-radius: 0 0 40px 0;
    color: var(--color-text-400);
    transition:
      color 0.15s ease-in-out,
      background-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out,
      border-color 0.15s ease-in-out;
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3), inset 1px 1px 0px rgba(255, 255, 255, 0.05);

    &-dark {
      background: rgba(10, 5, 20, 0.65);
      color: var(--color-white-400);
      border-right: 1px solid rgba(0, 198, 255, 0.2);
      border-bottom: 1px solid rgba(0, 198, 255, 0.2);
      box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.6), inset 1px 1px 0px rgba(0, 198, 255, 0.1);
    }
  }

  /* Custom sliding pill indicator */
  &-bar {
    position: absolute;
    top: 6px;
    left: 6px;
    height: calc(100% - 12px);
    width: 140px;
    background: linear-gradient(135deg, #f43f5e 0%, #ff0844 100%);
    border-radius: 100px;
    transition:
      transform 0.32s var(--ease-smooth),
      opacity 0.15s ease-in-out,
      background-color 0.15s ease-in-out,
      box-shadow 0.32s var(--ease-smooth);
    z-index: 1;
    opacity: 0;
    box-shadow: 0 0 0 0 transparent;

    &-dark {
      background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
      border: none;
    }

    &-active {
      opacity: 1;
      box-shadow: 0 4px 15px rgba(244, 63, 94, 0.4), inset 1px 1px 1px rgba(255, 255, 255, 0.3);

      &.header-home-bar-dark {
        box-shadow: 0 4px 15px rgba(0, 198, 255, 0.4), inset 1px 1px 1px rgba(255, 255, 255, 0.3);
      }
    }
  }

  &-link {
    position: relative;
    z-index: 2;
    letter-spacing: 0.04em;
    font-weight: 700;
    border: none;
    background: none;
    transition: color 0.15s ease-in-out;
    font-size: 15px;
    width: 140px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    text-transform: uppercase;

    &-active {
      color: var(--color-white-400);
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

      .header-home-links-dark & {
        color: var(--color-white-400);
      }
    }
  }
}
</style>
