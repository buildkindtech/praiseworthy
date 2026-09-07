"use client";

import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { type VariantProps } from "class-variance-authority";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { withBasePath } from "@/lib/seo";

type WeChatQrButtonProps = {
  label: string;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export default function WeChatQrButton({
  label,
  className,
  variant = "default",
  size = "default",
}: WeChatQrButtonProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant={variant} size={size} className={className} />
        }
      >
        <MessageCircle className="h-5 w-5" />
        {label}
      </DialogTrigger>
      <DialogContent className="max-w-[min(92vw,460px)] rounded-[28px] border border-brand-navy/10 bg-brand-surface p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="font-heading text-2xl text-brand-text">
            微信联系
          </DialogTitle>
          <DialogDescription className="text-brand-muted">
            扫描下方二维码添加微信，我们会尽快回复您。
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-6">
          <div className="overflow-hidden rounded-[24px] border border-brand-navy/10 bg-white p-4 shadow-sm">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px]">
              <Image
                src={withBasePath("/images/contact/wechat-qr.webp")}
                alt="Praise Worthy Roofing WeChat QR code for roofing inspection contact"
                fill
                sizes="(min-width: 768px) 340px, 80vw"
                className="object-contain"
              />
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-brand-muted">
            如果您在手机上浏览，可直接截图后在微信中识别二维码。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
