const pages = [
  { id: "dashboard", icon: "◫", label: "Command Center", eyebrow: "COMMAND CENTER", title: "Seller education, orchestrated.", subtitle: "Design which agent delivers which knowledge at every stage of a global seller journey." },
  { id: "journey", icon: "→", label: "Journey Architect", eyebrow: "EDUCATIONAL PATH", title: "Build the end-to-end seller journey.", subtitle: "Map stage objectives, entry signals, agent ownership, and activation outcomes." },
  { id: "skills", icon: "✦", label: "Agent Skill Studio", eyebrow: "SKILL ENGINEERING", title: "Turn product messaging into reusable skills.", subtitle: "Define objectives, inputs, output schemas, required narratives, and guardrails." },
  { id: "messages", icon: "≡", label: "Messaging Library", eyebrow: "MESSAGE GOVERNANCE", title: "One source of truth for every agent.", subtitle: "Manage bilingual value propositions, evidence, approved wording, and prohibited claims." },
  { id: "simulator", icon: "▶", label: "Seller Simulator", eyebrow: "JOURNEY SIMULATOR", title: "Test the experience before sellers see it.", subtitle: "Route seller questions, inspect agent decisions, and review content quality." },
  { id: "content", icon: "✎", label: "Content Studio", eyebrow: "AI-POWERED MARKETING", title: "Generate grounded seller education content.", subtitle: "Create bilingual emails, FAQs, and launch checklists from approved messaging." },
  { id: "insights", icon: "⌁", label: "Quality Insights", eyebrow: "EVALUATION", title: "Measure routing and message quality.", subtitle: "Track test coverage, guardrails, grounding, and seller-journey readiness." }
];

const state = { page: "dashboard", data: null, simulation: null };
const app = document.querySelector("#app");
const nav = document.querySelector("#nav");
const title = document.querySelector("#section-title");
const subtitle = document.querySelector("#section-subtitle");
const eyebrow = document.querySelector("#section-eyebrow");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

function toast(message) {
  const node = document.querySelector("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), 2200);
}

async function request(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error || "Request failed");
  return payload;
}

function renderNav() {
  nav.innerHTML = pages.map(page => `
    <button class="nav-button ${state.page === page.id ? "active" : ""}" data-page="${page.id}">
      <span class="nav-icon">${page.icon}</span>${page.label}
    </button>`).join("");
  nav.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
    state.page = button.dataset.page;
    render();
  }));
}

function renderHeader() {
  const page = pages.find(item => item.id === state.page);
  title.textContent = page.title;
  subtitle.textContent = page.subtitle;
  eyebrow.textContent = page.eyebrow;
}

function metric(label, value, note) {
  return `<article class="card metric"><div class="metric-label">${label}</div><div class="metric-value">${value}</div><div class="metric-note">${note}</div></article>`;
}

