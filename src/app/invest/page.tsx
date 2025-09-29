"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { OpportunityCard } from "@/components/OpportunityCard";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, MessageCircle } from "lucide-react";
import opportunitiesData from "@/data/opportunities.json";
import { useAgent } from "@/components/AgentProvider";
import { PageContainer } from "@/components/PageContainer";

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
  const { openDock, emit } = useAgent();
  const [opportunities] = useState<Opportunity[]>(opportunitiesData as Opportunity[]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>(opportunitiesData as Opportunity[]);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [riskFilter, setRiskFilter] = useState<string>("any");

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem('mustang_filters_v1');
    if (savedFilters) {
      try {
        const { type, region, risk } = JSON.parse(savedFilters);
        setTypeFilter(type || "all");
        setRegionFilter(region || "");
        setRiskFilter(risk || "any");
      } catch (error) {
        console.warn('Failed to parse saved filters:', error);
      }
    }
  }, []);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    const filters = { type: typeFilter, region: regionFilter, risk: riskFilter };
    localStorage.setItem('mustang_filters_v1', JSON.stringify(filters));
  }, [typeFilter, regionFilter, riskFilter]);

  useEffect(() => {
    let filtered = opportunities;

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((opp) => opp.type === typeFilter);
    }

    // Region filter (substring match, case-insensitive)
    if (regionFilter.trim()) {
      filtered = filtered.filter((opp) => 
        opp.region.toLowerCase().includes(regionFilter.toLowerCase())
      );
    }

    // Risk filter
    if (riskFilter !== "any") {
      filtered = filtered.filter((opp) => opp.risk === riskFilter);
    }

    setFilteredOpportunities(filtered);
  }, [opportunities, typeFilter, regionFilter, riskFilter]);

  const handleWranglerChip = (chipType: string, chipValue: string) => {
    emit('find_filters_apply', {
      source: 'wrangler_hint',
      chipType,
      chipValue,
      currentFilters: { type: typeFilter, region: regionFilter, risk: riskFilter }
    });
    openDock();
  };

  const handleWranglerAction = () => {
    emit('find_filters_apply', {
      source: 'wrangler_action',
      currentFilters: { type: typeFilter, region: regionFilter, risk: riskFilter }
    });
    openDock();
  };

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
            Investment Opportunities
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover unique investment opportunities across mustangs, barndominiums, 
            and community gardens. Each opportunity is carefully vetted and offers 
            the potential for solid returns.
          </p>
        </motion.div>

        {/* Inline Wrangler Hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-gradient-to-r from-sky/10 to-sage/10 rounded-2xl p-6 mb-12 border border-sky/20"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-sky" />
                Let your AI Wrangler narrow results
              </h3>
              <p className="text-sm text-muted-foreground">
                Try these popular filters or ask for personalized recommendations
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
            <Chip
              variant="outline"
              size="sm"
              onClick={() => handleWranglerChip('type', 'mustang')}
            >
              Mustangs
            </Chip>
            <Chip
              variant="outline"
              size="sm"
              onClick={() => handleWranglerChip('type', 'barndominium')}
            >
              Barndominiums
            </Chip>
            <Chip
              variant="outline"
              size="sm"
              onClick={() => handleWranglerChip('budget', 'under_5k')}
            >
              Under $5k
            </Chip>
            <Chip
              variant="outline"
              size="sm"
              onClick={() => handleWranglerChip('risk', 'low')}
            >
              Low Risk
            </Chip>
              <Button
                onClick={handleWranglerAction}
                variant="primary"
                size="sm"
              >
                Ask Wrangler
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 mb-12 border"
        >
          <div className="space-y-6">
            {/* Type Pills */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Type</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "All" },
                  { value: "mustang", label: "Mustang" },
                  { value: "barndominium", label: "Barndominium" },
                  { value: "garden", label: "Garden" }
                ].map((option) => (
                  <Chip
                    key={option.value}
                    variant={typeFilter === option.value ? "selected" : "default"}
                    size="sm"
                    onClick={() => setTypeFilter(option.value)}
                  >
                    {option.label}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Region Input */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Region</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by region..."
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Risk Select */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Risk Level</label>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
              {filteredOpportunities.length} opportunity{filteredOpportunities.length !== 1 ? "ies" : ""} found
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
                  setTypeFilter("all");
                  setRegionFilter("");
                  setRiskFilter("any");
                }}
                variant="secondary"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>
      </PageContainer>
    </div>
  );
}
