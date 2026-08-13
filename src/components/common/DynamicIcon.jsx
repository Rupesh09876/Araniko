/**
 * DynamicIcon — renders a lucide-react icon by string name.
 * Usage: <DynamicIcon name="Phone" size={18} strokeWidth={1.8} />
 *
 * All icons used across the site are imported here for tree-shaking.
 */
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CalendarDays,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Stethoscope,
  HeartPulse,
  Ambulance,
  ShieldCheck,
  Activity,
  Microscope,
  Pill,
  Scissors,
  Search,
  Users,
  Baby,
  Bone,
  ScanLine,
  Ear,
  Sparkles,
  Brain,
  Droplets,
  PersonStanding,
  TriangleAlert,
  ClipboardList,
  CreditCard,
  Info,
  CheckCircle,
  Navigation,
  Shield,
  GraduationCap,
  Building2,
} from "lucide-react";
import FacebookIcon from "./FacebookIcon";

const icons = {
  Phone,
  Mail,
  MapPin,
  Clock,
  CalendarDays,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Stethoscope,
  HeartPulse,
  Ambulance,
  ShieldCheck,
  Activity,
  Microscope,
  Pill,
  Scissors,
  Search,
  Users,
  Baby,
  Bone,
  ScanLine,
  Ear,
  Sparkles,
  Brain,
  Droplets,
  PersonStanding,
  TriangleAlert,
  ClipboardList,
  CreditCard,
  Info,
  CheckCircle,
  Facebook: FacebookIcon,
  Navigation,
  Shield,
  GraduationCap,
  Building2,
};

export default function DynamicIcon({ name, size = 20, strokeWidth = 2, className = "", color }) {
  const Icon = icons[name];
  if (!Icon) return null;
  return <Icon size={size} strokeWidth={strokeWidth} className={className} color={color} />;
}