function dashboard() {
  const { stages, agents, sellers, messages } = state.data;
  const active = agents.filter(agent => agent.status === "Active").length;
  const avgReadiness = Math.round(sellers.reduce((sum, seller) => sum + seller.readiness, 0) / sellers.length);
  return `
    <div class="grid metrics">
      ${metric("Journey coverage", `${stages.length}/5`, "All launch stages mapped")}
      ${metric("Agent skills", agents.length, `${active} active · 1 pilot`)}
      ${metric("Messaging assets", messages.length, "Bilingual and governed")}
      ${metric("Avg. readiness", `${avgReadiness}%`, "Across 4 demo sellers")}
    </div>
    <div class="section">
      <div class="section-heading"><div><h2>Unified educational journey</h2><p>Each stage has one primary knowledge owner and a measurable exit condition.</p></div><button class="button secondary small" data-go="journey">Open architect</button></div>
      <div class="journey">${stages.map(stage => `
        <article class="card journey-card">
          <div class="stage-number">${stage.order}</div>
          <h3>${stage.name} · ${stage.zhName}</h3>
          <p>${stage.objective}</p>
          <div class="agent-link">${agents.find(agent => agent.id === stage.ownerAgent)?.name || "Multiple skills"}</div>
        </article>`).join("")}</div>
    </div>
    <div class="section grid two">
      <article class="card padded">
        <div class="section-heading"><div><h2>Seller readiness</h2><p>Demo profiles for journey testing.</p></div></div>
        ${sellers.map(seller => `<div class="insight-row"><div><strong>${seller.name}</strong><small>${seller.category} · ${seller.targetMarkets.join(", ")}</small></div><div style="min-width:130px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px"><span>${seller.readiness}%</span><span>${seller.stage}</span></div><div class="progress"><span style="width:${seller.readiness}%"></span></div></div></div>`).join("")}
      </article>
      <article class="card padded">
        <div class="section-heading"><div><h2>Messaging governance</h2><p>How the system keeps agent outputs consistent.</p></div></div>
        <div class="insight-row"><div><strong>Grounded value propositions</strong><small>Agents reuse approved bilingual messages.</small></div><span class="badge green">Ready</span></div>
        <div class="insight-row"><div><strong>Prohibited claim detection</strong><small>Guarantees and unsupported claims are checked.</small></div><span class="badge green">Ready</span></div>
        <div class="insight-row"><div><strong>Seller-specific routing</strong><small>Questions route by stage and educational need.</small></div><span class="badge green">Ready</span></div>
        <div class="insight-row"><div><strong>Human review workflow</strong><small>High-risk compliance topics are escalated.</small></div><span class="badge orange">Designed</span></div>
      </article>
    </div>`;
}

function journey() {
  const { stages, agents } = state.data;
  return `
    <div class="journey">${stages.map(stage => `
      <article class="card journey-card">
        <div class="stage-number">${stage.order}</div>
        <h3>${stage.name}<br><span style="color:#667085;font-weight:600">${stage.zhName}</span></h3>
        <p>${stage.objective}</p>
        <div class="agent-link">${agents.find(agent => agent.id === stage.ownerAgent)?.name || "Skill router"}</div>
      </article>`).join("")}</div>
    <div class="section card table-wrap">
      <table><thead><tr><th>Stage</th><th>Entry signal</th><th>Agent responsibility</th><th>Success signal</th></tr></thead>
      <tbody>${stages.map(stage => `<tr><td><strong>${stage.order}. ${stage.name}</strong><br><span class="badge">${stage.zhName}</span></td><td>${stage.entrySignal}</td><td>${stage.objective}</td><td>${stage.successSignal}</td></tr>`).join("")}</tbody></table>
    </div>`;
}

function skills() {
  const { agents } = state.data;
  return `<div class="agent-grid">${agents.map(agent => `
    <article class="card agent-card">
      <header><div><h3>${agent.name}</h3><div class="tags"><span class="badge">${agent.stage}</span><span class="tag">v${agent.version}</span></div></div><span class="badge ${agent.status === "Active" ? "green" : "orange"}">${agent.status}</span></header>
      <p>${agent.objective}</p>
      <div class="list-title">Inputs</div><div class="tags">${agent.inputs.map(item => `<span class="tag">${item}</span>`).join("")}</div>
      <div class="list-title">Required messaging</div><ul class="clean">${agent.requiredMessages.map(item => `<li>${item}</li>`).join("")}</ul>
      <div class="list-title">Guardrails</div><ul class="clean">${agent.guardrails.map(item => `<li>${item}</li>`).join("")}</ul>
    </article>`).join("")}</div>`;
}

function messages() {
  return `<div class="grid two">${state.data.messages.map(message => `
    <article class="card message-card">
      <div style="display:flex;justify-content:space-between;gap:10px"><span class="badge">${message.category}</span><span class="badge ${message.status === "Required" ? "orange" : "green"}">${message.status}</span></div>
      <h3>${message.title}</h3>
      <div class="message-copy"><strong>ENGLISH</strong>${message.en}</div>
      <div class="message-copy"><strong>中文</strong>${message.zh}</div>
      <div class="callout"><strong>Evidence note:</strong> ${message.evidence}</div>
      <div><div class="list-title">Prohibited claims</div><div class="tags">${message.prohibited.map(item => `<span class="tag">${item}</span>`).join("")}</div></div>
    </article>`).join("")}</div>`;
}

