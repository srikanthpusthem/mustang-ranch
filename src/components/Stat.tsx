"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Award } from "lucide-react";

export function Stat() {
  const stats = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      value: "$2.4M",
      label: "Total Invested",
      description: "Across all opportunities",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      value: "12.8%",
      label: "Average Returns",
      description: "Annual percentage yield",
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "150+",
      label: "Active Investors",
      description: "Growing community",
    },
    {
      icon: <Award className="h-8 w-8" />,
      value: "24",
      label: "Successful Projects",
      description: "Completed investments",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-mustang/5 to-sage/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Platform Performance
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our track record speaks for itself. Join a platform that delivers 
            consistent results across all investment categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto bg-mustang/10 rounded-2xl flex items-center justify-center text-mustang">
                {stat.icon}
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
