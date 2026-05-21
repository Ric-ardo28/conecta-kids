import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function AulasPage() {
  return <AreaPage area={getLoggedRoute("/aulas")} />;
}
