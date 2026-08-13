export const stages = [
  {
    id: "awareness",
    order: 1,
    name: "Awareness",
    zhName: "认知",
    objective: "Explain why global expansion matters and connect the product vision to the seller's situation.",
    entrySignal: "Seller asks why, whether, or where to expand.",
    successSignal: "Seller chooses to assess expansion readiness.",
    ownerAgent: "global-opportunity"
  },
  {
    id: "consideration",
    order: 2,
    name: "Consideration",
    zhName: "评估",
    objective: "Assess seller fit, readiness, and priority markets without overpromising outcomes.",
    entrySignal: "Seller shares category, markets, size, or expansion goals.",
    successSignal: "Seller understands gaps and selects a target market.",
    ownerAgent: "seller-fit"
  },
  {
    id: "readiness",
    order: 3,
    name: "Readiness",
    zhName: "准备",
    objective: "Teach inventory, listing, and compliance concepts required before onboarding.",
    entrySignal: "Seller asks operational or policy questions.",
    successSignal: "Seller completes the readiness checklist.",
    ownerAgent: "inventory-education"
  },
  {
    id: "onboarding",
    order: 4,
    name: "Onboarding",
    zhName: "开通",
    objective: "Turn product education into a sequenced activation plan with clear ownership.",
    entrySignal: "Seller is ready to configure accounts, listings, inventory, and logistics.",
    successSignal: "Seller completes launch prerequisites.",
    ownerAgent: "onboarding-planner"
  },
  {
    id: "activation",
    order: 5,
    name: "Activation",
    zhName: "激活",
    objective: "Help the seller execute launch, identify blockers, and choose the next expansion action.",
    entrySignal: "Seller is preparing or completing a first global launch.",
    successSignal: "Seller completes first launch milestone.",
    ownerAgent: "launch-coach"
  }
];

export const agents = [
  {
    id: "global-opportunity",
    name: "Global Opportunity Agent",
    stage: "awareness",
    status: "Active",
    version: "1.2",
    objective: "Translate global-selling capabilities into a clear, seller-specific value proposition.",
    inputs: ["seller category", "current marketplaces", "business size", "expansion goal"],
    outputs: ["personalized headline", "three benefits", "one next action"],
    requiredMessages: [
      "Connect product capability to a concrete seller need.",
      "Use clear language before technical terminology.",
      "End with one low-friction next step."
    ],
    guardrails: [
      "Do not guarantee sales, profit, or market success.",
      "Do not claim unsupported marketplace availability.",
      "Do not present estimated benefits as measured outcomes."
    ]
  },
  {
    id: "seller-fit",
    name: "Seller Fit Agent",
    stage: "consideration",
    status: "Active",
    version: "1.1",
    objective: "Assess readiness and explain fit using transparent, non-discriminatory criteria.",
    inputs: ["category", "existing markets", "operations", "compliance readiness", "team capacity"],
    outputs: ["readiness score", "strengths", "gaps", "recommended learning path"],
    requiredMessages: [
      "Explain why each readiness factor matters.",
      "Separate known facts from assumptions.",
      "Recommend education before activation when gaps remain."
    ],
    guardrails: [
      "Do not reject sellers based on business size alone.",
      "Do not state that a score guarantees eligibility.",
      "Do not invent missing seller information."
    ]
  },
  {
    id: "inventory-education",
    name: "Inventory Education Agent",
    stage: "readiness",
    status: "Active",
    version: "1.0",
    objective: "Explain unified inventory and inbound concepts in operational language.",
    inputs: ["inventory model", "warehouse location", "forecast confidence", "target markets"],
    outputs: ["concept explanation", "decision checklist", "risk questions"],
    requiredMessages: [
      "Explain what changes operationally for the seller.",
      "Clarify that availability and rules may differ by program and market.",
      "Provide a checklist before recommending action."
    ],
    guardrails: [
      "Do not promise inventory will always be fungible.",
      "Do not provide binding logistics commitments.",
      "Do not omit market-specific verification."
    ]
  },
  {
    id: "compliance-education",
    name: "Compliance Education Agent",
    stage: "readiness",
    status: "Active",
    version: "1.0",
    objective: "Route sellers to the right compliance education without providing legal advice.",
    inputs: ["category", "target markets", "product claims", "current documents"],
    outputs: ["education topics", "document checklist", "escalation guidance"],
    requiredMessages: [
      "Distinguish general education from professional advice.",
      "Identify which facts require seller confirmation.",
      "Escalate high-risk or ambiguous questions."
    ],
    guardrails: [
      "Do not provide legal, tax, or regulatory conclusions.",
      "Do not claim a product is compliant without evidence.",
      "Do not fabricate certification requirements."
    ]
  },
  {
    id: "onboarding-planner",
    name: "Onboarding Planner Agent",
    stage: "onboarding",
    status: "Active",
    version: "1.3",
    objective: "Convert education and readiness findings into a sequenced onboarding plan.",
    inputs: ["target markets", "readiness gaps", "team owners", "desired launch date"],
    outputs: ["sequenced plan", "owners", "dependencies", "next action"],
    requiredMessages: [
      "Show why each step is necessary.",
      "Identify dependencies and responsible teams.",
      "Surface unresolved blockers before launch."
    ],
    guardrails: [
      "Do not imply account approval is guaranteed.",
      "Do not invent internal Amazon process steps.",
      "Do not hide unresolved compliance blockers."
    ]
  },
  {
    id: "launch-coach",
    name: "Launch Coach Agent",
    stage: "activation",
    status: "Pilot",
    version: "0.9",
    objective: "Help sellers complete launch milestones and learn from blockers.",
    inputs: ["launch checklist", "open blockers", "market", "seller team"],
    outputs: ["status summary", "blocker actions", "next expansion recommendation"],
    requiredMessages: [
      "Separate completed, blocked, and at-risk work.",
      "Recommend one immediate action.",
      "Explain the rationale behind expansion sequencing."
    ],
    guardrails: [
      "Do not report unverified launch success.",
      "Do not guarantee timeline or sales outcomes.",
      "Do not recommend expansion when critical blockers remain."
    ]
  }
];

