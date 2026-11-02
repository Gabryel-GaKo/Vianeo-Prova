/* ViaNeo — interações pequenas em JavaScript puro. */
(() => {
  'use strict';

  const menu = document.getElementById('menuViaNeo');
  const menuLinks = document.querySelectorAll('#menuViaNeo a[href^="#"]');

  // Fecha o menu do Bootstrap depois que a pessoa escolhe uma âncora no mobile.
  if (menu && window.bootstrap) {
    const collapse = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });

    menuLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 991.98px)').matches && menu.classList.contains('show')) {
          collapse.hide();
        }
      });
    });
  }

  // Fallback suave para navegadores que não respeitam scroll-behavior no CSS.
  // O deslocamento considera a posição natural do cabeçalho (não fixo no original).
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', targetId);
    });
  });

  // Animações de entrada: esquerda e cima.
  const elementosAnimados = document.querySelectorAll(
    '.animacao-esquerda, .animacao-direita, .animacao-cima, .animacao-imagem'
  );

  if ('IntersectionObserver' in window) {
    const observerAnimacoes = new IntersectionObserver((entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('ativo');
          observer.unobserve(entrada.target);
        }
      });
    }, {
      threshold: 0.2
    });

    elementosAnimados.forEach((elemento) => {
      observerAnimacoes.observe(elemento);
    });
  } else {
    // Garante que o conteúdo continue visível em navegadores sem suporte.
    elementosAnimados.forEach((elemento) => {
      elemento.classList.add('ativo');
    });
  }

})();
