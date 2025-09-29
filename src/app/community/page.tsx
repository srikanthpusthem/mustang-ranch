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
  experience: z.string().min(1, "Please select your experience level"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type CommunityFormData = z.infer<typeof communitySchema>;

export default function CommunityPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommunityFormData>({
    resolver: zodResolver(communitySchema),
  });

  const onSubmit = async (data: CommunityFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Form submitted successfully
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();
  };

  const communityFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Investor Network",
      description: "Connect with like-minded investors who share your passion for Western investments.",
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Expert Discussions",
      description: "Participate in discussions led by industry experts and successful investors.",
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Exclusive Events",
      description: "Attend virtual and in-person events featuring mustang sanctuaries and ranch tours.",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Local Meetups",
      description: "Find and join local investor meetups in your area.",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-serif font-bold text-foreground">
              Welcome to the Community!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for joining our community of Western investors. We&apos;ll be in touch soon 
              with information about upcoming events and opportunities.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Join Another Member
            </Button>
          </motion.div>
        </div>
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
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
            Join Our Community
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow investors, share experiences, and learn from experts 
            in the Western investment space. Be part of a community that values both 
            financial returns and positive impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Community Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground">
              What You&apos;ll Get
            </h2>
            
            <div className="space-y-6">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-mustang/10 rounded-lg flex items-center justify-center text-mustang">
                          {feature.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-foreground">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sign-up Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Join the Community</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interest">Area of Interest</Label>
                    <Select onValueChange={(value) => register("interest").onChange({ target: { value } })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary interest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mustangs">Mustangs</SelectItem>
                        <SelectItem value="barndominiums">Barndominiums</SelectItem>
                        <SelectItem value="gardens">Community Gardens</SelectItem>
                        <SelectItem value="all">All Categories</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.interest && (
                      <p className="text-sm text-red-600">{errors.interest.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Investment Experience</Label>
                    <Select onValueChange={(value) => register("experience").onChange({ target: { value } })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                        <SelectItem value="expert">Expert (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.experience && (
                      <p className="text-sm text-red-600">{errors.experience.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about yourself</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="What brings you to our community? What are you hoping to learn or achieve?"
                      rows={4}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-mustang hover:bg-mustang/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Joining..." : "Join Community"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </PageContainer>
      </div>
    </div>
  );
}
