function init() {
  const slides = document.querySelectorAll(".btnscrl");
  const pages = document.querySelectorAll(".home");
  const backgrounds = [
    `radial-gradient(#4E3022, #161616)`,
    `radial-gradient(#2B3760, #0B1023)`,
    `radial-gradient(#4E4342, #161616)`,
    `radial-gradient(#3a9194, #2b262c)`
  ];
  let current = 0;
  slides.forEach((btnscrl, index) => {
    btnscrl.addEventListener("click", function() {
      changeDots(this);
      nextSlide(index);
      scrollSlide = index;
    });
  });
  function changeDots(dot) {
    slides.forEach(btnscrl => {
      btnscrl.classList.remove("initial");
    });
    dot.classList.add("initial");
  }
  function nextSlide(pageNumber) {
    const nextPage = pages[pageNumber];
    const currentPage = pages[current];
    const nextLeft = nextPage.querySelector(".hero .home-left");
    const nextRight = nextPage.querySelector(".hero .home-right");
    const currentLeft = currentPage.querySelector(".hero .home-left");
    const currentRight = currentPage.querySelector(".hero .home-right");
    const nextText = nextPage.querySelector(".dtls");
    const portofolio = document.querySelector(".whole");
    const tl = new TimelineMax({
      onStart: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none";
        });
      },
      onComplete: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all";
        });
      }
    });
    tl.fromTo(currentLeft, 0.3, { y: "-10%" }, { y: "-100%" })
      .fromTo(currentRight, 0.3, { y: "10%" }, { y: "-100%" }, "-=0.2")
      .to(portofolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
      .fromTo(
        currentPage,
        0.3,
        { opacity: 1, pointerEvents: "all" },
        { opacity: 0, pointerEvents: "none" }
      )
      .fromTo(
        nextPage,
        0.3,
        { opacity: 0, pointerEvents: "none" },
        { opacity: 1, pointerEvents: "all" },
        "-=0.6"
      )
      .fromTo(nextLeft, 0.3, { y: "-100%" }, { y: "-10%" }, "-=0.6")
      .fromTo(nextRight, 0.3, { y: "-100%" }, { y: "10%" }, "-=0.8")
      .fromTo(nextText, 0.3, { opacity: 0, y: 0 }, { opacity: 1, y: 0 })
      .set(nextLeft, { clearProps: "all" })
      .set(nextRight, { clearProps: "all" });
    current = pageNumber;
  }  
}
init();