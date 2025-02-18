// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import translations from '../lang/locales.json';
import AdSense from '@/components/ads';

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
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	// Entpacke den params-Promise
	const { locale } = await params;
	const typedLocale = locale in translations ? locale : 'de';
	const t = translations[typedLocale as keyof typeof translations];
	return {
		title: t.title,
		description: t.description,
	};
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	// Entpacke den Promise, um direkt auf locale zugreifen zu können
	const { locale } = await params;
	const lang = locale || 'de';

	return (
		<html lang={lang}>
			<head>
				<meta
					name="google-adsense-account"
					content="ca-pub-6105108199502947"
				></meta>
				<AdSense publisherId={'6105108199502947'} />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
