// src/components/organisms/09.MenuSection/hooks/useMenuTabs.ts
  // Animated underline position — mirrors the submitted component's approach
import { useEffect, useRef, useState } from 'react';

export function useMenuTabs(activeTabIdx: number) {
  const [sliderStyle, setSliderStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const activeEl = tabsRef.current[activeTabIdx];
    const containerEl = tabsContainerRef.current;
    if (!activeEl || !containerEl) return;

    requestAnimationFrame(() => {
      setSliderStyle({ left: activeEl.offsetLeft, width: activeEl.clientWidth });

      // Centre the active tab inside the scrollable container strip
      const targetScroll =
        activeEl.offsetLeft - containerEl.clientWidth / 2 + activeEl.clientWidth / 2;
      containerEl.scrollTo({ left: targetScroll, behavior: 'smooth' });
    });
  }, [activeTabIdx]);

  return {
    sliderStyle,
    tabsContainerRef,
    tabsRef,
  };
}


// Version 2
// export function useMenuTabs() {
//   const [activeTab, setActiveTab] = useState(0);

//   const [sliderStyle, setSliderStyle] = useState({
//     left: 0,
//     width: 0,
//   });

//   const tabsContainerRef = useRef<HTMLDivElement>(null);
//   const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

//   useEffect(() => {
//     const activeTabEl = tabsRef.current[activeTab];
//     const containerEl = tabsContainerRef.current;

//     if (!activeTabEl || !containerEl) return;

//     requestAnimationFrame(() => {
//       setSliderStyle({
//         left: activeTabEl.offsetLeft,
//         width: activeTabEl.clientWidth,
//       });

//       const targetScroll =
//         activeTabEl.offsetLeft -
//         containerEl.clientWidth / 2 +
//         activeTabEl.clientWidth / 2;

//       containerEl.scrollTo({
//         left: targetScroll,
//         behavior: 'smooth',
//       });
//     });
//   }, [activeTab]);

//   return {
//     activeTab,
//     setActiveTab,
//     sliderStyle,
//     tabsContainerRef,
//     tabsRef,
//   };
// }