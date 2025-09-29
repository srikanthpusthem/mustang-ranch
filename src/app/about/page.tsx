"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Target, Users, Award } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passion for the West",
      description: "We're driven by a deep appreciation for Western heritage and the values that define the American frontier spirit.",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Sustainable Impact",
      description: "Every investment we facilitate is designed to create positive, lasting impact on communities and the environment.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community First",
      description: "We believe in building strong communities of investors who share our values and vision for the future.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence in Service",
      description: "Our AI wranglers and expert team are committed to providing exceptional guidance and support.",
    },
  ];

  return (
    <div className="min-h-screen py-20">
      <PageContainer>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 mb-20"
        >
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground">
            About Mustang Ranch
          </h1>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Visitors should immediately feel a Wild West spirit and discover opportunities 
              to invest in iconic American Mustangs, barndominium ranch houses, and community 
              programs like community gardens.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              AI agents will guide them like ranch hands or wranglers — answering questions, 
              suggesting investments, and connecting them with horse lovers worldwide.
            </p>
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-mustang/5 to-sage/5 border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                To democratize access to unique Western investment opportunities while preserving 
                the heritage and values that make the American West special. We connect investors 
                with meaningful opportunities that generate both financial returns and positive 
                social impact.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do and every investment opportunity we present.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-16 h-16 mx-auto bg-mustang/10 rounded-2xl flex items-center justify-center text-mustang">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Mustang Ranch was born from a simple observation: the American West is home to 
                  some of the most unique and valuable investment opportunities, yet they remain 
                  largely inaccessible to everyday investors.
                </p>
                <p>
                  Our founders, a group of Western enthusiasts and investment professionals, 
                  recognized the need for a platform that could bridge the gap between traditional 
                  investment markets and the untapped potential of Western assets.
                </p>
                <p>
                  Today, we&apos;re proud to offer a curated selection of investment opportunities 
                  that honor Western heritage while delivering modern financial returns. Our AI 
                  wranglers ensure that every investor receives personalized guidance tailored 
                  to their goals and values.
                </p>
              </div>
            </div>
            <div className="aspect-[4/3] bg-gradient-to-br from-mustang/10 to-sage/10 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-mustang/20 rounded-full flex items-center justify-center">
                  <Heart className="h-10 w-10 text-mustang" />
                </div>
                <div className="text-muted-foreground">
                  Story Image Placeholder
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-sage/5 to-sky/5 border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Ready to Join Our Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you&apos;re a seasoned investor or just starting your journey, 
                we&apos;re here to help you discover opportunities that align with your 
                values and financial goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-mustang hover:bg-mustang/90 text-white">
                  <Link href="/invest">
                    Explore Opportunities
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/community">
                    Join Our Community
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </PageContainer>
    </div>
  );
}
