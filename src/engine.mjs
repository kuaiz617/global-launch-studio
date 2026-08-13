import { agents, messages, sellers, stages } from "./data.mjs";

const keywordRules = [
  {
    agent: "compliance-education",
    stage: "readiness",
    score: 10,
    keywords: ["认证", "合规", "法规", "税", "法律", "regulation", "compliance", "certificate", "certification", "tax", "legal", "claims"]
  },
  {
    agent: "inventory-education",
    stage: "readiness",
    score: 9,
    keywords: ["库存", "入仓", "补货", "仓库", "inventory", "inbound", "warehouse", "replenishment", "stock"]
  },
  {
    agent: "launch-coach",
    stage: "activation",
    score: 8,
    keywords: ["已经准备", "准备上架", "上线", "激活", "launch", "go live", "blocker", "milestone", "还有", "没交"]
  },
  {
    agent: "onboarding-planner",
    stage: "onboarding",
    score: 7,
    keywords: ["开通", "步骤", "计划", "清单", "onboarding", "step-by-step", "setup", "checklist", "timeline"]
  },
  {
    agent: "seller-fit",
    stage: "consideration",
    score: 6,
    keywords: ["是否适合", "准备好", "评分", "差距", "ready", "readiness", "fit", "score", "gaps", "assess"]
  },
  {
    agent: "global-opportunity",
    stage: "awareness",
    score: 5,
    keywords: ["为什么", "机会", "市场", "进入", "expand", "expansion", "opportunity", "market", "why", "global"]
  }
];

export function routeQuestion(question = "") {
  const normalized = question.toLowerCase();
  const matches = keywordRules
    .map(rule => ({
      ...rule,
      hits: rule.keywords.filter(keyword => normalized.includes(keyword.toLowerCase())).length
    }))
    .filter(rule => rule.hits > 0)
    .sort((a, b) => (b.score + b.hits) - (a.score + a.hits));

  const winner = matches[0] || keywordRules[keywordRules.length - 1];
  return {
    agentId: winner.agent,
    stageId: winner.stage,
    confidence: matches.length ? Math.min(0.97, 0.62 + winner.hits * 0.09) : 0.52,
    matchedSignals: winner.keywords.filter(keyword => normalized.includes(keyword.toLowerCase()))
  };
}

function languageOf(text) {
  return /[\u3400-\u9fff]/.test(text) ? "zh" : "en";
}

function getSeller(sellerId) {
  return sellers.find(seller => seller.id === sellerId) || sellers[0];
}

function buildReadinessNotes(seller) {
  const strengths = [];
  const gaps = [];
  if (seller.currentMarkets.length > 0) strengths.push("Existing cross-border marketplace experience");
  if (seller.readiness >= 70) strengths.push("Strong operational readiness baseline");
  if (seller.targetMarkets.length > 1) strengths.push("Clear multi-market ambition");
  if (seller.readiness < 60) gaps.push("Complete product, listing, and compliance readiness review");
  if (seller.category === "Beauty") gaps.push("Validate product claims and market-specific compliance requirements");
  if (seller.targetMarkets.includes("Japan")) gaps.push("Prepare Japanese localization and customer-support coverage");
  if (!gaps.length) gaps.push("Confirm final ownership, dates, and unresolved launch dependencies");
  return { strengths, gaps };
}

