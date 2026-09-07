"use client";

import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { Mic2, ExternalLink, CheckCircle } from "lucide-react";

const RADIO_VIDEO_URL = "https://youtu.be/D3-Mh_sWkvA?si=kP9YSmKUUigzEgDl";
const RADIO_EMBED_URL = "https://www.youtube.com/embed/D3-Mh_sWkvA";

const trustPoints = [
  "방송에서 소개된 Class 3 업그레이드 내용까지 직접 확인해보실 수 있습니다.",
  "DFW 현지에서 실제로 활동하는 로컬 루핑 팀인지 한국어로 먼저 판단해보실 수 있습니다.",
  "처음 문의하시기 전에 팀 분위기와 서비스 방향을 한 번에 확인하실 수 있습니다.",
];

export default function KoreanRadioFeature() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <Badge className="mb-4 rounded-full border border-brand-orange/20 bg-brand-orange/10 text-brand-orange">
              <Mic2 className="mr-2 h-3.5 w-3.5" />
              Dalkora 라디오 출연
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-brand-text md:text-4xl">
              한국 라디오에서 소개된
              <br />
              Praise Worthy와 혜택 내용을 먼저 확인해보세요
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-muted">
              처음 맡기는 루핑 업체라서 망설여지신다면, 한국인들이 자주 듣는
              Dalkora 라디오에서 소개된 Praise Worthy 이야기를 먼저
              확인해보세요. 팀에 대한 신뢰감은 물론, 영상에서 언급된 Class 3
              업그레이드 내용도 함께 확인하실 수 있어 문의 전에 훨씬 안심하고
              판단하실 수 있습니다.
            </p>

            <div className="mt-8 space-y-3">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-[20px] bg-brand-surface px-4 py-3"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-success" />
                  <p className="text-sm leading-6 text-brand-text">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <LinkButton
                href={RADIO_VIDEO_URL}
                target="_blank"
                rel="noreferrer"
                size="lg"
                className="rounded-full border border-brand-navy/15 bg-brand-navy px-8 py-6 text-base font-semibold text-white hover:bg-brand-navy/92"
              >
                혜택 내용까지 영상으로 확인하기
                <ExternalLink className="ml-2 h-4 w-4" />
              </LinkButton>
            </div>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-brand-navy/8 bg-brand-surface shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
            <div className="aspect-video w-full">
              <iframe
                src={RADIO_EMBED_URL}
                title="Praise Worthy on Dalkora radio"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
