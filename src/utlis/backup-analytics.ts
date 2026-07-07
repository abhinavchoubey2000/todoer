export const getCompletedTasks = (projects: ProjectType[]) => {
	let totalCompletedTasks = 0;
	for (const project of projects) {
		for (const section of project.sections) {
			for (const task of section.tasks) {
				if (task.completed) {
					totalCompletedTasks++;
				}
			}
		}
	}
	return totalCompletedTasks;
};

export const getCompletionPercentage = (projects: ProjectType[]) => {
	let totalCompletedTasks = 0;
	let totalTasks = 0;
	for (const project of projects) {
		for (const section of project.sections) {
			totalTasks += section.tasks.length;
			for (const task of section.tasks) {
				if (task.completed) {
					totalCompletedTasks++;
				}
			}
		}
	}

	if (totalTasks === 0) {
		return 0;
	}

	const completetionPercentage = (totalCompletedTasks / totalTasks) * 100;
	return Number(completetionPercentage.toFixed(1));
};

