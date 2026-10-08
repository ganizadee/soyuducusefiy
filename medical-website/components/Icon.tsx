import {
  Award,
  Baby,
  Bell,
  Bone,
  Brain,
  CalendarCheck,
  Clock,
  Droplet,
  Ear,
  Eye,
  FileText,
  FlaskConical,
  HeartPulse,
  Hospital,
  ScanLine,
  ShieldCheck,
  Smile,
  Stethoscope,
  Users,
  Venus,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/site";

const icons: Record<IconName, LucideIcon> = {
  heart: HeartPulse,
  brain: Brain,
  baby: Baby,
  venus: Venus,
  scan: ScanLine,
  flask: FlaskConical,
  stethoscope: Stethoscope,
  smile: Smile,
  eye: Eye,
  ear: Ear,
  bone: Bone,
  droplet: Droplet,
  calendar: CalendarCheck,
  file: FileText,
  video: Video,
  bell: Bell,
  shield: ShieldCheck,
  award: Award,
  wallet: Wallet,
  hospital: Hospital,
  users: Users,
  clock: Clock,
};

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={1.8} aria-hidden="true" />;
}
