import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function TrilhasPage() {
  return <AreaPage area={getLoggedRoute("/trilhas")} />;
}
