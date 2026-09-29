# Central do Jogo — Pizzaria

Site estático em HTML/CSS/JavaScript, responsivo para celular, tablet e desktop.

## O que já vem pronto

- Área pública sem cadastro/login.
- Seção de instruções/tutorial.
- Dado com animação 3D e resultado aleatório de 1 a 6.
- Desafios em cards com filtro por categoria.
- Área opcional para incorporar o jogo principal por URL (iframe).
- Pop-up de entrada configurável.
- Painel do desenvolvedor com edição de:
  - textos e títulos;
  - cores principais;
  - tutorial e quantidade de passos;
  - desafios, quantidade, ícones, categorias e dificuldade;
  - pop-up inicial;
  - URL do jogo principal;
  - logo da pizzaria (upload local no navegador).
- Configurações persistidas no `localStorage`.

## Acesso do desenvolvedor

- Token: `Td@0`
- E-mail: `thdyazpereira@gmail.com`

> Importante: como o site é estático, essas credenciais ficam no JavaScript do navegador. Isso serve como bloqueio de interface, mas **não é segurança de servidor**. Para impedir acesso real em produção, o login deve ser movido para um backend/API com autenticação e sessão.

## Como usar

1. Abra `index.html` no navegador para testar.
2. Entre em **Desenvolvedor**.
3. Use o token e o e-mail configurados.
4. Edite o conteúdo e clique em **Salvar alterações**.
5. Para mostrar o jogo principal, informe a URL publicada no campo **URL do jogo**.
6. Para usar a logo oficial, envie o arquivo pelo campo **Logo da pizzaria**.

## Observação sobre os arquivos recebidos

Na criação desta versão, os arquivos disponíveis na Biblioteca desta conversa eram imagens de listas/fotos de bebidas, e não apareceu um arquivo do jogo nem a logo da pizzaria. Por isso o site foi preparado com um ícone temporário de pizza e com upload de logo no painel. Assim que o jogo e a logo forem disponibilizados, podem substituir essa área sem refazer a estrutura do site.
