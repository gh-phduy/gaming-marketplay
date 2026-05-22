import type { Metadata } from "next";
import NewsCard from "../../components/home/NewsCard";
import { NEWS_ARTICLES, getNewsArticleHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: "News - Difmark",
  description: "Read the latest sample gaming news and marketplace updates.",
};

export default function NewsPage() {
  return (
    <main
      id="main-content"
      className="flex w-full justify-center px-8 py-10 800:px-0"
    >
      <section className="responsive" aria-labelledby="news-page-heading">
        <h1
          id="news-page-heading"
          className="mb-8 text-2xl font-bold text-dm-text-primary uppercase"
        >
          Latest News
        </h1>

        <div className="grid gap-7 800:grid-cols-2 1200:grid-cols-3 1920:grid-cols-4">
          {NEWS_ARTICLES.map((article) => (
            <NewsCard
              key={article.slug}
              image={article.image}
              timeAgo={article.timeAgo}
              title={article.title}
              excerpt={article.excerpt}
              views={article.views}
              href={getNewsArticleHref(article.slug)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
