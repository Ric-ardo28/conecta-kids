import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function RankingPage() {
  return <AreaPage area={getLoggedRoute("/ranking")} />;
}
