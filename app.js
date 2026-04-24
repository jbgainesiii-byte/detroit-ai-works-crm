const stages = [
  "Found",
  "Qualified",
  "Demo Built",
  "First Email Sent",
  "Follow-Up 1",
  "Follow-Up 2",
  "Interested",
  "Proposal Sent",
  "Won",
  "Lost",
  "Launched",
];

const starterProspects = [
  {
    id: crypto.randomUUID(),
    businessName: "Oakline Lawn Care",
    niche: "Landscaping",
    city: "Ann Arbor, MI",
    contactName: "Marcus",
    email: "owner@example.com",
    phone: "",
    website: "https://example.com",
    demoUrl: "https://demo.example.com/oakline",
    stage: "Demo Built",
    followUp: todayPlus(1),
    score: 84,
    quote: "$1,500 Local Business Site",
    issue: "Current site is hard to scan on mobile and does not show a clear quote request path.",
    notes: "Lead found from Google Maps. Good before/after gallery opportunity.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    businessName: "Northside Auto Repair",
    niche: "Auto repair",
    city: "Detroit, MI",
    contactName: "",
    email: "service@example.com",
    phone: "",
    website: "https://example.com",
    demoUrl: "",
    stage: "Qualified",
    followUp: todayPlus(3),
    score: 72,
    quote: "$900 Starter Refresh",
    issue: "No click-to-call button, outdated service list, and weak trust signals above the fold.",
    notes: "Target pain point: customers comparing nearby repair shops on phone.",
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    businessName: "Glow Room Studio",
    niche: "Beauty salon",
    city: "Royal Oak, MI",
    contactName: "Tanya",
    email: "",
    phone: "",
    website: "https://example.com",
    demoUrl: "https://demo.example.com/glow-room",
    stage: "Interested",
    followUp: todayPlus(0),
    score: 91,
    quote: "$2,200 Website + Booking",
    issue: "Instagram has the brand energy, but the website does not make booking obvious.",
    notes: "Mention online booking and service menu clarity in outreach.",
    updatedAt: new Date().toISOString(),
  },
];

const playbook = {
  scripts: [
    {
      title: "First Email With Demo",
      tag: "Cold email",
      body: `Subject: Quick website idea for {{Business}}

Hi {{Contact}},

I run Detroit AI Works, and I came across {{Business}} while looking at local {{Niche}} businesses in {{City}}. Your business looks solid, but I noticed the website could make it easier for customers to see what you do and contact you from their phone.

I put together a quick, cleaner concept here:
{{DemoURL}}

No pressure at all. If you like the direction, I can customize it and get it live for you quickly. Worth a quick look?`,
    },
    {
      title: "Soft Follow-Up",
      tag: "Follow-up 1",
      body: `Subject: Re: quick website idea for {{Business}}

Hi {{Contact}},

Just wanted to bump this once. The main thing I noticed was:
{{Issue}}

That kind of friction can cost calls from people who are already interested. Here is the concept again:
{{DemoURL}}

Would it be useful if I sent over a simple price to launch something like this?`,
    },
    {
      title: "Last Touch",
      tag: "Follow-up 2",
      body: `Subject: should I close this out?

Hi {{Contact}},

I do not want to keep bothering you. Should I close this out, or would a cleaner website still be worth discussing for {{Business}}?

Either way, here is the concept one more time:
{{DemoURL}}`,
    },
    {
      title: "DM Version",
      tag: "Instagram/Facebook",
      body: `Hey {{Contact}}, I found {{Business}} and made a quick cleaner website concept for it. The main improvement is making it easier for people to understand the services and contact you from mobile. Want me to send the link?`,
    },
  ],
  rebuttals: [
    {
      title: "We cannot afford a new website",
      body: "Totally understand. That is exactly why I keep this simple. This is not a giant agency project. It is a focused refresh that helps people trust you faster and contact you easier. We can start with the smallest version that gets you more calls.",
    },
    {
      title: "We already have a website",
      body: "For sure, and I am not saying you do not. The question is whether the current site is doing enough work for you. If someone lands on it from their phone, can they immediately trust you, understand the offer, and contact you?",
    },
    {
      title: "We use Facebook or Instagram",
      body: "That helps, but social media is rented space. A simple website gives you a place to send customers, show services clearly, collect inquiries, and appear more legitimate when people search for you.",
    },
    {
      title: "I need to think about it",
      body: "That makes sense. To make it easier, I can send two options: a basic one-page version and a fuller local business site. Then you can decide if either one feels worth it.",
    },
    {
      title: "Can you make it cheaper?",
      body: "Possibly, if we reduce the scope. I would rather make the project smaller than cut corners. We can start with the homepage, contact form, mobile layout, and core services, then add more later.",
    },
  ],
  prompts: [
    "What is the main action you want a visitor to take: call, book, request a quote, or visit?",
    "Which service makes you the most money or brings the best customers?",
    "What do customers usually ask before they buy?",
    "Do you have photos, reviews, or before-and-after examples we should feature?",
    "Who are your best competitors locally, and what do you like or dislike about their sites?",
    "If this site worked well, what would change for the business in the next 90 days?",
  ],
  packages: [
    {
      title: "Starter Refresh",
      price: "$500 to $1,000",
      body: "One-page mobile-friendly site, clear contact section, click-to-call, basic SEO, and simple launch support.",
    },
    {
      title: "Local Business Site",
      price: "$1,500 to $3,000",
      body: "Home, services, about, gallery or reviews, contact page, mobile layout, contact form, and basic search setup.",
    },
    {
      title: "Care Plan",
      price: "$99 to $299/mo",
      body: "Hosting help, edits, backups, small updates, performance checks, and light ongoing support.",
    },
  ],
};

