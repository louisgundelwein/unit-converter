// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import translations from '../lang/locales.json';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export async function generateMetadata({
	params,
}: {
	params: { locale: string };
}): Promise<Metadata> {
	const locale = params.locale || 'de';
	const typedLocale = (
		locale in translations ? locale : 'de'
	) as keyof typeof translations;
	const t = translations[typedLocale];
	return {
		title: t.title,
		description: t.description,
	};
}

export default function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	const lang = params.locale || 'de';

	return (
		<html lang={lang}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
