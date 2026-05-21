import { AreaPage } from "@/components/AreaPage";
import { TutorChat } from "@/components/TutorChat";
import { getLoggedRoute } from "@/lib/get-logged-route";

export default function ChatPage() {
  return (
    <AreaPage area={getLoggedRoute("/chat")}>
      <div className="mt-6">
        <TutorChat />
      </div>
    </AreaPage>
  );
}