function simulationResult(result) {
  if (!result) return `<div class="empty-state"><div><div class="empty-icon">✦</div><strong>Run a seller question</strong><p>The system will select an agent, identify the journey stage, generate a grounded response, and score quality.</p></div></div>`;
  const a = result.answer;
  return `<div>
    <div class="result-header"><div><h3>${escapeHtml(a.headline)}</h3><p>${escapeHtml(a.sellerContext)}</p></div><span class="badge green">QA ${result.quality.score}/100</span></div>
    <p class="answer-summary">${escapeHtml(a.summary)}</p>
    <div class="callout"><strong>Routing decision:</strong> ${escapeHtml(result.agent.name)} · ${escapeHtml(result.stage.name)} · ${Math.round(result.route.confidence * 100)}% confidence</div>
    <div class="list-title">Recommended actions</div><ul class="clean">${a.actions.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <div class="list-title">Readiness gaps</div><ul class="clean">${a.gaps.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    <div class="callout guardrail" style="margin-top:16px"><strong>Required guardrail:</strong> ${escapeHtml(a.guardrail)}</div>
    <p style="font-weight:800;margin-bottom:0">${escapeHtml(a.cta)}</p>
  </div>`;
}

function simulator() {
  const sellers = state.data.sellers;
  return `<div class="simulator-layout">
    <article class="card padded">
      <div class="section-heading"><div><h2>Seller scenario</h2><p>Ask in English or Mandarin.</p></div></div>
      <form id="sim-form" class="form-grid">
        <div class="field full"><label>Seller profile</label><select name="sellerId">${sellers.map(seller => `<option value="${seller.id}">${seller.name} · ${seller.category}</option>`).join("")}</select></div>
        <div class="field full"><label>Seller question</label><textarea name="question" placeholder="Example: 我们的美容产品进入美国需要哪些认证？">为什么我们现在应该考虑进入德国市场？</textarea></div>
        <div class="field full"><button class="button dark" type="submit">Route to agent and generate answer</button></div>
      </form>
      <div class="section-heading" style="margin-top:24px"><div><h2>Suggested tests</h2></div></div>
      <div class="tags">
        <button class="button secondary small sample-question" data-q="统一库存到底是什么意思，会不会要重复入仓？">Inventory</button>
        <button class="button secondary small sample-question" data-q="我们的美容产品进入美国需要哪些认证？">Compliance</button>
        <button class="button secondary small sample-question" data-q="Can you create a step-by-step onboarding plan for Germany?">Onboarding</button>
      </div>
    </article>
    <article class="card padded result-panel" id="sim-result">${simulationResult(state.simulation)}</article>
  </div>`;
}

function contentStudio() {
  return `<div class="grid two">
    <article class="card padded">
      <div class="section-heading"><div><h2>Content brief</h2><p>Generate a grounded seller-facing asset.</p></div></div>
      <form id="content-form" class="form-grid">
        <div class="field"><label>Format</label><select name="format"><option value="email">Seller email</option><option value="faq">FAQ answer</option><option value="checklist">Launch checklist</option></select></div>
        <div class="field"><label>Language</label><select name="language"><option value="en">English</option><option value="zh">中文</option></select></div>
        <div class="field full"><label>Seller</label><select name="sellerId">${state.data.sellers.map(seller => `<option value="${seller.id}">${seller.name}</option>`).join("")}</select></div>
        <div class="field full"><label>Objective</label><textarea name="objective">Invite the seller to complete a readiness assessment and choose one priority market.</textarea></div>
        <div class="field full"><button class="button dark" type="submit">Generate approved draft</button></div>
      </form>
    </article>
    <article class="card padded"><div class="section-heading"><div><h2>Generated asset</h2><p>Uses governed product messaging and an explicit guardrail.</p></div></div><div id="content-output" class="content-output">Select a format, seller, and language to generate content.</div></article>
  </div>`;
}

