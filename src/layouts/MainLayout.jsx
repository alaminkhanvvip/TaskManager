import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TaskManager from "../pages/TaskManager";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <TaskManager />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
