gsap.registerPlugin(ScrollTrigger)

//timeline to control the scroll animation
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".zoom-stack",
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        //markers: true,
    }
})

//top image zooms out, fades and blurs
tl.to(".enter-gate-image",{
    scale: 10,
    z: 350,
    transformOrigin: 'center center',
    ease: "power1.inOut",
},0)

//bottom image zooms in
tl.to(".after-gate-image",{
    scale: 1.1,
    transformOrigin: 'center center',
    ease: "power1.inOut",
},0)

//glitter effect using particles.js
