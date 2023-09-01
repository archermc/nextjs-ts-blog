import { AuthBar } from "../components/AuthBar/AuthBar";
import { Dashboard } from "./dashboard/Dashboard";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <AuthBar className="AuthBar" />
      {/* TODO: Implement subscription feature which allows you to filter your 
      // home page to articles from people that you have subscribed to. */}
      <Dashboard />
    </>
  );
};

export default Home;
