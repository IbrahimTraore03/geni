'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NAVY = '#0F2D52';

export default function Home() {
  const [input, setInput] = useState('');
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
          <span style={{ color: '#fff', fontWeight: 500, fontSize: 16 }}>Geni</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Om studieteknikerna</span>
        </nav>

        {/* Stegindikator */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, padding: '24px 32px 0' }}>
          {['Ämne', 'Teknik', 'Material', 'Plan'].map((steg, i) => (
            <div key={steg} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 22, height: 22,
                background: i === 0 ? '#fff' : 'transparent',
                border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 500,
                color: i === 0 ? NAVY : 'rgba(255,255,255,0.4)'
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 12, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: i === 0 ? 500 : 400 }}>
                {steg}
              </span>
              {i < 3 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />}
            </div>
          ))}
        </div>

        {/* Hero */}
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '56px 32px 64px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16 }}>
            Forskningsbaserat lärande
          </p>
          <h1 style={{ fontSize: 30, fontWeight: 500, color: '#fff', lineHeight: 1.25, marginBottom: 12, letterSpacing: '-0.5px' }}>
            Vilken ny kunskap vill du besitta?
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 36, lineHeight: 1.6 }}>
            Ange ett ämne så skapar vi en skräddarsydd studieplan baserad på beprövad forskning.
          </p>

          {/* Sökfält */}
          <div style={{ display: 'flex', border: '1.5px solid #fff' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="t.ex. Algebra Matte 2b gymnasienivå"
              style={{
                flex: 1, padding: '14px 16px', fontSize: 15,
                border: 'none', outline: 'none',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
              }}
            />
            <button
              onClick={() => input.trim() && router.push(`/teknik?amne=${encodeURIComponent(input.trim())}`)}
              style={{
                padding: '14px 24px',
                background: '#fff',
                color: NAVY,
                fontSize: 14, fontWeight: 500,
                border: 'none', cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
              Skapa studieplan →
            </button>
          </div>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 10, textAlign: 'left' }}>
            Exempel: "Spanska för nybörjare" · "Grunderna i Python" · "Biologi cell och genetik"
          </p>
        </div>
      </div>

      {/* VIT SEKTION — Teknikkort */}
      <div style={{ background: '#fff', padding: '40px 32px 56px' }}>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#999', marginBottom: 24 }}>
          De tre studieteknikerna vi använder
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 680, margin: '0 auto' }}>
          {[
            { num: '01', title: 'The Study Cycle', tag: 'Bäst som grund', desc: 'Strukturerar hela din studieprocess — vad du gör före, under och efter varje pass.' },
            { num: '02', title: 'Feynman-metoden', tag: 'Bäst för förståelse', desc: 'Förklara högt som för ett barn — avslöjar exakt vad du inte förstår.' },
            { num: '03', title: 'Spaced Retrieval', tag: 'Bäst för minne', desc: 'Repetitionsschema dag 1–3–7–14–30. Maximalt långtidsminne.' },
          ].map((kort) => (
            <div key={kort.num} style={{ border: '0.5px solid #ddd', padding: '20px', background: '#fff' }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: NAVY, letterSpacing: '1.5px', marginBottom: 10 }}>{kort.num}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#111', marginBottom: 6 }}>{kort.title}</div>
              <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5, marginBottom: 12 }}>{kort.desc}</div>
              <div style={{ display: 'inline-block', fontSize: 11, color: NAVY, border: `0.5px solid ${NAVY}`, padding: '3px 8px' }}>{kort.tag}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
