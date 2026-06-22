import { gsap } from 'gsap';

interface RotatingTextProps {
  element: HTMLElement;
  // items: string[];
  // exitY?: number;
  // enterY?: number;
  displayDuration?: number;
}

export function rotatingText({
  element,
  displayDuration = 2,
}: RotatingTextProps) {
  const items = element.children;

  if (!items.length) return;

  const itemHeight =
    (items[0] as HTMLElement).offsetHeight;

  const tl = gsap.timeline({
    repeat: -1,
  });

  for (let i = 1; i < items.length; i++) {
    tl.to(element, {
      y: -(itemHeight * i),
      duration: 0.6,
      ease: "power2.inOut",
    });


    tl.to({}, { duration: displayDuration });
  }

  tl.set(element, {
    y: 0,
  });

  return tl;
}

// export function rotatingText({
//   element,
//   items,
//   exitY = -30,
//   enterY = 30,
//   displayDuration = 2,
// }: RotatingTextProps) {
//   let index = 0;

//   const tl = gsap.timeline({
//     repeat: -1,
//   });

//   items.forEach(() => {
//     tl.to(element, {
//       y: exitY,
//       opacity: 0,
//       duration: 0.5,
//       onComplete: () => {
//         index = (index + 1) % items.length;
//         element.textContent = items[index];
//       },
//     });

//     tl.fromTo(
//       element,
//       {
//         y: enterY,
//         opacity: 0,
//       },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 0.5,
//       }
//     );

//     tl.to({}, { duration: displayDuration });
//   });

//   return tl;
// }


// import { gsap } from "gsap";

// interface RotatingTextProps {
//   element: HTMLElement;
//   items: string[];
//   displayDuration: number;
// }

// export function rotatingText({ element, displayDuration = 2 }: RotatingTextProps) {
//   // 1. Target all the span elements inside the wrapper
//   const targets = element.children;
//   if (!targets.length) return null;

//   // 2. Set the initial state: stack all items absolutely on top of each other
//   // and push them downward out of view.
//   gsap.set(targets, { 
//     position: "absolute", 
//     y: "100%", 
//     opacity: 0 
//   });

//   // 3. Create an infinite repeating master timeline
//   const mainTl = gsap.timeline({ repeat: -1 });

//   // 4. Build a clean staggering sequence loop
//   // Total time per phrase = display duration + animation duration
//   const animDuration = 0.5; 
//   const totalStepTime = displayDuration + animDuration;

//   Array.from(targets).forEach((target, index) => {
//     const itemTl = gsap.timeline();
    
//     itemTl
//       // A. Slide IN from bottom to center
//       .to(target, {
//         y: "0%",
//         opacity: 1,
//         duration: animDuration,
//         ease: "power2.out"
//       })
//       // B. Hold visible for the requested display duration
//       .to({}, { duration: displayDuration })
//       // C. Slide OUT from center to top
//       .to(target, {
//         y: "-100%",
//         opacity: 0,
//         duration: animDuration,
//         ease: "power2.in"
//       })
//       // D. Instant Reset: Snap it back to the bottom instantly so it's ready to slide up again next round
//       .set(target, { 
//         y: "100%" 
//       });

//     // Add this individual item's timeline to the master timeline,
//     // offsetting each one so they follow right after another.
//     mainTl.add(itemTl, index * totalStepTime);
//   });

//   return mainTl;
// }