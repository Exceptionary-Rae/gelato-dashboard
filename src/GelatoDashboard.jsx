import { useState } from "react";

const FLAVORS = [
  { name: "Pistachio", predicted: 42, actual: 38, trend: "up" },
  { name: "Stracciatella", predicted: 35, actual: 33, trend: "up" },
  { name: "Mango Sorbetto", predicted: 28, actual: null, trend: "up" },
  { name: "Dark Chocolate", predicted: 22, actual: 19, trend: "down" },
  { name: "Vanilla Bean", predicted: 20, actual: 18, trend: "flat" },
  { name: "Lemon Basil", predicted: 15, actual: null, trend: "new" },
];

const CAMPAIGNS = [
  {
    id: 1,
    type: "weather",
    title: "Heat wave SMS blast",
    desc: "Tomorrow hits 94°F — send 'Beat the heat' offer to 312 nearby customers",
    channel: "SMS",
    status: "pending",
    est_revenue: "$280-420",
    cost: "$8.40",
  },
  {
    id: 2,
    type: "slow",
    title: "Tuesday afternoon booster",
    desc: "Forecast: 40% slower than average 2-5pm. Trigger 'Happy Hour: 15% off' push",
    channel: "Email + SMS",
    status: "pending",
    est_revenue: "$90-150",
    cost: "$3.20",
  },
  {
    id: 3,
    type: "loyalty",
    title: "Win-back: 8 lapsed regulars",
    desc: "Haven't visited in 16+ days. Send personalized 'We saved your favorite scoop' message",
    channel: "SMS",
    status: "pending",
    est_revenue: "$120-180",
    cost: "$2.10",
  },
  {
    id: 4,
    type: "social",
    title: "Instagram: New flavor drop",
    desc: "Post Lemon Basil launch with behind-the-scenes reel caption",
    channel: "Instagram",
    status: "pending",
    est_revenue: "Brand awareness",
    cost: "$0",
  },
];

const WEEKLY = [
  { day: "Mon", rev: 620, cust: 84 },
  { day: "Tue", rev: 480, cust: 62 },
  { day: "Wed", rev: 710, cust: 96 },
  { day: "Thu", rev: 550, cust: 73 },
  { day: "Fri", rev: 890, cust: 118 },
  { day: "Sat", rev: 1240, cust: 165 },
  { day: "Sun", rev: 1080, cust: 142 },
];

const INSIGHTS = [
  { icon: "↗", text: "Pistachio outsells forecast by 12% on weekends", color: "#1D9E75" },
  { icon: "⚠", text: "Dark Chocolate trending down — consider seasonal swap", color: "#BA7517" },
  { icon: "★", text: "3 customers hit 10+ visits — auto-reward triggered", color: "#534AB7" },
  { icon: "📍", text: "Farmers market Saturday: expect 30% traffic boost", color: "#D85A30" },
];

const Bar = ({ value, max, color }) => (
  <div style={{ flex: 1, height: 8, background: "#e8e6df", borderRadius: 4 }}>
    <div
      style={{
        width: `${(value / max) * 100}%`,
        height: "100%",
        background: color,
        borderRadius: 4,
        transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
      }}
    />
  </div>
);

const Pill = ({ children, bg, fg }) => (
  <span
    style={{
      display: "inline-block",
      padding: "2px 10px",
      borderRadius: 99,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.02em",
      background: bg,
      color: fg,
    }}
  >
    {children}
  </span>
);

const channelColor = (ch) => {
  if (ch.includes("SMS")) return { bg: "#E6F1FB", fg: "#0C447C" };
  if (ch.includes("Email")) return { bg: "#EEEDFE", fg: "#3C3489" };
  if (ch.includes("Instagram")) return { bg: "#FAECE7", fg: "#712B13" };
  return { bg: "#F1EFE8", fg: "#444441" };
};

