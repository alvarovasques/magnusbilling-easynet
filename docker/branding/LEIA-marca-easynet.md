# Camada A — marca Easynet Telefônica (deploy)

Isto troca a marca visível do painel (MagnusBilling → Easynet Telefônica) sem
recompilar tema e sem tocar na telefonia. É reversível: some se os arquivos
forem removidos e a imagem for rebuildada.

## O que este pacote contém

```
docker/branding/
  apply-branding.sh     # aplica tudo no build (idempotente)
  easynet.css           # paleta Easynet sobre o tema blue-crisp
  easynet.js            # nome/logo do produto, splash, remove textos/links Magnus
  easynet-logo.png      # logo colorida (topo/claro)
  easynet-mark.png      # marca do splash e da janela "Sobre"
  easynet-white.png     # logo branca (tela de login, fundo navy)
  logo.png              # substitui o logo padrão do app
  loading.gif           # substitui o gif do splash
  easynet.ico           # substitui o favicon
Dockerfile              # já com o bloco "Marca Easynet" chamando o script
```

## Como subir (fluxo que você já usa)

1. Coloque a pasta `docker/branding/` na raiz do seu repo e substitua o
   `Dockerfile` pelo desta entrega (ele só ganhou um bloco novo; nada foi
   removido). Commit + push na branch `source`.
2. O GitHub Actions builda e publica `ghcr.io/alvarovasques/magnusbilling:latest`.
3. Re-puxe no nó MB:
   ```
   docker service update --image ghcr.io/alvarovasques/magnusbilling:latest \
     mb_app --with-registry-auth --force
   ```
4. Abra `https://mb.di4e.com.br`, dê um Ctrl+Shift+R (limpa cache do ExtJS) e
   confira: título da aba, splash, login com logo branca, e a janela "Sobre"
   já como Easynet.

## O que fica para a Camada B (tema Sencha nativo)

Esta camada recolore as superfícies principais (login, barra superior, menu,
grids, botões, seleção) e remove os textos/links "MagnusBilling". Cantos
desenhados só via SCSS do tema (alguns estados de componente, ícones do tema)
ficam para o tema `easynet-crisp` compilado pelo Sencha Cmd, que é a Fase 2 do
plano. A Camada A entra já e serve de especificação viva para a Camada B.

## Ajustes rápidos que talvez você queira

- Link "Ajuda/Sobre" dos operadores: em `easynet.js`, `BRAND.helpUrl` aponta
  para onde os antigos links do wiki magnusbilling.org passam a levar.
- Textos de e-mail/fatura (SMTP) e nome do sistema no banco: são **dados**, não
  entram aqui. Ficam na Camada B/Fase 2 (migração dos seeds no MariaDB).
