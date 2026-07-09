import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import LoginPage from "./page";
import React from "react";

describe("Login Page Integration", () => {
  it("should render the login form correctly", () => {
    render(<LoginPage />);

    // Check headings
    expect(screen.getByText("Log in to your account")).toBeInTheDocument();

    // Check inputs
    expect(screen.getByPlaceholderText("Your Username / E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();

    // Check login button (currently a div with text LOG IN)
    expect(screen.getByText("LOG IN")).toBeInTheDocument();
  });

  it("should allow user to type in inputs", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Your Username / E-mail");
    const passwordInput = screen.getByPlaceholderText("Password");

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
