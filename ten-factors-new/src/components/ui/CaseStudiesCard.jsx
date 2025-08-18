export default function CaseStudiesCard({ company, title, summary, href = '#' }) {
    return (
			<article
				className="group flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-[0_0_40%] xl:flex-[0_0_33%] flex flex-col rounded-3xl bg-white primary-shadow transition-all hover:-translate-y-0.5"
			>
				{/* Header / Logo strip */}
				<div className="relative h-64 w-full bg-[#f9f8f9] rounded-t-3xl">
					<div className="absolute inset-0 border-b border-gray-200 pointer-events-none" aria-hidden="true" />
					<div className="h-full w-full flex items-center justify-center">
						<div className="w-[221px] h-[80px] bg-white/80 border border-gray-200 rounded-xl flex items-center justify-center">
							<img
								// src={IMAGES[item.company]}
								alt={company}
								className="max-w-full max-h-full object-contain"
								loading="lazy"
								decoding="async"
								// width={221}
								// height={80}
							/>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="flex flex-col gap-4 w-full p-6">
					<div className="flex flex-col gap-2 text-primary">
						<h3 className="text-[22px] lg:text-[24px] leading-7 lg:leading-8 tracking-[0.2px] font-semibold">
							{title}
						</h3>
						<p className="text-tertiary text-sm lg:text-base leading-6">
							{summary}
						</p>
					</div>

					<div className="mt-2">
						<a
							href={href}
							className="relative block w-full rounded-2xl border border-primary text-primary px-6 py-3 text-center text-sm lg:text-base font-medium hover:opacity-80"
							aria-label="Read more"
						>
							Read Article
						</a>
					</div>
				</div>
			</article>
		);
  }