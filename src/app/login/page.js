"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const [passwordVisible, setPasswordVisible] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		// Reset error state
		setError('');

		// Check if inputs are empty
		if (!username || !password) {
		  setError('Please fill in both fields');
		  return;
		}

		try {
		  // Make a POST request to your login API endpoint using fetch
		  const loginResponse = await fetch('http://localhost:3000/login', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			credentials: 'include', // Include cookies in the request
			body: JSON.stringify({ username, password }),
		  });

		  // Check if login was successful
		  if (loginResponse.ok) {
			// Optionally, parse the response data
			const loginData = await loginResponse.json();
			console.log('Login successful:', loginData);

			// Fetch the profile data
			const profileResponse = await fetch('http://localhost:3000/profile', {
			  method: 'GET',
			  credentials: 'include', // Include cookies in the request
			});

			if (profileResponse.ok) {
			  const profileData = await profileResponse.json();
			  console.log('Profile data:', profileData);

			  // Redirect to homepage or set profile data in state
			  router.push('/');
			} else {
			  setError('Failed to fetch profile data.');
			}
		  } else {
			setError('Invalid username or password');
		  }
		} catch (error) {
		  console.error('Error during login or fetching profile:', error);
		  setError('An error occurred. Please try again.');
		}
	  };


	return (
		<div className="login-bg h-screen">
			<div className="flex flex-col justify-center gap-6 items-center h-full pb-10 px-28 w-[42rem]">
				<div>
					<Image
						src={"/images/logo.svg"}
						alt="logo"
						width={160}
						height={160}
					/>
				</div>
				<h1 className="text-white capitalize text-3xl flex flex-col items-center">
					welcome to{" "}
					<span className="font-semibold text-yellow">
						jinan university system
					</span>
				</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-full gap-6"
				>
					<div className="flex flex-col gap-4">
						<input
							type="text"
							id="username"
							name="username"
							placeholder="Student ID"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className={`py-3 px-8 rounded-xl border-2 ${
								error && !username
									? "border-error placeholder-error"
									: ""
							}`}
						/>
						<div className="flex flex-col">
							<div className="flex relative items-center">
								<input
									type={passwordVisible ? "text" : "password"}
									id="password"
									name="password"
									placeholder="Password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className={`py-3 px-8 rounded-xl border-2 flex-grow ${
										error && !password
											? "border-error placeholder-error"
											: ""
									}`}
								/>
								<i
									className="material-symbols-outlined outlined absolute right-1 p-3 text-dark opacity-50 cursor-pointer"
									onClick={() =>
										setPasswordVisible(!passwordVisible)
									}
								>
									{passwordVisible
										? "visibility_off"
										: "visibility"}
								</i>
							</div>
							<div className="flex justify-between text-sm mt-2">
								<div className="flex gap-1 items-center">
									<i className="material-symbols-outlined outlined tiny text-yellow mb-[0.1rem]">
										{error ? "error" : ""}
									</i>
									<p className="text-yellow">{error}</p>
								</div>
								<Link
									href="/forgot-password"
									className="text-yellow"
								>
									Forgot Password?
								</Link>
							</div>
						</div>
					</div>
					<div className="flex gap-2 font-medium">
						<button className="p-2 text-yellow rounded-lg border-2 border-yellow shadow flex-grow capitalize">
							reset
						</button>
						<button
							type="submit"
							className="p-2 bg-light text-white rounded-lg shadow flex-grow capitalize"
						>
							login
						</button>
					</div>
					<div className="flex justify-center gap-2 text-white capitalize">
						<p>not yet a student?</p>
						<Link
							href="/register"
							className="text-yellow underline"
						>
							Apply Now
						</Link>
					</div>
				</form>
				<Link
					href="/about"
					className="text-yellow text-sm fixed bottom-4"
				>
					www.jinan.edu.lb
				</Link>
			</div>
		</div>
	);
};

export default LoginPage;
