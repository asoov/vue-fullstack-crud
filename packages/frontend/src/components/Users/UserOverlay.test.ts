import UserOverlay from "./UserOverlay.vue";
import { User } from "fullstack-crud-node-backend/dist/user/user";
import {
  findByTestId,
  mountWithPlugins,
  testIdQueryString
} from "@/test/test-util";
import { formatDate } from "@/utils/formatDate";
import { VueWrapper } from "@vue/test-utils";

describe("UserOverlay.vue", () => {
  const mockUser: Partial<User> = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    birthday: new Date("1990-01-01")
  };
  let overlay: Element | null = null;
  let wrapper: VueWrapper;

  beforeEach(async () => {
    wrapper = mountWithPlugins(UserOverlay, {
      props: { user: mockUser }
    });
    await findByTestId(wrapper, "user-overlay-button").trigger("click");
    overlay = document.querySelector(
      testIdQueryString("user-overlay-dialog-content")
    );
  });

  it("renders the user's first name and last name in the overlay", async () => {
    expect(overlay?.textContent).contain("John Doe");
  });

  it("displays the formatted date", async () => {
    expect(overlay?.textContent).contain(formatDate(mockUser.birthday));
  });
});
