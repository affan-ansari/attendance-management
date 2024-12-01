import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { IPunchInAlertProps } from "./punch-in-alert.types";
import { Button, Typography, Alert, AlertTitle } from "@mui/material";
import { selectCurrentUser } from "../../login-form-components/login-form/authSlice";

import * as attendanceService from "../user-dashboard-overview.service";

import "./punch-in-alert.styles.scss";

const PunchInAlert: React.FC<IPunchInAlertProps> = ({ mutateAttendance }) => {
    const currentUser = useAppSelector(selectCurrentUser);
    const [firstName, setFirstName] = useState<string | undefined>("");

    const handlePunchIn = async () => {
        await attendanceService.punchIn();
        mutateAttendance();
    };

    useEffect(() => {
        setFirstName(currentUser?.firstName);
    }, [currentUser]);

    return (
        <Alert
            className="punch-in-alert__alertContainer"
            severity="info"
            action={
                <Button
                    className="punch-in-alert__title"
                    color="inherit"
                    size="small"
                    onClick={handlePunchIn}
                >
                    Punch in attendance
                </Button>
            }
        >
            <AlertTitle className="punch-in-alert__title">Welcome back {firstName}!</AlertTitle>
            <Typography variant="body2"> Are you ready to punch in your attendance?</Typography>
        </Alert>
    );
};

export default PunchInAlert;
