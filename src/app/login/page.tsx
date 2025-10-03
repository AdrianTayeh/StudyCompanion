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

export default function LoginPage() {
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

	async function onLoginEmail(values: z.infer<typeof schema>) {
		setLoading(true);
		setError(null);
		const { error } = await supabase.auth.signInWithPassword(values);
		setLoading(false);
		if (error) return setError(error.message);
		router.push("/");
	}

		async function onLoginGoogle() {
		setLoading(true);
		setError(null);
			const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/auth/callback` },
		});
		setLoading(false);
		if (error) setError(error.message);
		// For OAuth we will be redirected; no router push needed
	}

	return (
		<main className="min-h-dvh flex items-center justify-center p-6">
			<Card className="w-full max-w-sm p-6 space-y-4">
				<h1 className="text-2xl font-semibold">Log in</h1>
					<Form {...form}>
						<form className="space-y-3" onSubmit={form.handleSubmit(onLoginEmail)}>
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
								{loading ? "Logging in..." : "Log in"}
							</Button>
						</form>
					</Form>

				<div className="h-px bg-border my-2" />
				<Button variant="outline" className="w-full" onClick={onLoginGoogle}>
					Continue with Google
				</Button>

				<p className="text-sm text-muted-foreground text-center">
					Don&apos;t have an account? <Link className="underline" href="/signup">Sign up</Link>
				</p>
			</Card>
		</main>
	);
}
