document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.setAttribute('aria-current', 'page');
  });

  const calcInput = document.querySelector('#calc-participants');
  const calcResults = document.querySelector('#calc-results');
  // Plan figures are read off the pricing cards' data-* attributes rather than
  // duplicated here. They were hardcoded before and silently went stale when
  // the cards were repriced (Premium was left at £200/1500 and Enterprise at
  // £400 long after they became £120/800 and £300), so the calculator quoted
  // Growth at £168 for 800 participants when Premium was really £120 — wrong
  // plan recommended AND overquoted. One number per plan, in the markup.
  const PLANS = Array.from(document.querySelectorAll('.price-card[data-plan-id]')).map(card => ({
    id: card.dataset.planId,
    name: (card.querySelector('.plan-name') || {}).textContent.trim(),
    price: parseFloat(card.dataset.price),
    included: card.dataset.included === 'unlimited' ? Infinity : parseInt(card.dataset.included, 10),
    overage: parseFloat(card.dataset.overage) || 0,
  }));

  if (calcInput && calcResults && PLANS.length) {
    function render() {
      const participants = Math.max(0, parseInt(calcInput.value, 10) || 0);
      const costs = PLANS.map(p => {
        const over = Math.max(0, participants - p.included);
        const overageFee = over * p.overage;
        return { ...p, over, overageFee, total: p.price + overageFee };
      });
      const cheapest = Math.min(...costs.map(c => c.total));

      calcResults.innerHTML = costs.map(c => `
        <div class="card" style="padding:20px;${c.total === cheapest ? 'border-color:rgba(33,230,161,0.55);' : ''}">
          ${c.total === cheapest ? '<span class="save-badge" style="margin-bottom:10px;display:inline-block;">Cheapest</span>' : ''}
          <div style="font-weight:700;font-size:.95rem;margin-bottom:6px;">${c.name}</div>
          <div style="font-family:'Sora',sans-serif;font-weight:700;font-size:1.6rem;margin-bottom:4px;">£${c.total.toFixed(2)}</div>
          <div style="color:var(--text-faint);font-size:.8rem;margin-bottom:10px;">per month</div>
          <div style="color:var(--text-dim);font-size:.82rem;">£${c.price.toFixed(2)} base${c.overageFee > 0 ? ` + £${c.overageFee.toFixed(2)} overage (${c.over.toLocaleString()} extra)` : ''}</div>
        </div>
      `).join('');
    }

    calcInput.addEventListener('input', render);
    render();
  }
});
