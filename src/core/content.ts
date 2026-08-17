import { messaging } from '../data/messaging.js';
import { getSeller } from '../data/sellers.js';
import type { ContentFormat, GeneratedContent, Language } from '../types/index.js';

function message(id: string, language: Language): string {
  const item = messaging.find(asset => asset.id === id);
  if (!item) return '';
  return language === 'zh' ? item.zh : item.en;
}

export function generateContent(input: { format?: ContentFormat; sellerId?: string; language?: Language }): GeneratedContent {
  const format = input.format || 'email';
  const language = input.language || 'en';
  const seller = getSeller(input.sellerId);
  const market = seller.targetMarkets[0] || (language === 'zh' ? '优先市场' : 'priority market');
  const gap = seller.gaps[0] || (language === 'zh' ? '市场准备度' : 'market readiness');
  const vision = message('vision-01', language);
  const benefit = message('benefit-01', language);
  const inventory = message('inventory-01', language);
  const guardrail = message('guardrail-01', language);

  if (language === 'zh') {
    const title = `${market} 卖家教育 · ${seller.name}`;
    if (format === 'checklist') {
      return {
        format, seller, language, title,
        body: [
          `目标：帮助 ${seller.name} 从当前市场 ${seller.currentMarkets.join('、')} 有序准备进入 ${market}。`,
          '',
          '准备清单',
          `1. 确认 ${market} 是当前优先市场，并明确负责团队。`,
          `2. 复核商品信息与本地化需求，重点关注：${gap}。`,
          '3. 梳理库存、入仓、补货假设，并确认哪些规则需要按市场核实。',
          '4. 整理合规、认证、税务或声明相关问题，交由适当的官方来源或专业人员确认。',
          '5. 将未解决问题分为“已完成 / 阻塞 / 待验证”，再进入 onboarding。',
          '6. 为第一个 launch milestone 指定负责人和下一步时间点。',
          '',
          `核心信息：${benefit}`,
          `边界说明：${guardrail}`
        ].join('\n')
      };
    }
    if (format === 'faq') {
      return {
        format, seller, language, title,
        body: [
          `Q1：为什么现在要做 ${market} 准备度评估？`,
          `A：${vision} 对 ${seller.name} 来说，当前最需要优先确认的是“${gap}”。`,
          '',
          'Q2：库存应该怎么考虑？',
          `A：${inventory} 实际规则与可用能力仍需按市场和项目核实。`,
          '',
          'Q3：系统能直接判断商品是否合规吗？',
          'A：不能。系统用于组织教育主题、待确认事实和升级问题，不提供法律、税务、认证或监管结论。',
          '',
          `边界说明：${guardrail}`
        ].join('\n')
      };
    }
    return {
      format, seller, language, title,
      body: [
        `${seller.name} 团队您好，`,
        '',
        `你们目前从 ${seller.currentMarkets.join('、')} 向 ${market} 扩张。基于当前准备度 ${seller.readiness}/100，建议先把“${gap}”作为第一优先级。`,
        '',
        `为什么值得先做：${benefit}`,
        '',
        '建议下一步：',
        `• 确认 ${market} 的商品、库存与本地化要求；`,
        '• 将合规问题整理为待验证清单，不在证据不足时下结论；',
        '• 明确负责人，并在进入 onboarding 前关闭最高影响的准备度缺口。',
        '',
        `边界说明：${guardrail}`
      ].join('\n')
    };
  }

  const title = `${market} seller education · ${seller.name}`;
  if (format === 'checklist') {
    return {
      format, seller, language, title,
      body: [
        `Goal: help ${seller.name} prepare for ${market} from its current ${seller.currentMarkets.join(', ')} operation.`,
        '',
        'Readiness checklist',
        `1. Confirm ${market} as the priority market and assign an owner.`,
        `2. Review product information and localization needs, especially: ${gap}.`,
        '3. Document inventory, inbound, and replenishment assumptions that require market-specific verification.',
        '4. Organize compliance, certification, tax, and claims questions for the appropriate official or professional source.',
        '5. Separate completed, blocked, and unverified work before onboarding.',
        '6. Assign an owner and next date for the first launch milestone.',
        '',
        `Core message: ${benefit}`,
        `Guardrail: ${guardrail}`
      ].join('\n')
    };
  }
  if (format === 'faq') {
    return {
      format, seller, language, title,
      body: [
        `Q1: Why assess readiness before expanding to ${market}?`,
        `A: ${vision} For ${seller.name}, the first gap to resolve is “${gap}.”`,
        '',
        'Q2: How should the team think about inventory?',
        `A: ${inventory} Actual rules and available capabilities still vary by market and program.`,
        '',
        'Q3: Can this system determine whether a product is compliant?',
        'A: No. It organizes education topics, facts to verify, and escalation questions; it does not provide legal, tax, certification, or regulatory conclusions.',
        '',
        `Guardrail: ${guardrail}`
      ].join('\n')
    };
  }
  return {
    format, seller, language, title,
    body: [
      `Hi ${seller.name} team,`,
      '',
      `You are expanding from ${seller.currentMarkets.join(', ')} toward ${market}. With a readiness score of ${seller.readiness}/100, the first priority should be “${gap}.”`,
      '',
      `Why this matters: ${benefit}`,
      '',
      'Recommended next steps:',
      `• Verify ${market}-specific product, inventory, and localization requirements.`,
      '• Organize compliance questions as items to validate rather than making unsupported conclusions.',
      '• Assign owners and close the highest-impact readiness gap before onboarding.',
      '',
      `Guardrail: ${guardrail}`
    ].join('\n')
  };
}
