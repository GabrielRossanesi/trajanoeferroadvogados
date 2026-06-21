import { WHATSAPP_NUMBER } from "@/config/constants";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path: string) {
  return `${basePath}${path}`;
}

export function whatsAppHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
