'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

function SocialMark({ className, children }: { className?: string; children: ReactNode }) {
	return (
		<span className={className} aria-hidden>
			{children}
		</span>
	);
}

const InstagramMark = ({ className }: { className?: string }) => <SocialMark className={className}>IG</SocialMark>;
const YoutubeMark = ({ className }: { className?: string }) => <SocialMark className={className}>YT</SocialMark>;
const LinkedinMark = ({ className }: { className?: string }) => <SocialMark className={className}>IN</SocialMark>;

const footerLinks: FooterSection[] = [
	{
		label: 'Navigation',
		links: [
			{ title: 'Studio', href: '#who' },
			{ title: 'Services', href: '#services' },
			{ title: 'Playground', href: '#portfolio' },
			{ title: 'Process', href: '#process' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'Contact Us', href: '#contact' },
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Service', href: '#' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'Instagram', href: '#', icon: InstagramMark },
			{ title: 'Youtube', href: '#', icon: YoutubeMark },
			{ title: 'LinkedIn', href: '#', icon: LinkedinMark },
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full flex flex-col items-center justify-center rounded-t-4xl border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16 mt-24">
			<div className="bg-white/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full max-w-6xl mx-auto gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
	          <div 
            className="text-xl tracking-tight text-white flex items-center" 
            style={{ fontFamily: "'Clash Display', sans-serif", fontWeight: 700 }}
          >
            <img 
              src="/logo.svg" 
              alt="Launchpad Logo" 
              className="h-8 w-auto mr-2.5"
            />
            Launch<span className="gradient-text">pad</span>
          </div>
					<p className="text-muted-foreground mt-8 text-sm md:mt-0" style={{ color: "var(--text-soft)" }}>
						Premium launch systems for ambitious internet brands.
					</p>
					<p className="text-muted-foreground mt-8 text-sm md:mt-8" style={{ color: "var(--text-soft)" }}>
						© {new Date().getFullYear()} Launchpad. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-semibold text-white tracking-wider uppercase">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-white inline-flex items-center transition-all duration-300"
												style={{ color: "var(--text-soft)" }}
											>
												{link.icon && <link.icon className="me-2 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
