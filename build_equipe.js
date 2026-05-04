const fs = require('fs');
const path = require('path');

const cssPath = 'assets/css/microframework.css';
const indexHtmlPath = 'index.html';
const imagesDir = 'assets/imagens/equipe';

// Rename images
const files = fs.readdirSync(imagesDir);
files.forEach(file => {
    if (file.includes('_17')) {
        const newName = file.replace(/_\d+\.png$/, '.png');
        fs.renameSync(path.join(imagesDir, file), path.join(imagesDir, newName));
    }
});

// Append CSS
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.bem-carousel-track')) {
    css += `\n
/* --- Correcao Navbar Sticky --- */
#navbar-principal-container,
#navbar-secundaria-container {
  display: contents;
}

/* --- Carrossel Infinito Equipe --- */
.bem-carousel-container {
  overflow: hidden;
  width: 100%;
  padding: var(--bem-spacing-md) 0;
}
.bem-carousel-track {
  display: flex;
  width: max-content;
  animation: bem-marquee 20s linear infinite;
  gap: var(--bem-spacing-md);
}
.bem-carousel-container:hover .bem-carousel-track {
  animation-play-state: paused;
}
.bem-carousel-item {
  width: 280px;
  flex-shrink: 0;
}
@keyframes bem-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - (var(--bem-spacing-md) / 2))); }
}
`;
    fs.writeFileSync(cssPath, css, 'utf8');
}

// Replace HTML
const equipeHtml = `<section class="bem-container" id="equipe">
            <h2 class="bem-titulo-h2">Nossa Equipe</h2>
            <div class="bem-carousel-container">
                <div class="bem-carousel-track">
                    <!-- Originais -->
                    <div class="bem-card bem-carousel-item">
                        <img class="bem-card__image" src="assets/imagens/equipe/membro1_homem.png" alt="Carlos Silva">
                        <div class="bem-card__body bem-text-center">
                            <h3 class="bem-card__title">Carlos Silva</h3>
                            <p class="bem-card__subtitle">Especialista em Pintura</p>
                        </div>
                    </div>
                    <div class="bem-card bem-carousel-item">
                        <img class="bem-card__image" src="assets/imagens/equipe/membro2_mulher.png" alt="Amanda Costa">
                        <div class="bem-card__body bem-text-center">
                            <h3 class="bem-card__title">Amanda Costa</h3>
                            <p class="bem-card__subtitle">Mecânica Chefe</p>
                        </div>
                    </div>
                    <div class="bem-card bem-carousel-item">
                        <img class="bem-card__image" src="assets/imagens/equipe/membro3_homem.png" alt="Roberto Souza">
                        <div class="bem-card__body bem-text-center">
                            <h3 class="bem-card__title">Roberto Souza</h3>
                            <p class="bem-card__subtitle">Especialista Eletrônico</p>
                        </div>
                    </div>
                    <div class="bem-card bem-carousel-item">
                        <img class="bem-card__image" src="assets/imagens/equipe/membro4_mulher.png" alt="Juliana Martins">
                        <div class="bem-card__body bem-text-center">
                            <h3 class="bem-card__title">Juliana Martins</h3>
                            <p class="bem-card__subtitle">Suspensão e Freios</p>
                        </div>
                    </div>
                    <!-- Clones (para o loop infinito) -->
                    <div class="bem-card bem-carousel-item">
                        <img class="bem-card__image" src="assets/imagens/equipe/membro1_homem.png" alt="Carlos Silva">
                        <div class="bem-card__body bem-text-center">
                            <h3 class="bem-card__title">Carlos Silva</h3>
                            <p class="bem-card__subtitle">Especialista em Pintura</p>
                        </div>
                    </div>
                    <div class="bem-card bem-carousel-item">
                        <img class="bem-card__image" src="assets/imagens/equipe/membro2_mulher.png" alt="Amanda Costa">
                        <div class="bem-card__body bem-text-center">
                            <h3 class="bem-card__title">Amanda Costa</h3>
                            <p class="bem-card__subtitle">Mecânica Chefe</p>
                        </div>
                    </div>
                    <div class="bem-card bem-carousel-item">
                        <img class="bem-card__image" src="assets/imagens/equipe/membro3_homem.png" alt="Roberto Souza">
                        <div class="bem-card__body bem-text-center">
                            <h3 class="bem-card__title">Roberto Souza</h3>
                            <p class="bem-card__subtitle">Especialista Eletrônico</p>
                        </div>
                    </div>
                    <div class="bem-card bem-carousel-item">
                        <img class="bem-card__image" src="assets/imagens/equipe/membro4_mulher.png" alt="Juliana Martins">
                        <div class="bem-card__body bem-text-center">
                            <h3 class="bem-card__title">Juliana Martins</h3>
                            <p class="bem-card__subtitle">Suspensão e Freios</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>`;

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
// replace section equipe
indexHtml = indexHtml.replace(/<section class="bem-container" id="equipe">[\s\S]*?<\/section>/, equipeHtml);
fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

console.log("Feito!");
