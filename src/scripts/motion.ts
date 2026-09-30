// Site-wide interaction and motion. Everything here is opt-in through data
// attributes in the markup, and every effect has a static fallback: without
// JS, or with reduced motion, content is simply shown.
import { gsap, ScrollTrigger, lenis, reducedMotion } from './smooth';

const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
	[...root.querySelectorAll<T>(sel)];
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ------------------------------------------------------------------------
   Word splitting. Keeps inline markup (<b>, links, the green period) intact
   and wraps each word; [data-nosplit] children stay whole.
   ------------------------------------------------------------------------ */
function splitWords(root: HTMLElement) {
	let i = 0;
	const make = (content: string | Node) => {
		const outer = document.createElement('span');
		const inner = document.createElement('span');
		outer.className = 'w';
		inner.className = 'wi';
		inner.style.setProperty('--i', String(i++));
		inner.append(content);
		outer.append(inner);
		return outer;
	};
	const walk = (node: Node) => {
		for (const child of [...node.childNodes]) {
			if (child.nodeType === Node.TEXT_NODE) {
				const frag = document.createDocumentFragment();
				for (const part of (child.textContent ?? '').split(/(\s+)/)) {
					if (!part) continue;
					frag.append(/^\s+$/.test(part) ? document.createTextNode(' ') : make(part));
				}
				child.replaceWith(frag);
			} else if (child instanceof HTMLElement) {
				if (child.matches('[data-nosplit]')) {
					const placeholder = document.createComment('');
					child.replaceWith(placeholder);
					placeholder.replaceWith(make(child));
				} else if (!child.matches('br, svg, img')) {
					walk(child);
				}
			}
		}
	};
	walk(root);
	return i;
}

/* ------------------------------------------------------------------------
   Reveal on scroll
   ------------------------------------------------------------------------ */
function initReveals() {
	$$('[data-split]').forEach((el) => splitWords(el));

	// Children of a group get staggered delays unless they set their own.
	$$('[data-reveal-group]').forEach((group) => {
		const step = Number(group.dataset.revealGroup) || 60;
		$$('[data-reveal]', group).forEach((el, i) => {
			if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', String(i * step));
		});
	});

	const targets = $$('[data-reveal], [data-split], [data-bars]');
	if (reducedMotion || !('IntersectionObserver' in window)) {
		targets.forEach((el) => el.classList.add('is-in'));
		return;
	}
	// Chrome counts an element's own clip-path when computing intersections, so
	// a fully clipped element never "enters". Clip reveals watch their parent.
	const watched = new Map<Element, HTMLElement[]>();
	for (const el of targets) {
		const watch = el.dataset.reveal === 'clip' ? el.parentElement! : el;
		watched.set(watch, [...(watched.get(watch) ?? []), el]);
	}
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				watched.get(entry.target)?.forEach((el) => el.classList.add('is-in'));
				io.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -4% 0px', threshold: 0.08 },
	);
	watched.forEach((_, el) => io.observe(el));
}

/* ------------------------------------------------------------------------
   Count-up numbers. The markup holds the final value, so no-JS is correct.
   ------------------------------------------------------------------------ */
function initCounters() {
	const els = $$('[data-count]');
	if (reducedMotion || !els.length) return;
	const run = (el: HTMLElement) => {
		const target = Number(el.dataset.count);
		const decimals = (el.dataset.count!.split('.')[1] ?? '').length;
		const state = { v: 0 };
		gsap.to(state, {
			v: target,
			duration: 1.3,
			ease: 'power3.out',
			onUpdate: () => (el.textContent = state.v.toFixed(decimals)),
		});
	};
	els.forEach((el) => (el.textContent = (0).toFixed((el.dataset.count!.split('.')[1] ?? '').length)));
	const io = new IntersectionObserver(
		(entries) =>
			entries.forEach((e) => {
				if (!e.isIntersecting) return;
				run(e.target as HTMLElement);
				io.unobserve(e.target);
			}),
		{ threshold: 0.6 },
	);
	els.forEach((el) => io.observe(el));
}

