"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FAQ } from "@/components/FAQ";
import { 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  ArrowLeft,
  Target
} from "lucide-react";
import Link from "next/link";
import { useAgent } from "./AgentProvider";

interface Opportunity {
  slug: string;
  title: string;
  type: "mustang" | "barndominium" | "garden";
  region: string;
  minBuyIn: number;
  estAPR: number;
  risk: "Low" | "Medium" | "High";
  summary: string;
  heroImage: string;
  highlights: string[];
}

interface OpportunityDetailsProps {
  opportunity: Opportunity;
}

const typeColors = {
  mustang: "bg-mustang",
  barndominium: "bg-sage", 
  garden: "bg-sky",
};

const typeLabels = {
  mustang: "Mustang",
  barndominium: "Barndominium",
  garden: "Garden",
};

const riskColors = {
  Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function OpportunityDetails({ opportunity }: OpportunityDetailsProps) {
  const { openDock, emit } = useAgent();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleJoinWaitlist = async () => {
    emit('lead_submit', {
      intent: 'waitlist',
      slug: opportunity.slug,
      source: 'next_steps',
      timestamp: Date.now()
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          intent: 'waitlist',
          slug: opportunity.slug,
        }),
      });

      if (response.ok) {
        alert('Successfully joined the waitlist! We\'ll notify you when this opportunity becomes available.');
      } else {
        alert('Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
      alert('Failed to join waitlist. Please try again.');
    }
  };

  const handleMeetWrangler = () => {
    emit('hero_meet_wrangler', {
      source: 'next_steps',
      slug: opportunity.slug,
      timestamp: Date.now()
    });
    openDock();
  };

  const faqs = [
    {
      question: "What is the minimum investment amount?",
      answer: `The minimum investment for this opportunity is ${formatCurrency(opportunity.minBuyIn)}. This allows you to participate in the project while maintaining a reasonable entry point.`,
    },
    {
      question: "What is the expected return timeline?",
      answer: "Returns are typically distributed quarterly, with the first distribution expected within 6-12 months of investment. The exact timeline depends on project milestones and performance.",
    },
    {
      question: "How is the risk level determined?",
      answer: `This opportunity is classified as ${opportunity.risk} risk based on factors including market conditions, project complexity, regulatory environment, and historical performance of similar investments.`,
    },
    {
      question: "Can I withdraw my investment early?",
      answer: "Early withdrawal options vary by project. Most opportunities have a minimum holding period of 12-24 months. Please review the specific terms for this investment opportunity.",
    },
    {
      question: "What makes this investment unique?",
      answer: `This ${opportunity.type} investment offers a unique opportunity to support ${opportunity.type === 'mustang' ? 'wild mustang preservation and breeding programs' : opportunity.type === 'barndominium' ? 'sustainable rural development with modern amenities' : 'community-driven agriculture and food security initiatives'} while generating competitive returns.`,
    },
    {
      question: "How does the AI wrangler help with investments?",
      answer: "Our AI wrangler can answer questions about investment opportunities, explain risk factors, help you understand the investment process, and connect you with the right resources for your investment goals.",
    },
    {
      question: "What happens after I invest?",
      answer: "After investing, you'll receive regular updates on project progress, quarterly performance reports, and have access to our investor portal where you can track your investment and communicate with the project team.",
    },
    {
      question: "Are there any tax implications?",
      answer: "Investment returns may have tax implications depending on your location and investment structure. We recommend consulting with a tax professional to understand the specific implications for your situation.",
    },
  ];

  const risks = [
    "Market volatility may affect returns",
    "Regulatory changes could impact operations",
    "Natural disasters or weather events",
    "Economic downturns affecting demand",
    "Project execution delays or cost overruns",
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/invest">
              <ArrowLeft className="h-4 w-4" />
              Back to Opportunities
            </Link>
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-4">
                <Badge className={`${typeColors[opportunity.type]} text-white border-0`}>
                  {typeLabels[opportunity.type]}
                </Badge>
                <Badge className={riskColors[opportunity.risk]}>
                  {opportunity.risk} Risk
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {opportunity.region}
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
                {opportunity.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {opportunity.summary}
              </p>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="aspect-[16/9] bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-mustang/10 to-sage/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className={`w-20 h-20 mx-auto rounded-full ${typeColors[opportunity.type]} flex items-center justify-center`}>
                    <span className="text-white font-bold text-2xl">
                      {typeLabels[opportunity.type][0]}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    {opportunity.heroImage}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Investment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Key Highlights</h4>
                      <ul className="space-y-3">
                        {opportunity.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">Investment Thesis</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        This opportunity represents a unique blend of traditional Western values 
                        and modern investment principles. By investing in {opportunity.type === "mustang" ? "mustang preservation and breeding programs" : opportunity.type === "barndominium" ? "luxury barndominium developments" : "sustainable community garden initiatives"}, 
                        you&apos;re supporting both financial returns and positive social impact.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Financials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Financial Projections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">Metric</th>
                          <th className="text-right py-3 px-4 font-semibold">Value</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-2">
                        <tr className="border-b">
                          <td className="py-3 px-4">Minimum Investment</td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {formatCurrency(opportunity.minBuyIn)}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Expected APR</td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {opportunity.estAPR}%
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Investment Term</td>
                          <td className="py-3 px-4 text-right">3-5 years</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">Distribution Frequency</td>
                          <td className="py-3 px-4 text-right">Quarterly</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">Risk Level</td>
                          <td className="py-3 px-4 text-right">
                            <Badge className={riskColors[opportunity.risk]}>
                              {opportunity.risk}
                            </Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Risks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      All investments carry risk. Please carefully consider the following factors:
                    </p>
                    <ul className="space-y-2">
                      {risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <FAQ faqs={faqs} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Investment CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Ready to Invest?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Minimum Investment</span>
                      <span className="font-semibold">{formatCurrency(opportunity.minBuyIn)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Expected APR</span>
                      <span className="font-semibold text-green-600">{opportunity.estAPR}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Risk Level</span>
                      <Badge className={riskColors[opportunity.risk]}>
                        {opportunity.risk}
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-mustang hover:bg-mustang/90 text-white">
                    Talk to an AI Wrangler
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Our AI wrangler can help you understand this opportunity 
                    and guide you through the investment process.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Next Steps Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-serif">Next Steps</CardTitle>
                <p className="text-muted-foreground">
                  Ready to take the next step? Choose how you&apos;d like to proceed.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button 
                    className="w-full bg-mustang hover:bg-mustang/90 text-white h-12"
                    onClick={handleJoinWaitlist}
                  >
                    Join Waitlist
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="w-full border-mustang text-mustang hover:bg-mustang hover:text-white h-12"
                    onClick={handleMeetWrangler}
                  >
                    Meet Your Wrangler
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Join our waitlist to be notified when this opportunity becomes available, 
                  or chat with our AI wrangler for personalized guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