function createAnswer({ question, route, seller, language }) {
  const agent = agents.find(item => item.id === route.agentId);
  const stage = stages.find(item => item.id === route.stageId);
  const guardrail = messages.find(item => item.category === "Guardrail");
  const agentGuardrail = route.agentId === "compliance-education"
    ? { en: "This content is general education and does not replace legal, tax, or regulatory advice.", zh: "本内容仅用于一般教育，不能替代法律、税务或监管专业意见。" }
    : guardrail;
  const notes = buildReadinessNotes(seller);

  if (language === "zh") {
    const intros = {
      "global-opportunity": `对 ${seller.name} 来说，全球扩张的核心价值不是“同时进入越多市场越好”，而是用更统一的路径判断哪些市场值得优先学习和投入。`,
      "seller-fit": `${seller.name} 当前的模拟准备度为 ${seller.readiness}/100。这个分数用于教育路径排序，不代表项目资格或业务成功。`,
      "inventory-education": `统一库存教育的重点，是让卖家从全球视角评估需求、库存布局和补货，而不是承诺所有市场的库存都能无条件共享。`,
      "compliance-education": `这个问题需要区分一般教育与专业判断。系统可以整理需要确认的主题和材料，但不能替代法律、税务或监管意见。`,
      "onboarding-planner": `建议把 ${seller.targetMarkets.join("、")} 的开通拆成有依赖关系的步骤，而不是一次性提交所有事项。`,
      "launch-coach": `目前应先把工作分成已完成、受阻和高风险三类，再确定一个可以立即推进的动作。`
    };

    const actions = {
      "global-opportunity": ["确认最优先的一个目标市场", "完成卖家准备度评估", "比较市场机会与运营复杂度"],
      "seller-fit": ["确认商品与团队信息", "补齐主要准备度差距", "选择下一段教育内容"],
      "inventory-education": ["确认库存所有权与仓储地点", "核对各市场项目规则", "建立补货和缺货风险清单"],
      "compliance-education": ["列出商品声明与现有文件", "确认目标市场和商品类别", "把高风险问题转交专业团队"],
      "onboarding-planner": ["确定市场与负责人", "完成 listing 和库存准备", "解决合规阻塞项", "执行上线前检查"],
      "launch-coach": ["关闭关键阻塞项", "确认上线资料状态", "完成首个市场里程碑后再评估下一市场"]
    };

    return {
      headline: `${agent.name} · ${stage.zhName}阶段`,
      summary: intros[route.agentId],
      sellerContext: `${seller.location}｜${seller.category}｜当前市场：${seller.currentMarkets.join("、")}｜目标市场：${seller.targetMarkets.join("、")}`,
      strengths: notes.strengths,
      gaps: notes.gaps,
      actions: actions[route.agentId],
      guardrail: agentGuardrail.zh,
      cta: "下一步：确认一项最需要卖家完成的动作，并为其匹配对应教育内容。"
    };
  }

  const intros = {
    "global-opportunity": `For ${seller.name}, the value of global expansion is not entering every market at once. It is creating a clearer path to prioritize where the business should learn and invest first.`,
    "seller-fit": `${seller.name} has a simulated readiness score of ${seller.readiness}/100. This score prioritizes education; it does not determine program eligibility or guarantee outcomes.`,
    "inventory-education": `Unified inventory education should help the seller evaluate demand, placement, and replenishment globally without claiming that inventory is universally fungible.`,
    "compliance-education": `This question requires a boundary between education and professional advice. The system can organize topics and documents, but it cannot provide legal, tax, or regulatory conclusions.`,
    "onboarding-planner": `The onboarding path for ${seller.targetMarkets.join(" and ")} should be sequenced around dependencies instead of treating every task as parallel.`,
    "launch-coach": `The immediate job is to separate completed, blocked, and at-risk work, then assign one action that can move the launch forward.`
  };

  const actions = {
    "global-opportunity": ["Choose one priority target market", "Complete a seller readiness assessment", "Compare opportunity with operating complexity"],
    "seller-fit": ["Validate product and team inputs", "Close the highest-impact readiness gaps", "Assign the next education module"],
    "inventory-education": ["Confirm inventory ownership and locations", "Verify program rules by market", "Create replenishment and stockout questions"],
    "compliance-education": ["List product claims and current documents", "Confirm market and product category", "Escalate high-risk questions to specialists"],
    "onboarding-planner": ["Confirm market and owners", "Prepare listings and inventory", "Resolve compliance blockers", "Run the pre-launch review"],
    "launch-coach": ["Close critical blockers", "Verify launch-document status", "Complete one market milestone before sequencing the next"]
  };

  return {
    headline: `${agent.name} · ${stage.name} stage`,
    summary: intros[route.agentId],
    sellerContext: `${seller.location} | ${seller.category} | Current: ${seller.currentMarkets.join(", ")} | Target: ${seller.targetMarkets.join(", ")}`,
    strengths: notes.strengths,
    gaps: notes.gaps,
    actions: actions[route.agentId],
    guardrail: agentGuardrail.en,
    cta: "Next step: identify one seller action and attach the right education asset."
  };
}

