import styles from "@styles/Loading.module.css";

const Loading = () => {
	return (
		<div
			className={`${styles.loading} fixed top-0 left-0 w-screen h-screen flexitems-center justify-center bg-dark z-50`}
		>
			<div
				className={`${styles.label} text-yellow h-full text-lg flex flex-col gap-6 justify-center items-center`}
			>
				<div className={`${styles.loader}`} />
				<span>Please wait while we get your data...</span>
			</div>
		</div>
	);
};

export default Loading;