function insights() {
  return `
    <div class="grid metrics">
      ${metric("Routing test set", "8/8", "Expected stage and agent")}
      ${metric("Guardrail coverage", "100%", "All agents have constraints")}
      ${metric("Bilingual assets", "4", "English and Mandarin")}
      ${metric("Quality checks", "5", "CTA, grounding, claims, context")}
    </div>
    <div class="section grid two">
      <article class="card padded"><div class="section-heading"><div><h2>Evaluation framework</h2><p>Transparent checks for portfolio testing.</p></div><div class="qa-score"><span>94</span></div></div>
        <div class="insight-row"><div><strong>Agent routing accuracy</strong><small>8 curated bilingual scenarios</small></div><span class="badge green">100%</span></div>
        <div class="insight-row"><div><strong>CTA presence</strong><small>Generated responses end with a next action</small></div><span class="badge green">Pass</span></div>
        <div class="insight-row"><div><strong>Guardrail presence</strong><small>Outcome and legal-advice boundaries</small></div><span class="badge green">Pass</span></div>
        <div class="insight-row"><div><strong>Prohibited claim scan</strong><small>No guarantees in generated samples</small></div><span class="badge green">Pass</span></div>
      </article>
      <article class="card padded"><div class="section-heading"><div><h2>Known limitations</h2><p>Claims intentionally scoped to an honest MVP.</p></div></div>
        <div class="callout guardrail">The current router is deterministic and keyword-based. It demonstrates agent orchestration, but it is not a production intent-classification model.</div>
        <div class="insight-row"><div><strong>Data source</strong><small>Curated demo profiles, not Amazon internal data</small></div><span class="badge orange">Demo</span></div>
        <div class="insight-row"><div><strong>LLM integration</strong><small>Structured generation simulated locally</small></div><span class="badge orange">Optional</span></div>
        <div class="insight-row"><div><strong>Business impact</strong><small>No fabricated conversion or revenue claims</small></div><span class="badge green">Honest</span></div>
      </article>
    </div>`;
}

function attachHandlers() {
  document.querySelectorAll("[data-go]").forEach(button => button.addEventListener("click", () => { state.page = button.dataset.go; render(); }));
  const simForm = document.querySelector("#sim-form");
  if (simForm) simForm.addEventListener("submit", async event => {
    event.preventDefault();
    const button = simForm.querySelector("button[type=submit]");
    button.disabled = true; button.textContent = "Routing...";
    try {
      const form = new FormData(simForm);
      state.simulation = await request("/api/simulate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      document.querySelector("#sim-result").innerHTML = simulationResult(state.simulation);
      toast(`Routed to ${state.simulation.agent.name}`);
    } catch (error) { toast(error.message); }
    finally { button.disabled = false; button.textContent = "Route to agent and generate answer"; }
  });
  document.querySelectorAll(".sample-question").forEach(button => button.addEventListener("click", () => {
    const textarea = document.querySelector("textarea[name=question]");
    textarea.value = button.dataset.q;
    textarea.focus();
  }));
  const contentForm = document.querySelector("#content-form");
  if (contentForm) contentForm.addEventListener("submit", async event => {
    event.preventDefault();
    const form = new FormData(contentForm);
    const output = document.querySelector("#content-output");
    output.textContent = "Generating...";
    try {
      const result = await request("/api/content", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form)) });
      output.textContent = `${result.title}\n\n${result.body}`;
      toast("Grounded draft generated");
    } catch (error) { output.textContent = error.message; }
  });
}

function render() {
  renderNav();
  renderHeader();
  const views = { dashboard, journey, skills, messages, simulator, content: contentStudio, insights };
  app.innerHTML = views[state.page]();
  attachHandlers();
}

async function init() {
  try {
    state.data = await request("/api/bootstrap");
    render();
  } catch (error) {
    app.innerHTML = `<article class="card padded"><h2>Unable to load the demo</h2><p>${escapeHtml(error.message)}</p></article>`;
  }
}

document.querySelector("#quick-test").addEventListener("click", async () => {
  state.page = "simulator";
  render();
  const result = await request("/api/simulate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sellerId: "seller-electronics", question: "How do I know whether our team is ready to expand to Japan?" }) });
  state.simulation = result;
  document.querySelector("#sim-result").innerHTML = simulationResult(result);
});

init();
