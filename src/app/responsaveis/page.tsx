import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function ResponsaveisPage() {
  return <AreaPage area={getLoggedRoute("/responsaveis")} />;
}
