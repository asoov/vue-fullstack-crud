import UsersList from "./UsersList.vue";
import UserOverlay from "@/components/Users/UserOverlay.vue";
import { formatDate } from "@/utils/formatDate";
import { mountWithPlugins } from "@/test/test-util";

describe("UsersList.vue", () => {
  const mockUsers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      birthday: new Date("1990-01-01")
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      birthday: new Date("1995-01-01")
    }
    // ... any other users you'd like to mock
  ];

  it("renders a list of users correctly", () => {
    const wrapper = mountWithPlugins(UsersList, {
      props: { users: mockUsers }
    });

    const items = wrapper.findAllComponents(UserOverlay);

    expect(items.length).toBe(mockUsers.length);
  });

  it("displays the email and formatted date for each user", () => {
    const wrapper = mountWithPlugins(UsersList, {
      props: { users: mockUsers }
    });

    mockUsers.forEach((user, index) => {
      const item = wrapper.findAll(".v-list-item-subtitle").at(index);
      expect(item.text()).toContain(user.email);
      expect(item.text()).toContain(formatDate(user.birthday));
    });
  });

  it("renders the UserOverlay component for each user", () => {
    const wrapper = mountWithPlugins(UsersList, {
      props: { users: mockUsers }
    });

    const overlays = wrapper.findAllComponents(UserOverlay);

    expect(overlays.length).toBe(mockUsers.length);

    overlays.forEach((overlay, index) => {
      expect(overlay.props().user).toStrictEqual(mockUsers[index]);
    });
  });
});
