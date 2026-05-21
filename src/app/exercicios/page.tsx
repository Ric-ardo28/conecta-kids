import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function ExerciciosPage() {
  return <AreaPage area={getLoggedRoute("/exercicios")} />;
}
