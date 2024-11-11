import Link from "next/link";

const Payment = ({ bank_no, amount, date, due, status, link }) => {
	return (
		<div className="bg-dark rounded-xl p-4 text-white flex flex-col gap-3">
			<div className="flex flex-col gap-2 capitalize">
				<div>
					<p className="text-sm opacity-60">Bank No. {bank_no}</p>
					<h1 className="font-medium text-3xl text-yellow">
						{amount}$
					</h1>
				</div>
			</div>
			<div className="flex justify-between">
				<div className="stack">
					<p>creation date</p>
					<p>{date}</p>
				</div>
				<div className="stack">
					<p>due date</p>
					<p>{due}</p>
				</div>
			</div>
			{status ? (
				<button className="flex disabled flex-grow justify-center items-center gap-2 capitalize icon font-medium text-sm">
						paid on {status}
						<i className="material-symbols-outlined outlined small">
							check
						</i>
					</button>
			) : (
				<Link href={link} target="blank" className="flex">
				<button className="flex flex-grow justify-center items-center gap-2 capitalize icon font-medium text-sm">
					view
					<i className="material-symbols-outlined outlined small">
						visibility
					</i>
				</button>
				</Link>
			)}
		</div>
	);
};

export default Payment;
