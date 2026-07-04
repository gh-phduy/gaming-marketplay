import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account - Difmark",
  description: "Manage your Difmark account, wallet, orders, and settings",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
