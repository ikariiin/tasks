import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazyImportModule, ModuleType } from "../import";

const Signup = lazyImportModule(ModuleType.Feature, "auth/signup");
const Signin = lazyImportModule(ModuleType.Feature, "auth/signin");

export const UnAuthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* By default, redirect to the signin page */}
        <Route path="*" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};