const storageKey = "detroit-ai-works-crm:v1";
const legacyStorageKey = "website-outreach-crm:v1";
const supabaseUrl = "https://netdshxconokwuhgbuow.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldGRzaHhjb25va3d1aGdidW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDQ5MjksImV4cCI6MjA5MjYyMDkyOX0.FaBwviIW0PYPZaW4Y3OEiAbNjKfw7_kRzgQ69M-Eqrc";
let prospects = loadLocalProspects();
let activeView = "dashboard";
let activeStageFilter = "All";

const elements = {
  navTabs: document.querySelectorAll(".nav-tab"),
  viewTitle: document.querySelector("#viewTitle"),
  viewPill: document.querySelector("#viewPill"),
  views: {
    dashboard: document.querySelector("#dashboardView"),
    pipeline: document.querySelector("#pipelineView"),
    prospects: document.querySelector("#prospectsView"),
    playbook: document.querySelector("#playbookView"),
    settings: document.querySelector("#settingsView"),
  },
  searchInput: document.querySelector("#searchInput"),
  addProspectButton: document.querySelector("#addProspectButton"),
  exportButton: document.querySelector("#exportButton"),
  metricGrid: document.querySelector("#metricGrid"),
  dueList: document.querySelector("#dueList"),
  hotList: document.querySelector("#hotList"),
  showDueButton: document.querySelector("#showDueButton"),
  pipelineBoard: document.querySelector("#pipelineBoard"),
  stageFilters: document.querySelector("#stageFilters"),
  sortSelect: document.querySelector("#sortSelect"),
  prospectRows: document.querySelector("#prospectRows"),
  nextActionTitle: document.querySelector("#nextActionTitle"),
  nextActionCopy: document.querySelector("#nextActionCopy"),
  syncStatus: document.querySelector("#syncStatus"),
  syncCopy: document.querySelector("#syncCopy"),
  dialog: document.querySelector("#prospectDialog"),
  form: document.querySelector("#prospectForm"),
  dialogTitle: document.querySelector("#dialogTitle"),
  closeDialogButton: document.querySelector("#closeDialogButton"),
  cancelButton: document.querySelector("#cancelButton"),
  deleteButton: document.querySelector("#deleteButton"),
  downloadCsvButton: document.querySelector("#downloadCsvButton"),
  downloadJsonButton: document.querySelector("#downloadJsonButton"),
  importInput: document.querySelector("#importInput"),
  resetButton: document.querySelector("#resetButton"),
  scriptList: document.querySelector("#scriptList"),
  rebuttalList: document.querySelector("#rebuttalList"),
  promptList: document.querySelector("#promptList"),
  packageList: document.querySelector("#packageList"),
};

