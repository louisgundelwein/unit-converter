// components/LanguageSwitcher.tsx
'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useMemo } from 'react';

const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es'];

const LanguageSwitcher: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname(); // Beispiel: "/en/..." oder "/de/..."

	// Zerlege den Pfad in Segmente:
	const segments = useMemo(
		() => pathname.split('/').filter(Boolean),
		[pathname]
	);
	// Bestimme das erste Segment als Locale, wenn es unterstützt wird:
	const currentLocale =
		segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])
			? segments[0]
			: 'de';

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newLocale = e.target.value;
		let newPath = '';

		// Wenn das erste Segment eine gültige Locale ist, ersetze es:
		if (segments.length > 0 && SUPPORTED_LOCALES.includes(segments[0])) {
			newPath = '/' + [newLocale, ...segments.slice(1)].join('/');
		} else {
			// Falls nicht, setze das neue Locale als erstes Segment:
			newPath = '/' + [newLocale, ...segments].join('/');
		}

		router.push(newPath);
	};

	return (
		<div className="mb-4">
			<select
				value={currentLocale}
				onChange={handleChange}
				className="p-2 border border-gray-400 rounded focus:outline-none text-gray-800 bg-white"
			>
				<option value="en">en</option>
				<option value="de">de</option>
				<option value="fr">fr</option>
				<option value="es">es</option>
			</select>
		</div>
	);
};

export default LanguageSwitcher;
