import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";

function TestComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <p>User: {user ? user.name : "None"}</p>
      <button onClick={() => login({ name: "Test User" })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

test("AuthContext allows login and logout", () => {
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  expect(screen.getByText(/User: None/i)).toBeInTheDocument();

  screen.getByText(/Login/i).click();
  expect(screen.getByText(/User: Test User/i)).toBeInTheDocument();

  screen.getByText(/Logout/i).click();
  expect(screen.getByText(/User: None/i)).toBeInTheDocument();
});
