import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Send, Paperclip, Phone, Video, Building2 } from "lucide-react";

const messages = [
  { from: "construtora", text: "Olá! Bem-vindo ao chat da Construtora Horizonte. Como podemos ajudar?", time: "09:00" },
  { from: "user", text: "Bom dia! Gostaria de saber sobre o andamento da obra do bloco B.", time: "09:05" },
  { from: "construtora", text: "Claro! O bloco B está com 62% de conclusão. Acabamos de finalizar a concretagem do 8º andar. A próxima etapa será a instalação elétrica dos andares 7 e 8.", time: "09:07" },
  { from: "user", text: "Ótimo! E sobre a escolha dos acabamentos, quando posso agendar?", time: "09:10" },
  { from: "construtora", text: "A personalização de acabamentos estará disponível a partir de abril. Enviaremos uma notificação com as opções e datas disponíveis para agendamento. 😊", time: "09:12" },
];

const Chat = () => {
  const [input, setInput] = useState("");

  return (
    <AppLayout>
      <div className="bg-card rounded-xl shadow-card overflow-hidden flex flex-col" style={{ height: "calc(100vh - 8rem)" }}>
        {/* Header */}
        <div className="gradient-primary p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="gradient-accent rounded-full p-2">
              <Building2 className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <p className="font-semibold text-primary-foreground text-sm">Construtora Horizonte</p>
              <p className="text-xs text-primary-foreground/70">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              <Phone className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-lg text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              <Video className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.from === "user"
                  ? "gradient-primary text-primary-foreground rounded-br-sm"
                  : "bg-card text-card-foreground shadow-card rounded-bl-sm"
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.from === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-card-foreground transition-colors">
              <Paperclip className="h-5 w-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="gradient-primary p-2.5 rounded-lg text-primary-foreground hover:opacity-90 transition-opacity">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;
