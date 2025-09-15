"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

export function Testimonial() {
  const testimonials = [
    {
      quote: "Mustang Ranch has opened up investment opportunities I never knew existed. The AI wrangler helped me find the perfect mustang sanctuary investment that aligns with my values.",
      author: "Sarah Johnson",
      role: "Investor",
      location: "Austin, TX",
      rating: 5,
    },
    {
      quote: "The barndominium development I invested in has exceeded all expectations. The team's expertise in Western real estate is unmatched.",
      author: "Mike Chen",
      role: "Real Estate Investor",
      location: "Denver, CO",
      rating: 5,
    },
    {
      quote: "Supporting community gardens through this platform has been incredibly rewarding. I'm making a positive impact while earning solid returns.",
      author: "Emily Rodriguez",
      role: "Impact Investor",
      location: "Portland, OR",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            What Our Investors Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of investors who have discovered unique opportunities 
            through our Western investment platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="flex justify-center">
                    <Quote className="h-8 w-8 text-mustang/60" />
                  </div>
                  
                  <blockquote className="text-center text-muted-foreground leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  
                  <div className="flex justify-center">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center space-y-1">
                    <div className="font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
