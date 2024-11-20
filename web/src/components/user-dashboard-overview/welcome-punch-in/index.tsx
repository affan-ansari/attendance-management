import { InfoOutlined } from "@mui/icons-material";
import { Box, Button, Typography, Alert, AlertTitle } from "@mui/material";

const USER_PLACEHOLDER = "Affan";

const WelcomePunchIn = () => {
    return (
        <Alert
            severity="info"
            action={
                <Button color="inherit" size="small" sx={{ fontWeight: 600 }}>
                    Punch in attendance
                </Button>
            }
        >
            <AlertTitle sx={{ fontWeight: 600 }}> Welcome back {USER_PLACEHOLDER}! </AlertTitle>
            <Typography variant="body2"> Are you ready to punch in your attendance?</Typography>
        </Alert>
    );
};

export default WelcomePunchIn;
