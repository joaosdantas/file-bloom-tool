import AppLayout from "@/components/AppLayout";
import { FileText, Download, Eye, FolderOpen } from "lucide-react";

const documents = [
  { name: "Contrato de Compra e Venda", type: "PDF", size: "2.4 MB", date: "10/01/2025", category: "Contratos" },
  { name: "Planta do Apartamento - Tipo A", type: "PDF", size: "5.1 MB", date: "10/01/2025", category: "Plantas" },
  { name: "Memorial Descritivo", type: "PDF", size: "1.8 MB", date: "10/01/2025", category: "Documentos" },
  { name: "Termos e Condições", type: "PDF", size: "890 KB", date: "10/01/2025", category: "Contratos" },
  { name: "Convenção do Condomínio", type: "PDF", size: "1.2 MB", date: "15/02/2025", category: "Documentos" },
  { name: "Cronograma Físico-Financeiro", type: "XLSX", size: "340 KB", date: "01/03/2025", category: "Financeiro" },
];

const categories = ["Todos", "Contratos", "Plantas", "Documentos", "Financeiro"];

const Documentos = () => (
  <AppLayout>
    <h1 className="text-2xl font-display font-bold text-foreground mb-6">Documentos</h1>

    {/* Categories */}
    <div className="flex gap-2 mb-6 flex-wrap">
      {categories.map((cat, i) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            i === 0
              ? "gradient-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:text-card-foreground shadow-card"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* Documents Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {documents.map((doc, i) => (
        <div key={i} className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300 group">
          <div className="flex items-start gap-3">
            <div className="gradient-primary rounded-lg p-2.5 flex-shrink-0">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">{doc.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{doc.type} · {doc.size}</p>
              <div className="flex items-center gap-1 mt-1">
                <FolderOpen className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{doc.category}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg bg-muted text-muted-foreground hover:text-card-foreground transition-colors">
              <Eye className="h-3.5 w-3.5" /> Visualizar
            </button>
            <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-2 rounded-lg gradient-primary text-primary-foreground">
              <Download className="h-3.5 w-3.5" /> Baixar
            </button>
          </div>
        </div>
      ))}
    </div>
  </AppLayout>
);

export default Documentos;
