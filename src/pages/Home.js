import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import Header from '../components/Header.js';
import { Link, useHistory } from 'react-router-dom';
import { getCourses, getAttendenceCode, deleteAttendenceCode } from '../Api/Requests';
import jwtDecode from 'jwt-decode';

function Home() {
	// States
	const [courses, setCourses] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
	const [generatedCode, setGeneratedCode] = useState('');
	const history = useHistory();

	function validateUserLogin() {
		try {
			const token = localStorage.getItem('token');
			if (token) {
				const currentUser = jwtDecode(token);
				console.log(currentUser);
				setCurrentUser(currentUser);
				return currentUser;
			} else {
				let path = `/login`;
				history.push(path);
			}
		} catch (error) {}
	}

	const loadCourses = async (currentUser) => {
		try {
			const { data } = await getCourses(currentUser._id);
			setCourses(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	async function generateCode(courseId) {
		try {
			let { data } = await getAttendenceCode(courseId);
			setGeneratedCode(data);
			console.log(generatedCode);
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteCode(courseId) {
		try {
			await deleteAttendenceCode(courseId);
			setGeneratedCode('');
		} catch (error) {}
	}

	useEffect(() => {
		let validatedUser = validateUserLogin();
		loadCourses(validatedUser);
	}, []);
	return (
		<>
			<Navbar />
			<div className="relative md:ml-64 bg-gray-900 p-1">
				<Header />
				<div className="relative bg-gradient-to-r from-gray-800 to-blue-900 md:pt-32 pb-32 pt-12 rounded-2xl">
					<div className="w-full pr-4 mb-16 max-w-full flex-grow flex-auto">
						<span className="flex justify-center text-5xl text-white mr-0 whitespace-no-wrap font-bold px-0">
							FaceLog Classes
						</span>
						<span className="flex justify-center text-white mr-0 whitespace-no-wrap text-xl pt-2">
							Courses will be displayed here
						</span>
					</div>
					<div className="flex flex-wrap px-2">
						{courses.map((course, index) => (
							<div className="w-full lg:w-6/12 xl:w-6/12 px-4 py-4" id={index}>
								<div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow-lg">
									<div className="flex-auto p-4">
										<div className="flex flex-wrap">
											<div className="relative w-full pr-4 max-w-full flex-grow flex-1">
												<h5 className="text-gray-800 font-bold text-xl">
													{course.name}
												</h5>
												<span className="mt-4 text-sm text-grey-500">
													{course.numberOfStudents} Students
												</span>
												<p className="mt-8">
													{generatedCode.courseID === course._id ? null : (
														<button
															className="bg-blue-800 text-white rounded p-2 text-base hover:bg-blue-500"
															onClick={() => generateCode(course._id)}
														>
															Start Class
														</button>
													)}
													{generatedCode.courseID === course._id ? (
														<div class="flex text-center flex-col items-center justify-center mt-6 mb-4">
															<label class="flex flex-col mt-6">
																<span class="text-gray-600 font-semibold">
																	Attendence Code
																</span>
																<span class="text-gray-600 font-light">
																	Share this code with the students. 
																	Students should paste this code on the Record Attendence page.
																</span>
																<input
																	type="text"
																	readOnly
																	class="form-input mt-4 text-center focus:border-purple-800 rounded"
																	value={generatedCode.attendanceCode}
																/>
															</label>

															<button
																class="mt-6 flex flex-col items-center px-2 py-4 rounded text-white cursor-pointer bg-blue-800 hover:bg-blue-400 focus:border-white"
																onClick={() => deleteCode(course._id)}
															>
																<span class="font-semibold ">End Session</span>
															</button>
														</div>
													) : null}
												</p>
											</div>

											<div className="relative w-auto pl-4 flex-initial">
												<div className=" p-3 text-center inline-flex items-center justify-center w-16 h-16">
													<svg
														class="w-16 h-16"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
														></path>
													</svg>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
export default Home;
