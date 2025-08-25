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

// Phase 1: Gate zooms out
tl.to(".gate-wrapper img", {
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
tl.to(".inside-rock-image", {
    opacity: 1,
    scale: 1.1,       // subtle zoom forward
    ease: "power2.inOut",
    duration: 2
}, ">")

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