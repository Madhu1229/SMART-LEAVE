import React from 'react'

export default function Footer() {
  return (
    <div className="row footer">
      {/* Footer */}
      <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#022B23' }}>
        {/* Grid container */}
        <div className="p-4 pb-0">
          {/* Section: Links */}
          <section className="">
            {/* Grid row */}
            <div className="row text-center text-md-left">
              {/* Government Section */}
              <div className="col-lg-4 col-md-6 mb-4">
                <h5 className="text-uppercase text-start">Government</h5>
                <ul className="list-unstyled mb-0 text-start">
                  <li><a href="https://www.president.gov.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>President of Sri Lanka</a></li>
                  <li><a href="https://www.pmdnews.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>President’s News</a></li>
                  <li><a href="https://www.presidentsoffice.gov.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Presidential Secretariat</a></li>
                  <li><a href="https://www.defence.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Ministry of Defence</a></li>
                  <li><a href="https://www.dgi.gov.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Department of Government Information</a></li>
                  <li><a href="https://www.ocds.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Office of the Chief of Defence Staff</a></li>
                </ul>
              </div>

              {/* Defence Section */}
              <div className="col-lg-4 col-md-6 mb-4">
                <h5 className="text-uppercase text-start">Defence</h5>
                <ul className="list-unstyled mb-0 text-start">
                  <li><a href="https://www.navy.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Sri Lanka Navy</a></li>
                  <li><a href="https://airforce.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Sri Lanka Air Force</a></li>
                  <li><a href="https://alt.army.lk/slavf/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Sri Lanka Army Volunteer Force</a></li>
                  <li><a href="https://kdu.ac.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Kotelawala Defence University</a></li>
                  <li><a href="https://dscsc.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Defence Services Command & Staff College</a></li>
                  <li><a href="https://www.csd.lk/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Civil Security Department</a></li>
                </ul>
              </div>

              {/* Welfare Section */}
              <div className="col-lg-4 col-md-6 mb-4">
                <h5 className="text-uppercase text-start">Welfare</h5>
                <ul className="list-unstyled mb-0 text-start">
                  <li><a href="https://alt.army.lk/doo/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Directorate of Overseas Operations</a></li>
                  <li><a href="https://alt.army.lk/sevavanitha/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Sri Lanka Army Seva Vanitha Unit</a></li>
                  <li><a href="https://alt.army.lk/dabf/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Army Benevolent Fund</a></li>
                  <li><a href="https://alt.army.lk/rrc/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Ranaviru Resource Centre</a></li>
                  <li><a href="https://alt.army.lk/welfare/si" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Directorate of Welfare</a></li>
                  <li><a href="https://veteransjobbank.army.lk/login" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>Veterans Job Bank</a></li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="mb-4" />

          {/* Social Media Links */}
          <section className="mb-4 text-center">
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-google"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        {/* Copyright */}
        <div className="container-fluid p-0">
          <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            © 2024 Copyright:
            <a href="/" style={{ textDecoration: 'none', color: 'white' }} onMouseEnter={(e) => e.target.style.color = '#9E2A2F'} onMouseLeave={(e) => e.target.style.color = 'white'}>SMART-LEAVE</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
