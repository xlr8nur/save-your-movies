"use client";
import CreateMovie from "@/components/CreateMovie";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="items-center justify-items-center">
      <Header />
      <CreateMovie />
    </div>
  );
}