import React from "react";

export default function Footer() {
  return (
    <div className="flex justify-between items-center h-12 m-8">
      <div>&copy;2024 AYMEN BACHIRI, All Rights Reserved</div>
      <div className="flex items-center gap-4">
        <a href="/">Portfolio</a>
        <a href="/">LinkedIn</a>
      </div>
    </div>
  );
}
