"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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

const riskColors = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  High: "bg-red-100 text-red-800 border-red-200",
};

const riskColorsDark = {
  Low: "dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
  Medium: "dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
  High: "dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
};

export function OpportunityCard({ opportunity, delay = 0 }: OpportunityCardProps) {
  const { emit } = useAgent();

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
      whileHover={{ y: -2 }}
    >
      <Card className="h-full group hover:border-accent/50 transition-all duration-200">
        <CardContent className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-h3 font-serif text-text line-clamp-2 group-hover:text-accent transition-colors">
            {opportunity.title}
          </h3>
          
          {/* 1-line summary */}
          <p className="text-muted text-small line-clamp-2">
            {opportunity.summary}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-small text-muted">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {opportunity.region}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <DollarSign className="h-3 w-3" />
              ${opportunity.minBuyIn.toLocaleString()}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {opportunity.estAPR}% APR
            </span>
          </div>

          {/* Risk badge */}
          <div className="flex items-center justify-between">
            <Badge 
              variant="outline" 
              className={`${riskColors[opportunity.risk]} ${riskColorsDark[opportunity.risk]} text-small`}
            >
              {opportunity.risk} Risk
            </Badge>
            <Link 
              href={`/invest/${opportunity.slug}`}
              className="text-accent hover:text-accent/80 text-small font-medium flex items-center gap-1 group-hover:gap-2 transition-all"
              onClick={handleCardClick}
            >
              View details
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <ul className="space-y-1">
              {opportunity.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="text-small text-muted flex items-start gap-2">
                  <span className="text-accent mt-1 flex-shrink-0">•</span>
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}