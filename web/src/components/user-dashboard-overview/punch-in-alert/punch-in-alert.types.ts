import { KeyedMutator } from "swr";
import { IAttendanceData } from "../user-dashboard-overview.types";

export interface IPunchInAlertProps {
    mutateAttendance: KeyedMutator<IAttendanceData[] | undefined>;
}
