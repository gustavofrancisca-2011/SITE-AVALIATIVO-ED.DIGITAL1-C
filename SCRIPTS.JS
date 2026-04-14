// GESTÃO DE DADOS (Simulação de um banco de dados para a página)
const statsData = [
    { title: "Perda de Biodiversidade", info: "Mais de 10.000 espécies correm risco de extinção devido à perda de habitat." },
    { title: "Emissões de CO2", info: "O desmatamento é responsável por cerca de 15% das emissões globais de gases estufa." },
    { title: "Ciclo da Água", info: "A redução das florestas impacta diretamente o regime de chuvas em todo o continente." }
];

const learnMoreData = [
    { 
        question: "Por que as florestas são desmatadas?", 
        answer: "As principais causas incluem a expansão agropecuária, extração ilegal de madeira, mineração e crescimento urbano desordenado." 
    },
    { 
        question: "Quais são as consequências imediatas?", 
        answer: "Erosão do solo, perda de recursos medicinais naturais e o agravamento das crises climáticas extremas." 
    }
];

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    renderAccordion();
    initA11y();
    initScrollReveal();
});

// RENDERIZAÇÃO DINÂMICA
function renderCards() {
    const grid = document.getElementById('stats-grid');
    grid.innerHTML = statsData.map(item => `
        <article class="card" role="listitem">
            <h3>${item.title}</h3>
            <p>${item.info}</p>
        </article>
    `).join('');
}

function renderAccordion() {
    const container = document.getElementById('accordion-container');
    container.innerHTML = learnMoreData.map((item, index) => `
        <div class="accordion-item">
            <button class="accordion-btn" aria-expanded="false" aria-controls="content-${index}">
                ${item.question} <span>+</span>
            </button>
            <div id="content-${index}" class="accordion-content" role="region">
                <p>${item.answer}</p>
            </div>
        </div>
    `).join('');

    // Lógica do Acordeão
    document.querySelectorAll('.accordion-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !expanded);
            const content = btn.nextElementSibling;
            content.style.maxHeight = expanded ? "0px" : content.scrollHeight + "px";
            btn.querySelector('span').innerText = expanded ? "+" : "-";
        });
    });
}

// ACESSIBILIDADE
function initA11y() {
    let fontMultiplier = 1;
    const body = document.body;

    document.getElementById('btn-contrast').addEventListener('click', () => {
        body.classList.toggle('high-contrast');
    });

    document.getElementById('btn-font-increase').addEventListener('click', () => {
        if (fontMultiplier < 1.5) {
            fontMultiplier += 0.1;
            updateFontSize();
        }
    });

    document.getElementById('btn-font-decrease').addEventListener('click', () => {
        if (fontMultiplier > 0.8) {
            fontMultiplier -= 0.1;
            updateFontSize();
        }
    });

    function updateFontSize() {
        document.documentElement.style.setProperty('--font-base', (16 * fontMultiplier) + 'px');
    }
}

// ANIMAÇÃO DE SCROLL (Intersection Observer)
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.section-reveal').forEach(section => {
        observer.observe(section);
    });
}
