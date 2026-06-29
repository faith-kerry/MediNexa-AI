import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Heading */}
      <section className="text-center mb-10">
        <h1 className="text-5xl font-bold text-primary mb-3">
          Welcome to MediNexa AI
        </h1>

        <p className="text-muted text-lg max-w-2xl">
          AI-Powered Healthcare for Everyone. Bridging communication,
          improving access to care, and empowering healthier communities.
        </p>
      </section>

      {/* Buttons */}
      <section className="flex flex-wrap justify-center gap-4 mb-12">
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

      {/* Input Components */}
      <section className="w-full max-w-md space-y-5">
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
    </main>
  );
}