export const messages = [
  {
    id: "msg-001",
    category: "Vision",
    title: "List once, learn globally",
    en: "Create a simpler path from local readiness to multi-market learning through a more unified selling experience.",
    zh: "通过更统一的销售体验，帮助卖家从本地准备更顺畅地进入多市场学习与经营。",
    evidence: "Concept messaging for portfolio demonstration; not an Amazon product claim.",
    status: "Approved",
    prohibited: ["Guaranteed global success", "Instant access to every marketplace"]
  },
  {
    id: "msg-002",
    category: "Seller Benefit",
    title: "Reduce duplicated setup",
    en: "A unified journey can reduce repeated education and setup work across expansion programs.",
    zh: "统一的教育与开通路径可以减少跨项目扩张时重复理解和配置的工作。",
    evidence: "Design hypothesis to be validated with seller research.",
    status: "Approved",
    prohibited: ["Zero setup", "No additional requirements"]
  },
  {
    id: "msg-003",
    category: "Inventory",
    title: "Plan inventory with a global view",
    en: "A global inventory view can help sellers evaluate demand, placement, and replenishment decisions across markets.",
    zh: "全球库存视图可以帮助卖家综合评估不同市场的需求、库存布局和补货决策。",
    evidence: "Educational framing; actual inventory capabilities vary by program and market.",
    status: "Approved",
    prohibited: ["Inventory is always fully fungible", "No stockout risk"]
  },
  {
    id: "msg-004",
    category: "Guardrail",
    title: "No outcome guarantees",
    en: "Expansion tools can simplify decisions and workflows, but business outcomes depend on seller execution and market conditions.",
    zh: "扩张工具可以简化决策与流程，但经营结果仍取决于卖家执行和市场条件。",
    evidence: "Required guardrail for all generated content.",
    status: "Required",
    prohibited: ["Guaranteed revenue growth", "Risk-free expansion", "Guaranteed approval"]
  }
];

export const sellers = [
  {
    id: "seller-electronics",
    name: "Shenzhen SmartHome",
    location: "Shenzhen",
    category: "Consumer electronics",
    size: "Growth-stage",
    currentMarkets: ["United States"],
    targetMarkets: ["Germany", "Japan"],
    readiness: 68,
    stage: "consideration",
    summary: "Established US seller exploring Germany and Japan with limited localization resources."
  },
  {
    id: "seller-home",
    name: "Ningbo HomeCraft",
    location: "Ningbo",
    category: "Home and kitchen",
    size: "Small business",
    currentMarkets: ["United Kingdom"],
    targetMarkets: ["France", "Italy"],
    readiness: 54,
    stage: "awareness",
    summary: "Small team seeking a low-complexity path to continental Europe."
  },
  {
    id: "seller-beauty",
    name: "Guangzhou GlowLab",
    location: "Guangzhou",
    category: "Beauty",
    size: "Emerging brand",
    currentMarkets: ["Singapore"],
    targetMarkets: ["United States"],
    readiness: 43,
    stage: "readiness",
    summary: "Brand with strong content capability but unresolved claims and compliance questions."
  },
  {
    id: "seller-pet",
    name: "Suzhou PawsTech",
    location: "Suzhou",
    category: "Pet supplies",
    size: "Mid-market",
    currentMarkets: ["United States", "Canada"],
    targetMarkets: ["United Kingdom", "Germany"],
    readiness: 81,
    stage: "onboarding",
    summary: "Experienced cross-border seller preparing a structured European launch."
  }
];

export const testCases = [
  { question: "为什么我们现在应该考虑进入德国市场？", expectedAgent: "global-opportunity", expectedStage: "awareness" },
  { question: "How do I know whether our team is ready to expand to Japan?", expectedAgent: "seller-fit", expectedStage: "consideration" },
  { question: "统一库存到底是什么意思，会不会要重复入仓？", expectedAgent: "inventory-education", expectedStage: "readiness" },
  { question: "我们的美容产品进入美国需要哪些认证？", expectedAgent: "compliance-education", expectedStage: "readiness" },
  { question: "Can you create a step-by-step onboarding plan for Germany?", expectedAgent: "onboarding-planner", expectedStage: "onboarding" },
  { question: "我们已经准备上架了，目前还有两个资料没交，下一步做什么？", expectedAgent: "launch-coach", expectedStage: "activation" },
  { question: "What markets could be a good next step for a US electronics seller?", expectedAgent: "global-opportunity", expectedStage: "awareness" },
  { question: "Please assess our readiness score and identify the biggest gaps.", expectedAgent: "seller-fit", expectedStage: "consideration" }
];
