import React from 'react'

const TRUST_ITEMS = [
  {
    icon: 'fa-solid fa-shield-check',
    title: 'Agen Resmi & Terpercaya',
    desc: 'Terdaftar resmi di Kemenparekraf dengan izin usaha lengkap.',
  },
  {
    icon: 'fa-solid fa-headset',
    title: 'Layanan 24/7',
    desc: 'Tim kami siap membantu Anda kapan saja sebelum, selama, dan setelah perjalanan.',
  },
  {
    icon: 'fa-solid fa-tags',
    title: 'Harga Terbaik',
    desc: 'Jaminan harga kompetitif tanpa biaya tersembunyi.',
  },
  {
    icon: 'fa-solid fa-route',
    title: 'Itinerary Fleksibel',
    desc: 'Paket perjalanan bisa disesuaikan dengan kebutuhan Anda.',
  },
  {
    icon: 'fa-solid fa-users-gear',
    title: 'Pemandu Berpengalaman',
    desc: 'Tour guide lokal profesional yang mengenal destinasi dengan baik.',
  },
  {
    icon: 'fa-solid fa-credit-card',
    title: 'Pembayaran Mudah',
    desc: 'Transfer bank, e-wallet, atau cicilan — pilih yang paling nyaman.',
  },
]

const WhyBookWithUs = () => {
  return (
    <div className="activities-card" style={{ padding: '24px 20px' }}>
      <h4 style={{ fontWeight: 700, marginBottom: 16, fontSize: '1.1rem' }}>
        Kenapa Pilih Tanoraya?
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(242, 101, 34, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <i className={item.icon} style={{ color: 'var(--theme-color, #f26522)', fontSize: 16 }} />
            </div>
            <div>
              <h6 style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>{item.title}</h6>
              <p style={{ fontSize: '0.8rem', color: '#777', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyBookWithUs
