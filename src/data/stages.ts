import type { JourneyStage, JourneyStageId } from '../types/index.js';
export const stages: JourneyStage[] = [
  { id:'awareness', order:1, name:'Awareness', zhName:'认知', objective:'Connect global expansion value to seller context.', successSignal:'Seller chooses to assess readiness.' },
  { id:'consideration', order:2, name:'Consideration', zhName:'评估', objective:'Assess fit and prioritize learning without promising outcomes.', successSignal:'Seller chooses a priority market and knows readiness gaps.' },
  { id:'readiness', order:3, name:'Readiness', zhName:'准备', objective:'Teach inventory, listing, and compliance concepts before onboarding.', successSignal:'Seller completes the readiness checklist.' },
  { id:'onboarding', order:4, name:'Onboarding', zhName:'开通', objective:'Turn readiness findings into a sequenced activation plan.', successSignal:'Launch prerequisites have owners and dependencies.' },
  { id:'activation', order:5, name:'Activation', zhName:'激活', objective:'Resolve blockers and complete the first launch milestone.', successSignal:'Seller completes a launch milestone and knows what comes next.' }
];
export const stageMap: Record<JourneyStageId, JourneyStage> = Object.fromEntries(stages.map(stage => [stage.id, stage])) as Record<JourneyStageId, JourneyStage>;
