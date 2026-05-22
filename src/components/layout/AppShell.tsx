import { Sidebar } from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export function AppShell({ children, sidebar = <Sidebar /> }: AppShellProps) {
  return (
    <main className="min-h-screen px-4 py-4 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[300px_1fr]">
        {sidebar}
        <section className="min-w-0">{children}</section>
      </div>
    </main>
  );
}
