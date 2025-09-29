"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp, Users, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useAgent } from "./AgentProvider";

export function Hero() {
  const { openDock, emit } = useAgent();

  const handleMeetWrangler = () => {
    emit('hero_meet_wrangler', {
      source: 'hero_cta',
      timestamp: Date.now()
    });
    openDock();
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Skyline gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand via-background to-sky/20" />
      
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/5 via-transparent to-transparent" />
      
      {/* Decorative SVG - Mustang silhouette */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none" aria-hidden="true">
        <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 120C20 120 40 100 60 110C80 120 100 100 120 110C140 120 160 100 180 110C180 110 190 120 190 130L20 130C20 130 20 120 20 120Z" fill="currentColor" className="text-mustang"/>
          <path d="M30 100C30 100 50 80 70 90C90 100 110 80 130 90C150 100 170 80 190 90C190 90 200 100 200 110L30 110C30 110 30 100 30 100Z" fill="currentColor" className="text-mustang"/>
          <path d="M40 80C40 80 60 60 80 70C100 80 120 60 140 70C160 80 180 60 200 70C200 70 210 80 210 90L40 90C40 90 40 80 40 80Z" fill="currentColor" className="text-mustang"/>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-h1 lg:text-6xl font-serif text-text"
              >
                Invest in the{" "}
                <span className="text-mustang font-extrabold">
                  New West
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-body lg:text-xl text-muted max-w-2xl"
              >
                Invest in the future of the American West—wild Mustangs, barndominium ranch homes, 
                and community programs. Let our AI wranglers ride with you on the perfect investment.
              </motion.p>
            </div>

            {/* Sample Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 py-6"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2.4M</div>
                <div className="text-small text-muted">Sample Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12.8%</div>
                <div className="text-small text-muted">Sample Returns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">150+</div>
                <div className="text-small text-muted">Sample Investors</div>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-small text-muted text-center italic"
            >
              Sample metrics (illustrative)
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild variant="primary" size="lg">
                <Link href="/invest" className="flex items-center gap-2">
                  Explore Investments
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                onClick={handleMeetWrangler}
                variant="secondary" 
                size="lg"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Meet Your Wrangler
              </Button>
            </motion.div>
            
            {/* Helper text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-small text-muted text-center"
            >
              No financial advice—educational only
            </motion.p>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-mustang/10 to-sage/10 p-8">
              {/* Placeholder for hero image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-mustang/20 to-sage/20 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-mustang/20 rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-mustang" />
                  </div>
                  <div className="text-muted-foreground">
                    Hero Image Placeholder
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center"
              >
                <TrendingUp className="h-8 w-8 text-sage" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-sky/20 rounded-full flex items-center justify-center"
              >
                <Users className="h-6 w-6 text-sky" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

