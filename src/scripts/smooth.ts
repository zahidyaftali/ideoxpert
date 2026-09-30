// Smooth scrolling (Lenis) driven by GSAP's ticker, so ScrollTrigger and the
// scroll position always update in the same frame. Imported by the header and
// the motion script; bundling makes it a single shared instance.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const lenis = reducedMotion
	? null
	: new Lenis({
			lerp: 0.15,
			anchors: { offset: -110 },
			// Nested scroll areas (mobile drawer) keep native scrolling.
			prevent: (node) => node.closest?.('[data-drawer]') != null,
		});

if (lenis) {
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
