"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { admin } from "@/actions/admin";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="flex flex-col space-y-4">
            <RoleGate allowedRole="ADMIN">
              <FormSuccess message="You are allowed to see this content!" />
            </RoleGate>
            <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
              <p className="text-sm font-medium">Admin-only API Route</p>
              <Button onClick={onApiRouteClick}>Click to test</Button>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg p-3 border shadow-md">
              <p className="text-sm font-medium">Admin-only Server Action</p>
              <Button onClick={onServerActionClick}>Click to test</Button>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
