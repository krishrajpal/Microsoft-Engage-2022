import React, { useState } from 'react';
import { getCourseAttendence } from '../Api/Requests.js';
import { TableData, TableInfo } from './TableData.js';
const FileDownload = require('js-file-download');

function Table(props) {
	const [courseAttendence, setCourseAttendence] = useState('');

	async function getAttendenceReport(courseId, courseName) {
		try {
			console.log('');
			const { data } = await getCourseAttendence(courseId);
			setCourseAttendence(data);
			FileDownload(data, courseName + '-Attendence.csv');
			console.log(data);
		} catch (error) {}
	}
	return (
		<>
			<div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard rounded">
				<table class="min-w-full">
					<thead>
						<tr>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base leading-4 text-blue=800 tracking-wider">
								Session Number
							</th>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								Course Name
							</th>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								Number of Students
							</th>
							<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-base font-bold leading-4 text-purple=800 tracking-wider">
								Attendence
							</th>
						</tr>
					</thead>
					<tbody class="bg-white">
						{props.data.map((course, index) => (
							<tr>
								<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
									<div class="flex items-center">
										<div>
											<div class="text-sm leading-5 text-gray-800">{index}</div>
										</div>
									</div>
								</td>
								<td class=" py-4 whitespace-no-wrap border-b border-gray-500">
									<div class="text-sm leading-5 text-blue-900">{course.name}</div>
								</td>
								<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
									{course.numberOfStudents}
								</td>
								<td class="pr-4 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">
									<button
										class="px-6 py-2 border-blue-800 border text-blue-800 rounded  hover:bg-blue-500  focus:outline-none"
										onClick={() => getAttendenceReport(course._id, course.name)}
									>
										Attendence Report
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default Table;
