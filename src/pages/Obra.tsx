import AppLayout from "@/components/AppLayout";
import ProgressTimeline from "@/components/ProgressTimeline";
import heroImage from "@/assets/hero-construction.jpg";
import { Camera, Clock } from "lucide-react";

const photos = [
  { date: "07 Mar 2025", caption: "Concretagem do 8º andar" },
  { date: "01 Mar 2025", caption: "Instalação hidráulica 6º andar" },
  { date: "22 Fev 2025", caption: "Alvenaria do 7º andar" },
  { date: "15 Fev 2025", caption: "Vista geral da fachada" },
  { date: "08 Fev 2025", caption: "Estrutura completa até 6º andar" },
  { date: "01 Fev 2025", caption: "Formas do 7º pavimento" },
];

const Obra = () => (
  <AppLayout>
    <h1 className="text-2xl font-display font-bold text-foreground mb-6">
      Acompanhamento da Obra
    </h1>

    {/* Progress overview */}
    <div className="bg-card rounded-xl p-6 shadow-card mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-card-foreground">Progresso Geral</h2>
        <span className="text-2xl font-display font-bold text-primary">62%</span>
      </div>
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full gradient-primary transition-all duration-700" style={{ width: "62%" }} />
      </div>
      <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" /> Previsão de entrega: Março 2026
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ProgressTimeline />

      {/* Photo Gallery */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center gap-2 mb-5">
          <Camera className="h-5 w-5 text-accent" />
          <h3 className="font-display font-bold text-card-foreground text-lg">Fotos da Obra</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, i) => (
            <div key={i} className="group relative rounded-lg overflow-hidden aspect-video bg-muted cursor-pointer">
              <img
                src={heroImage}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs font-medium text-primary-foreground">{photo.caption}</p>
                <p className="text-xs text-primary-foreground/70">{photo.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AppLayout>
);

export default Obra;
