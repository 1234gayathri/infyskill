export default function VideoTestimonials() {
    return (
      <section className="student-videos">
        <div className="container">
          <h2 className="section-title">Student Success Stories</h2>
          <div className="video-grid">
            <div className="video-card">
              <div className="video-wrapper">
                <iframe src="https://www.youtube.com/embed/kwu6dCGOwj4" frameBorder="0" allowFullScreen></iframe>
              </div>
              <h3>Student Experience</h3>
              <p><b>Hear from our students about their learning journey</b></p>
            </div>
            
            <div className="video-card">
              <div className="video-wrapper">
                <iframe src="https://www.youtube.com/embed/f8jqpPLoXWo" frameBorder="0" allowFullScreen></iframe>
              </div>
              <h3>Placement Success</h3>
              <p><b>See how our training helped students get placed</b></p>
            </div>
          </div>
        </div>
      </section>
    );
  }