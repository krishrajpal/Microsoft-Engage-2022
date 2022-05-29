import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getUserLogin } from '../Api/Requests';

/*Login Function*/ 

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	async function userLogin() {
		if (email && password) {
			try {
				const body = { email, password };
				let { data } = await getUserLogin(body);
				console.log(data);
				localStorage.setItem('token', data);
				let path = `/`;
				history.push(path);
			}catch(error){
				alert('Invalid E-Mail/Password')
			}
		} else {
			alert('Both E-Mail & Password are required');
		}
	}
	return(
		<>
			<div className="relative p-1">
				<div className="relative bg-gradient-to-r from-gray-800 to-blue-900 md:pt-32 pb-32 pt-12 rounded-3xl">
					{/* Card */}
					<div className="flex flex-wrap">
						<div className="w-full px-10">
							<div className="relative flex flex-col min-w-0 break-words mb-6 xl:mb-0">
								<div className="flex-auto px-4">
									<div className="flex flex-wrap">
										<div className=" w-full pr-4 max-w-full flex-grow flex-auto">
											<span className="flex justify-center text-center text-white mr-0 whitespace-no-wrap text-6xl font-bold px-0">
												FaceLog									
											</span>
										</div>
									</div>

									<div class = "min-h-screen block mt-4 justify-center sm:px-6 lg:px-8">
										<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
											<div class="bg-white pb-8 pt-4 px-4 shadow sm:rounded-lg sm:px-10">
												<div class="sm:mx-auto sm:w-full sm:max-w-md pb-6 pt-1 text-center">
													<h2 class="text-2xl font-poppins text-blue-600">
														Sign in to your FaceLog Account
													</h2>
												</div>
												<form class="space-y-6">
													<div>
														<label
															for="email"
															class="block text-sm font-poppins text-gray-700 text-left"
														>
															FaceLog ID
														</label>
														<div class="mt-1">
															<input
																id="email"
																name="email"
																type="email"
																autocomplete="email"
																onChange={(e) => setEmail(e.target.value)}
																required
																class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
															/>
														</div>
													</div>

													<div>
														<label
															for="password"
															class="block text-sm font-poppins text-gray-700"
														>
															Password
														</label>
														<div class="mt-1">
															<input
																id="password"
																name="password"
																type="password"
																autocomplete="current-password"
																onChange={(e) => setPassword(e.target.value)}
																required
																class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-cyan-500 sm:text-sm"
															/>
														</div>
													</div>
													

													<div class="flex items-center justify-between">
														<div class="text-md">
														<label
															for="password"
															class="block text-sm font-poppins text-gray-700"
														>
															New to FaceLog?
														</label>
															<Link
																to="/register"
																class=" block text-sm font-poppins hover:text-blue-600"
															>
																Sign Up
															</Link>
														</div>
													</div>

													<div>
														<Link to="/">
															<button
																type="submit"
																class="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-bold font-poppins text-white bg-blue-800 focus:outline-none hover:bg-blue-300"
																onClick={(e) => userLogin(e)}
															>
																Sign In ➞
															</button>
														</Link>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Login;
