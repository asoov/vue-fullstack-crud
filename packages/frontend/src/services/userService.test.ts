import { fetchAllUsers, fetchUsersByName } from "./userService";
import { vi } from "vitest";

describe("User Service", () => {
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  // Store the original fetch function to restore it later
  let originalFetch: any;

  // Run before each test
  beforeEach(() => {
    originalFetch = global.fetch;
  });

  // Cleanup after each test
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("fetchAllUsers returns data when successful", async () => {
    const mockData = [{ id: 1, name: "John Doe" }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const result = await fetchAllUsers();

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`${API_ENDPOINT}/users`);
  });

  it("fetchAllUsers throws error when request fails", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false
      })
    );

    await expect(fetchAllUsers()).rejects.toThrow("Failed to fetch users");
  });

  it("fetchUsersByName returns data when successful", async () => {
    const mockData = [{ id: 2, name: "Jane Doe" }];
    const name = "Jane";
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      })
    );

    const result = await fetchUsersByName(name);

    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      `${API_ENDPOINT}/users/name/${name}`
    );
  });

  it("fetchUsersByName throws error when request fails", async () => {
    const name = "Jane";
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false
      })
    );

    await expect(fetchUsersByName(name)).rejects.toThrow(
      "Failed to fetch users by name"
    );
  });
});
