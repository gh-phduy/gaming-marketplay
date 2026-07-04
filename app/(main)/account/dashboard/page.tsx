import { getDashboardProfile } from "./dashboard.data";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const profile = getDashboardProfile();

  return <DashboardClient profile={profile} />;
}
