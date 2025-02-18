// app/page.tsx
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function RootPage() {
	const headersList = await headers();
	const acceptLanguage = headersList.get('accept-language') ?? '';
	// Extrahiere die primäre Sprache aus dem Accept-Language Header, z.B. "de" aus "de-DE,de;q=0.9,..."
	const browserLocale = acceptLanguage.split(',')[0].split('-')[0];
	const supportedLocales = ['en', 'de', 'fr', 'es'];
	// Fallback auf "de", falls die Browser-Sprache nicht unterstützt wird
	const locale = supportedLocales.includes(browserLocale)
		? browserLocale
		: 'de';

	redirect(`/${locale}`);
}
