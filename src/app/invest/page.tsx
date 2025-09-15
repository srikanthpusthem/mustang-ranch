"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OpportunityCard } from "@/components/OpportunityCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import opportunitiesData from "@/data/opportunities.json";

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

export default function InvestPage() {
  const [opportunities] = useState<Opportunity[]>(opportunitiesData as Opportunity[]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(opportunitiesData as Opportunity[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");

  useEffect(() => {
    let filtered = opportunities;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (opp) =>
          opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opp.region.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((opp) => opp.type === typeFilter);
    }

    // Region filter
    if (regionFilter !== "all") {
      filtered = filtered.filter((opp) => opp.region === regionFilter);
    }

    // Risk filter
    if (riskFilter !== "all") {
      filtered = filtered.filter((opp) => opp.risk === riskFilter);
    }

    setFilteredOpportunities(filtered);
  }, [opportunities, searchTerm, typeFilter, regionFilter, riskFilter]);

  const uniqueRegions = Array.from(new Set(opportunities.map((opp) => opp.region)));

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground">
            Investment Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover unique investment opportunities across mustangs, barndominiums, 
            and community gardens. Each opportunity is carefully vetted and offers 
            the potential for solid returns.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mb-12 border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="mustang">Mustangs</SelectItem>
                <SelectItem value="barndominium">Barndominiums</SelectItem>
                <SelectItem value="garden">Gardens</SelectItem>
              </SelectContent>
            </Select>

            {/* Region Filter */}
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {uniqueRegions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Risk Filter */}
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Risk Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="Low">Low Risk</SelectItem>
                <SelectItem value="Medium">Medium Risk</SelectItem>
                <SelectItem value="High">High Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              {filteredOpportunities.length} Opportunity{filteredOpportunities.length !== 1 ? "ies" : ""} Found
            </h2>
          </div>

          {filteredOpportunities.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredOpportunities.map((opportunity, index) => (
                <OpportunityCard
                  key={opportunity.slug}
                  opportunity={opportunity}
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center mb-4">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No opportunities found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more results.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setRegionFilter("all");
                  setRiskFilter("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
