import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PageHeader } from './components/PageHeader';
import { SimulatorForm } from './components/SimulatorForm';
import { getJSON } from './lib/api';
import { navigation } from './navigation';
import { ContentPage } from './pages/ContentPage';
import { DashboardPage } from './pages/DashboardPage';
import { InsightsPage } from './pages/InsightsPage';
import { JourneyPage } from './pages/JourneyPage';
import { MessagingPage } from './pages/MessagingPage';
import { SkillsPage } from './pages/SkillsPage';
import type { BootstrapData, EvaluationResponse, PageId } from './types';

export default function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [data, setData] = useState<BootstrapData>();
  const [evaluation, setEvaluation] = useState<EvaluationResponse>();
  const [error, setError] = useState('');

  useEffect(() => {
    getJSON<BootstrapData>('/api/bootstrap').then(setData).catch(err => setError(String(err)));
    getJSON<EvaluationResponse>('/api/evaluation').then(setEvaluation).catch(() => undefined);
  }, []);

  const current = navigation.find(item => item.id === page) ?? navigation[0];
  if (!data) return <div className="loading-screen">{error || 'Loading GlobalLaunch Studio…'}</div>;

  let content = <DashboardPage data={data} evaluation={evaluation} />;
  if (page === 'journey') content = <JourneyPage stages={data.stages} agents={data.agents} />;
  if (page === 'skills') content = <SkillsPage agents={data.agents} />;
  if (page === 'messaging') content = <MessagingPage messaging={data.messaging} />;
  if (page === 'simulator') content = <SimulatorForm sellers={data.sellers} />;
  if (page === 'content') content = <ContentPage sellers={data.sellers} />;
  if (page === 'insights') content = <InsightsPage evaluation={evaluation} />;

  return <div className="app-shell"><Sidebar page={page} items={navigation} onNavigate={setPage} /><main className="main-panel"><PageHeader eyebrow={current.eyebrow} title={current.title} subtitle={current.subtitle} /><div className="page-content">{content}</div></main></div>;
}
