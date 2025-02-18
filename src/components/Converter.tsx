// components/Converter.tsx
'use client';
import { useState, useEffect } from 'react';
import { unitCategories } from '../lib/unitCategories';
import { roundValue } from '../lib/rounding';

const Converter: React.FC = () => {
	const categoryKeys = Object.keys(unitCategories);
	const [category, setCategory] = useState(categoryKeys[0]);
	const [fromUnit, setFromUnit] = useState<string>('');
	const [toUnit, setToUnit] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [result, setResult] = useState<string>('');

	useEffect(() => {
		const units = Object.keys(unitCategories[category].units);
		setFromUnit(units[0]);
		setToUnit(units[0]);
		setValue('');
		setResult('');
	}, [category]);

	const handleConversion = (e: React.FormEvent) => {
		e.preventDefault();
		const numValue = parseFloat(value);
		if (isNaN(numValue)) {
			setResult('Bitte eine gültige Zahl eingeben.');
			return;
		}
		const cat = unitCategories[category];
		let converted: number;

		if (cat.convert) {
			converted = cat.convert(numValue, fromUnit, toUnit);
		} else {
			const fromFactor = cat.units[fromUnit];
			const toFactor = cat.units[toUnit];
			converted = numValue * (fromFactor / toFactor);
		}
		// Hole die kategoriespezifische Präzision (Default: 2 Dezimalstellen)
		const precision = cat.precision ?? 2;
		setResult(roundValue(converted, precision).toString());
	};

	const unitsOptions = Object.keys(unitCategories[category].units).map(
		(unit) => (
			<option key={unit} value={unit}>
				{unit}
			</option>
		)
	);

	return (
		<div className="w-full max-w-lg p-6 bg-white rounded shadow">
			<form onSubmit={handleConversion} className="space-y-4">
				<div>
					<label
						htmlFor="category"
						className="block text-gray-800 font-medium mb-1"
					>
						Kategorie
					</label>
					<select
						id="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full p-2 border border-[#7F8C8D] rounded focus:outline-none focus:ring-2 focus:ring-[#2C3E50] text-gray-800"
					>
						{categoryKeys.map((key) => (
							<option key={key} value={key}>
								{unitCategories[key].name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label
						htmlFor="value"
						className="block text-gray-800 font-medium mb-1"
					>
						Wert
					</label>
					<input
						id="value"
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Zahl eingeben"
						className="w-full p-2 border border-[#7F8C8D] rounded focus:outline-none focus:ring-2 focus:ring-[#2C3E50] text-gray-800"
					/>
				</div>
				<div className="flex space-x-2">
					<div className="flex-1">
						<label
							htmlFor="fromUnit"
							className="block text-gray-800 font-medium mb-1"
						>
							Von
						</label>
						<select
							id="fromUnit"
							value={fromUnit}
							onChange={(e) => setFromUnit(e.target.value)}
							className="w-full p-2 border border-[#7F8C8D] rounded focus:outline-none focus:ring-2 focus:ring-[#2C3E50] text-gray-800"
						>
							{unitsOptions}
						</select>
					</div>
					<div className="flex-1">
						<label
							htmlFor="toUnit"
							className="block text-gray-800 font-medium mb-1"
						>
							Zu
						</label>
						<select
							id="toUnit"
							value={toUnit}
							onChange={(e) => setToUnit(e.target.value)}
							className="w-full p-2 border border-[#7F8C8D] rounded focus:outline-none focus:ring-2 focus:ring-[#2C3E50] text-gray-800"
						>
							{unitsOptions}
						</select>
					</div>
				</div>
				<button
					type="submit"
					className="w-full bg-[#2C3E50] text-white py-2 rounded hover:bg-[#1A252F] transition"
				>
					Umrechnen
				</button>
			</form>
			{result && (
				<div className="mt-4 p-4 bg-[#F2F2F2] rounded">
					<p className="text-lg text-gray-800">Ergebnis: {result}</p>
				</div>
			)}
		</div>
	);
};

export default Converter;
