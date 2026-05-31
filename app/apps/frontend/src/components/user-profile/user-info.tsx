// src/components/user-profile/user-info.tsx

import { useAuthContext } from "@/features/auth/providers/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

export function UserProfileInfo() {
  const { userProfile } = useAuthContext();

  if (!userProfile) return null;
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold font-sans">
            Información General
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 font-serif">
          <div>
            <Label className="text-muted-foreground">Nombre Full</Label>
            <p className="text-base font-medium">{userProfile.name}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">Email</Label>
            <p className="text-base font-medium">{userProfile.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
