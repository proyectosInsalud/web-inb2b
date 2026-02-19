"use client";

import { useEffect } from "react";
import AOS from "aos";

export function AOSInit() {
  useEffect(() => {
    AOS.init();
  }, []);
  return null;
}
