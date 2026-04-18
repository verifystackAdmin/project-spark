import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPostList } from "@/data/blogPosts";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Insights, tips, and updates from the VerifyStack team.
            </p>
          </div>

          <div className="space-y-8">
            {blogPostList.map((post, i) => (
              <article
                key={post.slug ?? `draft-${i}`}
                className="p-6 md:p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="text-xs text-muted-foreground">· {post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{post.title}</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                {post.slug ? (
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Read more <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    Full article coming soon <ArrowRight className="w-4 h-4 opacity-50" />
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
