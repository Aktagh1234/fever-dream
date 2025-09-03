const lenis = new Lenis({
   duration: 3.5,
  easing: (t) => 1 - Math.pow(2, -10 * t),
  smoothWheel: true,
  smoothTouch: true,
})

// RAF loop
function raf(time) {
  lenis.raf(time)
  ScrollTrigger.update() // keep ScrollTrigger synced
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

gsap.registerPlugin(ScrollTrigger)

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".zoom-stack",
        start: "top top",
        end: "+=1200%",
        scrub: true,
        pin: true,
        // markers: true,
    }
})

// Phase 1: Gate + Tree zooms out
tl.to([".gate-wrapper img", ".tree-wrapper img"], {
    scale: 10,
    opacity: 0,
    transformOrigin: "center center",
    ease: "power1.inOut",
    duration: 1
}, 0)

// Phase 2: After-gate scrolls down
tl.to(".after-wrapper img", {
    yPercent: -66,   // scroll through tall image
    ease: "none",
    duration: 2
}, ">")

// Phase 3: Camera moves into the cave (zoom + pan right)
tl.to(".after-wrapper img", {
    scale: 3.5,         // zoom a bit more
    xPercent: -125,      // move further right
    yPercent: -125,     
    transformOrigin: "center center",
    ease: "power2.inOut",
    duration: 2
}, ">")

// Phase 4: Fake "cave entry" → fade to inside scene
tl.to(".ocean-image", {
    opacity: 1,
    scale: 1.05,  // subtle zoom for depth
    ease: "power2.inOut",
    duration: 2
}, ">");

tl.to(".inside-rock-image", {
    opacity: 1,
    scale: 1.1,       // subtle zoom forward
    ease: "power2.inOut",
    duration: 2
}, "<"); // sync with ocean

tl.to(".after-wrapper img", {
    opacity: 0,       // fade out after-gate once inside is visible
    duration: 1
}, "<")  // overlap a bit so transition is smooth

// Vignette fade in
tl.to(".vignette", {
    opacity: 1,
    duration: 2,
    ease: "power2.inOut"
}, "<")

// --- Mouse parallax for tree ---
document.addEventListener("mousemove", (e) => {
  // Get normalized mouse position (-0.5 to +0.5)
  const x = (e.clientX / window.innerWidth - 0.5) * 2; 
  const y = (e.clientY / window.innerHeight - 0.5) * 2; 

  // Apply parallax to the tree image
  gsap.to(".tree-wrapper img", {
    x: x * 20,   // move left/right up to 30px
    y: y * 20,   // move up/down up to 15px
    ease: "power2.out",
    duration: 0.6
  });
});

// Phase 5: Dive through inside cave → reveal ocean
tl.to(".inside-rock-image", {
    scale: 6,            // zoom deep in
    yPercent: -120,      // push downward into the ocean
    transformOrigin: "center center",
    ease: "power2.inOut",
    duration: 3
}, ">");

tl.to(".inside-rock-image", {
    opacity: 0,          // fade cave away once we’re “through” it
    duration: 1.2,
    ease: "power1.out"
}, ">-0.8"); // overlap fade with end of zoom

// Ocean stays visible (revealed fully)
tl.to(".ocean-image", {
    scale: 1,            // reset to normal scale
    ease: "power2.out",
    duration: 2
}, "<");
