"use client";
import withAuth from "@/privateRoute/WithAuth";
import React from "react";
function Dashboard() {
  return (
    <section className="min-h-screen">
      <h1 className="text-red-500 font-extrabold text-3xl ">
        Welcome to Dashboard!
      </h1>
    </section>
  );
}

export default Dashboard;
