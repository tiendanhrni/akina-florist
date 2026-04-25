'use client'
export default function DraftModeBanner() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 99999,
      background: '#f0c040',
      color: '#1a1a1a',
      fontSize: '13px',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      padding: '8px 1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <span>🔍 Đang xem bản nháp (Draft Preview)</span>
      <a href="/api/disable-draft" style={{
        background: '#1a1a1a',
        color: '#fff',
        padding: '4px 14px',
        borderRadius: '4px',
        fontSize: '12px',
        textDecoration: 'none'
      }}>Thoát preview</a>
    </div>
  )
}
