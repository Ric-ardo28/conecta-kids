import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function TurmasPage() {
  return <AreaPage area={getLoggedRoute("/turmas")} />;
}
