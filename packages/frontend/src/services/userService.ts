import { User } from "fullstack-crud-node-backend/dist/user/user";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export async function fetchAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_ENDPOINT}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function fetchUsersByName(name: string): Promise<User[]> {
  const response = await fetch(`${API_ENDPOINT}/users/name/${name}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users by name");
  }
  return response.json();
}