/* ------------------------------------------------------------------------
   Marquees. Speed follows scroll velocity and direction follows the scroll;
   hovering eases the row down to a crawl.
   ------------------------------------------------------------------------ */
function initMarquees() {
	if (reducedMotion) return;
	$$('.marquee').forEach((el) => {
		const tracks = $$('.marquee__track', el);
		if (tracks.length < 2) return;
		el.classList.add('is-js');
		const base = (Number(el.dataset.speed) || 50) * (el.hasAttribute('data-reverse') ? 1 : -1);
		let width = tracks[0].offsetWidth;
		let x = 0;
		let hover = 1;
		let hoverTarget = 1;
		let visible = false;
		let dir = 1;
		new ResizeObserver(() => (width = tracks[0].offsetWidth)).observe(tracks[0]);
		new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(el);
		el.addEventListener('pointerenter', () => (hoverTarget = 0.15));
		el.addEventListener('pointerleave', () => (hoverTarget = 1));
		gsap.ticker.add((_, delta) => {
			if (!visible || !width) return;
			const velocity = lenis ? lenis.velocity : 0;
			if (velocity > 0.5) dir = 1;
			else if (velocity < -0.5) dir = -1;
			hover += (hoverTarget - hover) * 0.08;
			const boost = 1 + Math.min(Math.abs(velocity) * 0.12, 5);
			x += base * dir * boost * hover * (delta / 1000);
			if (x <= -width) x += width;
			if (x > 0) x -= width;
			const t = `translate3d(${x}px,0,0)`;
			tracks.forEach((tr) => (tr.style.transform = t));
		});
	});
}

/* ------------------------------------------------------------------------
   Spotlight hover. On a [data-spot-group] every card tracks the cursor, so
   borders of neighboring cards glow as the pointer passes near them.
   ------------------------------------------------------------------------ */
function initSpotlight() {
	if (!finePointer) return;
	const track = (cards: HTMLElement[], e: PointerEvent) => {
		for (const card of cards) {
			const r = card.getBoundingClientRect();
			card.style.setProperty('--mx', `${e.clientX - r.left}px`);
			card.style.setProperty('--my', `${e.clientY - r.top}px`);
		}
	};
	$$('[data-spot-group]').forEach((group) => {
		const cards = $$('.spot', group);
		group.addEventListener('pointermove', (e) => track(cards, e));
	});
	$$('[data-spot]').forEach((card) => {
		if (card.closest('[data-spot-group]')) return;
		card.addEventListener('pointermove', (e) => track([card], e));
	});
}

/* ------------------------------------------------------------------------
   Magnetic buttons
   ------------------------------------------------------------------------ */
function initMagnetic() {
	if (!finePointer || reducedMotion) return;
	$$('[data-magnetic]').forEach((el) => {
		const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
		const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
		el.addEventListener('pointermove', (e) => {
			const r = el.getBoundingClientRect();
			xTo((e.clientX - r.left - r.width / 2) * 0.22);
			yTo((e.clientY - r.top - r.height / 2) * 0.3);
		});
		el.addEventListener('pointerleave', () => {
			gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.45)' });
		});
	});
}

/* ------------------------------------------------------------------------
   Cursor label over project images: [data-cursor="View project"]
   ------------------------------------------------------------------------ */
function initCursorBubble() {
	const targets = $$('[data-cursor]');
	if (!finePointer || !targets.length) return;
	const bubble = document.createElement('div');
	bubble.className = 'cursor-bubble';
	bubble.setAttribute('aria-hidden', 'true');
	document.body.append(bubble);
	gsap.set(bubble, { x: -200, y: -200 });
	const xTo = gsap.quickTo(bubble, 'x', { duration: 0.45, ease: 'power3.out' });
	const yTo = gsap.quickTo(bubble, 'y', { duration: 0.45, ease: 'power3.out' });
	addEventListener('pointermove', (e) => {
		xTo(e.clientX);
		yTo(e.clientY);
	});
	targets.forEach((el) => {
		el.addEventListener('pointerenter', () => {
			bubble.textContent = el.dataset.cursor || 'View';
			bubble.classList.add('is-on');
		});
		el.addEventListener('pointerleave', () => bubble.classList.remove('is-on'));
	});
}

