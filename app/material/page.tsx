'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const NAVY = '#0F2D52';

export default function MaterialPage() {
  const [valt, setValt] = useState<'upload' | 'ai' | null>(null);
  const [fil, setFil] = useState<File | null>(null);
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
                background: i < 2 ? 'rgba(255,255,255,0.2)' : i === 2 ? '#fff' : 'transparent',
                border: i === 2 ? 'none' : '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 500,
                color: i === 2 ? NAVY : i < 2 ? '#fff' : 'rgba(255,255,255,0.4)'
              }}>
                {i < 2 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: 12, color: i === 2 ? '#fff' : 'rgba(255,255,255,0.4)', fontWeight: i === 2 ? 500 : 400 }}>
                {steg}
              </span>
              {i < 3 && <div style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.2)' }} />}
            </div>
          ))}
        </div>

        {/* Hero */}
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '40px 32px 48px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 14 }}>
            Steg 3 av 4
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 500, color: '#fff', marginBottom: 8, letterSpacing: '-0.4px' }}>
            Hur hämtar vi ditt material?
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            Ladda upp egna anteckningar eller låt AI hitta rätt material åt dig.
          </p>
        </div>
      </div>

      {/* VIT SEKTION */}
      <div style={{ background: '#fff', padding: '36px 32px 48px' }}>

        {/* Två alternativ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 680, margin: '0 auto 24px' }}>
          <div
            onClick={() => setValt('upload')}
            style={{
              border: valt === 'upload' ? `2px solid ${NAVY}` : '0.5px solid #ddd',
              padding: '28px 24px',
              background: '#fff',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 28, color: NAVY, marginBottom: 14 }}>↑</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#111', marginBottom: 6 }}>Ladda upp eget material</div>
            <div style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>PDF, anteckningar eller text. AI anpassar planen efter ditt innehåll.</div>
          </div>
          <div
            onClick={() => setValt('ai')}
            style={{
              border: valt === 'ai' ? `2px solid ${NAVY}` : '0.5px solid #ddd',
              padding: '28px 24px',
              background: '#fff',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 28, color: NAVY, marginBottom: 14 }}>⊙</div>
            <div style={{ fontSize: 15, fontWeight: 500, color: '#111', marginBottom: 6 }}>AI hämtar material</div>
            <div style={{ fontSize: 12, color: '#777', lineHeight: 1.5 }}>AI söker upp relevant och pålitligt material baserat på ditt ämne.</div>
          </div>
        </div>

        {/* Upload-yta — visas bara om "upload" är valt */}
        {valt === 'upload' && (
          <div style={{ maxWidth: 680, margin: '0 auto 24px' }}>
            <label style={{
              display: 'block',
              border: '1.5px dashed #ccc',
              padding: '40px 32px',
              textAlign: 'center',
              cursor: 'pointer',
            }}>
              <input
                type="file"
                accept=".pdf,.txt,.docx"
                style={{ display: 'none' }}
                onChange={(e) => setFil(e.target.files?.[0] || null)}
              />
              {fil ? (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: NAVY, marginBottom: 4 }}>📄 {fil.name}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>Klicka för att byta fil</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>Dra och släpp din fil här, eller</div>
                  <div style={{ display: 'inline-block', padding: '10px 20px', border: `0.5px solid ${NAVY}`, color: NAVY, fontSize: 13 }}>
                    Välj fil från datorn
                  </div>
                  <div style={{ fontSize: 11, color: '#bbb', marginTop: 12 }}>PDF, .txt eller .docx — max 20 MB</div>
                </div>
              )}
            </label>
          </div>
        )}

        {/* AI-info — visas om "ai" är valt */}
        {valt === 'ai' && (
          <div style={{ maxWidth: 680, margin: '0 auto 24px', padding: '20px 24px', background: '#f5f7fa', border: '0.5px solid #ddd' }}>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>
              AI kommer söka upp pålitliga källor och sammanställa studiematerial baserat på ämnet du angav. Du behöver inte göra något mer.
            </div>
          </div>
        )}

        {/* Fortsätt-knapp */}
        <div style={{ maxWidth: 680, margin: '0 auto', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => {
              if (valt === 'ai' || (valt === 'upload' && fil)) {
                router.push('/plan');
              }
            }}
            style={{
              padding: '12px 28px',
              background: (valt === 'ai' || (valt === 'upload' && fil)) ? NAVY : '#ccc',
              color: '#fff',
              fontSize: 14, fontWeight: 500,
              border: 'none',
              cursor: (valt === 'ai' || (valt === 'upload' && fil)) ? 'pointer' : 'not-allowed',
            }}
          >
            Skapa min studieplan →
          </button>
        </div>
      </div>
    </div>
  );
}