const fields = [
  "recordId",
  "businessName",
  "niche",
  "city",
  "contactName",
  "email",
  "phone",
  "website",
  "demoUrl",
  "stage",
  "followUp",
  "score",
  "quote",
  "issue",
  "notes",
].reduce((acc, id) => {
  acc[id] = document.querySelector(`#${id}`);
  return acc;
}, {});

initialize();

async function initialize() {
  populateStageSelect();
  renderStageFilters();
  renderPlaybook();
  bindEvents();
  render();
  await loadSharedProspects();
}

function bindEvents() {
  elements.navTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  elements.searchInput.addEventListener("input", render);
  elements.sortSelect.addEventListener("change", renderProspectTable);
  elements.addProspectButton.addEventListener("click", () => openProspectDialog());
  elements.exportButton.addEventListener("click", downloadCsv);
  elements.downloadCsvButton.addEventListener("click", downloadCsv);
  elements.downloadJsonButton.addEventListener("click", downloadJson);
  elements.showDueButton.addEventListener("click", () => {
    activeStageFilter = "All";
    elements.searchInput.value = "";
    switchView("prospects");
    elements.sortSelect.value = "followUpAsc";
    renderProspectTable();
  });

  elements.closeDialogButton.addEventListener("click", closeDialog);
  elements.cancelButton.addEventListener("click", closeDialog);
  elements.deleteButton.addEventListener("click", deleteCurrentProspect);
  elements.form.addEventListener("submit", saveProspect);
  elements.importInput.addEventListener("change", importJson);
  elements.resetButton.addEventListener("click", resetCrm);
}

function switchView(viewName) {
  activeView = viewName;
  const label = getViewLabel(viewName);
  elements.viewTitle.textContent = label;
  elements.viewPill.textContent = label;
  elements.navTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === viewName);
  });
  Object.entries(elements.views).forEach(([name, view]) => {
    view.classList.toggle("active", name === viewName);
  });
  render();
}

function render() {
  renderDashboard();
  renderPipeline();
  renderProspectTable();
  renderNextAction();
}

function renderPlaybook() {
  elements.scriptList.innerHTML = playbook.scripts.map(renderPlaybookCard).join("");
  elements.rebuttalList.innerHTML = playbook.rebuttals.map(renderPlaybookCard).join("");
  elements.promptList.innerHTML = playbook.prompts
    .map((prompt) => `<article class="prompt-card">${escapeHtml(prompt)}</article>`)
    .join("");
  elements.packageList.innerHTML = playbook.packages
    .map(
      (item) => `
        <article class="package-card">
          <div class="item-row">
            <strong>${escapeHtml(item.title)}</strong>
            <span class="badge hot">${escapeHtml(item.price)}</span>
          </div>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `
    )
    .join("");
}

function renderPlaybookCard(item) {
  return `
    <article class="playbook-card">
      <div class="item-row">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          ${item.tag ? `<div class="item-meta">${escapeHtml(item.tag)}</div>` : ""}
        </div>
        <button class="secondary-button copy-button" data-copy="${escapeAttr(item.body)}" type="button">Copy</button>
      </div>
      <pre>${escapeHtml(item.body)}</pre>
    </article>
  `;
}

