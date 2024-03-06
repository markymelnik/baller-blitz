import { useEffect, useState } from 'react';

import './color-btn.scss';
import { Icons } from '../../../lib/Icons';

export const ColorBtn = () => {
	const [theme, setTheme] = useState<string>('light');

	useEffect(() => {
		const initialTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
		setTheme(initialTheme);
	}, [])

	const toggleTheme = () => {
		if (document.body.classList.contains('light')) {
			document.body.classList.remove('light');
			document.body.classList.add('dark');
			setTheme('dark');
		} else {
			document.body.classList.remove('dark');
			document.body.classList.add('light');
			setTheme('light');
		}
	}
	
	return (
		<button className="color-btn" onClick={toggleTheme}>{/* Toggle Theme  */}{theme === 'light' ? <Icons.Moon size={28}/> : <Icons.Sun size={28} />}</button>
	)
}