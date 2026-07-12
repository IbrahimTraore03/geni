'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NAVY = '#0F2D52';

const tekniker = [
  {
    num: '01',
    title: 'The Study Cycle',
    tid: '30–50 min/session',
    desc: 'Strukturerar hela din studieprocess — vad du gör före, under och efter varje pass.',
    tag: 'Bäst som grund',
  },
  {
    num: '02',
    title: 'Feynman-metoden',
    tid: '45–75 min/session',
    desc: 'Förklara högt som för ett barn — avslöjar exakt vad du inte förstår.',
    tag: 'Bäst för förståelse',
  },
  {
    num: '03',
    title: 'Spaced Retrieval',
    tid: '30 min/dag',
    desc: 'Repetitionsschema dag 1–3–7–14–30. Maximalt långtidsminne.',
    tag: 'Bäst för minne',
  },
];

export default function TeknikPage() {
  const [vald, setVald] = useState<number | null>(null);
  const router = useRouter();

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
                background: i === 0 ? 'rgba(255,255,255,0.2)' : i === 1 ? '#fff' : 'transparent',
                border: i === 1 ? 'none' : '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 500,
                color: i === 1 ? NAVY : i === 0 ? '#fff' : 'rgba(255,255,255,0.4)'
              }}>
                {i === 0 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 12, color: i === 1 ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: i === 1 ? 500 : 400 }}>
                {steg}
              </span>
              {i < 3 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />}
            </div>
          ))}
        </div>

        {/* Hero */}
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 32px 48px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>
            Steg 2 av 4
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 500, color: '#fff', marginBottom: 8, letterSpacing: '-0.4px' }}>
            Vilket sätt vill du lära dig på?
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            Välj den metod som passar dig bäst. Alla är bevisade av forskning.
          </p>
        </div>
      </div>

      {/* VIT SEKTION — Teknikkort */}
      <div style={{ background: '#fff', padding: '36px 32px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 680, margin: '0 auto 24px' }}>
          {tekniker.map((teknik, i) => (
            <div
              key={teknik.num}
              onClick={() => setVald(i)}
              style={{
                border: vald === i ? `2px solid ${NAVY}` : '0.5px solid #ddd',
                padding: '20px',
                background: '#fff',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 500, color: NAVY, letterSpacing: '1.5px', marginBottom: 10 }}>{teknik.num}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#111', marginBottom: 6 }}>{teknik.title}</div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{teknik.tid}</div>
              <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 12 }}>{teknik.desc}</div>
              <div style={{ display: 'inline-block', fontSize: 11, color: NAVY, border: `0.5px solid ${NAVY}`, padding: '3px 8px' }}>{teknik.tag}</div>
            </div>
          ))}
        </div>

        {/* Fortsätt-knapp */}
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => { if (vald !== null) router.push('/material'); }}
            style={{
              padding: '12px 28px',
              background: vald !== null ? NAVY : '#ccc',
              color: '#fff',
              fontSize: 14, fontWeight: 500,
              border: 'none',
              cursor: vald !== null ? 'pointer' : 'not-allowed',
            }}
          >
            Fortsätt →
          </button>
        </div>
      </div>
    </div>
  );
}