function renderDashboard() {
  const due = getDueProspects();
  const interestedCount = prospects.filter((item) => item.stage === "Interested").length;
  const wonCount = prospects.filter((item) => item.stage === "Won" || item.stage === "Launched").length;
  const demoCount = prospects.filter((item) => item.demoUrl).length;

  const metrics = [
    ["Total Prospects", prospects.length],
    ["Demos Built", demoCount],
    ["Follow-ups Due", due.length],
    ["Won / Launched", wonCount],
    ["Interested", interestedCount],
  ];

  elements.metricGrid.innerHTML = metrics
    .map(([label, value]) => `<article class="metric-card"><strong>${value}</strong><span>${label}</span></article>`)
    .join("");

  elements.dueList.innerHTML = renderList(due.slice(0, 6), "No follow-ups due today.");

  const hot = prospects
    .filter((item) => ["Interested", "Proposal Sent", "Won"].includes(item.stage))
    .sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  elements.hotList.innerHTML = renderList(hot.slice(0, 6), "No hot leads yet.");
}

function renderList(items, emptyMessage) {
  if (!items.length) {
    return `<div class="empty-state">${emptyMessage}</div>`;
  }

  return items
    .map(
      (item) => `
        <article class="list-item">
          <div class="item-row">
            <strong>${escapeHtml(item.businessName)}</strong>
            <span class="badge ${item.score >= 80 ? "hot" : ""}">${Number(item.score || 0)}</span>
          </div>
          <p class="item-meta">${escapeHtml(item.niche || "Uncategorized")} · ${escapeHtml(item.city || "No city")} · ${formatDate(item.followUp)}</p>
          <p>${escapeHtml(item.issue || "No issue recorded.")}</p>
          <button class="text-button" data-edit="${item.id}" type="button">Open record</button>
        </article>
      `
    )
    .join("");
}

function renderPipeline() {
  const visible = getVisibleProspects();
  elements.pipelineBoard.innerHTML = stages
    .map((stage) => {
      const stageItems = visible.filter((item) => item.stage === stage);
      return `
        <section class="pipeline-column">
          <div class="column-heading">
            <strong>${stage}</strong>
            <span class="badge">${stageItems.length}</span>
          </div>
          <div class="pipeline-cards">
            ${
              stageItems.length
                ? stageItems.map(renderPipelineCard).join("")
                : `<div class="empty-state">No prospects</div>`
            }
          </div>
        </section>
      `;
    })
    .join("");
}

function renderPipelineCard(item) {
  return `
    <article class="pipeline-card">
      <div class="item-row">
        <strong>${escapeHtml(item.businessName)}</strong>
        <span class="badge ${item.score >= 80 ? "hot" : ""}">${Number(item.score || 0)}</span>
      </div>
      <p class="item-meta">${escapeHtml(item.niche || "Uncategorized")} · ${escapeHtml(item.city || "No city")}</p>
      <p>${escapeHtml(item.issue || "No issue recorded.")}</p>
      <p class="item-meta">Follow-up: ${formatDate(item.followUp)}</p>
      <button class="text-button" data-edit="${item.id}" type="button">Open record</button>
    </article>
  `;
}

function renderStageFilters() {
  const filters = ["All", ...stages];
  elements.stageFilters.innerHTML = filters
    .map((stage) => `<button class="filter-chip ${stage === activeStageFilter ? "active" : ""}" data-filter="${stage}" type="button">${stage}</button>`)
    .join("");

  elements.stageFilters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      activeStageFilter = button.dataset.filter;
      renderStageFilters();
      renderProspectTable();
    });
  });
}

function renderProspectTable() {
  const visible = sortProspects(getVisibleProspects());

  if (!visible.length) {
    elements.prospectRows.innerHTML = `<tr><td colspan="7"><div class="empty-state">No prospects match this view.</div></td></tr>`;
    return;
  }

  elements.prospectRows.innerHTML = visible
    .map(
      (item) => `
        <tr>
          <td>
            <strong>${escapeHtml(item.businessName)}</strong>
            <div class="item-meta">${escapeHtml(item.niche || "No niche")} · ${escapeHtml(item.city || "No city")}</div>
            <div class="item-meta">${escapeHtml(item.contactName || "No contact")} ${item.email ? `· ${escapeHtml(item.email)}` : ""}</div>
          </td>
          <td><span class="badge good">${escapeHtml(item.stage)}</span></td>
          <td><span class="badge ${item.score >= 80 ? "hot" : ""}">${Number(item.score || 0)}</span></td>
          <td>${escapeHtml(item.issue || "No issue recorded.")}</td>
          <td>${formatDate(item.followUp)}</td>
          <td>${item.demoUrl ? `<a href="${escapeAttr(item.demoUrl)}" target="_blank" rel="noreferrer">Open demo</a>` : `<span class="item-meta">No demo</span>`}</td>
          <td><button class="text-button" data-edit="${item.id}" type="button">Edit</button></td>
        </tr>
      `
    )
    .join("");
}

