import { flushPromises } from "@vue/test-utils";
import Users from "@/views/Users.vue";
import { fetchAllUsers, fetchUsersByName } from "@/services/userService";
import { vi } from "vitest";
import { mountWithPlugins, testIdQueryString } from "@/test/test-util";
import UsersList from "@/components/Users/UsersList.vue";
import UsersSearch from "@/components/Users/UsersSearch.vue";

// Mock the service functions
vi.mock("@/services/userService", () => ({
  fetchAllUsers: vi.fn(),
  fetchUsersByName: vi.fn()
}));

describe("Users.vue", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", async () => {
    const neverResolvingPromise = new Promise(() => {});
    fetchAllUsers.mockReturnValueOnce(neverResolvingPromise);
    const wrapper = mountWithPlugins(Users);
    await flushPromises();
    expect(wrapper.find(testIdQueryString("users-loading")).exists()).toBe(
      true
    );
  });

  it("shows error message when fetch fails", async () => {
    const errorMessage = "Failed to fetch";
    fetchAllUsers.mockRejectedValueOnce(new Error(errorMessage));

    const wrapper = mountWithPlugins(Users);

    await flushPromises();

    expect(wrapper.find(testIdQueryString("users-error")).text()).toBe(
      errorMessage
    );
  });

  it("passes users data to UsersList component after successful fetch", async () => {
    const mockData = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ];
    fetchAllUsers.mockResolvedValueOnce(mockData);

    const wrapper = mountWithPlugins(Users);

    await flushPromises();

    const userListComp = wrapper.findComponent(UsersList);
    expect(userListComp.props().users).toEqual(mockData);
  });

  it("calls searchUsers and updates displayed users when search event is emitted by UsersSearch", async () => {
    const mockData = [{ id: 3, name: "Jake" }];
    fetchUsersByName.mockResolvedValueOnce(mockData);

    const wrapper = mountWithPlugins(Users);

    await flushPromises(); // Wait for initial data fetch

    const userSearchComp = wrapper.findComponent(UsersSearch);
    userSearchComp.vm.$emit("search", "Jake");

    await flushPromises(); // Wait for search data fetch

    const userListComp = wrapper.findComponent(UsersList);
    expect(userListComp.props().users).toEqual(mockData);
  });

  it("resets displayed users to all users when clear event is emitted by UsersSearch", async () => {
    const initialData = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" }
    ];
    fetchAllUsers.mockResolvedValueOnce(initialData);

    const wrapper = mountWithPlugins(Users);

    await flushPromises(); // Wait for initial data fetch

    const userSearchComp = wrapper.findComponent(UsersSearch);
    userSearchComp.vm.$emit("clear");

    await flushPromises();

    const userListComp = wrapper.findComponent(UsersList);
    expect(userListComp.props().users).toEqual(initialData);
  });
});
