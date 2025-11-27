/* --- Imports --- */
import styles from './index.module.css';

/* --- GlobalLoader Component --- */
export const GlobalLoader = () => {
	return (
		<div className={styles.container}>
			<div className={`${styles.animationRotate} ${styles.lightContainer}`}>
				{Array.from({ length: 10 }).map((_, i, arr) => {
					const count = arr.length;
					const angle = (360 / count) * i;
					const radius = 45;

					return (
						<span
							key={i}
							className={`${styles.Light}`}
							style={{
								animationDelay: `${i * 0.1}s`,
								transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
							}}
						/>
					);
				})}
			</div>

			<h1 className={styles.title}>
				Code<span className={styles.moltenText}>Forge</span>
			</h1>
		</div>
	);
};
