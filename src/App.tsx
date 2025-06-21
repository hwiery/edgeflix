import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MyList from "./pages/MyList";
import SearchResults from "./pages/SearchResults";
import Genre from "./pages/Genre";
import ToastContainer from "./compoments/ToastContainer";
import { useStore } from "./store/useStore";

const queryClient = new QueryClient();

const App = () => {
  const { toasts, removeToast } = useStore();
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/my-list" element={<MyList />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/genre" element={<Genre />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* 전역 Toast 시스템 */}
        <ToastContainer 
          toasts={toasts} 
          onRemoveToast={removeToast} 
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
