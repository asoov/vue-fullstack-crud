import UsersSearch from "./UsersSearch.vue";
import { findByTestId, mountWithPlugins } from "@/test/test-util";

describe("UsersSearch.vue", () => {
  it("emits the 'search' event with the right value when the form is submitted", async () => {
    // It's needed to attach the wrapper to a root element to make the click on a button of type="submit" work
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    const wrapper = mountWithPlugins(UsersSearch, { attachTo: "#root" });
    const searchInput = findByTestId(wrapper, "users-search-input");
    await searchInput.find("input").setValue("Doe");

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted().search).toBeTruthy();
    expect(wrapper.emitted().search[0]).toEqual(["Doe"]);
  });

  it("emits the 'clear' event when the clear button in the v-text-field is clicked", async () => {
    const wrapper = mountWithPlugins(UsersSearch);

    const searchInput = findByTestId(wrapper, "users-search-input");
    await searchInput.find("input").setValue("Doe");
    await wrapper.find("button").trigger("click");

    await searchInput.find('[role="button"]').trigger("click");

    expect(wrapper.emitted().clear).toBeTruthy();
  });

  it("emits the 'clear' event and resets the search input when the input value becomes empty", async () => {
    const wrapper = mountWithPlugins(UsersSearch);

    const searchInput = findByTestId(wrapper, "users-search-input");
    await searchInput.find("input").setValue("Doe");

    await searchInput.find("input").setValue("");

    expect(wrapper.emitted().clear).toBeTruthy();
    expect(wrapper.vm.searchInput).toBe("");
  });
});
