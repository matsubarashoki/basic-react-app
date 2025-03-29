import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import { router } from "./routes/routes";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
