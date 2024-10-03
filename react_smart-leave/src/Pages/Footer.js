import React from 'react'

export default function Footer() {
  return (
    <div className="row footer">

{/* <!-- Footer --> */}
<footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#3e4551' }}>

  {/* <!-- Grid container --> */}
  <div class="p-4 pb-0">
    {/* <!-- Section: Links --> */}
    <section class="">
      {/* <!--Grid row--> */}
      <div class="row">
        {/* <!--Grid column--> */}
        <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">FOOTER CONTENT</h5>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Molestiae modi cum ipsam ad, illo possimus laborum ut
            reiciendis obcaecati. Ducimus, quas. Corrupti, pariatur eaque?
            Reiciendis assumenda iusto sapiente inventore animi?
          </p>
        </div>
        {/* <!--Grid column--> */}

        {/* <!--Grid column--> */}
        <div class="col-lg-2 col-md-6 mb-4 mb-md-0">
          <h5 class="text-uppercase">Links</h5>

          <ul class="list-unstyled mb-0">
            <li>
              <a href="#!" class="text-white">Link 1</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 2</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 3</a>
            </li>
            <li>
              <a href="#!" class="text-white">Link 4</a>
            </li>
          </ul>
        </div>
        {/* <!--Grid column--> */}

        {/* <!-- Repeat the grid columns for more links... --> */}

      </div>
      {/* <!--Grid row--> */}
    </section>
    {/* <!-- Section: Links --> */}

    <hr class="mb-4" />

    {/* <!-- Section: CTA --> */}
    <section class="">
      <p class="d-flex justify-content-center align-items-center">
        <span class="me-3">Register for free</span>
        <button type="button" class="btn btn-outline-light btn-rounded">
          Sign up!
        </button>
      </p>
    </section>
    {/* <!-- Section: CTA --> */}

    <hr class="mb-4" />

    {/* <!-- Section: Social media --> */}
    <section class="mb-4 text-center">
      {/* <!-- Facebook --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-facebook-f"></i
        ></a>

      {/* <!-- Twitter --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-twitter"></i
        ></a>

      {/* <!-- Google --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-google"></i
        ></a>

      {/* <!-- Instagram --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-instagram"></i
        ></a>

      {/* <!-- Linkedin --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-linkedin-in"></i
        ></a>

      {/* <!-- Github --> */}
      <a
         class="btn btn-outline-light btn-floating m-1"
         href="#!"
         role="button"
         ><i class="fab fa-github"></i
        ></a>
    </section>
    {/* <!-- Section: Social media --> */}
  </div>
  {/* <!-- Grid container --> */}

  {/* <!-- Copyright --> */}
  <div className="container-fluid p-0">
  <div
       className="text-center p-3"
       style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}

       >
    © 2024 Copyright :
    <a class="text-white" href="Start/">
      smartLeave.com</a>
  </div>
  </div>
  {/* <!-- Copyright --> */}
</footer>
{/* <!-- Footer --> */}


</div>

  )
}
