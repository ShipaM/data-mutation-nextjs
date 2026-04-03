"use client";
import { useFormStatus } from "react-dom";

export const FormSubmit = () => {
  const status = useFormStatus();

  console.log(status);

  if (status.pending) {
    return <p>Creating post...</p>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};
