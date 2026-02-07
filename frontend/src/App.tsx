import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useStore, useIsOnboardingComplete, useFamilyId, useShowConfetti } from './lib/store';
import { familyApi, childrenApi } from './lib/api';

// Components (loaded immediately - needed for layout)
import Layout from './components/Layout';
import Confetti from './components/Confetti';
import LoadingScreen from './components/LoadingScreen';

// Lazy-loaded pages (code splitting)
const AuthPage = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Books = lazy(() => import('./pages/Books'));
const ReadingSessions = lazy(() => import('./pages/ReadingSessions'));
const MapPage = lazy(() => import('./pages/Map'));
const AchievementsPage = lazy(() => import('./pages/Achievements'));
const PrintPage = lazy(() => import('./pages/Print'));
const Settings = lazy(() => import('./pages/Settings'));

export default function App() {
  const isOnboardingComplete = useIsOnboardingComplete();
  const familyId = useFamilyId();
  const showConfetti = useShowConfetti();
  const { setFamily, setChildren, reset } = useStore();

  // Fetch family data if we have an ID
  const { data: familyData, isLoading: familyLoading, error: familyError } = useQuery({
    queryKey: ['family', familyId],
    queryFn: () => familyApi.get(familyId!),
    enabled: !!familyId && isOnboardingComplete,
    retry: 1, // Only retry once to avoid long waits on auth errors
  });

  // Fetch children
  const { data: childrenData, isLoading: childrenLoading } = useQuery({
    queryKey: ['children', familyId],
    queryFn: () => childrenApi.getByFamily(familyId!),
    enabled: !!familyId && isOnboardingComplete,
    retry: 1,
  });

  useEffect(() => {
    if (familyData) setFamily(familyData);
  }, [familyData, setFamily]);

  useEffect(() => {
    if (childrenData) setChildren(childrenData);
  }, [childrenData, setChildren]);

  // Handle auth error on family fetch (e.g., 401 unauthorized)
  useEffect(() => {
    if (familyError) {
      reset();
    }
  }, [familyError, reset]);

  const isLoading = familyLoading || childrenLoading;

  // Check for auth token - this is the primary authentication check
  const hasToken = !!localStorage.getItem('authToken');

  // Redirect to auth if no token
  if (!hasToken) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Suspense>
    );
  }

  // Show Auth if onboarding not complete (even with token)
  if (!isOnboardingComplete) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Suspense>
    );
  }

  // If familyId missing but has token and onboarding complete, show loading
  // This handles the brief moment after login before state is fully synced
  if (!familyId) {
    return <LoadingScreen />;
  }

  // Show loading while fetching data
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If family data failed to load, the useEffect above will handle logout
  if (familyError) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/livros" element={<Books />} />
            <Route path="/leituras" element={<ReadingSessions />} />
            <Route path="/mapa" element={<MapPage />} />
            <Route path="/conquistas" element={<AchievementsPage />} />
            <Route path="/imprimir" element={<PrintPage />} />
            <Route path="/definicoes" element={<Settings />} />
          </Route>
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Confetti active={showConfetti} />
    </>
  );
}