function renderNextAction() {
  const due = getDueProspects()[0];
  if (due) {
    elements.nextActionTitle.textContent = `Follow up with ${due.businessName}`;
    elements.nextActionCopy.textContent = due.demoUrl
      ? "Send the demo link again with one clear business reason to respond."
      : "Use the recorded website issue to send a specific, helpful message.";
    return;
  }

  const needsDemo = prospects.find((item) => item.stage === "Qualified" && !item.demoUrl);
  if (needsDemo) {
    elements.nextActionTitle.textContent = `Build demo for ${needsDemo.businessName}`;
    elements.nextActionCopy.textContent = "This lead is qualified, so a quick homepage concept is the next useful move.";
    return;
  }

  elements.nextActionTitle.textContent = "Add 10 new prospects";
  elements.nextActionCopy.textContent = "Keep the pipeline fed from one niche and one city before widening the search.";
}

document.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit]");
  if (editButton) {
    openProspectDialog(editButton.dataset.edit);
  }

  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    copyToClipboard(copyButton.dataset.copy, copyButton);
  }
});

function openProspectDialog(id = "") {
  elements.form.reset();
  fields.recordId.value = id;
  elements.deleteButton.classList.toggle("hidden", !id);
  elements.dialogTitle.textContent = id ? "Edit Prospect" : "New Prospect";

  if (id) {
    const item = prospects.find((prospect) => prospect.id === id);
    if (!item) return;
    Object.entries(item).forEach(([key, value]) => {
      if (fields[key]) fields[key].value = value ?? "";
    });
    fields.recordId.value = id;
  } else {
    fields.stage.value = "Found";
    fields.score.value = 50;
    fields.followUp.value = todayPlus(2);
  }

  elements.dialog.showModal();
}

function closeDialog() {
  elements.dialog.close();
}

async function saveProspect(event) {
  event.preventDefault();
  const id = fields.recordId.value || crypto.randomUUID();
  const existingIndex = prospects.findIndex((item) => item.id === id);
  const record = {
    id,
    businessName: fields.businessName.value.trim(),
    niche: fields.niche.value.trim(),
    city: fields.city.value.trim(),
    contactName: fields.contactName.value.trim(),
    email: fields.email.value.trim(),
    phone: fields.phone.value.trim(),
    website: normalizeUrl(fields.website.value.trim()),
    demoUrl: normalizeUrl(fields.demoUrl.value.trim()),
    stage: fields.stage.value,
    followUp: fields.followUp.value,
    score: Number(fields.score.value || 0),
    quote: fields.quote.value.trim(),
    issue: fields.issue.value.trim(),
    notes: fields.notes.value.trim(),
    updatedAt: new Date().toISOString(),
  };

  closeDialog();
  setSyncStatus("Saving", "Updating the shared Supabase database...");

  try {
    const saved = await upsertSharedProspect(record);
    if (existingIndex >= 0) {
      prospects[existingIndex] = saved;
    } else {
      prospects.unshift(saved);
    }
    persist();
    render();
    setSyncStatus("Shared", "Changes are saved to Supabase.");
  } catch {
    if (existingIndex >= 0) {
      prospects[existingIndex] = record;
    } else {
      prospects.unshift(record);
    }
    persist();
    render();
    setSyncStatus("Local backup", "Supabase save failed, so this browser kept a local copy.");
  }
}

