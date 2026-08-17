"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">DealChat & Messages</h1>
          <p className="text-sm text-slate-600 mt-1">
            Negotiate task scope, clarify requirements, and coordinate agreements directly with peers.
          </p>
        </div>

        <Card className="min-h-[400px] flex items-center justify-center">
          <CardContent className="w-full">
            <EmptyState
              icon={<MessageSquare className="w-8 h-8 text-indigo-500" />}
              title="No active conversations"
              description="Your direct messaging conversations regarding SkillTasks will appear here once you apply or receive applications."
            />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
