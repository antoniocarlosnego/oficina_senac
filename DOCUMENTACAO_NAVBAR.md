# Documentação: Refatoração e Componentização da Navbar

**Data:** 30 de Abril de 2026
**Objetivo:** Centralizar o código das barras de navegação (Navbars) para evitar duplicação de código e facilitar a manutenção em múltiplas páginas.

---

## 1. O Problema Original
O projeto possuía três páginas principais (`index.html`, `projetos.html` e `servicos.html`). Em todas elas, o código HTML extenso da barra de navegação (que incluía ícones SVG pesados, logo e links) estava duplicado. 

Isso gerava um problema grave de manutenção: se fosse necessário adicionar uma nova página ao menu ou alterar o número de telefone do contato, o desenvolvedor teria que abrir manualmente cada um dos arquivos HTML e fazer a exata mesma alteração, correndo risco de esquecer alguma página e quebrar a consistência do site.

## 2. A Solução (Componentização via JavaScript)
Para resolver isso, adotamos uma abordagem de **Componentização Frontend Vanilla**. Retiramos a responsabilidade do HTML de guardar esse bloco de código e delegamos para o JavaScript, que agora atua como uma "fonte única da verdade" (Single Source of Truth).

### 2.1. O que foi feito passo a passo:

1. **Criação do arquivo `navbar.js`:**
   - Criamos o arquivo `assets/js/navbar.js`.
   - Nele, guardamos todo o HTML da **Navbar Principal** (Logo, Email, Telefone, Redes Sociais) e da **Navbar Secundária** (Links de navegação como Home, Serviços, Sobre) dentro de variáveis de texto (Template Strings).
   - Ajustamos os links (ex: `href="index.html#sobre"`) para que funcionem corretamente não importa em qual página o usuário esteja.

2. **Limpeza dos arquivos HTML:**
   - Apagamos as tags `<nav>` gigantes de dentro de `index.html`, `projetos.html` e `servicos.html`.
   - Isso reduziu o tamanho e a complexidade visual desses arquivos drasticamente.

3. **Criação dos "Containers Âncora":**
   - No local exato onde as navbars deveriam renderizar em cada página, colocamos `divs` vazias com IDs específicos:
     ```html
     <div id="navbar-principal-container"></div>
     <div id="navbar-secundaria-container"></div>
     ```
   - O uso de dois contêineres separados foi proposital. Isso permite que o layout original seja mantido (por exemplo, no `index.html`, o Banner Hero fica entre a navbar principal e a secundária).

4. **Injeção Dinâmica:**
   - Adicionamos a tag `<script src="assets/js/navbar.js"></script>` no final do corpo (`<body>`) de cada página.
   - Quando a página carrega, o JavaScript procura pelos contêineres e "injeta" o HTML da navbar dentro deles instantaneamente.

---

## 3. Como dar manutenção a partir de agora?

Se você quiser adicionar um novo link (ex: "Galeria"), mudar o e-mail de contato, ou trocar o SVG do logo, você **não deve mais abrir os arquivos HTML**.

Basta seguir este passo:
1. Abra o arquivo `assets/js/navbar.js`.
2. Edite o HTML que está dentro das crases (`` ` ``).
3. Salve o arquivo.

**Resultado:** A alteração será replicada automaticamente para a página Home, Projetos, Serviços e qualquer outra página futura que utilize os contêineres e o script da navbar.
