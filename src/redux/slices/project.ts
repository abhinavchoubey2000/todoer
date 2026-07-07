import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialProjectStateInterface = {
	projects: [],
};

export const projectSlice = createSlice({
	initialState,
	name: "projectSlice",
	reducers: {
		// Project specific actions
		addProject(state, action) {
			state.projects.push(action.payload);
		},
		editProject(state, action) {
			const { projectId, project } = action.payload;
			const currentProject = state.projects.find(
				(p) => p.projectId === projectId,
			);
			if (currentProject) {
				Object.assign(currentProject, project);
			}
		},
		deleteProject(state, action) {
			const { projectId } = action.payload;

			state.projects = state.projects.filter((p) => p.projectId !== projectId);
		},
		clearData(state) {
			state.projects = [];
		},

		// Section specific actions
		addSection(state, action) {
			const { projectId, section } = action.payload;
			const project = state.projects.find((p) => p.projectId === projectId);
			if (project) {
				project.sections.push(section);
			}
		},
		editSection(state, action) {
			const { projectId, section } = action.payload;
			const project = state.projects.find((p) => p.projectId === projectId);
			if (project) {
				const currentSection = project.sections.find(
					(s) => s.sectionId === section.sectionId,
				);
				if (currentSection) {
					Object.assign(currentSection, section);
				}
			}
		},
		deleteSection(state, action) {
			const { projectId, sectionId } = action.payload;
			const project = state.projects.find((p) => p.projectId === projectId);
			if (project) {
				project.sections = project.sections.filter(
					(s) => s.sectionId !== sectionId,
				);
			}
		},
		toggleSection(state, action) {
			const { projectId, sectionId } = action.payload;
			const project = state.projects.find((p) => p.projectId === projectId);
			if (project) {
				const section = project.sections.find((s) => s.sectionId === sectionId);
				if (section) {
					section.isOpened = !section.isOpened;
				}
			}
		},

		// Task specific actions
		addTask(state, action) {
			const { projectId, sectionId, task } = action.payload;
			const project = state.projects.find((p) => p.projectId === projectId);
			if (project) {
				const section = project.sections.find((s) => s.sectionId === sectionId);
				if (section) {
					section.tasks.push(task);
				}
			}
		},
		editTask(state, action) {
			const { projectId, sectionId, task } = action.payload;
			const project = state.projects.find((p) => p.projectId === projectId);
			if (project) {
				const section = project.sections.find((s) => s.sectionId === sectionId);
				if (section) {
					const currentTask = section.tasks.find(
						(t) => t.taskId === task.taskId,
					);
					if (currentTask) {
						Object.assign(currentTask, task);
					}
				}
			}
		},
		toggleTaskCompletion(state, action) {
			const { projectId, sectionId, taskId } = action.payload;
			const project = state.projects.find((p) => p.projectId === projectId);
			if (project) {
				const section = project.sections.find((s) => s.sectionId === sectionId);
				if (section) {
					const task = section.tasks.find((t) => t.taskId === taskId);
					if (task) {
						task.completed = !task.completed;
					}
				}
			}
		},
		deleteTask(state, action) {
			const { projectId, sectionId, taskId } = action.payload;
			const project = state.projects.find((p) => p.projectId === projectId);
			if (project) {
				const section = project.sections.find((s) => s.sectionId === sectionId);
				if (section) {
					section.tasks = section.tasks.filter((t) => t.taskId !== taskId);
				}
			}
		},
	},
});

export const {
	// Project
	addProject,
	editProject,
	deleteProject,
	clearData,
	// Section
	addSection,
	editSection,
	deleteSection,
	toggleSection,
	// Task
	addTask,
	editTask,
	toggleTaskCompletion,
	deleteTask,
} = projectSlice.actions;
