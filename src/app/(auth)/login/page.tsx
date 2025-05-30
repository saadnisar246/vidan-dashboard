"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AuthenticationPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Dummy credentials check
    if (email === "vidan@email.com" && password === "vidan123") {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials below to login your account
        </p>
      </div>
      <div className="grid gap-6">
        <form className="grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email" className="pl-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              className="bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-1 relative">
            <label htmlFor="password" className="pl-1">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoCorrect="off"
              className="bg-background pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-muted-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-500 pl-1">{error}</p>}

          <Button type="submit" disabled={isLoading} className="cursor-pointer">
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
