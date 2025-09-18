"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sand via-background to-sky/20 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight"
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
                className="text-lg lg:text-xl text-muted-foreground max-w-2xl"
              >
                Invest in the future of the American West—wild Mustangs, barndominium ranch homes, 
                and community programs. Let our AI wranglers ride with you on the perfect investment.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 py-6"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2.4M</div>
                <div className="text-sm text-muted-foreground">Total Invested</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12.8%</div>
                <div className="text-sm text-muted-foreground">Avg. Returns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Investors</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="bg-mustang hover:bg-mustang/90 text-white">
                <Link href="/invest" className="flex items-center gap-2">
                  Explore Investments
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-mustang text-mustang hover:bg-mustang hover:text-white">
                <Link href="/community" className="flex items-center gap-2">
                  Join Community
                  <Users className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
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

