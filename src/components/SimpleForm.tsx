import React, { useState } from "react";
import Swal from "sweetalert2";
import { Input } from "./ui/input";
import { z } from "zod";
import { Button } from "./ui/button";

// Define the Zod schema
const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, {
      message: "Name must be at least 3 characters",
    })
    .max(50, { message: "Name must be at most 50 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .max(50, {
      message: "Email must be at most 50 characters",
    }),
});

const SimpleForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, email };

    // Validate form data using Zod schema
    const result = schema.safeParse(formData);

    if (!result.success) {
      // Extract Zod errors
      const zodErrors: { name?: string; email?: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path[0] === "name") zodErrors.name = error.message;
        if (error.path[0] === "email") zodErrors.email = error.message;
      });
      setErrors(zodErrors);
      return;
    }

    // Process form submission here
    Swal.fire({
      title: "Success",
      html: `Form submitted successfully: <br>${name} <br>${email}`,
      icon: "success",
    });
    setName("");
    setEmail("");
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Name
        </label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email}</p>
        )}
      </div>
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
        Submit
      </Button>
    </form>
  );
};

export default SimpleForm;
