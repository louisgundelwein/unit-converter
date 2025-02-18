export interface UnitCategory {
	name: string;
	// Der Faktor gibt an, wie viele Basiseinheiten in einer Einheit stecken.
	// Beispiel: Für Länge (Basis: Meter) gilt: kilometer: 1000, centimeter: 0.01.
	units: { [unit: string]: number };
	// Optional: Falls die Umrechnung nicht linear erfolgt, kann hier eine Funktion definiert werden.
	convert?: (value: number, from: string, to: string) => number;
	// Standardanzahl der Dezimalstellen für Rundungen (optional)
	precision?: number;
}

export const unitCategories: { [key: string]: UnitCategory } = {
	// 1. Länge (Basis: Meter)
	length: {
		name: 'Länge',
		units: {
			meter: 1,
			kilometer: 1000,
			centimeter: 0.01,
			millimeter: 0.001,
			mile: 1609.34,
			yard: 0.9144,
			foot: 0.3048,
			inch: 0.0254,
		},
		precision: 4,
	},
	// 2. Gewicht (Basis: Kilogramm)
	weight: {
		name: 'Gewicht',
		units: {
			kilogram: 1,
			gram: 0.001,
			milligram: 0.000001,
			pound: 0.453592,
			ounce: 0.0283495,
		},
		precision: 3,
	},
	// 3. Fläche (Basis: Quadratmeter)
	area: {
		name: 'Fläche',
		units: {
			'square meter': 1,
			'square kilometer': 1_000_000,
			'square centimeter': 0.0001,
			'square foot': 0.092903,
			acre: 4046.86,
		},
		precision: 2,
	},
	// 4. Volumen (Basis: Kubikmeter)
	volume: {
		name: 'Volumen',
		units: {
			'cubic meter': 1,
			liter: 0.001,
			milliliter: 0.000001,
			'cubic centimeter': 0.000001,
			'gallon (US)': 0.00378541,
		},
		precision: 4,
	},
	// 5. Temperatur (Basis: Celsius, mit eigener Konvertierungsfunktion)
	temperature: {
		name: 'Temperatur',
		units: {
			celsius: 1,
			fahrenheit: 1,
			kelvin: 1,
		},
		convert: (value: number, from: string, to: string) => {
			if (from === to) return value;
			let celsius: number;
			// Zuerst in Celsius umrechnen
			switch (from) {
				case 'fahrenheit':
					celsius = (value - 32) * (5 / 9);
					break;
				case 'kelvin':
					celsius = value - 273.15;
					break;
				default:
					celsius = value;
			}
			// Von Celsius in Ziel umrechnen
			switch (to) {
				case 'fahrenheit':
					return celsius * (9 / 5) + 32;
				case 'kelvin':
					return celsius + 273.15;
				default:
					return celsius;
			}
		},
		precision: 2,
	},
	// 6. Geschwindigkeit (Basis: Meter pro Sekunde)
	speed: {
		name: 'Geschwindigkeit',
		units: {
			'm/s': 1,
			'km/h': 0.277778,
			mph: 0.44704,
		},
		precision: 3,
	},
	// 7. Zeit (Basis: Sekunde)
	time: {
		name: 'Zeit',
		units: {
			second: 1,
			minute: 60,
			hour: 3600,
			day: 86400,
		},
		precision: 0,
	},
	// 8. Druck (Basis: Pascal)
	pressure: {
		name: 'Druck',
		units: {
			pascal: 1,
			kilopascal: 1000,
			bar: 100000,
			psi: 6894.76,
		},
		precision: 2,
	},
	// 9. Energie (Basis: Joule)
	energy: {
		name: 'Energie',
		units: {
			joule: 1,
			kilojoule: 1000,
			calorie: 4.184,
			kilocalorie: 4184,
			'kilowatt-hour': 3.6e6,
		},
		precision: 2,
	},
	// 10. Leistung (Basis: Watt)
	power: {
		name: 'Leistung',
		units: {
			watt: 1,
			kilowatt: 1000,
			horsepower: 745.7,
		},
		precision: 2,
	},
	// 11. Datenspeicher (Basis: Byte)
	dataStorage: {
		name: 'Datenspeicher',
		units: {
			byte: 1,
			kilobyte: 1024,
			megabyte: 1_048_576,
			gigabyte: 1_073_741_824,
		},
		precision: 0,
	},
	// 12. Winkel (Basis: Radian)
	angle: {
		name: 'Winkel',
		units: {
			radian: 1,
			degree: Math.PI / 180, // 1° = π/180 Rad
			grad: Math.PI / 200, // 1 grad = π/200 Rad
		},
		precision: 4,
	},
	// 13. Frequenz (Basis: Hertz)
	frequency: {
		name: 'Frequenz',
		units: {
			hertz: 1,
			kilohertz: 1000,
			megahertz: 1e6,
			gigahertz: 1e9,
		},
		precision: 2,
	},
	// 14. Kraft (Basis: Newton)
	force: {
		name: 'Kraft',
		units: {
			newton: 1,
			kilonewton: 1000,
			'pound-force': 4.44822,
		},
		precision: 2,
	},
	// 15. Dichte (Basis: kg/m³)
	density: {
		name: 'Dichte',
		units: {
			'kg/m³': 1,
			'g/cm³': 1000,
			'lb/ft³': 16.0185,
		},
		precision: 3,
	},
	// 16. Volumenstrom (Basis: Kubikmeter pro Sekunde)
	volumeFlow: {
		name: 'Volumenstrom',
		units: {
			'm³/s': 1,
			'liter/s': 0.001,
			'gallon/min': 0.00378541 / 60,
		},
		precision: 4,
	},
	// 17. Beschleunigung (Basis: m/s²)
	acceleration: {
		name: 'Beschleunigung',
		units: {
			'm/s²': 1,
			'ft/s²': 0.3048,
			'km/h/s': 0.277778,
		},
		precision: 3,
	},
	// 18. Flächenmasse (Basis: kg/m²)
	areaDensity: {
		name: 'Flächenmasse',
		units: {
			'kg/m²': 1,
			'g/cm²': 10, // 1 g/cm² = 10 kg/m²
		},
		precision: 2,
	},
	// 19. Beleuchtungsstärke (Basis: Lux)
	illuminance: {
		name: 'Beleuchtungsstärke',
		units: {
			lux: 1,
			'foot-candle': 10.764,
		},
		precision: 2,
	},
	// 20. Datenübertragungsrate (Basis: Bit pro Sekunde)
	dataRate: {
		name: 'Datenübertragungsrate',
		units: {
			'bit/s': 1,
			'kilobit/s': 1000,
			'megabit/s': 1e6,
			'gigabit/s': 1e9,
			'byte/s': 8,
			'kilobyte/s': 8000,
			'megabyte/s': 8e6,
		},
		precision: 0,
	},
};
