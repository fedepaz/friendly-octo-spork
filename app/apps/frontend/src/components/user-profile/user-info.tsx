import { useAuthContext } from "@/features/auth/providers/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";

export function UserProfileInfo() {
  const uiT = useTranslations("UserInfo");
  const { userProfile } = useAuthContext();

  if (!userProfile) return null;
  return (
    <div className="grid gap-4">
      <Card className="rounded-none border-2">
        <CardHeader className="pb-2 border-b border-border/30">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">
            {uiT("generalInfoTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pt-4">
          <div className="space-y-1">
            <Label className="text-[10px] uppercase font-bold text-muted-foreground opacity-60">{uiT("fullNameLabel")}</Label>
            <p className="text-sm font-bold tracking-tight">{userProfile.name}</p>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] uppercase font-bold text-muted-foreground opacity-60">{uiT("emailLabel")}</Label>
            <p className="text-sm font-mono font-medium">{userProfile.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
