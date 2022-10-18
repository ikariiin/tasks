import React from "react";

export const DefaultSuspense = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>{children}</React.Suspense>
  );
};
