import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

export default function Home() {
  return (
    <main className="fixed inset-0 z-10 flex h-dvh w-screen min-h-0 flex-col overflow-hidden bg-white/[0.06] lg:flex-row">
      <Sidebar />
      <MessageContainer />
    </main>
  );
}
