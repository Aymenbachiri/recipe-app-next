"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "/public/recipe-book.png";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();

  return (
    <div className="h-[100px] w-full z-20 p-8 bg-[#bbb] sticky top-0 flex justify-between items-center">
      <Link className="hidden md:block" href="/">
        <Image
          src={logo}
          alt="logo"
          width={50}
          height={50}
          className="cursor-pointer"
        />{" "}
      </Link>
      <div className="hidden md:flex">
        <ul className="md:flex md:items-center md:gap-20 hidden">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/recipes">Recipes</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
          {session.status === "authenticated" && (
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          )}
          {session.status === "unauthenticated" && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden block">
        <ul className="flex items-center w-full h-full pt-8 gap-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/recipes">Recipes</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/create">Create</Link>
          </li>
          {session.status === "authenticated" && (
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          )}
          {session.status === "unauthenticated" && (
            <li>
              <Link href="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
