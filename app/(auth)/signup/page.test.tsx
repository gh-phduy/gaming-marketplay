import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import SignUpPage from "./page";
import React from "react";

describe("SignUp Page Integration", () => {
  it("should render the signup form correctly", () => {
    render(<SignUpPage />);

    // Check headings
    expect(screen.getByText("Create a account")).toBeInTheDocument();

    // Check inputs
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    // In current implementation, username has placeholder "Create your password"
    expect(screen.getAllByPlaceholderText("Create your password")).toHaveLength(2);
    expect(screen.getByPlaceholderText("Confirm password")).toBeInTheDocument();

    // Check signup button
    expect(screen.getByText("SIGN UP")).toBeInTheDocument();
  });

  it("should allow user to type in inputs", async () => {
    const user = userEvent.setup();
    render(<SignUpPage />);

    const emailInput = screen.getByPlaceholderText("E-mail");
    const passwordInputs = screen.getAllByPlaceholderText("Create your password");
    const confirmInput = screen.getByPlaceholderText("Confirm password");

    // passwordInputs[0] is username input, passwordInputs[1] is password input
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInputs[0], "testuser");
    await user.type(passwordInputs[1], "password123");
    await user.type(confirmInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInputs[0]).toHaveValue("testuser");
    expect(passwordInputs[1]).toHaveValue("password123");
    expect(confirmInput).toHaveValue("password123");
  });
});
