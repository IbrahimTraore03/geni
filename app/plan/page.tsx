'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const NAVY = '#0F2D52';

interface Moment {
  titel: string;
  beskrivning: string;
  tid: string;
}

interface Session {
  titel: string;
  moment: Moment[];
}

interface Plan {
  amne: string;
  teknik: string;
  sessioner: Session[];
}

function PlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [klarade, setKlarade] = useState<Record<string, boolean>>({});
  const [laddar, setLaddar] = useState(true);
  const [fel, setFel] = useState('');

  const amne = searchParams.get('amne') || '';
  const teknik = searchParams.get('teknik') || 'The Study Cycle';

  useEffect(() => {
    if (!amne) {
      router.push('/');
      return;
    }

    async function hamtaPlan() {
      try {
        const res = await fetch('/api/plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amne, teknik }),
        });
        const data = await res.json();
        setPlan(data);
      } catch {
        setFel('Något gick fel. Försök igen.');
      } finally {
        setLaddar(false);
      }
    }

    hamtaPlan();
  }, [amne, teknik, router]);

  const totaltAntalMoment = plan?.sessioner?.reduce((acc, s) => acc + s.moment.length, 0) || 0;
  const klaradeAntal = Object.values(klarade).filter(Boolean).length;
  const progress = totaltAntalMoment > 0 ? Math.round((klaradeAntal / totaltAntalMoment) * 100) : 0;

  const toggleMoment = (key: string) => {
    setKlarade(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>

      {/* BLÅ SEKTION */}
      <div style={{ background: NAVY }}>

        {/* Navbar */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 32px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <span style={{ color: '#fff', fontWeight: 500, fontSize: 16, cursor: 'pointer' }} onClick={() => router.push('/')}>Geni</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Om studieteknikerna</span>
        </nav>

        {/* Stegindikator */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '24px 32px 0' }}>
          {['Ämne', 'Teknik', 'Material', 'Plan'].map((steg, i) => (
            <div key={steg} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 22, height: 22,
                background: i < 3 ? 'rgba(255,255,255,0.2)' : '#fff',
                border: i === 3 ? 'none' : '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 500,
                color: i === 3 ? NAVY : '#fff'
              }}>
                {i < 3 ? '✓' : '4'}
              </div>
              <span style={{ fontSize: 12, color: i === 3 ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: i === 3 ? 500 : 400 }}>
                {steg}
              </span>
              {i < 3 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />}
            </div>
          ))}
        </div>

        {/* Hero */}
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 32px 36px' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>
            Din studieplan
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 500, color: '#fff', marginBottom: 4 }}>
            {amne || 'Laddar...'}
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{teknik}</p>

          {/* Progressbar */}
          {plan && (
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>
                <span>Din progress</span>
                <span>{klaradeAntal} av {totaltAntalMoment} klara</span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.15)' }}>
                <div style={{ height: 6, background: '#fff', width: `${progress}%`, transition: 'width 0.3s ease' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VIT SEKTION — Planen */}
      <div style={{ background: '#fff', padding: '32px 32px 64px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>

          {laddar && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#888' }}>
              <div style={{ fontSize: 14, marginBottom: 8 }}>Skapar din studieplan...</div>
              <div style={{ fontSize: 12, color: '#bbb' }}>Detta tar några sekunder</div>
            </div>
          )}

          {fel && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#c00' }}>
              <div style={{ fontSize: 14 }}>{fel}</div>
            </div>
          )}

          {plan && plan.sessioner.map((session, si) => (
            <div key={si} style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: NAVY, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12 }}>
                {session.titel}
              </div>
              {session.moment.map((moment, mi) => {
                const key = `${si}-${mi}`;
                const klar = klarade[key];
                return (
                  <div
                    key={mi}
                    onClick={() => toggleMoment(key)}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: '14px 0',
                      borderBottom: '0.5px solid #eee',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 18, height: 18,
                      border: klar ? 'none' : '1px solid #ccc',
                      background: klar ? NAVY : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 2,
                      fontSize: 10, color: '#fff',
                    }}>
                      {klar ? '✓' : ''}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: klar ? '#aaa' : '#111', textDecoration: klar ? 'line-through' : 'none', marginBottom: 3 }}>
                        {moment.titel}
                      </div>
                      <div style={{ fontSize: 12, color: klar ? '#ccc' : '#777', lineHeight: 1.5 }}>
                        {moment.beskrivning}
                      </div>
                      <div style={{ fontSize: 11, color: '#bbb', marginTop: 4 }}>⏱ {moment.tid}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PlanPage() {
  return (
    <Suspense fallback={<div style={{ padding: 32, fontFamily: 'Inter, sans-serif', color: '#888' }}>Laddar...</div>}>
      <PlanContent />
    </Suspense>
  );
}
