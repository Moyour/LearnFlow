import { Brain, Code, PaintbrushVertical, TrendingUp } from "lucide-react";

const skills = [
  {
    icon: Brain,
    title: "Design Methodologies",
    items: ["ADDIE Model", "SAM (Successive Approximation)", "Design Thinking", "Agile Learning Design"],
    color: "purple"
  },
  {
    icon: Code,
    title: "Development Tools", 
    items: ["Articulate Storyline 360", "Articulate Rise", "Adobe Creative Suite", "Vyond & Video Production"],
    color: "purple"
  },
  {
    icon: PaintbrushVertical,
    title: "UX & Design",
    items: ["User Experience Design", "Visual Design", "Prototyping", "Accessibility Standards"],
    color: "green"
  },
  {
    icon: TrendingUp,
    title: "Technology & Analytics",
    items: ["xAPI & SCORM", "Learning Analytics", "LMS Integration", "Mobile Learning"],
    color: "orange"
  }
];

const colorClasses = {
  purple: "bg-purple-100 text-brand-purple",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600"
};

export default function SkillsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-slate mb-4">Skills & Methodologies</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Leveraging proven instructional design frameworks and cutting-edge technologies to create effective learning experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="text-center space-y-4" data-testid={`skill-${index}`}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${colorClasses[skill.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-brand-slate" data-testid={`skill-title-${index}`}>
                  {skill.title}
                </h3>
                <ul className="space-y-2 text-slate-600">
                  {skill.items.map((item, itemIndex) => (
                    <li key={itemIndex} data-testid={`skill-item-${index}-${itemIndex}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
