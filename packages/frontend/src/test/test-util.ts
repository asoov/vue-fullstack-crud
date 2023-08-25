import {
  ComponentMountingOptions,
  DOMWrapper,
  mount,
  VueWrapper
} from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { audiTheme } from "@/main";
import router from "@/router";
import { DefineComponent, VueElement } from "vue";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "audiTheme",
    themes: {
      audiTheme
    }
  }
});

export const mountWithPlugins = (
  component: VueElement,
  options?: ComponentMountingOptions<DefineComponent>
) => {
  return mount(component, {
    global: {
      plugins: [vuetify, router]
    },
    ...options
  });
};

/**
 * Test helper to find a component by its `data-test-id` attribute
 * @param wrapper - The Vue Test Utils Wrapper instance
 * @param testId - The value of the `data-test-id` attribute to search for
 * @param multiple - Whether to return a single element or an array of elements
 * @returns Wrapper - The found element(s)
 */
export const findByTestId = (
  wrapper: VueWrapper<any>,
  testId: string,
  multiple = false
): DOMWrapper<any> | DOMWrapper<any>[] => {
  if (multiple) {
    return wrapper.findAll(testIdQueryString(testId));
  }
  return wrapper.find(testIdQueryString(testId));
};

export const testIdQueryString = (testId: string): string => {
  return `[data-test-id="${testId}"]`;
};
