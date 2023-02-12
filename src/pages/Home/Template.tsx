import { FC, useEffect, useState } from 'react';
import { useResponsiveValue } from '../../components/MintOverlay/utils/useResponsiveValue';

type TemplateProps = {
  offsetBottom?: {
    desktop: number;
    tablet: number;
    mobile: number;
  };
};
export const Template: FC<TemplateProps> = ({ offsetBottom }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const paddingBottom = useResponsiveValue(offsetBottom || { desktop: 0, tablet: 0, mobile: 0 });

  useEffect(() => {
    // @ts-ignore
    window.openPage(1);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setOpenPopup(true);
  //   }, 1000);
  // }, [setOpenPopup]);

  return (
    <div style={{ paddingBottom }}>
      <video autoPlay muted loop id="bg-video">
        <source src="video/gfp-astro-timelapse.mp4" type="video/mp4" />
      </video>
      <div className="page-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <div className="cd-slider-nav">
                <nav className="navbar navbar-expand-lg" id="tm-nav">
                  <a className="navbar-brand" href="#">
                    Starknet City
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbar-supported-content"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="collapse navbar-collapse" id="navbar-supported-content">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                      <li className="nav-item selected">
                        <a className="nav-link" aria-current="page" href="#0" data-no={1}>
                          Home
                        </a>
                        <div className="circle" />
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#0" data-no={2}>
                          Gallery
                        </a>
                        <div className="circle" />
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#0" data-no={3}>
                          About
                        </a>
                        <div className="circle" />
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid tm-content-container">
          <ul className="cd-hero-slider mb-0 py-5">
            <li className="px-3" data-page-no={1}>
              <div className="page-width-1 mx-auto">
                <div className="position-relative tm-border-top tm-border-bottom intro-container">
                  <div className='mb-4'>
                    <img src="/img/popup.jpeg" alt="" className='w-100' />
                  </div>
                  <div className="row">
                    <div className="col-sm-7">
                      <p className="mb-4 mt-4">
                        Starknet City is a multi-functional NFT Collection built on Starknet with
                        the ultimate goal to bridge the gap between high quality art & blockchain
                        technologies
                      </p>
                      <p className="mb-4">
                        Collect our NFT characters, unlock a proportion of income revenue and
                        staking rewards.
                      </p>
                    </div>
                    <div className="col-sm-5">
                      <img
                        src="img/home-img-1.jpg"
                        alt="Image"
                        className="img-fluid intro-img-1 w-100"
                      />
                      <br />
                      <br />
                    </div>
                    <div className="col-sm-5">
                      <img
                        src="img/home-img-3.jpg"
                        alt="Image"
                        className="img-fluid intro-img-1 w-100"
                      />
                      <br />
                      <br />
                    </div>
                    <div className="col-sm-7">
                      <p className="mb-4 mt-4">
                        In our city, you will have properties such as lands, weapons, vehicles, and
                        skins,... Use them to complete our missions. The higher level of the mission
                        is completed, the more you'll earn from Starknet City.
                      </p>
                      <p className="mb-4">
                        More than that you can join any Gangs that you like or maybe just build your
                        own Gang. Build your Gang, grow your small community, and complete missions
                        together.
                      </p>
                    </div>
                    <div className="col-sm-7">
                      <p className="mb-4 mt-4">
                        DAO voting connects the community at the forefront of development where
                        players own the platform and decide its future.
                      </p>
                      <p className="mb-4">More to be unlocked as the journey continues.</p>
                    </div>
                    <div className="col-sm-5">
                      <img
                        src="img/home-img-4.jpg"
                        alt="Image"
                        className="img-fluid intro-img-1 w-100"
                      />
                      <br />
                      <br />
                    </div>
                  </div>
                  <div className="circle intro-circle-1" />
                  <div className="circle intro-circle-2" />
                  <div className="circle intro-circle-3" />
                  <div className="circle intro-circle-4" />
                </div>
                <div className="text-center">
                  <a
                    href="#0"
                    data-page-no={2}
                    className="btn btn-primary tm-intro-btn tm-page-link"
                  >
                    View Gallery
                  </a>
                </div>
              </div>
            </li>
            <li data-page-no={2}>
              {/* Image Carousel */}
              <div className="mx-auto position-relative gallery-container">
                <div className="circle intro-circle-1" />
                <div className="circle intro-circle-2" />
                <div className="mx-auto tm-border-top gallery-slider">
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-01.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-02.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-03.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-04.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-05.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-06.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-07.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-08.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                  <figure className="effect-julia item">
                    <img src="img/gallery-img-09.jpg" alt="Image" />
                    <figcaption>
                      <div>
                        <p>Julia dances in the deep dark</p>
                      </div>
                      <a href="#">View more</a>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </li>
            <li data-page-no={3} className="px-3">
              <div className="position-relative page-width-1 page-right tm-border-top tm-border-bottom">
                <div className="circle intro-circle-1" />
                <div className="circle intro-circle-2" />
                <div className="circle intro-circle-3" />
                <div className="circle intro-circle-4" />
                <div className="tm-bg-dark content-pad">
                  <h2 className="mb-4">About Starknet City</h2>
                  <p className="mb-4">
                    Starknet City is a multi-functional NFT Collection built on Starknet with the
                    ultimate goal to bridge the gap between high quality art & blockchain
                    technologies
                  </p>
                  <p className="mb-4">
                    Collect our NFT characters, unlock a proportion of income revenue and staking
                    rewards.
                  </p>
                  <p className="mb-4">
                    In our city, you will have properties such as lands, weapons, vehicles, and
                    skins,... Use them to complete our missions. The higher level of the mission is
                    completed, the more you'll earn from Starknet City.
                  </p>
                  <p className="mb-4">
                    More than that you can join any Gangs that you like or maybe just build your own
                    Gang. Build your Gang, grow your small community, and complete missions
                    together.
                  </p>
                  <p className="mb-4">
                    DAO voting connects the community at the forefront of development where players
                    own the platform and decide its future.
                  </p>
                  <p className="mb-0">More to be unlocked as the journey continues.</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="container-fluid">
          <footer className="row mx-auto tm-footer">
            <div className="col-md-6 px-0">Copyright 2023 StarkCity. All rights reserved.</div>
            <div className="col-md-6 px-0 tm-footer-right">Designed by StarkCity</div>
          </footer>
        </div>
      </div>
      <div className={`popup ${openPopup ? 'open' : ''}`}>
        <div className="overlay" onClick={() => setOpenPopup(false)}></div>
        <div className="box">
          <div className="close" onClick={() => setOpenPopup(false)}>
            X
          </div>
          <img src="/img/popup.jpeg" alt="" />
        </div>
      </div>
      <div id="loader-wrapper">
        <div id="loader" />
        <div className="loader-section section-left" />
        <div className="loader-section section-right" />
      </div>
    </div>
  );
};
