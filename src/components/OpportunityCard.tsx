"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, DollarSign, TrendingUp } from "lucide-react";
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

interface OpportunityCardProps {
  opportunity: Opportunity;
  delay?: number;
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

export function OpportunityCard({ opportunity, delay = 0 }: OpportunityCardProps) {
  const { emit } = useAgent();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCardClick = () => {
    emit('invest_card_click', {
      slug: opportunity.slug,
      title: opportunity.title,
      type: opportunity.type,
      region: opportunity.region,
      minBuyIn: opportunity.minBuyIn,
      estAPR: opportunity.estAPR,
      risk: opportunity.risk,
      timestamp: Date.now()
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Image placeholder */}
        <div className="aspect-[16/9] bg-gradient-to-br from-muted/50 to-muted/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-mustang/10 to-sage/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className={`w-12 h-12 mx-auto rounded-full ${typeColors[opportunity.type]} flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">
                  {typeLabels[opportunity.type][0]}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {opportunity.heroImage}
              </div>
            </div>
          </div>
          
          {/* Type badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${typeColors[opportunity.type]} text-white border-0`}>
              {typeLabels[opportunity.type]}
            </Badge>
          </div>
          
          {/* Risk badge */}
          <div className="absolute top-4 right-4">
            <Badge className={riskColors[opportunity.risk]}>
              {opportunity.risk} Risk
            </Badge>
          </div>
        </div>

        <CardHeader className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-xl font-serif font-bold text-foreground line-clamp-2">
              {opportunity.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {opportunity.region}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-muted-foreground line-clamp-3">
            {opportunity.summary}
          </p>

          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Min. Investment
              </div>
              <div className="font-semibold text-foreground">
                {formatCurrency(opportunity.minBuyIn)}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Est. APR
              </div>
              <div className="font-semibold text-foreground">
                {opportunity.estAPR}%
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Key Highlights</h4>
            <ul className="space-y-1">
              {opportunity.highlights.slice(0, 2).map((highlight, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <Button asChild className="w-full group" onClick={handleCardClick}>
            <Link href={`/invest/${opportunity.slug}`} className="flex items-center justify-center gap-2">
              View Details
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
