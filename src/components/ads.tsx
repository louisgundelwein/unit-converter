import Script from 'next/script';
import React from 'react';

export default function AdSense({ publisherId }: { publisherId: string }) {
  return (
		<Script
			id="adsbygoogle"
			async
			src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${publisherId}`}
			crossOrigin="anonymous"
			strategy="afterInteractive"
		></Script>
	);

}