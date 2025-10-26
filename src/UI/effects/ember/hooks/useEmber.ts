/* --- Imports --- */
import { useEffect, useState } from 'react';

/* --- Types --- */
export type Ember = {
	id: number;
	left: number; // позиция по горизонтали
	delay: number; // задержка появления
	duration: number; // длительность анимации
	offsetX: number; // отклонение влево/вправо
};

type Options = {
	count?: number; // количество угольков
	screenHeight?: number; // высота полёта (в % от экрана)
};

/* --- useEmbers Hook --- */
// This hook manages the embers animation.
export const useEmbers = ({ count = 15, screenHeight = 80 }: Options = {}) => {
	const [embers, setEmbers] = useState<Ember[]>([]);

	useEffect(() => {
		const newEmbers = Array.from({ length: count }).map((_, i) => ({
			id: i,
			left: 2 + Math.random() * 96, // от 2 до 98%
			delay: Math.random() * 5, // случайная задержка старта
			duration: 8 + Math.random() * 8, // 8–16 секунд
			offsetX: (Math.random() - 0.5) * 80, // колебание по X (примерно ±40%)
		}));
		setEmbers(newEmbers);
	}, [count]);

	return { embers, screenHeight };
};
