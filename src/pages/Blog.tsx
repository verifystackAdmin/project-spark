import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "5 Red Flags to Watch for When Dating Online",
    excerpt: "Online dating has made it easier than ever to meet new people — but it's also made it easier for dishonest individuals to hide their true identity. Here are the top red flags you should never ignore.",
    date: "January 10, 2026",
    category: "Safety Tips",
    readTime: "4 min read",
  },
  {
    title: "Why Background Verification Is the New Normal in Relationships",
    excerpt: "Trust is the foundation of every relationship. With AI-powered verification, you can now confirm someone's identity, employment, and social history before making life-changing decisions.",
    date: "January 22, 2026",
    category: "Insights",
    readTime: "5 min read",
  },
];

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
            {blogPosts.map((post, i) => (
              <article key={i} className="p-6 md:p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="text-xs text-muted-foreground">· {post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{post.title}</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline cursor-pointer">
                  Read more <ArrowRight className="w-4 h-4" />
                </span>
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
