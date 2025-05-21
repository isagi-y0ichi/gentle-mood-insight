
import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SignUpModal from "../SignUpModal";

const LandingNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup">("login");

  const openLoginModal = () => {
    setModalType("login");
    setIsModalOpen(true);
  };

  const openSignupModal = () => {
    setModalType("signup");
    setIsModalOpen(true);
  };

  return (
    <nav className="py-4 px-6 lg:px-12 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4A90E2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span className="font-bold text-xl">MindChat</span>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={openLoginModal} className="rounded-2xl">
          Login
        </Button>
        <Button onClick={openSignupModal} className="bg-primary hover:bg-primary/90 rounded-2xl">
          Sign Up
        </Button>
      </div>

      {isModalOpen && (
        <SignUpModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialView={modalType}
        />
      )}
    </nav>
  );
};

export default LandingNavbar;
