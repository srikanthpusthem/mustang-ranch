import { notFound } from "next/navigation";
import { Metadata } from "next";
import { OpportunityDetails } from "@/components/OpportunityDetails";
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

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return opportunitiesData.map((opportunity) => ({
    slug: opportunity.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const opportunity = opportunitiesData.find(
    (opp) => opp.slug === params.slug
  ) as Opportunity | undefined;

  if (!opportunity) {
    return {
      title: "Opportunity Not Found",
    };
  }

  return {
    title: `${opportunity.title} - Mustang Ranch`,
    description: opportunity.summary,
    openGraph: {
      title: `${opportunity.title} - Mustang Ranch`,
      description: opportunity.summary,
      type: "website",
    },
  };
}

export default function OpportunityPage({ params }: PageProps) {
  const opportunity = opportunitiesData.find(
    (opp) => opp.slug === params.slug
  ) as Opportunity | undefined;

  if (!opportunity) {
    notFound();
  }

  return <OpportunityDetails opportunity={opportunity} />;
}