export default function GelatoDashboard() {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS);
  const [tab, setTab] = useState("today");

  const approve = (id) =>
    setCampaigns((c) =>
      c.map((x) => (x.id === id ? { ...x, status: "approved" } : x))
    );
  const reject = (id) =>
    setCampaigns((c) =>
      c.map((x) => (x.id === id ? { ...x, status: "rejected" } : x))
    );

  const maxRev = Math.max(...WEEKLY.map((w) => w.rev));
  const totalWeekRev = WEEKLY.reduce((s, w) => s + w.rev, 0);
  const totalWeekCust = WEEKLY.reduce((s, w) => s + w.cust, 0);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        maxWidth: 520,
        margin: "0 auto",
        padding: "0 16px",
        color: "#2C2C2A",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700&family=Playfair+Display:wght@600&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div style={{ padding: "24px 0 8px", borderBottom: "1px solid #e8e6df" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26,
              fontWeight: 600,
              color: "#2C2C2A",
              letterSpacing: "-0.02em",
            }}
          >
            Gelato agent
          </span>
          <span
            style={{
              fontSize: 12,
              color: "#888780",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Daily briefing
          </span>
        </div>
        <div style={{ fontSize: 13, color: "#888780", marginTop: 4 }}>
          Tuesday, April 7 · 7:42 AM · 82°F → 94°F today
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid #e8e6df",
          marginTop: 0,
        }}
      >
        {["today", "campaigns", "performance"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "12px 18px",
              fontSize: 13,
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? "#2C2C2A" : "#888780",
              background: "none",
              border: "none",
              borderBottom: tab === t ? "2px solid #2C2C2A" : "2px solid transparent",
              cursor: "pointer",
              textTransform: "capitalize",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TODAY TAB */}
      {tab === "today" && (
        <div style={{ paddingTop: 20 }}>
          {/* Quick Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "Expected today", value: "~138", sub: "customers" },
              { label: "Predicted revenue", value: "$1,040", sub: "+18% vs last Tue" },
              { label: "Campaigns queued", value: campaigns.filter((c) => c.status === "pending").length.toString(), sub: "awaiting approval" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  padding: 14,
                  background: "#faf9f6",
                  borderRadius: 10,
                  border: "1px solid #e8e6df",
                }}
              >
                <div style={{ fontSize: 11, color: "#888780", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4, color: "#2C2C2A" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: "#888780", marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Flavor forecast */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
              Flavor forecast — prep guide
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {FLAVORS.map((f) => (
                <div
                  key={f.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 12px",
                    background: "#faf9f6",
                    borderRadius: 8,
                    border: "1px solid #e8e6df",
                  }}
                >
                  <div style={{ minWidth: 110, fontSize: 13, fontWeight: 500 }}>{f.name}</div>
                  <Bar
                    value={f.predicted}
                    max={50}
                    color={
                      f.trend === "up" ? "#1D9E75" : f.trend === "down" ? "#BA7517" : f.trend === "new" ? "#534AB7" : "#888780"
                    }
                  />
                  <div style={{ minWidth: 45, fontSize: 12, color: "#5F5E5A", textAlign: "right" }}>
                    {f.predicted} srvgs
                  </div>
                  <span style={{ fontSize: 11 }}>
                    {f.trend === "up" && "↗"}
                    {f.trend === "down" && "↘"}
                    {f.trend === "flat" && "→"}
                    {f.trend === "new" && "✦"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
              Agent insights
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {INSIGHTS.map((ins, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderLeft: `3px solid ${ins.color}`,
                    background: "#faf9f6",
                    borderRadius: "0 8px 8px 0",
                    fontSize: 13,
                  }}
                >
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{ins.icon}</span>
                  <span>{ins.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CAMPAIGNS TAB */}
      {tab === "campaigns" && (
        <div style={{ paddingTop: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            Approval queue
          </div>
          <div style={{ fontSize: 12, color: "#888780", marginBottom: 16 }}>
            Review and approve AI-generated campaigns before they go live
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {campaigns.map((c) => {
              const ch = channelColor(c.channel);
              return (
                <div
                  key={c.id}
                  style={{
                    padding: 16,
                    background: "#faf9f6",
                    borderRadius: 10,
                    border: "1px solid #e8e6df",
                    opacity: c.status === "rejected" ? 0.45 : 1,
                    transition: "opacity 0.3s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</div>
                    <Pill bg={ch.bg} fg={ch.fg}>
                      {c.channel}
                    </Pill>
                  </div>
                  <div style={{ fontSize: 12, color: "#5F5E5A", marginTop: 6, lineHeight: 1.5 }}>
                    {c.desc}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                  >
                    <div style={{ fontSize: 11, color: "#888780" }}>
                      Est. revenue: <b style={{ color: "#1D9E75" }}>{c.est_revenue}</b> · Cost:{" "}
                      <b>{c.cost}</b>
                    </div>
                    {c.status === "pending" ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          onClick={() => approve(c.id)}
                          style={{
                            padding: "5px 14px",
                            fontSize: 12,
                            fontWeight: 600,
                            background: "#1D9E75",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reject(c.id)}
                          style={{
                            padding: "5px 14px",
                            fontSize: 12,
                            fontWeight: 500,
                            background: "none",
                            color: "#888780",
                            border: "1px solid #d3d1c7",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Skip
                        </button>
                      </div>
                    ) : (
                      <Pill
                        bg={c.status === "approved" ? "#EAF3DE" : "#F1EFE8"}
                        fg={c.status === "approved" ? "#27500A" : "#888780"}
                      >
                        {c.status === "approved" ? "✓ Approved" : "Skipped"}
                      </Pill>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PERFORMANCE TAB */}
      {tab === "performance" && (
        <div style={{ paddingTop: 20 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                padding: 14,
                background: "#faf9f6",
                borderRadius: 10,
                border: "1px solid #e8e6df",
              }}
            >
              <div style={{ fontSize: 11, color: "#888780", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Weekly revenue
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
                ${totalWeekRev.toLocaleString()}
              </div>
              <div style={{ fontSize: 11, color: "#1D9E75", marginTop: 2, fontWeight: 500 }}>
                +22% vs last week
              </div>
            </div>
            <div
              style={{
                padding: 14,
                background: "#faf9f6",
                borderRadius: 10,
                border: "1px solid #e8e6df",
              }}
            >
              <div style={{ fontSize: 11, color: "#888780", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Total customers
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>
                {totalWeekCust}
              </div>
              <div style={{ fontSize: 11, color: "#1D9E75", marginTop: 2, fontWeight: 500 }}>
                +15% vs last week
              </div>
            </div>
          </div>

          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
            Daily revenue — this week
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {WEEKLY.map((w) => (
              <div
                key={w.day}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div style={{ minWidth: 30, fontSize: 12, fontWeight: 500, color: "#5F5E5A" }}>
                  {w.day}
                </div>
                <Bar value={w.rev} max={maxRev} color="#534AB7" />
                <div style={{ minWidth: 50, fontSize: 12, textAlign: "right", color: "#5F5E5A" }}>
                  ${w.rev}
                </div>
                <div style={{ minWidth: 30, fontSize: 11, color: "#888780", textAlign: "right" }}>
                  {w.cust}
                </div>
              </div>
            ))}
          </div>

          {/* Campaign ROI */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
              Campaign ROI — last 30 days
            </div>
            {[
              { name: "Weather-triggered SMS", spent: 48, earned: 1420, roi: "29.6x" },
              { name: "Slow-period boosters", spent: 32, earned: 680, roi: "21.3x" },
              { name: "Win-back messages", spent: 18, earned: 390, roi: "21.7x" },
              { name: "New flavor launches", spent: 12, earned: 210, roi: "17.5x" },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 12px",
                  background: i % 2 === 0 ? "#faf9f6" : "transparent",
                  borderRadius: 6,
                }}
              >
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "#888780" }}>
                    Spent ${r.spent} → Earned ${r.earned.toLocaleString()}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#1D9E75",
                  }}
                >
                  {r.roi}
                </div>
              </div>
            ))}
          </div>

          {/* Agent learning note */}
          <div
            style={{
              marginTop: 24,
              padding: 14,
              background: "#EEEDFE",
              borderRadius: 10,
              fontSize: 12,
              color: "#3C3489",
              lineHeight: 1.6,
            }}
          >
            <span style={{ fontWeight: 600 }}>Agent learning update:</span> After 6 weeks of data, the model now predicts daily revenue within ±8% accuracy. Weather-triggered campaigns outperform all other types — the agent has increased their frequency from 2x/week to 3x/week automatically.
          </div>
        </div>
      )}

      <div
        style={{
          marginTop: 28,
          padding: "14px 0",
          borderTop: "1px solid #e8e6df",
          fontSize: 11,
          color: "#B4B2A9",
          textAlign: "center",
        }}
      >
        Interactive prototype · Tap the tabs to explore
      </div>
    </div>
  );
}