export function qualityCheck(answer) {
  const serialized = JSON.stringify(answer).toLowerCase();
  const prohibited = messages.flatMap(message => message.prohibited || []).map(item => item.toLowerCase());
  const violations = prohibited.filter(phrase => serialized.includes(phrase));
  const checks = {
    hasCTA: Boolean(answer.cta),
    hasGuardrail: Boolean(answer.guardrail),
    hasActions: Array.isArray(answer.actions) && answer.actions.length > 0,
    noProhibitedClaims: violations.length === 0,
    hasSellerContext: Boolean(answer.sellerContext)
  };
  const passed = Object.values(checks).filter(Boolean).length;
  return {
    score: Math.round((passed / Object.keys(checks).length) * 100),
    checks,
    violations
  };
}

export function simulate({ question, sellerId }) {
  const seller = getSeller(sellerId);
  const route = routeQuestion(question);
  const language = languageOf(question);
  const answer = createAnswer({ question, route, seller, language });
  return {
    question,
    language,
    seller,
    route,
    agent: agents.find(agent => agent.id === route.agentId),
    stage: stages.find(stage => stage.id === route.stageId),
    answer,
    quality: qualityCheck(answer),
    generatedAt: new Date().toISOString()
  };
}

export function generateContent({ format = "email", sellerId, objective = "Invite the seller to complete readiness assessment", language = "en" }) {
  const seller = getSeller(sellerId);
  const market = seller.targetMarkets[0] || "the selected market";
  if (language === "zh") {
    const content = {
      email: {
        title: `为 ${market} 扩张做好下一步准备`,
        body: `${seller.name} 团队您好，\n\n为了帮助您更清楚地评估进入 ${market} 的准备情况，我们建议先完成一份简短的卖家准备度评估。评估将梳理商品、库存、团队和合规方面的信息，并生成优先教育路径。\n\n该评估不会保证项目资格或经营结果，但可以帮助团队更快识别需要补齐的事项。\n\n下一步：完成准备度评估并确认一个优先市场。`
      },
      faq: {
        title: "什么是统一卖家教育路径？",
        body: "它根据卖家的市场、品类和准备情况，安排不同 Agent 在认知、评估、准备、开通和激活阶段提供对应知识，并给出明确的下一步行动。"
      },
      checklist: {
        title: `${market} 上线前教育清单`,
        body: "1. 确认目标市场与负责人\n2. 检查商品和 listing 信息\n3. 确认库存与物流方案\n4. 整理合规问题与文件\n5. 关闭关键阻塞项\n6. 完成上线前复核"
      }
    };
    return { format, objective, seller, language, ...content[format] };
  }

  const content = {
    email: {
      title: `Prepare the next step for ${market} expansion`,
      body: `Hello ${seller.name} team,\n\nTo help you evaluate readiness for ${market}, we recommend completing a short seller readiness assessment. It organizes product, inventory, team, and compliance inputs and then assigns a prioritized education path.\n\nThe assessment does not guarantee eligibility or business results, but it can help your team identify the most important gaps earlier.\n\nNext step: complete the readiness assessment and confirm one priority market.`
    },
    faq: {
      title: "What is a unified seller education journey?",
      body: "It uses seller context to decide which agent should deliver which knowledge across awareness, consideration, readiness, onboarding, and activation, with a clear next action at every stage."
    },
    checklist: {
      title: `${market} pre-launch education checklist`,
      body: "1. Confirm target market and owners\n2. Review product and listing information\n3. Validate inventory and logistics plan\n4. Organize compliance questions and documents\n5. Close critical blockers\n6. Complete the pre-launch review"
    }
  };
  return { format, objective, seller, language, ...content[format] };
}

export function bootstrap() {
  return { stages, agents, messages, sellers };
}
