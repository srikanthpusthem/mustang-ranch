"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Home, Sprout } from "lucide-react";
import Link from "next/link";

interface PillarCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  delay?: number;
}

export function PillarCard({ title, description, icon, href, color, delay = 0 }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-8 space-y-6">
          <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center`}>
            {icon}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-h3 font-serif text-text">
              {title}
            </h3>
            <p className="text-muted text-body leading-relaxed">
              {description}
            </p>
          </div>
          
          <Button asChild variant="secondary" className="w-full group">
            <Link href={href} className="flex items-center justify-center gap-2">
              Learn More
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PillarsSection() {
  const pillars = [
    {
      title: "Mustangs",
      description: "Invest in the preservation and breeding of iconic American Mustangs. Support sanctuaries, breeding programs, and eco-tourism initiatives that celebrate these magnificent creatures.",
      icon: <Zap className="h-8 w-8 text-white" />,
      href: "/invest?type=mustang",
      color: "bg-mustang",
    },
    {
      title: "Barndominiums",
      description: "Discover unique real estate opportunities in luxury barndominium developments. Modern amenities meet rustic charm in prime locations across the American West.",
      icon: <Home className="h-8 w-8 text-white" />,
      href: "/invest?type=barndominium",
      color: "bg-sage",
    },
    {
      title: "Community Gardens",
      description: "Support sustainable agriculture and community food security through urban garden networks and heritage seed preservation programs.",
      icon: <Sprout className="h-8 w-8 text-white" />,
      href: "/invest?type=garden",
      color: "bg-sky",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-h2 lg:text-4xl font-serif text-text">
            Three Pillars of Investment
          </h2>
          <p className="text-body text-muted max-w-3xl mx-auto">
            Our platform focuses on three core investment categories that embody the 
            spirit of the American West while delivering sustainable returns.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.title}
              {...pillar}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
