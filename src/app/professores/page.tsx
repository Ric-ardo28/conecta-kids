import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function ProfessoresPage() {
  return <AreaPage area={getLoggedRoute("/professores")} />;
}
