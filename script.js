// ======================================================================
// ===============================
// CONFIGURAÇÕES DO SITE
// ===============================
// Altere apenas os valores abaixo para personalizar o site.
// Não é necessário mexer no restante do código.
// ======================================================================

const CONFIG = {

  // ---------- DADOS GERAIS ----------
  nomePeixaria: "Sul Congelados",
  slogan: "Qualidade e Praticidade na sua mesa!",
  

  // ---------- TEXTOS DO TOPO (HERO) ----------
  heroTitulo: "Qualidade e Praticidade na sua mesa!",
  heroTexto: "Atendemos por atacado e varejo. Nossa empresa conta com os selos S.I.M. e SUSAF.",

  // ---------- DIFERENCIAIS RÁPIDOS (topo da página) ----------
  diferenciaisRapidos: [
    "",
    "",
    "",
    ""
  ],

  // ---------- CONTATO ----------
  whatsapp: "555182111731",   // Somente números: DDI + DDD + número
  whatsappExibicao: "+55 (51) 98211-1731",
  telefone: "+55 (51) 98211-1731",
  endereco: "Rua Kraemer-Eck, 258 - Bairro Centenário",
  cidade: "Sapiranga - RS, CEP 93800-440",

  // ---------- MENSAGEM AUTOMÁTICA DO BOTÃO FLUTUANTE ----------
  mensagemWhatsappPadrao: "Olá! Gostaria de fazer um pedido na [NOME DA PEIXARIA].",

  // ---------- REDES SOCIAIS ----------
  redesSociais: {
    instagram: "https://www.instagram.com/sulcongeladospesc/",
    facebook: "https://www.facebook.com/sulcongelados/?locale=pt_BR",
  },

  // ---------- SOBRE A EMPRESA ----------
  sobreTexto: "Conheça a Sul Congelados: nossa missão, nossa visão e os valores que guiam o nosso trabalho.",

  // ---------- CARROSSEL DE FOTOS (7 fotos) ----------
  // Troque os endereços abaixo pelas suas fotos (ex.: "fotos/01.jpg").
  // "legenda" é opcional: deixe "" para não mostrar texto na foto.
  carrossel: [
    { foto: "01.jpg", legenda: "" },
    { foto: "02.jpg", legenda: "" },
    { foto: "03.jpg", legenda: "" },
    { foto: "04.jpg", legenda: "" },
    { foto: "05.jpg", legenda: "" },
    { foto: "06.jpg", legenda: "" },
    { foto: "07.jpg", legenda: "" }
  ],
  carrosselSegundos: 5,   // tempo para trocar sozinho (0 = não troca sozinho)

  // ---------- HORÁRIO DE FUNCIONAMENTO ----------
  horarios: [
    { dia: "Segunda-feira", horario: "8:00 até 11:30 / 14:00 até 19:00" },
    { dia: "Terça-feira", horario: "8:00  até 11:30 / 14:00 até 19:00" },
    { dia: "Quarta-feira", horario: "8:00  até 11:30 / 14:00 até 19:00" },
    { dia: "Quinta-feira", horario: "8:00  até 11:30 / 14:00 até 19:00" },
    { dia: "Sexta-feira", horario: "8:00  até 11:30 / 14:00 até 19:00" },
    { dia: "Sábado", horario: "8:00 até 12:00 / 14:30 até 18:00" },
    { dia: "Domingo", horario: "Fechado" }
  ]
};

// ======================================================================
// A PARTIR DAQUI: LÓGICA DO SITE
// (não é necessário alterar para uso básico)
// ======================================================================

document.addEventListener("DOMContentLoaded", () => {
  preencherConfiguracoes();
  renderizarHorarios();
  configurarMenu();
  configurarHeaderScroll();
  configurarCarrossel();
  configurarAnimacoesScroll();
  configurarWhatsappFloat();
});

// ----------------------------------------------------------------------
// Preenche todos os textos editáveis do HTML com os dados do CONFIG
// ----------------------------------------------------------------------
function preencherConfiguracoes() {
  const setText = (id, valor) => {
    const el = document.getElementById(id);
    if (el && valor !== undefined) el.textContent = valor;
  };
  const setHref = (id, valor) => {
    const el = document.getElementById(id);
    if (el && valor) el.setAttribute("href", valor);
  };

  // Nome e slogan (topo, hero, rodapé)
  setText("logoNome", CONFIG.nomePeixaria);
  setText("logoSlogan", CONFIG.slogan);
  setText("heroSlogan", CONFIG.slogan);
  setText("footerNome", CONFIG.nomePeixaria);
  setText("footerSlogan", CONFIG.slogan);
  setText("footerNomeBottom", CONFIG.nomePeixaria);
  document.title = `${CONFIG.nomePeixaria} | Pescados Frescos`;

  // Hero
  setText("heroTitulo", CONFIG.heroTitulo);
  setText("heroTexto", CONFIG.heroTexto);

  const infoItens = document.querySelectorAll(".hero__info li");
  CONFIG.diferenciaisRapidos.forEach((texto, i) => {
    if (infoItens[i]) {
      const icone = infoItens[i].querySelector(".hero__info-icon").outerHTML;
      infoItens[i].innerHTML = `${icone} ${texto}`;
    }
  });

  // Sobre
  setText("sobreTexto", CONFIG.sobreTexto);

  // Localização
  setText("infoEndereco", CONFIG.endereco);
  setText("infoCidade", CONFIG.cidade);
  setText("infoTelefone", CONFIG.telefone);
  setText("infoWhatsapp", CONFIG.whatsappExibicao);

  // Redes sociais (localização e rodapé)
  setHref("socialInstagram", CONFIG.redesSociais.instagram);
  setHref("socialFacebook", CONFIG.redesSociais.facebook);
  setHref("socialTiktok", CONFIG.redesSociais.tiktok);
  setHref("footerInstagram", CONFIG.redesSociais.instagram);
  setHref("footerFacebook", CONFIG.redesSociais.facebook);
  setHref("footerTiktok", CONFIG.redesSociais.tiktok);

  // Rodapé
  setText("footerEndereco", CONFIG.endereco);
  setText("footerTelefone", CONFIG.telefone);
  setText("footerAno", new Date().getFullYear());
}

