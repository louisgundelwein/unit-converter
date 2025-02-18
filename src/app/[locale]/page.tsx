// app/[locale]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Converter from '@/components/Converter';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import translations from '@/lang/locales.json';

interface Params {
	locale: string;
}

interface PageProps {
	params: Promise<Params>;
}

export default function Home({ params }: PageProps) {
	// Unwrappen des Promise mit React.use() (experimenteller Hook!)
	const resolvedParams = React.use(params);
	const router = useRouter();
	const [locale, setLocale] = useState<string>('de');

	useEffect(() => {
		if (resolvedParams.locale && resolvedParams.locale in translations) {
			setLocale(resolvedParams.locale);
		} else {
			// Fallback: Browser-Sprache ermitteln
			const browserLocale = navigator.language.slice(0, 2);
			const newLocale = browserLocale in translations ? browserLocale : 'de';
			setLocale(newLocale);
			// Optional: URL aktualisieren, wenn der Parameter fehlt oder ungültig ist
			router.replace(`/${newLocale}`);
		}
	}, [resolvedParams.locale, router]);

	const t = translations[locale as keyof typeof translations];

	return (
		<div className="min-h-screen bg-[#F7F7F7] flex flex-col items-center py-10">
			<div className="flex flex-row justify-start w-full px-6 ">
				<LanguageSwitcher />
			</div>
			<h1 className="text-4xl font-bold text-[#2C3E50] mb-6">
				{t.description}
			</h1>
			<Converter />
		</div>
	);
}
