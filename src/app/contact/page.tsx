"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageContainer } from "@/components/PageContainer";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message cannot exceed 500 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormValues) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Form submitted successfully
    setIsSubmitted(true);
    reset();
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "info@mustangranch.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "+1 (555) 123-4567",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Our Location",
      description: "123 Ranch Road, Wild West, TX 78901",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      description: "Mon-Fri: 9 AM - 5 PM (MST)",
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
              <Mail className="h-8 w-8" />
            </div>
            <h1 className="text-h1 font-serif text-text">
              Message Sent!
            </h1>
            <p className="text-body text-muted">
              Thank you for reaching out. We&apos;ll get back to you as soon as possible.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="primary">
              Send Another Message
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
            Get in Touch
          </h1>
          <p className="text-body text-muted max-w-3xl mx-auto">
            Have questions or want to learn more? Reach out to us using the form below or through our contact details.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {contactInfo.map((info, index) => (
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
                      {info.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-h3 font-semibold text-text">
                        {info.title}
                      </h3>
                      <p className="text-small text-muted">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-surface border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-h2 font-serif text-text text-center">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={(value) => register("subject").onChange({ target: { value } })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="investment">Investment Opportunities</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-small text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" {...register("message")} rows={5} />
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
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </PageContainer>
    </div>
  );
}