import type { AgentSkill, JourneyStage } from '../types';

export function JourneyPage({ stages, agents }: { stages: JourneyStage[]; agents: AgentSkill[] }) {
  return (
    <div className="journey-grid">
      {stages.map(stage => {
        const stageAgents = agents.filter(agent => agent.stage === stage.id);
        const requiredMessages = [...new Set(stageAgents.flatMap(agent => agent.requiredMessages))].slice(0, 4);
        return (
          <section className="panel journey-stage" key={stage.id}>
            <div className="row-between">
              <div>
                <span className="stage-number">{String(stage.order).padStart(2, '0')}</span>
                <span className="status-chip">{stage.id}</span>
              </div>
              <span className="muted-label">{stage.zhName}</span>
            </div>
            <h2>{stage.name}</h2>
            <p>{stage.objective}</p>
            <div className="detail-block">
              <strong>Success signal</strong>
              <p>{stage.successSignal}</p>
            </div>
            <div className="detail-block">
              <strong>Agent ownership</strong>
              <div className="chip-row">
                {stageAgents.length ? stageAgents.map(agent => <span className="outline-chip" key={agent.id}>{agent.name}</span>) : <span className="muted-label">No primary agent</span>}
              </div>
            </div>
            <div className="detail-block">
              <strong>Knowledge delivered at this stage</strong>
              <ul>{requiredMessages.map(message => <li key={message}>{message}</li>)}</ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
