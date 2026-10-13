import { SignUpButton } from "@clerk/nextjs";
import { BarChart3, Link2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Link2,
    title: "Short, shareable links",
    description:
      "Turn any long URL into a clean short link that is easy to share anywhere.",
  },
  {
    icon: Zap,
    title: "Instant redirects",
    description:
      "Visitors are sent to the destination quickly, with no extra steps.",
  },
  {
    icon: BarChart3,
    title: "Manage in one dashboard",
    description:
      "View, edit, and delete all of your links from a single personal dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Secure and private",
    description:
      "Sign in securely. Your links are tied to your account and only you can manage them.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-16 px-6 py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Shorten links. Share them anywhere.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Create short, memorable links in seconds and manage them all from one
          simple dashboard.
        </p>
        <SignUpButton mode="modal">
          <Button size="lg">Get started for free</Button>
        </SignUpButton>
      </section>
      <section className="flex flex-col gap-8">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          Everything you need
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <li key={title} className="flex flex-col gap-2 rounded-xl border p-6">
              <Icon className="size-6" aria-hidden />
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
