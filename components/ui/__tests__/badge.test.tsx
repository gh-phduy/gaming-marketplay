import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../badge";
import React from "react";

describe("Badge Component", () => {
  it("should render the badge with text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("should apply default variant classes", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass("bg-primary");
  });

  it("should apply secondary variant classes", () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(container.firstChild).toHaveClass("bg-secondary");
  });

  it("should apply destructive variant classes", () => {
    const { container } = render(<Badge variant="destructive">Destructive</Badge>);
    expect(container.firstChild).toHaveClass("bg-destructive");
  });

  it("should allow additional class names", () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("should forward props correctly", () => {
    render(<Badge data-testid="test-badge">Props Forwarded</Badge>);
    expect(screen.getByTestId("test-badge")).toBeInTheDocument();
  });
});