async function deleteCurrentProspect() {
  const id = fields.recordId.value;
  if (!id) return;

  const item = prospects.find((prospect) => prospect.id === id);
  if (!item || !confirm(`Delete ${item.businessName}?`)) return;

  closeDialog();
  setSyncStatus("Deleting", "Removing this record from Supabase...");

  try {
    await deleteSharedProspect(id);
    setSyncStatus("Shared", "Record deleted from Supabase.");
  } catch {
    setSyncStatus("Check database", "Delete failed in Supabase. Refresh before continuing.");
    return;
  }

  prospects = prospects.filter((prospect) => prospect.id !== id);
  persist();
  render();
}

function populateStageSelect() {
  fields.stage.innerHTML = stages.map((stage) => `<option value="${stage}">${stage}</option>`).join("");
}

function getVisibleProspects() {
  const query = elements.searchInput.value.trim().toLowerCase();
  return prospects.filter((item) => {
    const stageMatch = activeStageFilter === "All" || item.stage === activeStageFilter;
    if (!stageMatch) return false;
    if (!query) return true;

    return [
      item.businessName,
      item.niche,
      item.city,
      item.contactName,
      item.email,
      item.issue,
      item.notes,
      item.stage,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });
}

function sortProspects(items) {
  const sorted = [...items];
  const sortMode = elements.sortSelect.value;
  if (sortMode === "followUpAsc") {
    return sorted.sort((a, b) => dateValue(a.followUp) - dateValue(b.followUp));
  }
  if (sortMode === "scoreDesc") {
    return sorted.sort((a, b) => Number(b.score || 0) - Number(a.score || 0));
  }
  if (sortMode === "businessAsc") {
    return sorted.sort((a, b) => a.businessName.localeCompare(b.businessName));
  }
  return sorted.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
}

function getDueProspects() {
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return prospects
    .filter((item) => item.followUp && new Date(`${item.followUp}T00:00:00`) <= today)
    .filter((item) => !["Won", "Lost", "Launched"].includes(item.stage))
    .sort((a, b) => dateValue(a.followUp) - dateValue(b.followUp));
}

async function loadSharedProspects() {
  setSyncStatus("Connecting", "Loading shared prospects from Supabase...");

  try {
    const rows = await supabaseRequest("/rest/v1/prospects?select=*&order=updated_at.desc");
    prospects = rows.map(fromSupabaseRow);
    persist();
    render();
    setSyncStatus("Shared", `${prospects.length} prospects loaded from Supabase.`);
  } catch {
    setSyncStatus("Local backup", "Could not reach Supabase. Showing this browser's saved data.");
  }
}

function loadLocalProspects() {
  const saved = localStorage.getItem(storageKey) || localStorage.getItem(legacyStorageKey);
  if (!saved) return starterProspects;

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : starterProspects;
  } catch {
    return starterProspects;
  }
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(prospects));
}

async function supabaseRequest(path, options = {}) {
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...options,
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function upsertSharedProspect(record) {
  const rows = await supabaseRequest("/rest/v1/prospects?on_conflict=id", {
    method: "POST",
    body: JSON.stringify(toSupabaseRow(record)),
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation",
    },
  });
  return fromSupabaseRow(rows[0]);
}

