import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Obra from "./pages/Obra.tsx";
import Pagamentos from "./pages/Pagamentos.tsx";
import Documentos from "./pages/Documentos.tsx";
import Calendario from "./pages/Calendario.tsx";
import Comunidade from "./pages/Comunidade.tsx";
import Chat from "./pages/Chat.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/obra" element={<Obra />} />
          <Route path="/pagamentos" element={<Pagamentos />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
