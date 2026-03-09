import AppLayout from "@/components/AppLayout";
import { Users, MessageSquare, ThumbsUp, Share2 } from "lucide-react";

const posts = [
  {
    author: "Maria Silva",
    initials: "MS",
    time: "2h atrás",
    content: "Alguém sabe se já definiram a data para escolha dos pisos? Estou ansiosa para personalizar o apartamento! 🏠",
    likes: 8,
    replies: 3,
  },
  {
    author: "Carlos Oliveira",
    initials: "CO",
    time: "5h atrás",
    content: "Passei pela obra hoje e está ficando incrível! O 8º andar já está quase pronto. Mal posso esperar para a entrega!",
    likes: 15,
    replies: 7,
  },
  {
    author: "Ana Rodrigues",
    initials: "AR",
    time: "1 dia atrás",
    content: "Dica para quem está pensando na decoração: encontrei uma loja ótima de móveis planejados que dá desconto para moradores do empreendimento. Quem quiser, me chama no privado!",
    likes: 22,
    replies: 12,
  },
  {
    author: "Pedro Santos",
    initials: "PS",
    time: "2 dias atrás",
    content: "Organizando um grupo de WhatsApp para os futuros moradores do bloco B. Quem tiver interesse, comente aqui! 📱",
    likes: 31,
    replies: 18,
  },
];

const Comunidade = () => (
  <AppLayout>
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Comunidade</h1>
      <button className="gradient-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
        Nova Publicação
      </button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
        <div className="gradient-primary rounded-lg p-2">
          <Users className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-lg font-display font-bold text-card-foreground">142</p>
          <p className="text-xs text-muted-foreground">Membros</p>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
        <div className="gradient-accent rounded-lg p-2">
          <MessageSquare className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <p className="text-lg font-display font-bold text-card-foreground">38</p>
          <p className="text-xs text-muted-foreground">Publicações este mês</p>
        </div>
      </div>
      <div className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
        <div className="gradient-primary rounded-lg p-2">
          <ThumbsUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="text-lg font-display font-bold text-card-foreground">256</p>
          <p className="text-xs text-muted-foreground">Interações</p>
        </div>
      </div>
    </div>

    {/* Posts */}
    <div className="space-y-4">
      {posts.map((post, i) => (
        <div key={i} className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
              {post.initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-card-foreground">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.time}</p>
            </div>
          </div>
          <p className="text-sm text-card-foreground leading-relaxed mb-4">{post.content}</p>
          <div className="flex items-center gap-4 pt-3 border-t border-border">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp className="h-3.5 w-3.5" /> {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
              <MessageSquare className="h-3.5 w-3.5" /> {post.replies} respostas
            </button>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors ml-auto">
              <Share2 className="h-3.5 w-3.5" /> Compartilhar
            </button>
          </div>
        </div>
      ))}
    </div>
  </AppLayout>
);

export default Comunidade;