// ----------------------------------------------------------------------
// Renderiza a tabela de horários a partir de CONFIG.horarios
// ----------------------------------------------------------------------
function renderizarHorarios() {
  const tbody = document.querySelector("#hoursTable tbody");
  if (!tbody) return;

  tbody.innerHTML = CONFIG.horarios.map((item) => `
    <tr>
      <td>${item.dia}</td>
      <td>${item.horario}</td>
    </tr>
  `).join("");
}

// ----------------------------------------------------------------------
// MENU (desktop / hambúrguer no mobile)
// ----------------------------------------------------------------------
function configurarMenu() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    });
  });
}

// ----------------------------------------------------------------------
// EFEITO NO CABEÇALHO AO ROLAR A PÁGINA
// ----------------------------------------------------------------------
function configurarHeaderScroll() {
  const header = document.getElementById("header");

  const atualizar = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  atualizar();
  window.addEventListener("scroll", atualizar);
}

// ----------------------------------------------------------------------
// BOTÃO FLUTUANTE DE WHATSAPP (mensagem padrão)
// ----------------------------------------------------------------------
function configurarWhatsappFloat() {
  const botao = document.getElementById("whatsappFloat");
  if (!botao) return;

  const mensagem = CONFIG.mensagemWhatsappPadrao.replace("[NOME DA PEIXARIA]", CONFIG.nomePeixaria);
  const link = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`;
  botao.setAttribute("href", link);
}

// ----------------------------------------------------------------------
// CARROSSEL DE FOTOS (setas, bolinhas, arrastar no celular e automático)
// ----------------------------------------------------------------------
function configurarCarrossel() {
  const raiz = document.getElementById("carousel");
  const track = document.getElementById("carouselTrack");
  const dots = document.getElementById("carouselDots");
  if (!raiz || !track) return;

  const fotos = CONFIG.carrossel;
  const total = fotos.length;
  let atual = 0;
  let timer = null;

  track.innerHTML = fotos.map((f, i) => `
    <figure class="carousel__slide" style="--foto: url('${f.foto}')" aria-label="Foto ${i + 1} de ${total}">
      <img src="${f.foto}" alt="${f.legenda || "Foto " + (i + 1) + " da peixaria"}" />
      ${f.legenda ? `<figcaption>${f.legenda}</figcaption>` : ""}
    </figure>`).join("");

  dots.innerHTML = fotos.map((_, i) =>
    `<button type="button" data-i="${i}" aria-label="Ir para a foto ${i + 1}"></button>`
  ).join("");

  const ir = (i) => {
    atual = (i + total) % total;
    track.style.transform = `translateX(-${atual * 100}%)`;
    dots.querySelectorAll("button").forEach((b, n) => b.classList.toggle("active", n === atual));
  };

  const parar = () => { clearInterval(timer); timer = null; };
  const iniciar = () => {
    parar();
    const seg = CONFIG.carrosselSegundos;
    if (seg > 0) timer = setInterval(() => ir(atual + 1), seg * 1000);
  };

  document.getElementById("carouselPrev").addEventListener("click", () => { ir(atual - 1); iniciar(); });
  document.getElementById("carouselNext").addEventListener("click", () => { ir(atual + 1); iniciar(); });
  dots.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) { ir(Number(b.dataset.i)); iniciar(); }
  });

  raiz.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { ir(atual - 1); iniciar(); }
    if (e.key === "ArrowRight") { ir(atual + 1); iniciar(); }
  });

  // Arrastar o dedo no celular
  let inicioX = null;
  raiz.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; parar(); }, { passive: true });
  raiz.addEventListener("touchend", (e) => {
    if (inicioX !== null) {
      const dx = e.changedTouches[0].clientX - inicioX;
      if (Math.abs(dx) > 50) ir(atual + (dx < 0 ? 1 : -1));
    }
    inicioX = null;
    iniciar();
  });

  ir(0);
  iniciar();
}

// ----------------------------------------------------------------------
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS AO ROLAR A PÁGINA
// ----------------------------------------------------------------------
function configurarAnimacoesScroll() {
  const elementos = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach((el) => observer.observe(el));
}
