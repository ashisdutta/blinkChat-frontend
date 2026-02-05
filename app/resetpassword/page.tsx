import { Suspense } from "react";
import { ForgotPasswordForm } from "@/components/reset-password-form"
export const dynamic = 'force-dynamic';
export default function ResetPassword() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
            <Suspense fallback={<div>Loading...</div>}>
                <ForgotPasswordForm />
            </Suspense>
        </div>
        </div>
    )
}
