"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import AvatarUpload from "@/components/AvatarUpload";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${base_url}/api/auth/register`,
        {
          userName,
          password,
          photo: photoUrl,
        },
        {
          withCredentials: true, //sends verification cookie
        }
      );

      // redirect to message
      router.push("/message");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card {...props} className="gap-3 py-4 max-w-[340px]">
      <div className="flex justify-center pt-0.5">
        <img src="/logo.png" alt="logo" className="h-8 w-auto" />
      </div>
      <CardHeader className="px-4 pt-2 pb-2 gap-1.5">
        <CardTitle className="text-lg">Create an account</CardTitle>
        <CardDescription className="text-sm">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-0">
        {/*  AVATAR UPLOAD */}
        <div className="-mb-3">
          <AvatarUpload
            folderPath="/users/avatars"
            onUploadComplete={(url) => setPhotoUrl(url)}
          />
        </div>
        <form onSubmit={handleSubmit}>
          <FieldGroup className="gap-3">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="name" className="text-sm">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="h-9"
              />
            </Field>

            <Field className="gap-1.5">
              <FieldLabel htmlFor="password" className="text-sm">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-9"
              />
              <FieldDescription className="text-xs">
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field className="gap-1.5">
              <FieldLabel htmlFor="confirm-password" className="text-sm">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-9"
              />
              <FieldDescription className="text-xs">Please confirm your password.</FieldDescription>
            </Field>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-2">
                {error}
              </p>
            )}

            <FieldGroup className="pt-2 gap-2">
              <Button disabled={loading} type="submit" className="h-9 border w-full bg-black text-white">
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <FieldDescription className="px-2 text-center text-sm">
                Already have an account? <a href="signin">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