/* ------------------------------------------------------------------------
   Auto-advancing tabs with a progress bar per tab (hero work viewer,
   "what's holding you back", testimonials).
   ------------------------------------------------------------------------ */
function initAutoTabs() {
	$$('[data-autotabs]').forEach((root) => {
		const tabs = $$('[data-tab]', root);
		const panels = $$('[data-panel]', root);
		let index = Math.max(0, tabs.findIndex((t) => t.classList.contains('is-active')));
		const autoplay = !reducedMotion && root.dataset.autotabs !== 'manual';

		const show = (next: number, focus = false) => {
			index = (next + tabs.length) % tabs.length;
			tabs.forEach((t, i) => {
				const on = i === index;
				t.classList.toggle('is-active', on);
				t.setAttribute('aria-selected', String(on));
				t.tabIndex = on ? 0 : -1;
			});
			// A panel can name its tab with data-panel="2", so several sets of
			// panels (e.g. a URL bar and a screen) can follow the same tabs.
			panels.forEach((p, i) => {
				const on = (p.dataset.panel ? Number(p.dataset.panel) : i) === index;
				p.classList.toggle('is-active', on);
				p.setAttribute('aria-hidden', String(!on));
				p.inert = !on;
			});
			if (focus) tabs[index].focus();
			root.dispatchEvent(new CustomEvent('tabchange', { detail: index }));
		};

		tabs.forEach((tab, i) => {
			tab.addEventListener('click', () => show(i));
			tab.addEventListener('keydown', (e) => {
				const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
				if (e.key in keys) {
					e.preventDefault();
					show(index + keys[e.key], true);
				}
			});
			// The progress bar's CSS animation ending is what advances the tabs.
			tab.querySelector('.tab__bar i')?.addEventListener('animationend', () => autoplay && show(index + 1));
		});
		$$('[data-tab-prev]', root).forEach((b) => b.addEventListener('click', () => show(index - 1)));
		$$('[data-tab-next]', root).forEach((b) => b.addEventListener('click', () => show(index + 1)));
		// Other elements that select a tab when hovered or clicked (wheel wedges).
		$$('[data-tab-go]', root).forEach((el) => {
			const go = () => Number(el.dataset.tabGo) !== index && show(Number(el.dataset.tabGo));
			el.addEventListener('click', go);
			el.addEventListener('pointerenter', (e) => e.pointerType === 'mouse' && go());
		});

		if (autoplay) {
			root.classList.add('is-auto');
			const pause = (on: boolean) => root.classList.toggle('is-paused', on);
			new IntersectionObserver(([e]) => pause(!e.isIntersecting), { threshold: 0.25 }).observe(root);
			$$('[data-pause-on-hover]', root).forEach((el) => {
				el.addEventListener('pointerenter', () => pause(true));
				el.addEventListener('pointerleave', () => pause(false));
			});
			document.addEventListener('visibilitychange', () => pause(document.hidden));
		}
		show(index);
	});
}

/* ------------------------------------------------------------------------
   Horizontal carousels: native scroll-snap track, plus arrow buttons, a
   progress bar and mouse drag on desktop.
   ------------------------------------------------------------------------ */
