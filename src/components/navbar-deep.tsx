"use client";
import React from "react";
import Link from "next/link";

export function Navbar() {
  return (
    <section>
      <nav>
        <div>
          <Link href="/">
            <div>
              <span>Home</span>
            </div>
          </Link>
          <div>
            <Link href="/about">
              <div>
                <span>About</span>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/contact">
              <div>
                <span>Contact</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </section>
  );
}
