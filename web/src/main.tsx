import { SWRConfig } from "swr";
import { App } from "./app/App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { swrConfig } from "./swrConfig";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import theme from "./theme";
import ReactDOM from "react-dom/client";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Create a client
const queryClient = new QueryClient();

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <SWRConfig value={swrConfig}>
                        <ToastContainer
                            position="top-right" // Position of the toast
                            autoClose={5000} // Auto close after 5 seconds
                            hideProgressBar={false} // Show progress bar
                            newestOnTop={false} // Newest toast on top
                            closeOnClick
                            rtl={false} // Right-to-left layout
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored" // Theme can be "light", "dark", or "colored"
                        />
                        <App />
                    </SWRConfig>
                </QueryClientProvider>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);