async function deleteSharedProspect(id) {
  await supabaseRequest(`/rest/v1/prospects?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

function toSupabaseRow(item) {
  return {
    id: item.id,
    business_name: item.businessName,
    niche: item.niche,
    city: item.city,
    contact_name: item.contactName,
    email: item.email,
    phone: item.phone,
    website: item.website,
    demo_url: item.demoUrl,
    stage: item.stage,
    follow_up: item.followUp || null,
    score: Number(item.score || 0),
    quote: item.quote,
    issue: item.issue,
    notes: item.notes,
    updated_at: new Date().toISOString(),
  };
}

function fromSupabaseRow(row) {
  return {
    id: row.id,
    businessName: row.business_name || "",
    niche: row.niche || "",
    city: row.city || "",
    contactName: row.contact_name || "",
    email: row.email || "",
    phone: row.phone || "",
    website: row.website || "",
    demoUrl: row.demo_url || "",
    stage: row.stage || "Found",
    followUp: row.follow_up || "",
    score: Number(row.score || 0),
    quote: row.quote || "",
    issue: row.issue || "",
    notes: row.notes || "",
    updatedAt: row.updated_at || row.created_at || new Date().toISOString(),
  };
}

function setSyncStatus(status, copy) {
  elements.syncStatus.textContent = status;
  elements.syncCopy.textContent = copy;
}

function downloadJson() {
  const payload = JSON.stringify(prospects, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `detroit-ai-works-crm-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadCsv() {
  const columns = [
    "businessName",
    "niche",
    "city",
    "contactName",
    "email",
    "phone",
    "website",
    "demoUrl",
    "stage",
    "followUp",
    "score",
    "quote",
    "issue",
    "notes",
  ];
  const rows = prospects.map((item) => columns.map((column) => csvEscape(item[column] ?? "")).join(","));
  const payload = [columns.join(","), ...rows].join("\n");
  const blob = new Blob([payload], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `detroit-ai-works-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const parsed = file.name.toLowerCase().endsWith(".csv")
        ? parseCsv(reader.result)
        : JSON.parse(reader.result);
      if (!Array.isArray(parsed)) throw new Error("Expected an array");
      const imported = parsed.map(normalizeImportedProspect);
      setSyncStatus("Importing", `Adding ${imported.length} records to Supabase...`);
      const rows = await supabaseRequest("/rest/v1/prospects", {
        method: "POST",
        body: JSON.stringify(imported.map(toSupabaseRow)),
      });
      prospects = [...rows.map(fromSupabaseRow), ...prospects];
      persist();
      render();
      setSyncStatus("Shared", `${imported.length} imported records saved to Supabase.`);
      alert("CRM data imported into the shared database.");
    } catch {
      setSyncStatus("Import failed", "Check the CSV format or Supabase table setup.");
      alert("That file could not be imported. Please choose a valid CRM CSV or JSON export.");
    } finally {
      elements.importInput.value = "";
    }
  };
  reader.readAsText(file);
}

function normalizeImportedProspect(item) {
  return {
    id: item.id || crypto.randomUUID(),
    businessName: item.businessName || item.business || item.name || "Untitled Business",
    niche: item.niche || item.industry || "",
    city: item.city || item.market || item.location || "",
    contactName: item.contactName || item.contact || item.owner || "",
    email: item.email || "",
    phone: item.phone || "",
    website: normalizeUrl(item.website || item.currentWebsite || ""),
    demoUrl: normalizeUrl(item.demoUrl || item.demo || ""),
    stage: stages.includes(item.stage) ? item.stage : "Found",
    followUp: item.followUp || item.followUpDate || "",
    score: Number(item.score || item.fitScore || 0),
    quote: item.quote || item.package || "",
    issue: item.issue || item.websiteIssue || item.problem || "",
    notes: item.notes || "",
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);
  if (!rows.length) return [];

  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((cells) =>
    headers.reduce((record, header, index) => {
      record[header] = cells[index]?.trim() || "";
      return record;
    }, {})
  );
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function resetCrm() {
  if (!confirm("Reset this CRM and reload starter examples?")) return;
  prospects = starterProspects.map((item) => ({ ...item, id: crypto.randomUUID() }));
  persist();
  activeStageFilter = "All";
  renderStageFilters();
  render();
}

async function copyToClipboard(text, button) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    flashCopied(button);
  } catch {
    alert("Copy failed. You can still select the text manually.");
  }
}

function flashCopied(button) {
  const original = button.textContent;
  button.textContent = "Copied";
  button.disabled = true;
  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 1200);
}

function todayPlus(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function formatDate(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
    new Date(`${value}T00:00:00`)
  );
}

function dateValue(value) {
  if (!value) return Number.MAX_SAFE_INTEGER;
  return new Date(`${value}T00:00:00`).getTime();
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getViewLabel(value) {
  const labels = {
    dashboard: "Dashboard",
    pipeline: "Pipeline",
    prospects: "Prospects",
    playbook: "Playbook",
    settings: "Data",
  };
  return labels[value] || titleCase(value);
}

function normalizeUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
