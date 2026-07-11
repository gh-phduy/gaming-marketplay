import { getDashboardProfile } from "./_lib/dashboard.data";
import DashboardClient from "./_components/DashboardClient";

export default async function DashboardPage() {
  const profile = getDashboardProfile();

  return <DashboardClient profile={profile} />;
}
