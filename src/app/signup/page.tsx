"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function SignupPage() {
	const router = useRouter();
	const supabase = createClient();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

		const schema = z.object({
			email: z.string().email(),
			password: z.string().min(6, "Password must be at least 6 characters"),
		})

		const form = useForm<z.infer<typeof schema>>({
			resolver: zodResolver(schema),
			defaultValues: { email: "", password: "" },
		})

		async function onSignupEmail(values: z.infer<typeof schema>) {
		setLoading(true);
		setError(null);
			const { error } = await supabase.auth.signUp(values);
		setLoading(false);
		if (error) return setError(error.message);
		router.push("/");
	}

	async function onSignupGoogle() {
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/auth/callback` },
		});
		setLoading(false);
		if (error) setError(error.message);
	}

	return (
		<main className="min-h-dvh flex items-center justify-center p-6">
			<Card className="w-full max-w-sm p-6 space-y-4">
				<h1 className="text-2xl font-semibold">Sign up</h1>
					<Form {...form}>
						<form className="space-y-3" onSubmit={form.handleSubmit(onSignupEmail)}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="you@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="••••••••" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{error && <p className="text-sm text-destructive">{error}</p>}
							<Button disabled={loading} className="w-full" type="submit">
								{loading ? "Creating account..." : "Create account"}
							</Button>
						</form>
					</Form>

				<div className="h-px bg-border my-2" />
				<Button variant="outline" className="w-full" onClick={onSignupGoogle}>
					Continue with Google
				</Button>

				<p className="text-sm text-muted-foreground text-center">
					Already have an account? <Link className="underline" href="/login">Log in</Link>
				</p>
			</Card>
		</main>
	);
}
