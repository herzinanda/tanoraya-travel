export default function TourListLoading() {
  return (
    <section className="tour-section section-padding fix">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="row g-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="col-md-6">
                  <div
                    className="destination-card-items style-2"
                    style={{ background: '#f5f5f5', borderRadius: 8, overflow: 'hidden' }}
                  >
                    <div style={{ height: 200, background: '#e0e0e0' }} />
                    <div style={{ padding: '1rem' }}>
                      <div style={{ height: 20, background: '#e0e0e0', borderRadius: 4, marginBottom: 8 }} />
                      <div style={{ height: 14, width: '60%', background: '#e0e0e0', borderRadius: 4, marginBottom: 8 }} />
                      <div style={{ height: 16, width: '40%', background: '#e0e0e0', borderRadius: 4 }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-4">
            <div style={{ background: '#f5f5f5', borderRadius: 8, height: 400 }} />
          </div>
        </div>
      </div>
    </section>
  )
}
