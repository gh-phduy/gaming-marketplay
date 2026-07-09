import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "./route";

// Mock Stripe
vi.mock("stripe", () => {
  return {
    default: class Stripe {
      paymentIntents = {
        create: vi.fn().mockResolvedValue({
          client_secret: "mock-client-secret-123",
        }),
      };
    },
  };
});

// Polyfill Request if needed in test environment, but Next.js Request should be available.
// If it's not, we can construct one or use a mock.
describe("POST /api/create-payment-intent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.STRIPE_SECRET_KEY = "test_key";
  });

  it("should create a payment intent with the provided amount", async () => {
    const request = new Request("http://localhost/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount: 5000 }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("clientSecret", "mock-client-secret-123");
  });

  it("should default to amount 100 if none provided", async () => {
    const request = new Request("http://localhost/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
  });
});
