"use client";

import {
  UserPlus,
  Brain,
  HeartHandshake,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create an Account",
    description:
      "Register securely as a patient or healthcare provider.",
  },
  {
    icon: Brain,
    title: "Use AI Services",
    description:
      "Chat with the AI assistant, translate conversations and receive health guidance.",
  },
  {
    icon: HeartHandshake,
    title: "Access Healthcare",
    description:
      "Book appointments, manage records and connect with healthcare providers.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            How MediNexa AI Works
          </h2>

          <p className="text-muted mt-4">
            Three simple steps to smarter healthcare.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="border border-border rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-6">

                  <Icon
                    size={30}
                    className="text-primary"
                  />

                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {index + 1}. {step.title}
                </h3>

                <p className="text-muted">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}