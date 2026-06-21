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
  if (calcInput && calcResults) {
    const PLANS = [
      { id: 'standard', name: 'Standard', price: 40, included: 200, overage: 0.40 },
      { id: 'growth', name: 'Growth', price: 80, included: 400, overage: 0.22 },
      { id: 'premium', name: 'Premium', price: 200, included: 1500, overage: 0.18 },
      { id: 'enterprise', name: 'Enterprise', price: 400, included: Infinity, overage: 0 },
    ];

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
