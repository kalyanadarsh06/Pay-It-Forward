// Sourced world-state figures used by Earthy's opening. Keep the source and date with every number.
// Update cadence: when the publishing body releases a new edition. Never round in a way the source wouldn't.
window.PIF_WORLD = {
  retrieved: "2026-10-22",
  figures: [
    {
      id: "poverty",
      value: 808000000,
      line: "people live on less than $3 a day",
      source: "World Bank projection for 2025, after the June 2025 poverty-line update",
      url: "https://ourworldindata.org/grapher/projections-extreme-poverty-wb"
    },
    {
      id: "children",
      value: 4800000,
      line: "children died before their fifth birthday in 2023",
      source: "UN Inter-agency Group for Child Mortality Estimation, March 2025",
      url: "https://data.unicef.org/resources/levels-and-trends-in-child-mortality-2024/"
    },
    {
      id: "water",
      value: 2100000000,
      line: "people lack safely managed drinking water",
      source: "WHO/UNICEF Joint Monitoring Programme, August 2025, 2024 data",
      url: "https://www.who.int/teams/environment-climate-change-and-health/water-sanitation-and-health/monitoring-and-evidence/wash-monitoring"
    },
    {
      id: "displaced",
      value: 117800000,
      line: "people are forcibly displaced from their homes",
      source: "UNHCR Global Trends, June 2026, end-2025 data",
      url: "https://www.unhcr.org/sites/default/files/2026-06/global-trends-report-2025.pdf"
    }
  ],
  closer: {
    text: "Closer to home: about one in three GoFundMe campaigns is for medical bills.",
    source: "GoFundMe's own figure; an independent study of 2010–2018 campaigns put it at 26.7%",
    url: "https://beckershospitalreview.com/finance/medical-bills-account-for-1-in-3-gofundme-campaigns.html"
  }
};
