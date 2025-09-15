import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, route } = await request.json();

    // Simple deterministic responses based on route and message content
    let response = "";

    if (route === "/" || route === "/about") {
      response = "Howdy! Welcome to Mustang Ranch. I can help you explore our investment opportunities in mustangs, barndominiums, and community gardens. What interests you most?";
    } else if (route === "/invest") {
      response = "I'd be happy to help you find the perfect investment opportunity! We have mustang sanctuaries, barndominium developments, and community garden projects. What type of investment are you considering?";
    } else if (route === "/community") {
      response = "Great to see you're interested in our community! We have investor networks, expert discussions, and exclusive events. Would you like to learn more about joining our community?";
    } else if (route === "/contact") {
      response = "I'm here to help with any questions you have! You can also reach out to our team directly through the contact form. What specific information are you looking for?";
    } else if (message.toLowerCase().includes("mustang")) {
      response = "Mustang investments are a unique opportunity to support the preservation of these iconic American horses while generating returns. We have sanctuaries and breeding programs available. Would you like to learn more about our mustang opportunities?";
    } else if (message.toLowerCase().includes("barndominium")) {
      response = "Barndominiums combine modern luxury with rustic charm! Our developments offer excellent rental potential and appreciation. I can help you explore our current barndominium projects. What's your investment timeline?";
    } else if (message.toLowerCase().includes("garden") || message.toLowerCase().includes("community")) {
      response = "Community garden investments create positive social impact while generating steady returns. These projects support local food security and sustainable agriculture. Are you interested in learning more about our garden initiatives?";
    } else if (message.toLowerCase().includes("risk") || message.toLowerCase().includes("safe")) {
      response = "All our investments are carefully vetted, but risk levels vary by project. We have low-risk community gardens, medium-risk barndominiums, and higher-risk mustang breeding programs. What's your risk tolerance?";
    } else if (message.toLowerCase().includes("return") || message.toLowerCase().includes("profit")) {
      response = "Our investments typically offer 6-15% annual returns depending on the project type and risk level. Community gardens average 6-9%, barndominiums 8-12%, and mustang programs 10-15%. What return expectations do you have?";
    } else if (message.toLowerCase().includes("minimum") || message.toLowerCase().includes("invest")) {
      response = "Minimum investments vary by project - community gardens start at $1,000, barndominiums at $10,000, and mustang programs at $2,500. What's your investment budget range?";
    } else {
      response = "I'm here to help you navigate our Western investment opportunities! I can answer questions about mustangs, barndominiums, community gardens, risk levels, returns, and more. What would you like to know?";
    }

    return NextResponse.json({
      response,
      questions: [
        "What's the minimum investment amount?",
        "What are the expected returns?",
        "How do I get started?"
      ],
      suggestions: [
        "Explore mustang sanctuaries",
        "Check out barndominium developments",
        "Learn about community gardens"
      ],
      intros: [
        "Howdy! I'm your AI wrangler.",
        "Ready to explore Western investments?"
      ],
      riskCallout: "Remember, all investments carry risk. Please review our risk disclosures carefully."
    });
  } catch (error) {
    console.error("Agent API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
