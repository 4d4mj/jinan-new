import Link from "next/link";

const Semester = ({ title, arabic, description, link }) => {

	return (
		<div className="bg-dark rounded-xl p-4 text-white flex flex-col justify-between">
			<div className="flex flex-col gap-4 capitalize">
				<div className="flex flex-col gap-1">
					<h1 className="font-medium text-xl text-yellow">{title}</h1>
					<h1 className="font-medium text-xl text-yellow text-end">
						{arabic}
					</h1>
				</div>
				<p className="text-sm opacity-60">{description}</p>
			</div>
			<Link href={link} target="blank" className="flex">
				<button className="flex flex-grow justify-center items-center gap-2 capitalize icon font-medium text-sm">
					view
					<i className="material-symbols-outlined outlined small">visibility</i>
				</button>
			</Link>
		</div>
	);
};

export default Semester;
