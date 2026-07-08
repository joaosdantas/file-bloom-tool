# Serviços

Camada de acesso a dados. Cada arquivo aqui encapsula chamadas ao Lovable Cloud
(Supabase) por domínio de negócio: `profileService.ts`, `paymentsService.ts`, etc.

Regras:
- Nenhuma chamada direta a `supabase` deve viver em páginas/componentes; passe
  sempre por um serviço.
- Cada função deve confiar nas políticas de RLS já configuradas no backend.
- Não usar dados mockados aqui — se o dado ainda não existe, o serviço deve
  simplesmente retornar `[]` ou `null`.