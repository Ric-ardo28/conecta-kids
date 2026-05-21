import { AreaPage } from "@/components/AreaPage";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function PerfilPage() {
  return <AreaPage area={getLoggedRoute("/perfil")} />;
}
