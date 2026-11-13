// ============================================================
// EMBEDQUEST — root app: theme + hash routing + auth gate
// ============================================================
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from './components/common';
import { AuthView } from './components/AuthView';
import { Layout } from './components/Layout';
import { Onboarding } from './components/Onboarding';
import { HomeView } from './pages/HomeView';
import { WorldsView, WorldView, BossView } from './pages/WorldsView';
import { LessonView } from './pages/LessonView';
import { DiagnosticView } from './pages/DiagnosticView';
import { ToolsView } from './pages/ToolsView';
import { ProjectsView, ProjectView } from './pages/ProjectsView';
import { TeacherView } from './pages/TeacherView';
import { ProfileView } from './pages/ProfileView';
import { ConverterTool } from './tools/ConverterTool';
import { GatesTool } from './tools/GatesTool';
import { OhmTool, ResistorTool, SeriesParallelTool } from './tools/CalcTools';
import { BreadboardTool, ArduinoPinsTool } from './tools/BoardTools';
import { PlaygroundTool } from './tools/PlaygroundTool';
import { navigate, useRoute } from './lib/router';
import { useProgress } from './lib/progress';
import { t } from './lib/i18n';
import { AuthProvider, useAuth } from './lib/auth';
import { attachCloudSync, detachCloudSync } from './lib/cloudSync';

const TOOL_MAP: Record<string, () => JSX.Element> = {
  converter: ConverterTool,
  gates: GatesTool,
  ohm: OhmTool,
  resistor: ResistorTool,
  'series-parallel': SeriesParallelTool,
  breadboard: BreadboardTool,
  arduino: ArduinoPinsTool,
  playground: PlaygroundTool,
};

function NotFound() {
  return (
    <Card className="mx-auto max-w-md p-8 text-center">
      <div className="text-5xl">🧭</div>
      <h1 className="mt-3 text-xl font-black">{t('notfound_title')}</h1>
      <button
        onClick={() => navigate('/')}
        className="mt-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-2.5 text-sm font-bold text-white eq-chunky"
      >
        {t('notfound_btn')}
      </button>
    </Card>
  );
}

function Routes() {
  const path = useRoute();
  const progress = useProgress();
  const segs = path.split('/').filter(Boolean);

  // New page → scroll to top (otherwise the previous page's scroll
  // position carries over and users land mid-page).
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [path]);

  // First experience: welcome flow before the dashboard
  if (path === '/' && !progress.onboarding.done) return <Onboarding />;
  if (path === '/onboarding') return <Onboarding />;
  if (path === '/diagnostic') return <DiagnosticView />;

  // Standalone content pages (inside Layout)
  let page: JSX.Element;
  if (segs.length === 0) page = <HomeView />;
  else
    switch (segs[0]) {
      case 'worlds':
        page = <WorldsView />;
        break;
      case 'world':
        page = segs[2] === 'boss' ? <BossView worldId={segs[1]} /> : <WorldView worldId={segs[1]} />;
        break;
      case 'lesson':
        page = <LessonView lessonId={segs[1]} />;
        break;
      case 'tools': {
        // Render as a real element (<T/>) — calling T() directly would
        // attach the tool's hooks to <Routes> and crash on hook-order changes.
        const Tool = segs[1] ? TOOL_MAP[segs[1]] : undefined;
        page = Tool ? <Tool /> : <ToolsView />;
        break;
      }
      case 'projects':
        page = <ProjectsView />;
        break;
      case 'project':
        page = <ProjectView projectId={segs[1]} />;
        break;
      case 'teacher':
        page = <TeacherView />;
        break;
      case 'profile':
        page = <ProfileView />;
        break;
      default:
        page = <NotFound />;
    }

  return <Layout>{page}</Layout>;
}

/** Loading screen while the initial session is restored. */
function AuthLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-300">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      <p className="mt-3 text-sm font-semibold">Loading pannitu irukku…</p>
    </div>
  );
}

/** Auth gate: cloud users must be logged in (or guest) to see the app. */
function Gate() {
  const auth = useAuth();
  useProgress(); // subscribe to progress store (theme, language changes re-render here too)

  // Attach/detach the cloud sync loop for the signed-in user.
  useEffect(() => {
    if (!auth.cloudEnabled || !auth.user) {
      detachCloudSync();
      return;
    }
    attachCloudSync(auth.user.id);
    return () => detachCloudSync();
  }, [auth.cloudEnabled, auth.user]);

  // Cloud configured but no session → show the auth/landing screen.
  if (auth.cloudEnabled && !auth.session && !auth.isGuest) {
    if (auth.loading) return <AuthLoading />;
    return <AuthView />;
  }

  return <Routes />;
}

export default function App() {
  const progress = useProgress();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', progress.theme === 'dark');
  }, [progress.theme]);

  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
