import React from "react";
import { Layout } from "../../components/layout/Layout";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export const SettingsPage: React.FC = () => {
  return (
    <Layout title="Settings">
      <div className="flex flex-col gap-6">
        <Card>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Profile
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Basic settings for your classroom identity.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input label="Display name" placeholder="Your name" />
            <Input label="Email" placeholder="you@example.com" disabled />
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="secondary">Save</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Preferences
          </h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Coming soon: notification preferences, camera defaults, and more.
          </p>
        </Card>
      </div>
    </Layout>
  );
};

