interface InitialProjectStateInterface {
	projects: ProjectType[];
}

type ProjectType = {
	projectId: string;
	projectTitle: string;
	projectDescription?: string;
	theme: ThemeType;
	icon: IconType;
	sections: SectionType[];
};

type SectionType = {
	sectionId: string;
	sectionTitle: string;
	isOpened: boolean;
	tasks: TaskType[];
};

type TaskType = {
	taskId: string;
	taskTitle: string;
	taskDescription?: string;
	completed: boolean;
	priority: PrioritiesType;
};

type ThemeType = {
	id: string;
	color: {
		surface: string;
		background: string;
		icon: string;
	};
};

type IconType = {
	id: string;
	name: Ionicons;
};

type PrioritiesType = {
	id: string;
	name: "high" | "medium" | "low";
	color: string;
};
