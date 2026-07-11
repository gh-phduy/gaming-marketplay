"use client";

import Image from "next/image";
import { Star, UserCheck, UserPlus, Users } from "lucide-react";
import type { SellerFollower } from "../seller-profile.data";
import { useTranslations } from "next-intl";

interface SellerPeoplePanelProps {
  title: string;
  emptyMessage: string;
  people: SellerFollower[];
  onNotify: (message: string) => void;
}

export default function SellerPeoplePanel({
  title,
  emptyMessage,
  people,
  onNotify,
}: SellerPeoplePanelProps) {
  const t = useTranslations("user");

  if (people.length === 0) {
    return (
      <section className="rounded-lg border border-midnight-700 bg-midnight-800 px-4 py-10 text-center text-steel-500">
        {emptyMessage}
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-midnight-700 bg-midnight-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-midnight-700 text-forest-500">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="text-sm text-steel-500">{people.length} {t("profiles")}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {people.map((person) => (
          <article
            key={person.id}
            className="rounded-lg border border-midnight-700 bg-midnight-800 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-midnight-700">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-white">
                    {person.name}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-steel-500">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-amber-400" />
                      {person.rank}
                    </span>
                    <span>{person.location}</span>
                    <span>{person.currency}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onNotify(
                    person.isFollowing ? t("unfollowUser") : t("followUser"),
                  )
                }
                className={`inline-flex h-9 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-bold transition ${
                  person.isFollowing
                    ? "bg-midnight-650 text-white hover:bg-midnight-600"
                    : "bg-forest-500 text-midnight-950 hover:bg-forest-100"
                }`}
              >
                {person.isFollowing ? (
                  <UserCheck className="h-4 w-4" />
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                {person.isFollowing ? t("following") : t("follow")}
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md bg-midnight-750 px-3 py-2">
                <p className="text-steel-500">{t("followers")}</p>
                <p className="mt-1 font-bold text-white">
                  {person.followers.toLocaleString("en-US")}
                </p>
              </div>
              <div className="rounded-md bg-midnight-750 px-3 py-2">
                <p className="text-steel-500">{t("reviews")}</p>
                <p className="mt-1 font-bold text-white">
                  {person.totalReviews.toLocaleString("en-US")}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