function initCarousels() {
	$$('[data-carousel]').forEach((root) => {
		const track = root.querySelector<HTMLElement>('[data-carousel-track]');
		if (!track) return;
		const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
		const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
		const bar = root.querySelector<HTMLElement>('[data-carousel-bar]');
		const step = () => {
			const card = track.firstElementChild as HTMLElement | null;
			const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
			return card ? card.offsetWidth + gap : track.clientWidth * 0.8;
		};
		const update = () => {
			const max = track.scrollWidth - track.clientWidth;
			const p = max > 0 ? track.scrollLeft / max : 0;
			if (bar) bar.style.transform = `scaleX(${Math.max(0.08, p)})`;
			if (prev) prev.disabled = track.scrollLeft < 4;
			if (next) next.disabled = track.scrollLeft > max - 4;
		};
		prev?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
		next?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
		track.addEventListener('scroll', update, { passive: true });
		addEventListener('resize', update);
		update();

		// Drag with the mouse (touch already scrolls natively).
		let startX = 0;
		let startLeft = 0;
		let dragged = false;
		track.addEventListener('pointerdown', (e) => {
			if (e.pointerType !== 'mouse' || e.button !== 0) return;
			startX = e.clientX;
			startLeft = track.scrollLeft;
			dragged = false;
			track.classList.add('is-grabbing');
			const move = (ev: PointerEvent) => {
				const dx = ev.clientX - startX;
				if (Math.abs(dx) > 5) dragged = true;
				track.scrollLeft = startLeft - dx;
			};
			const up = () => {
				track.classList.remove('is-grabbing');
				removeEventListener('pointermove', move);
				removeEventListener('pointerup', up);
			};
			addEventListener('pointermove', move);
			addEventListener('pointerup', up);
		});
		// A drag should not also open the card's link.
		track.addEventListener('click', (e) => dragged && (e.preventDefault(), (dragged = false)), true);
		track.addEventListener('dragstart', (e) => e.preventDefault());
	});
}

/* ------------------------------------------------------------------------
   Filter buttons: [data-filter-group] holds buttons with data-filter="x"
   and items with data-filter-value="x y". "all" shows everything.
   ------------------------------------------------------------------------ */
function initFilters() {
	$$('[data-filter-group]').forEach((root) => {
		const buttons = $$('[data-filter]', root);
		const items = $$('[data-filter-value]', root);
		const empty = root.querySelector<HTMLElement>('[data-filter-empty]');
		buttons.forEach((btn) =>
			btn.addEventListener('click', () => {
				const value = btn.dataset.filter!;
				buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
				let shown = 0;
				items.forEach((item) => {
					const match = value === 'all' || item.dataset.filterValue!.split(' ').includes(value);
					item.hidden = !match;
					if (match) {
						item.style.setProperty('--d', String(Math.min(shown, 8) * 40));
						item.classList.remove('is-in');
						requestAnimationFrame(() => item.classList.add('is-in'));
						shown++;
					}
				});
				if (empty) empty.hidden = shown > 0;
				ScrollTrigger.refresh();
			}),
		);
	});
}

/* ------------------------------------------------------------------------
   Accordions on native <details>, with an animated height.
   ------------------------------------------------------------------------ */
