import type { EvaluationCase } from '../types/index.js';

export const evaluationSet: EvaluationCase[] = [
  {question:'为什么现在要考虑欧洲市场？',sellerId:'sz-electronics',expectedAgent:'global-opportunity',expectedStage:'awareness'},
  {question:'Why should I expand beyond the US?',sellerId:'gz-home',expectedAgent:'global-opportunity',expectedStage:'awareness'},
  {question:'德国市场对我们这种品类有机会吗？',sellerId:'dg-sports',expectedAgent:'global-opportunity',expectedStage:'awareness'},
  {question:'Which market should we learn first?',sellerId:'hz-beauty',expectedAgent:'global-opportunity',expectedStage:'awareness'},
  {question:'我们是否适合现在扩张？',sellerId:'sz-electronics',expectedAgent:'seller-fit',expectedStage:'consideration'},
  {question:'Assess our readiness for Germany',sellerId:'gz-home',expectedAgent:'seller-fit',expectedStage:'consideration'},
  {question:'准备度评分为什么只有68？',sellerId:'dg-sports',expectedAgent:'seller-fit',expectedStage:'consideration'},
  {question:'What gaps should we close first?',sellerId:'hz-beauty',expectedAgent:'seller-fit',expectedStage:'consideration'},
  {question:'库存要不要分别放在每个国家？',sellerId:'sz-electronics',expectedAgent:'inventory-education',expectedStage:'readiness'},
  {question:'How should we plan inbound inventory?',sellerId:'gz-home',expectedAgent:'inventory-education',expectedStage:'readiness'},
  {question:'补货策略怎么做？',sellerId:'dg-sports',expectedAgent:'inventory-education',expectedStage:'readiness'},
  {question:'What warehouse questions should we answer?',sellerId:'hz-beauty',expectedAgent:'inventory-education',expectedStage:'readiness'},
  {question:'进入德国需要哪些认证？',sellerId:'sz-electronics',expectedAgent:'compliance-education',expectedStage:'readiness'},
  {question:'Can you confirm this product is compliant?',sellerId:'gz-home',expectedAgent:'compliance-education',expectedStage:'readiness'},
  {question:'美国税务要求是什么？',sellerId:'dg-sports',expectedAgent:'compliance-education',expectedStage:'readiness'},
  {question:'Which certification claims need review?',sellerId:'hz-beauty',expectedAgent:'compliance-education',expectedStage:'readiness'},
  {question:'给我一个开通步骤清单',sellerId:'sz-electronics',expectedAgent:'onboarding-planner',expectedStage:'onboarding'},
  {question:'Build an onboarding checklist',sellerId:'gz-home',expectedAgent:'onboarding-planner',expectedStage:'onboarding'},
  {question:'谁负责每一步？',sellerId:'dg-sports',expectedAgent:'onboarding-planner',expectedStage:'onboarding'},
  {question:'What setup dependencies come first?',sellerId:'hz-beauty',expectedAgent:'onboarding-planner',expectedStage:'onboarding'},
  {question:'我们准备上线了还有什么阻塞项？',sellerId:'sz-electronics',expectedAgent:'launch-coach',expectedStage:'activation'},
  {question:'What blocker should we close before launch?',sellerId:'gz-home',expectedAgent:'launch-coach',expectedStage:'activation'},
  {question:'上线前最后检查什么？',sellerId:'dg-sports',expectedAgent:'launch-coach',expectedStage:'activation'},
  {question:'Which launch milestone comes next?',sellerId:'hz-beauty',expectedAgent:'launch-coach',expectedStage:'activation'}
];
