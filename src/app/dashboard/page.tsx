import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function DashboardPage() {
  return <AreaPage area={getLoggedRoute("/dashboard")} />;
}