function initAccordions() {
	$$<HTMLDetailsElement>('details.acc').forEach((details) => {
		const summary = details.querySelector('summary')!;
		const body = details.querySelector<HTMLElement>('.acc__body')!;
		let anim: Animation | null = null;
		const toggle = (open: boolean) => {
			anim?.cancel();
			if (reducedMotion) {
				details.open = open;
				return;
			}
			const start = `${body.offsetHeight}px`;
			if (open) details.open = true;
			const end = open ? `${body.scrollHeight}px` : '0px';
			details.classList.toggle('is-open', open);
			anim = body.animate({ height: [open ? '0px' : start, end] }, { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
			anim.onfinish = () => {
				if (!open) details.open = false;
				anim = null;
				ScrollTrigger.refresh();
			};
		};
		summary.addEventListener('click', (e) => {
			e.preventDefault();
			const opening = !details.classList.contains('is-open');
			if (opening && details.closest('[data-acc-single]')) {
				$$<HTMLDetailsElement>('details.acc.is-open', details.closest('[data-acc-single]')!).forEach((d) => {
					if (d !== details) d.querySelector('summary')!.click();
				});
			}
			toggle(opening);
		});
		if (details.open) details.classList.add('is-open');
	});
}

/* ------------------------------------------------------------------------
   Pinned horizontal scroll (process steps) on desktop.
   ------------------------------------------------------------------------ */
function initHorizontal() {
	if (reducedMotion) return;
	const mm = gsap.matchMedia();
	$$('[data-hscroll]').forEach((section) => {
		const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
		const bar = section.querySelector<HTMLElement>('[data-hscroll-bar]');
		if (!track) return;
		mm.add('(min-width: 1024px)', () => {
			const distance = () => track.scrollWidth - track.clientWidth;
			gsap.to(track, {
				x: () => -distance(),
				ease: 'none',
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: () => `+=${distance()}`,
					pin: true,
					scrub: 0.4,
					invalidateOnRefresh: true,
					onUpdate: (self) => bar && (bar.style.transform = `scaleX(${self.progress})`),
				},
			});
		});
	});
}

/* ------------------------------------------------------------------------
   Lines that draw as you scroll: [data-draw] scales from 0 along its axis.
   ------------------------------------------------------------------------ */
function initDraw() {
	if (reducedMotion) return;
	$$('[data-draw]').forEach((el) => {
		const vertical = el.dataset.draw !== 'x';
		gsap.fromTo(
			el,
			{ [vertical ? 'scaleY' : 'scaleX']: 0 },
			{
				[vertical ? 'scaleY' : 'scaleX']: 1,
				ease: 'none',
				transformOrigin: vertical ? '50% 0' : '0 50%',
				scrollTrigger: { trigger: el.parentElement, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
			},
		);
	});
}

/* ------------------------------------------------------------------------
   Footer wordmark: letters rise as the footer scrolls into view.
   ------------------------------------------------------------------------ */
function initWordmark() {
	$$('[data-wordmark]').forEach((el) => {
		const letters = $$('[data-letter]', el);
		if (reducedMotion || !letters.length) return;
		gsap.fromTo(
			letters,
			{ yPercent: 105 },
			{
				yPercent: 0,
				ease: 'power2.out',
				stagger: 0.05,
				scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
			},
		);
	});
}

/* ------------------------------------------------------------------------
   Elements that drift with the pointer: [data-depth="20"] (px at the edge)
   ------------------------------------------------------------------------ */
function initPointerDepth() {
	const els = $$('[data-depth]');
	if (!finePointer || reducedMotion || !els.length) return;
	const movers = els.map((el) => ({
		depth: Number(el.dataset.depth) || 12,
		x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
		y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
	}));
	addEventListener('pointermove', (e) => {
		const nx = e.clientX / innerWidth - 0.5;
		const ny = e.clientY / innerHeight - 0.5;
		movers.forEach((m) => {
			m.x(nx * m.depth);
			m.y(ny * m.depth);
		});
	});
}

/* ------------------------------------------------------------------------
   Small things: scroll progress, back to top
   ------------------------------------------------------------------------ */
function initProgress() {
	const bar = document.querySelector<HTMLElement>('[data-progress]');
	if (!bar) return;
	const update = () => {
		const max = document.documentElement.scrollHeight - innerHeight;
		bar.style.setProperty('--p', String(max > 0 ? scrollY / max : 0));
	};
	addEventListener('scroll', update, { passive: true });
	update();
}

function initToTop() {
	$$('[data-to-top]').forEach((b) =>
		b.addEventListener('click', () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : scrollTo({ top: 0, behavior: 'smooth' }))),
	);
}

/* ------------------------------------------------------------------------ */
initReveals();
initCounters();
initMarquees();
initSpotlight();
initMagnetic();
initCursorBubble();
initAutoTabs();
initCarousels();
initFilters();
initAccordions();
initHorizontal();
initDraw();
initWordmark();
initPointerDepth();
initProgress();
initToTop();
document.documentElement.classList.add('motion-ready');

// Layout shifts once fonts and images arrive; re-measure scroll positions.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
addEventListener('load', () => ScrollTrigger.refresh());
