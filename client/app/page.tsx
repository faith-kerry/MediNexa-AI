import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

import {
  HeartPulse,
  Brain,
  Hospital,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-8 py-16">

      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-primary mb-4">
          Welcome to MediNexa AI
        </h1>

        <p className="text-muted text-lg">
          AI-Powered Healthcare for Everyone
        </p>
      </section>

      <section className="flex justify-center gap-4 mb-16 flex-wrap">
        <Button variant="primary">
          Get Started
        </Button>

        <Button variant="secondary">
          Learn More
        </Button>

        <Button variant="outline">
          Contact Us
        </Button>

        <Button loading>
          Loading
        </Button>
      </section>

      <section className="max-w-md mx-auto space-y-5 mb-20">

        <Input
          label="Full Name"
          placeholder="Enter your full name"
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="you@example.com"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

      </section>

      <section className="grid md:grid-cols-3 gap-8">

        <Card
          icon={<HeartPulse size={30} />}
          title="Digital Health"
          description="Access your health records, appointments, prescriptions, and AI assistance all in one secure place."
        />

        <Card
          icon={<Brain size={30} />}
          title="AI Health Assistant"
          description="Receive intelligent health guidance, multilingual communication, and personalized support powered by AI."
        />

        <Card
          icon={<Hospital size={30} />}
          title="Connected Healthcare"
          description="Connect patients, doctors, hospitals, pharmacies, and caregivers through one unified healthcare platform."
        />

      </section>

    </main>
  );
}