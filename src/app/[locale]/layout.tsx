// app/[locale]/layout.tsx
import { ReactNode } from 'react';

type LayoutProps = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
	// Entpacke den Promise, um auf die Parameter zuzugreifen
	const { locale } = await params;

	return (
		<html lang={locale}>
			<body>{children}</body>
		</html>
	);
}
