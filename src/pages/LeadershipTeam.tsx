import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import teamMember1 from "@/assets/team-member-1.png";
import teamMember2 from "@/assets/team-member-2.png";
import teamMember3 from "@/assets/team-member-3.png";
import teamMember4 from "@/assets/team-member-4.png";

const team = [
  { name: "Rajesh Kumar", role: "CEO & Co-founder", image: teamMember1 },
  { name: "Priya Sharma", role: "CTO", image: teamMember2 },
  { name: "Amit Verma", role: "VP Engineering", image: teamMember3 },
  { name: "Sneha Patel", role: "Head of Product", image: teamMember4 },
];

const LeadershipTeam = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <section className="relative pt-32 pb-20">
      <div className="absolute inset-0 neural-grid opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">Leadership <span className="gradient-text">Team</span></h1>
          <p className="text-lg text-muted-foreground">The people building the future of trust verification.</p>
        </div>
      </div>
    </section>
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-6 text-center border border-border/50">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default LeadershipTeam;
