import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-4xl mx-auto text-center px-6">

        <h2 className="text-5xl font-bold mb-6">
          Ready to Experience Smarter Healthcare?
        </h2>

        <p className="mb-10 text-lg">
          Join MediNexa AI and connect with healthcare services powered by artificial intelligence.
        </p>

        <Button variant="secondary">
          Get Started Today
        </Button>

      </div>
    </section>
  );
}