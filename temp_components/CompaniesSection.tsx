export default function CompaniesSection() {
    const companies = [
      { name: 'Amazon', img: '/images/amazon.png' },
      { name: 'Google', img: '/images/google.jpg' },
      { name: 'Microsoft', img: '/images/microsoft.jpg' },
      { name: 'TCS', img: '/images/tcs.jpg' },
      { name: 'Wipro', img: '/images/wipro.jpeg' },
      { name: 'Cognizant', img: '/images/cognizant.jpeg' },
      { name: 'Kaar Technologies', img: '/images/kaar.jpeg' },
      { name: 'Capgemini', img: '/images/capegemini.jpg' },
      { name: 'Accenture', img: '/images/accenture.jpeg' },
      { name: 'HCL', img: '/images/hcl.png' },
      { name: 'Tech Mahindra', img: '/images/mahindra.png' },
    ];
  
    return (
      <section className="placed-students">
        <div className="container">
          <h2 className="section-title">Companies in which our students are placed</h2>
          <div className="students-grid">
            {companies.map((company, index) => (
              <div key={index} className="student-card">
                <img src={company.img} alt={company.name} />
                <p>{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }