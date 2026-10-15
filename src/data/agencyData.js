export const AGENCY_INFO = {
  name: "AgentPulse AI",
  shortName: "AgentPulse",
  tagline: "Autonomous AI Agents Built for Main Street & Local Enterprises",
  heroSubtitle: "We engineer, automate, and deploy bespoke multi-agent AI workforces that run your phone dispatch, 24/7 customer booking, supply reordering, and field estimates—saving hundreds of hours every month.",
  stats: [
    { label: "Phone & Chat Inquiries Handled", value: "2.4M+", change: "+140% YoY" },
    { label: "Avg. Resolution Time", value: "< 18s", change: "Sub-second response" },
    { label: "Monthly Labor Cost Saved", value: "$6.8K", change: "Per business location" },
    { label: "Zero-Missed-Lead Guarantee", value: "99.8%", change: "24/7 availability" },
  ]
};

export const INDUSTRIES = [
  {
    id: "restaurant",
    name: "Restaurants & Hospitality",
    tagline: "Never miss a takeout order or dinner reservation during peak rush.",
    badge: "Food & Beverage",
    icon: "Utensils",
    heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-amber-500/20 to-orange-500/20 border-orange-500/30 text-orange-400",
    glowColor: "rgba(249, 115, 22, 0.2)",
    agents: [
      {
        title: "Voice Phone Hostess & Reservationist",
        desc: "Answers incoming calls on ring 1, handles reservations via OpenTable/Resy, quotes accurate wait times, and answers menu & allergy questions.",
        impact: "Zero lost calls on Friday nights"
      },
      {
        title: "Omnichannel Takeout Dispatcher",
        desc: "Takes phone and WhatsApp orders directly into Toast or Square POS with accurate modifier handling and automated card-on-file SMS checkout.",
        impact: "Saves 15+ host hours weekly"
      },
      {
        title: "Predictive Inventory & Par-Level Bot",
        desc: "Syncs weekend weather, upcoming reservations, and historical sales to generate pre-filled vendor purchase orders for meat, dairy, and produce.",
        impact: "-28% food waste & spoil"
      },
      {
        title: "Reputation & Review Responder",
        desc: "Detects Google, Yelp, and DoorDash reviews instantly. Drafts warm, customized responses and alerts managers to negative feedback within 60 seconds.",
        impact: "+0.6 Google star rating average"
      }
    ],
    integrations: ["Toast POS", "Square", "OpenTable", "Resy", "DoorDash Drive", "Sysco API", "7shifts"],
    sampleMetric: "$4,200/mo avg labor & lost order recovery",
    interactivePrompts: [
      {
        userPrompt: "Hi, I need a table for 6 this Saturday at 7:30 PM for a birthday dinner. Can you accommodate a gluten allergy?",
        agentThought: "Checking table inventory for Saturday 19:30, party size 6. Verifying allergen protocols.",
        agentAction: "API Call: Resy API (Table #14 & #15 available). Tagged: [Allergy: Celiac / Gluten].",
        agentResponse: "Hello! We'd love to host your birthday celebration! I have a wonderful booth available this Saturday at 7:30 PM. I've noted the gluten allergy directly on your reservation so our chef and lead server prepare dedicated gluten-free options. Shall I confirm this under your name and mobile number?"
      },
      {
        userPrompt: "Can I order 2 Truffle Burgers medium-rare with sweet potato fries and an iced matcha for curbside pickup in 25 mins?",
        agentThought: "Kitchen load is moderate. Prep time is 18 minutes. Item modifiers valid.",
        agentAction: "API Call: Toast POS [Order #4829 Created]. SMS payment link generated.",
        agentResponse: "You got it! 2 Truffle Burgers (cooked medium-rare) with sweet potato fries and 1 iced matcha latte. Your total is $42.50. I just sent a secure 1-tap Apple Pay/card link to your mobile. Pull up to curbside Bay #3 in 25 minutes and our runner will hand it straight to your window!"
      }
    ]
  },
  {
    id: "fashion",
    name: "Clothing & Fashion Retail",
    tagline: "Turn window shoppers into VIP loyalists with 24/7 AI personal stylists.",
    badge: "Retail & Apparel",
    icon: "ShoppingBag",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-pink-500/20 to-purple-500/20 border-pink-500/30 text-pink-400",
    glowColor: "rgba(236, 72, 153, 0.2)",
    agents: [
      {
        title: "24/7 AI Stylist & Fit Concierge",
        desc: "Interacts on Instagram DM, web chat, and SMS to match customer body measurements, event dress codes, and aesthetic preferences with in-stock pieces.",
        impact: "3.4x higher conversion rate"
      },
      {
        title: "Multi-Store Omnichannel Inventory Sync",
        desc: "Monitors physical boutique racks and Shopify warehouse stock. Triggers automated store-to-store transfers and low-stock backorders.",
        impact: "Prevents overselling across channels"
      },
      {
        title: "Frictionless Return & Exchange Concierge",
        desc: "Processes exchange requests via photo upload, suggests better-fitting sizes instantly, and generates prepaid QR return codes without human intervention.",
        impact: "-65% support ticket volume"
      },
      {
        title: "VIP Back-in-Stock & Capsule Bot",
        desc: "Remembers customer favorite designers, denim sizes, and past purchases to send personalized 1-on-1 lookbook drops before general release.",
        impact: "+44% repeat purchase rate"
      }
    ],
    integrations: ["Shopify Plus", "Lightspeed", "Klaviyo", "Instagram Graph API", "Gorgias", "Loop Returns"],
    sampleMetric: "+38% online & in-store cross-sell revenue",
    interactivePrompts: [
      {
        userPrompt: "I'm attending an outdoor June wedding in Tuscany. What do you have in size M that won't wrinkle easily in a suitcase?",
        agentThought: "Context: Outdoor Summer Wedding, Tuscany (Smart Formal). Material: Linen-blend, silk modal, wrinkle-resistant twill. Inventory size Medium.",
        agentAction: "Query: Shopify Product DB [Filter: Size M, Category: Midi/Maxi Dress, Wrinkle-Resistant].",
        agentResponse: "How exciting! For Tuscany in June, I highly recommend our Riviera Silk-Modal Wrap Dress in Sage Green ($185) or the Breathable Structured Linen Blazer Set in Oat. Both are tailored for Mediterranean heat and pack like a dream. Would you like me to hold size M in our downtown boutique for you to try on today, or ship it to your home?"
      },
      {
        userPrompt: "The boots I bought last week are slightly snug across the toe box. Can I swap for an 8.5?",
        agentThought: "Lookup Order by customer phone. Verify item is unworn. Check stock for size 8.5.",
        agentAction: "API Call: Inventory Reserved (Size 8.5). Created Return QR label.",
        agentResponse: "No problem at all! I have placed size 8.5 on 48-hour hold for you. I've sent a QR return code to your phone—just drop off the current pair at any USPS or bringing it to our counter, and your new 8.5 boots will be handed right over with no restocking fees!"
      }
    ]
  },
  {
    id: "grocery",
    name: "Grocery Stores & Fresh Markets",
    tagline: "Streamline customer order pick-lists, smart restocking, and supplier price negotiation.",
    badge: "Supermarkets & Bodegas",
    icon: "Apple",
    heroImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.2)",
    agents: [
      {
        title: "WhatsApp & SMS Grocery Order Assembler",
        desc: "Customers text handwritten grocery lists or photo receipts. The agent parses items, maps to store aisle coordinates, and dispatches pick-lists to staff.",
        impact: "4x faster curbside fulfillment"
      },
      {
        title: "Produce Freshness & Markdown Optimizer",
        desc: "Analyzes produce shelf intake dates and temperature logs to automatically discount ripening fruit by 30% on digital shelf tags and local SMS alerts.",
        impact: "-40% produce shrinkage"
      },
      {
        title: "Wholesale Vendor Price Watcher",
        desc: "Cross-examines weekly distributor price sheets across 6 food purveyors to automatically route dairy, beverage, and bulk orders to the cheapest vendor.",
        impact: "Saves $2,900/mo on wholesale invoices"
      },
      {
        title: "Local Specialty Request Concierge",
        desc: "Tracks customer requests for niche organic, halal, kosher, or international items. Alerts buyers when demand threshold hits purchase minimums.",
        impact: "+22% community basket size"
      }
    ],
    integrations: ["NCR Counterpoint", "Shopify POS", "WhatsApp Business", "Instacart Enterprise", "QuickBooks", "Electronic Shelf Labels (ESL)"],
    sampleMetric: "45 minutes saved per grocery pick-run",
    interactivePrompts: [
      {
        userPrompt: "Here's my list: 2 cartons almond milk, 3 organic avocados, honeycrisp apples, sourdough loaf, and do you have fresh dill today?",
        agentThought: "NLP parse raw list. Check inventory aisle mapping: Dairy [Aisle 2], Produce [Aisle 1], Bakery [Aisle 4]. Verify fresh dill stock in herb cooler.",
        agentAction: "Batch Aisle Pick Ticket generated. Herb sensor: Dill 14 bunches in stock.",
        agentResponse: "Got your list! Yes, we received crisp fresh organic dill this morning. I've routed your 5 items to our market floor pickers in Aisle 1, 2, and 4. Your order will be bagged and chilled in our front pick-up locker in 35 minutes. Total estimate: $24.80. Confirm order?"
      }
    ]
  },
  {
    id: "mechanic",
    name: "Auto Mechanic & Repair Shops",
    tagline: "Turn diagnostic codes into booked repair bays while updating car owners automatically.",
    badge: "Automotive Services",
    icon: "Wrench",
    heroImage: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.2)",
    agents: [
      {
        title: "Voice Service Receptionist & Bay Scheduler",
        desc: "Answers callers describing vehicle symptoms or OBD-II check engine codes, books appointments by technician specialization and lift availability.",
        impact: "Captures 100% of after-hours tow & repair leads"
      },
      {
        title: "Automated Parts Sourcing & Comparison",
        desc: "When a technician logs diagnostic findings, the agent queries AutoZone Commercial, NAPA, and Worldpac for OEM/aftermarket pricing and delivery times.",
        impact: "-45 minutes parts desk research per job"
      },
      {
        title: "Customer Status SMS & Photo Approvals",
        desc: "Sends real-time vehicle inspection photos, itemized labor/parts breakdowns, and collects digital signature approvals directly via smartphone.",
        impact: "Estimates approved 3x faster"
      },
      {
        title: "Mileage-Based Preventive Maintenance Bot",
        desc: "Syncs customer car history to send timely reminders for timing belts, brake flushes, and state inspections based on driven mileage calculations.",
        impact: "+52% recurring bay utilization"
      }
    ],
    integrations: ["Mitchell1", "Shopmonkey", "Tekmetric", "ALLDATA", "NAPA TRACS", "Twilio Voice"],
    sampleMetric: "Zero phone tag during noisy shop hours",
    interactivePrompts: [
      {
        userPrompt: "My 2018 Subaru Outback has a squealing noise when braking and the brake pedal feels spongy. Can I drop it off tomorrow morning?",
        agentThought: "Vehicle: 2018 Subaru Outback. Symptoms: Squealing + spongy pedal indicates worn pads and potential brake fluid air/leak. Check Bay #2 (Brake Tech) schedule.",
        agentAction: "API Call: Shopmonkey [Reserved Drop-off Slot: Tomorrow 8:00 AM]. Allocated: Courtesy Loaner Vehicle #2.",
        agentResponse: "A spongy pedal combined with squealing usually indicates worn brake pads and possibly air or low fluid in your brake hydraulic line. We have an inspection slot open with our lead brake technician tomorrow at 8:00 AM. We can also provide a free courtesy shuttle to your office. Would you like me to book this drop-off?"
      },
      {
        userPrompt: "Can you give me a status on the transmission flush for the Ford F-150?",
        agentThought: "Match caller phone to active Repair Order #8921. Status: Completed test drive, technician washing vehicle.",
        agentAction: "Query: Tekmetric Live RO. Status: [Quality Check Passed].",
        agentResponse: "Your 2021 F-150 has completed its transmission flush and final fluid diagnostic check. Everything tested within factory spec! Tech Dave is just running it through our complimentary wash bay right now. It will be 100% ready for pickup at our front counter by 3:30 PM."
      }
    ]
  },
  {
    id: "realestate",
    name: "Real Estate & Brokerages",
    tagline: "Qualify high-net-worth buyers in 30 seconds and book private property tours 24/7.",
    badge: "Property & Leasing",
    icon: "Building2",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-indigo-500/20 to-sky-500/20 border-indigo-500/30 text-indigo-400",
    glowColor: "rgba(99, 102, 241, 0.2)",
    agents: [
      {
        title: "24/7 Inbound Lead Qualifier & MLS Matcher",
        desc: "Engages Zillow, Realtor.com, and yard-sign QR leads within 15 seconds. Verifies budget, financing pre-approval, and timeline before scheduling agents.",
        impact: "89% reduction in unqualified showings"
      },
      {
        title: "Autonomous Showing & Lockbox Coordinator",
        desc: "Coordinates buyer schedules, verifies agent credentials, sends SentriLock/Supra codes, and auto-requests showing feedback 1 hour post-tour.",
        impact: "Saves 12+ administrative hours per agent"
      },
      {
        title: "Listing Dossier & Social Media Publisher",
        desc: "Takes photography and MLS data to produce formatted property booklets, virtual tour highlight scripts, and multi-platform advertising copy.",
        impact: "Listings launched in 2 hours instead of 2 days"
      },
      {
        title: "Tenant Screening & Lease Renewal Agent",
        desc: "For property managers: automates background check invites, tracks upcoming 90-day lease expiries, and negotiates automated renewals with market rent adjustments.",
        impact: "98% timely lease retention rate"
      }
    ],
    integrations: ["Follow Up Boss", "Zillow Premier Agent", "MLS Direct API", "Dotloop", "DocuSign", "Calendly", "AppFolio"],
    sampleMetric: "Instant response on $1.5M+ property inquiries",
    interactivePrompts: [
      {
        userPrompt: "I saw the yard sign for 742 Evergreen Terrace. What's the asking price, square footage, and can I see it this Sunday afternoon?",
        agentThought: "Property match: 742 Evergreen Terrace. Price: $895,000. 4 Bed / 3 Bath / 2,850 sqft. Sunday showings: 2:00 PM - 5:00 PM open slots.",
        agentAction: "Verified MLS Active status. Pre-screening: Pre-approval status inquiry.",
        agentResponse: "742 Evergreen Terrace is listed at $895,000. It's a gorgeous 4-bed, 3-bath craftsman with 2,850 sq ft, a newly remodeled chef's kitchen, and a heated saltwater pool. I have private tour slots available this Sunday at 2:30 PM or 4:00 PM with listing partner Sarah. Are you currently pre-approved or purchasing all-cash?"
      }
    ]
  },
  {
    id: "construction",
    name: "Construction & Contractors",
    tagline: "Automate material quote take-offs, sub-contractor dispatch, and safety compliance.",
    badge: "Builders & Trades",
    icon: "Hammer",
    heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80",
    secondaryImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    accentColor: "from-amber-600/20 to-yellow-500/20 border-yellow-500/30 text-yellow-400",
    glowColor: "rgba(234, 179, 8, 0.2)",
    agents: [
      {
        title: "Subcontractor Dispatch & Jobsite Check-in",
        desc: "Sends daily SMS notifications to electricians, framers, and plumbers with geofenced jobsite check-in, site parking directions, and safety briefs.",
        impact: "Zero lost days from missed contractor coordination"
      },
      {
        title: "Material Take-Off & Supplier Quote Bot",
        desc: "Ingests architectural PDF plans and generates material itemization lists, submitting them to 4 local lumber & concrete suppliers for competitive pricing.",
        impact: "Saves 18 hours per estimate bid"
      },
      {
        title: "OSHA & Daily Safety Compliance Logger",
        desc: "Prompts project managers for daily weather, crew counts, and hazard photos via voice memo, automatically generating compliant daily logs.",
        impact: "100% audit-ready project documentation"
      },
      {
        title: "Change Order & Client Milestone Invoicing",
        desc: "Captures verbal change requests from clients on site, estimates cost impact, and issues 1-tap electronic sign-off requests to prevent billing disputes.",
        impact: "Eliminates $25k+ annual unbilled scope creep"
      }
    ],
    integrations: ["Procore", "Buildertrend", "PlanGrid", "QuickBooks Construction", "Twilio SMS", "Autodesk BIM 360"],
    sampleMetric: "3.2x faster turnaround on commercial project bids",
    interactivePrompts: [
      {
        userPrompt: "We need an estimate for framing and drywalling a 2,200 sqft residential basement addition in Oakridge.",
        agentThought: "Scope: Basement addition 2,200 sqft. Trades: Framing + Drywall + Insulation. Prompt for ceiling height and bathroom rough-ins.",
        agentAction: "Created Lead Record in Buildertrend. Estimating calculation model primed.",
        agentResponse: "Thanks for reaching out! For a 2,200 sqft basement framing and drywall package, typical turnarounds are 12-14 business days. To generate a guaranteed preliminary cost range, could you share the ceiling height (8ft or 9ft) and if the layout includes any wet bar or bathroom rough-ins? You can also upload your PDF floor plans directly."
      }
    ]
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Domain Intelligence & Tool Discovery",
    desc: "We analyze your specific small business workflows, existing software (POS, CRM, phone lines, booking systems), and customer interaction transcripts.",
    badge: "Architecture Phase"
  },
  {
    step: "02",
    title: "Bespoke Agent Model Training",
    desc: "We tune specialized autonomous LLMs with your exact pricing, policies, staff schedules, and zero-hallucination boundary guardrails.",
    badge: "Custom Engineering"
  },
  {
    step: "03",
    title: "Real-Time Omnichannel Integration",
    desc: "We connect the agents to your phone lines (Twilio Voice AI), WhatsApp, SMS, Google Business chat, and backend software with live webhooks.",
    badge: "Full Integration"
  },
  {
    step: "04",
    title: "Autonomous Execution with Human Handoff",
    desc: "Agents handle 85-95% of tasks completely autonomously. If an edge-case arises, it seamlessly escalates to your staff with full transcript context.",
    badge: "24/7 Peace of Mind"
  }
];

export const CLIENT_STORIES = [
  {
    client: "Bistro Botanica Group",
    industry: "High-Volume Restaurant Group",
    quote: "Our hosts used to spend 4 hours every Friday night answering phone calls about parking, reservations, and takeout. AgentPulse's voice agent handles it all with zero wait times. Our seat occupancy jumped 18% in month one.",
    author: "Elena Rostova",
    role: "Managing Operating Partner",
    metric: "+$24,000/mo",
    metricLabel: "Recovered reservation & takeout revenue",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
  },
  {
    client: "Apex Performance & Diesel",
    industry: "Independent Automotive Center",
    quote: "In a noisy garage, mechanics can't pick up phones. AgentPulse answers every call, diagnoses customer trouble codes over voice, and books their bays right into Tekmetric. We're running at 98% capacity.",
    author: "Marcus Vance",
    role: "Lead Master Technician & Owner",
    metric: "0 Missed Calls",
    metricLabel: "100% after-hours lead conversion",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    client: "Veritas Construction Partners",
    industry: "General Contracting & Residential",
    quote: "Subcontractor scheduling was our biggest headache. Now an AI agent texts all trades at 6 AM, checks jobsite arrivals, and coordinates material deliveries. Job delays have dropped to near zero.",
    author: "David Sterling",
    role: "VP of Field Operations",
    metric: "-70% Admin Time",
    metricLabel: "18+ hours saved per project superintendent",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  }
];

export const CAPABILITIES_BENTO = [
  {
    title: "Sub-400ms Ultra-Low Latency Voice AI",
    desc: "Natural, interruption-friendly voice agents that speak with human intonation, local accents, and zero robotic awkward pauses.",
    tag: "Voice Engine",
    span: "col-span-12 lg:col-span-8"
  },
  {
    title: "Zero-Hallucination Guardrails",
    desc: "Strict deterministic deterministic constraints ensure agents never promise discounts, invent menu items, or misquote job estimates.",
    tag: "Enterprise Safety",
    span: "col-span-12 lg:col-span-4"
  },
  {
    title: "Bi-Directional POS & CRM Sync",
    desc: "Real-time read and write webhooks into Toast, Square, Shopify, Mitchell1, Follow Up Boss, Procore, and QuickBooks.",
    tag: "Deep Integrations",
    span: "col-span-12 lg:col-span-4"
  },
  {
    title: "95+ Languages with Dialect Fluency",
    desc: "Serve non-English speaking customers seamlessly. The agent detects language on call greeting and switches dialect in real-time.",
    tag: "Multilingual",
    span: "col-span-12 lg:col-span-4"
  },
  {
    title: "Instant Human Fallback & Escalation",
    desc: "If an upset customer asks for a supervisor, the agent immediately transfers the call to a designated cell phone with summarized notes.",
    tag: "Safety Net",
    span: "col-span-12 lg:col-span-4"
  }
];
