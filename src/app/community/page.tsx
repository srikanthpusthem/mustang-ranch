"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MessageCircle, Calendar, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageContainer } from "@/components/PageContainer";

const communitySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  interest: z.string().min(1, "Please select an area of interest"),
  experience: z.string().optional(),
  message: z.string().max(500, "Message cannot exceed 500 characters").optional(),
});

type CommunityFormValues = z.infer<typeof communitySchema>;

export default function CommunityPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommunityFormValues>({
    resolver: zodResolver(communitySchema),
  });

  const onSubmit = async (_data: CommunityFormValues) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Form submitted successfully
    setIsSubmitted(true);
    reset();
  };

  const communityFeatures = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "AI Wrangler Support",
      description: "Get personalized guidance and insights from our intelligent AI agents.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Exclusive Events",
      description: "Access webinars, workshops, and virtual meetups with experts and fellow investors.",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Local Chapters",
      description: "Connect with Mustang Ranch members in your region for local initiatives and gatherings.",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20">
        <PageContainer>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <div className="w-16 h-16 mx-auto bg-accent-alt/10 rounded-full flex items-center justify-center text-accent-alt">
              <Users className="h-8 w-8" />
            </div>
            <h1 className="text-h1 font-serif text-text">
              Welcome to the Community!
            </h1>
            <p className="text-body text-muted">
              Thank you for your interest in joining the Mustang Ranch community. We&apos;ll be in touch shortly!
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="primary">
              Join Another Member
            </Button>
          </motion.div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <PageContainer>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-h1 font-serif text-text">
            Join Our Community
          </h1>
          <p className="text-body text-muted max-w-3xl mx-auto">
            Connect with like-minded investors, share insights, and grow together in the spirit of the New West.
          </p>
        </motion.div>

        {/* Community Features */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <Card className="h-full bg-surface border-border shadow-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                      {feature.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-h3 font-semibold text-text">
                        {feature.title}
                      </h3>
                      <p className="text-small text-muted">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Sign-up Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-surface border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-h2 font-serif text-text text-center">Sign Up Today</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-small text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-small text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interest">Area of Interest</Label>
                  <Select onValueChange={(value) => register("interest").onChange({ target: { value } })} >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mustangs">Mustangs</SelectItem>
                      <SelectItem value="barndominiums">Barndominiums</SelectItem>
                      <SelectItem value="gardens">Community Gardens</SelectItem>
                      <SelectItem value="general">General Investment</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.interest && (
                    <p className="text-small text-red-600">{errors.interest.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Investment Experience (Optional)</Label>
                  <Select onValueChange={(value) => register("experience").onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="experienced">Experienced</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-small text-red-600">{errors.experience.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about yourself (Optional)</Label>
                  <Textarea id="message" {...register("message")} rows={4} />
                  {errors.message && (
                    <p className="text-small text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  variant="primary"
                >
                  {isSubmitting ? "Joining..." : "Join Community"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </PageContainer>
    </div>
  );
}