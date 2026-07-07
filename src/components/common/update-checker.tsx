import UpdateModal from "@/components/common/update-modal";
import { UPDATE_VERSION } from "@/constants/update";
import { backupCompletedTasks } from "@/redux/slices/analytics";
import { setLastSeenUpdateVersion } from "@/redux/slices/settings";
import { RootState } from "@/redux/store";
import { getCompletedTasks } from "@/utlis/backup-analytics";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpdateChecker = () => {
	const dispatch = useDispatch();

	const { lastSeenUpdateVersion } = useSelector(
		(state: RootState) => state.Settings,
	);
	const { projects } = useSelector((state: RootState) => state.Project);

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (lastSeenUpdateVersion !== UPDATE_VERSION) {
			setIsVisible(true);
		}
	}, [lastSeenUpdateVersion]);

	const handleClose = () => {
		dispatch(setLastSeenUpdateVersion(UPDATE_VERSION));

		// Backup the Total Completed Tasks
		const completedTasks = getCompletedTasks(projects);
		dispatch(backupCompletedTasks(completedTasks));
		setIsVisible(false);
	};

	return <UpdateModal isVisible={isVisible} onClose={handleClose} />;
};

export default React.memo(UpdateChecker);
