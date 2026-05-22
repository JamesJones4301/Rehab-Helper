import React, { useMemo, useState } from 'react';
import {
  Calculator,
  Download,
  FileSpreadsheet,
  Home,
  Printer,
  RotateCcw,
  ShieldAlert,
  TrendingUp,
  Wrench
} from 'lucide-react';

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const tabs = [
  { id: 'exterior', label: 'Exterior' },
  { id: 'interior', label: 'Interior' },
  { id: 'systems', label: 'Systems' },
  { id: 'kitchen', label: 'Kitchen & Bath' }
];

const ageItems = [
  { id: 'roof', label: 'Roof' },
  { id: 'electrical', label: 'Electrical Panel' },
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'hvac', label: 'HVAC' },
  { id: 'windows', label: 'Windows' },
  { id: 'paint', label: 'Exterior Paint' }
];

const repairData = {
  exterior: [
    { id: 'roof-repair', name: 'Roof Repair', hint: 'Minor repairs and patches', low: 1000, high: 3000 },
    { id: 'roof-replace', name: 'Roof Replace', hint: 'Full roof replacement', low: 6000, high: 10000 },
    { id: 'electrical-box', name: 'Electrical Box', hint: 'Panel replacement', low: 5000, high: 8000 },
    { id: 'aluminum-wiring', name: 'Aluminum Wiring', hint: 'Electrical correction', low: 5000, high: 10000 },
    { id: 'gfci', name: 'GFCI', hint: 'Safety outlets', low: 1000, high: 3000 },
    { id: 'main-drain', name: 'Main Drain Line', hint: 'Drain or sewer line', low: 8000, high: 15000 },
    { id: 'under-house-plumbing', name: 'Under House Plumbing', hint: 'Major plumbing below house', low: 8000, high: 25000 },
    { id: 'exterior-paint', name: 'Exterior Paint', hint: '$3 to $4 per sqft', low: 6000, high: 8000 },
    { id: 'siding-wood', name: 'Siding and Wood Rot', hint: 'Siding, trim, fascia', low: 1000, high: 10000 },
    { id: 'tree-removal', name: 'Tree Removal', hint: 'Per tree', low: 1000, high: 4000 },
    { id: 'landscaping', name: 'Landscaping Other', hint: 'Clean up and curb appeal', low: 1000, high: 7000 },
    { id: 'foundation', name: 'Foundation Repair', hint: 'Structural repairs', low: 10000, high: 30000 },
    { id: 'haul-off', name: 'Haul Off', hint: 'About $1K per trailer load', low: 1000, high: 5000 },
    { id: 'fence', name: 'Fence', hint: 'Repair or replace', low: 1000, high: 10000 },
    { id: 'garage-door', name: 'Garage Door', hint: 'Door and opener', low: 1000, high: 4000 },
    { id: 'decks', name: 'Decks', hint: 'Repair or rebuild', low: 1000, high: 10000 },
    { id: 'termites-treatment', name: 'Termite Treatment', hint: 'Treatment only', low: 500, high: 2500 },
    { id: 'termites-repair', name: 'Termite Repair', hint: 'Damage repair', low: 1000, high: 6000 },
    { id: 'doors', name: 'Front or Side Door', hint: 'Exterior doors', low: 500, high: 4000 },
    { id: 'french-doors', name: 'French Doors', hint: 'Replace or repair', low: 2500, high: 6000 },
    { id: 'window-repair', name: 'Window Repair', hint: 'Glass, fogged, locks, per window', low: 200, high: 500 },
    { id: 'window-replace', name: 'Replace All Windows', hint: 'Full house', low: 8000, high: 20000 },
    { id: 'gutters', name: 'Gutters', hint: 'Only where needed', low: 1000, high: 5000 },
    { id: 'driveway', name: 'Driveway', hint: 'Patch to full replacement', low: 1000, high: 9000 },
    { id: 'wells-septic', name: 'Wells, Septic, Other', hint: 'Property-specific systems', low: 1000, high: 30000 }
  ],
  interior: [
    { id: 'flooring', name: 'Flooring', hint: 'Carpet or tile, $5 to $12 per sqft', low: 10000, high: 20000 },
    { id: 'interior-paint', name: 'Interior Paint', hint: '$3 to $5 per sqft', low: 2000, high: 10000 },
    { id: 'interior-doors', name: 'Interior Doors', hint: 'Including bifold doors', low: 200, high: 500 },
    { id: 'interior-knobs', name: 'Interior Door Knobs', hint: 'Each', low: 100, high: 300 },
    { id: 'exterior-lockset', name: 'Exterior Lockset', hint: 'Each', low: 300, high: 500 },
    { id: 'sheetrock', name: 'Sheetrock', hint: 'Tape, float, texture', low: 1500, high: 6000 },
    { id: 'popcorn', name: 'Popcorn Removal', hint: '$1 to $2 per sqft', low: 2000, high: 5000 },
    { id: 'wallpaper', name: 'Wallpaper Removal', hint: '$1 to $3 per sqft', low: 500, high: 2500 },
    { id: 'trim', name: 'Trim', hint: '$3 to $5 per linear foot', low: 500, high: 8000 },
    { id: 'fans', name: 'Fans', hint: 'Low to high end', low: 300, high: 600 },
    { id: 'lights', name: 'Lights', hint: 'Low to high end', low: 100, high: 300 },
    { id: 'cleaning', name: 'Final Cleaning', hint: 'Move-out ready cleaning', low: 300, high: 600 },
    { id: 'fireplace-insulation', name: 'Fireplace or Insulation', hint: 'Misc interior work', low: 500, high: 4000 }
  ],
  systems: [
    { id: 'hvac-main', name: 'HVAC Compressor, Furnace, Coil', hint: 'Major component work', low: 2000, high: 5000 },
    { id: 'hvac-service', name: 'HVAC Service or Repair', hint: 'Light service work', low: 750, high: 2000 },
    { id: 'hvac-new', name: 'HVAC Full Unit', hint: 'New install', low: 10000, high: 15000 },
    { id: 'water-heater', name: 'Water Heater', hint: 'Depends on closet and access', low: 1000, high: 4000 }
  ],
  kitchen: [
    { id: 'kitchen-cabinets', name: 'Kitchen Cabinets', hint: 'Repair or replace', low: 2000, high: 10000 },
    { id: 'kitchen-counters', name: 'Kitchen Countertops', hint: 'Material dependent', low: 2000, high: 10000 },
    { id: 'kitchen-sink', name: 'Kitchen Sink and Fixtures', hint: 'Sink, faucet, hardware', low: 400, high: 2000 },
    { id: 'dishwasher', name: 'Dishwasher', hint: 'Appliance replacement', low: 500, high: 2000 },
    { id: 'stove', name: 'Stove or Cooktop', hint: 'Appliance replacement', low: 600, high: 3000 },
    { id: 'microwave', name: 'Microwave or Vent Hood', hint: 'Over-the-counter unit', low: 300, high: 800 },
    { id: 'bath-full', name: 'Bath Full Replacement', hint: 'Full bathroom rehab', low: 3000, high: 10000 },
    { id: 'bath-cabinets', name: 'Bath Cabinets', hint: 'Vanity or cabinet work', low: 600, high: 2000 },
    { id: 'bath-counters', name: 'Bath Countertops', hint: 'Vanity tops', low: 500, high: 2000 },
    { id: 'bath-sink', name: 'Bath Sink', hint: 'Sink replacement', low: 300, high: 1000 },
    { id: 'bath-fixtures', name: 'Bath Fixtures', hint: 'Faucets and trim', low: 400, high: 1500 },
    { id: 'bath-toilet', name: 'Bath Toilet', hint: 'Each toilet', low: 200, high: 500 },
    { id: 'bath-kit', name: 'Bath Hardware Kit', hint: 'Towel, TP, hand, mirror', low: 200, high: 800 }
  ]
};

const defaultProperty = {
  address: '',
  sqft: '1800',
  bedBath: '',
  purchase: '',
  arv: '',
  targetPercent: '70',
  closingPercent: '3',
  interestPercent: '6'
};

export default function App() {
  const [property, setProperty] = useState(defaultProperty);
  const [ages, setAges] = useState({});
  const [activeTab, setActiveTab] = useState('exterior');
  const [repairs, setRepairs] = useState({});

  const allRepairs = useMemo(() => Object.values(repairData).flat(), []);

  const totals = useMemo(() => {
    const selected = allRepairs.filter((item) => repairs[item.id]?.checked);
    const subtotal = selected.reduce((sum, item) => sum + (Number(repairs[item.id]?.value) || 0), 0);
    const low = selected.reduce((sum, item) => sum + item.low, 0);
    const high = selected.reduce((sum, item) => sum + item.high, 0);
    const oldSystems = ageItems.filter((item) => ages[item.id] === 'old').length;
    const bump = oldSystems >= 2;
    const totalRehab = bump ? subtotal * 1.1 : subtotal;
    const purchase = Number(property.purchase) || 0;
    const arv = Number(property.arv) || 0;
    const sqft = Number(property.sqft) || 0;
    const targetPercent = Number(property.targetPercent) || 70;
    const closingCosts = arv * ((Number(property.closingPercent) || 0) / 100);
    const interestCosts = arv * ((Number(property.interestPercent) || 0) / 100);
    const maxOffer = Math.max(0, arv * (targetPercent / 100) - totalRehab - closingCosts - interestCosts);
    const purchaseUsed = purchase || maxOffer;
    const allIn = purchaseUsed + totalRehab + closingCosts + interestCosts;
    const spread = arv - allIn;
    const rehabPct = arv > 0 ? (totalRehab / arv) * 100 : 0;
    const profitMargin = arv > 0 ? (spread / arv) * 100 : 0;
    const perSqft = sqft > 0 ? totalRehab / sqft : 0;

    let dealLabel = 'Add ARV';
    let dealTone = 'neutral';

    if (arv > 0) {
      if (profitMargin >= 20) {
        dealLabel = 'Excellent Deal';
        dealTone = 'positive';
      } else if (profitMargin >= 15) {
        dealLabel = 'Good Deal';
        dealTone = 'blue';
      } else if (profitMargin >= 10) {
        dealLabel = 'Fair Deal';
        dealTone = 'warn';
      } else {
        dealLabel = 'Needs Work';
        dealTone = 'negative';
      }
    }

    return {
      subtotal,
      low,
      high,
      oldSystems,
      bump,
      totalRehab,
      purchase,
      purchaseUsed,
      arv,
      allIn,
      spread,
      rehabPct,
      profitMargin,
      perSqft,
      closingCosts,
      interestCosts,
      maxOffer,
      dealLabel,
      dealTone
    };
  }, [ages, allRepairs, property, repairs]);

  const referenceUrl = '/reference/rehab-helper-2023.xlsx';

  const updateProperty = (field, value) => {
    setProperty((current) => ({ ...current, [field]: value }));
  };

  const updateAge = (field, value) => {
    setAges((current) => ({ ...current, [field]: value }));
  };

  const toggleRepair = (item) => {
    setRepairs((current) => {
      const existing = current[item.id] || {};
      const checked = !existing.checked;
      return {
        ...current,
        [item.id]: {
          checked,
          value: checked ? existing.value || Math.round((item.low + item.high) / 2) : ''
        }
      };
    });
  };

  const updateRepairValue = (id, value) => {
    setRepairs((current) => ({
      ...current,
      [id]: {
        ...current[id],
        checked: true,
        value
      }
    }));
  };

  const reset = () => {
    setProperty(defaultProperty);
    setAges({});
    setRepairs({});
    setActiveTab('exterior');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="logo-sub">Professional RE Investment</p>
          <h1 className="logo-text">Proverbs 31 LandSphere</h1>
        </div>
        <div className="logo-divider" />
        <p className="header-title">Big Dog Rehab Helper</p>
        <div className="header-spacer" />
        <a href={referenceUrl} download className="header-link">
          <Download size={16} /> Reference
        </a>
        <button onClick={() => window.print()} className="header-button">
          <Printer size={16} /> Print
        </button>
      </header>

      <main className="page-grid">
        <aside className="left-stack">
          <Card icon={<Home size={20} />} title="Property Details">
            <Field label="Property Address">
              <input value={property.address} onChange={(event) => updateProperty('address', event.target.value)} placeholder="123 Main St, City, TX" className="input" />
            </Field>
            <div className="two-grid">
              <Field label="Sq Footage">
                <input type="number" value={property.sqft} onChange={(event) => updateProperty('sqft', event.target.value)} className="input" />
              </Field>
              <Field label="Beds / Baths">
                <input value={property.bedBath} onChange={(event) => updateProperty('bedBath', event.target.value)} placeholder="3/2" className="input" />
              </Field>
            </div>
            <div className="two-grid">
              <Field label="Purchase Price">
                <CurrencyInput value={property.purchase} onChange={(value) => updateProperty('purchase', value)} placeholder="150000" />
              </Field>
              <Field label="ARV">
                <CurrencyInput value={property.arv} onChange={(value) => updateProperty('arv', value)} placeholder="250000" />
              </Field>
            </div>
            <div className="three-grid">
              <Field label="Target %">
                <input type="number" value={property.targetPercent} onChange={(event) => updateProperty('targetPercent', event.target.value)} className="input" />
              </Field>
              <Field label="Close %">
                <input type="number" value={property.closingPercent} onChange={(event) => updateProperty('closingPercent', event.target.value)} className="input" />
              </Field>
              <Field label="Interest %">
                <input type="number" value={property.interestPercent} onChange={(event) => updateProperty('interestPercent', event.target.value)} className="input" />
              </Field>
            </div>
          </Card>

          <Card icon={<ShieldAlert size={20} />} title="Ask the Seller">
            <div className="prompt-box">
              When was the last time you replaced this system? Two or more systems from 2010 or older bumps the repair budget by 10%.
            </div>
            <div className="age-list">
              {ageItems.map((item) => (
                <div key={item.id} className="age-row">
                  <span>{item.label}</span>
                  <select value={ages[item.id] || ''} onChange={(event) => updateAge(item.id, event.target.value)} className="select">
                    <option value="">Unknown</option>
                    <option value="recent">2015 or newer</option>
                    <option value="mid">2011 to 2014</option>
                    <option value="old">2010 or older</option>
                  </select>
                </div>
              ))}
            </div>
            {totals.bump && <div className="bump-alert">Multiple aging systems detected. Repair budget bumped by 10%.</div>}
          </Card>

          <Card icon={<FileSpreadsheet size={20} />} title="Reference Document">
            <p className="muted">Use this download button after the Excel file is added at public/reference/rehab-helper-2023.xlsx.</p>
            <a href={referenceUrl} download className="gold-button">
              <Download size={16} /> Download Rehab Helper
            </a>
          </Card>

          <Card icon={<TrendingUp size={20} />} title="Sanity Check">
            <div className="sanity-list">
              <p><strong>Basic, $200K ARV:</strong> $20 to $40 per sqft</p>
              <p><strong>Basic, $300K ARV:</strong> $30 to $60 per sqft</p>
              <p><strong>Extensive, $500K ARV:</strong> $50 to $70 per sqft</p>
              <p><strong>New build, $400K+ ARV:</strong> $125 to $200 per sqft</p>
              <div className="sanity-result">
                Your estimate: {money.format(totals.totalRehab)} / {(Number(property.sqft) || 0).toLocaleString()} sqft = {money.format(totals.perSqft)} per sqft
              </div>
            </div>
          </Card>
        </aside>

        <section className="right-stack">
          <Card icon={<Wrench size={20} />} title="Repair Estimator" action="Check items. Edit your number.">
            <div className="tab-row">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab ${activeTab === tab.id ? 'active' : ''}`}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="repair-list">
              {repairData[activeTab].map((item) => (
                <RepairRow key={item.id} item={item} repair={repairs[item.id]} onToggle={() => toggleRepair(item)} onValue={(value) => updateRepairValue(item.id, value)} />
              ))}
            </div>
          </Card>

          <Card icon={<Calculator size={20} />} title="Budget Summary">
            <div className="summary-grid">
              <Metric label="Repair Subtotal" value={money.format(totals.subtotal)} />
              <Metric label="After Bump" value={totals.bump ? money.format(totals.totalRehab) : 'None'} warn={totals.bump} />
              <Metric label="Purchase Used" value={money.format(totals.purchaseUsed)} />
              <Metric label="All-In Cost" value={money.format(totals.allIn)} />
            </div>

            <div className="total-bar">
              <div className="total-label">Total Rehab Budget</div>
              <div className="total-value">{money.format(totals.totalRehab)}</div>
            </div>

            <div className="summary-grid">
              <Metric label="Max Offer" value={money.format(totals.maxOffer)} positive />
              <Metric label="ARV Spread" value={property.arv ? money.format(totals.spread) : 'Add ARV'} positive={totals.spread > 0} negative={totals.spread < 0} />
              <Metric label="Repair % of ARV" value={property.arv ? `${totals.rehabPct.toFixed(1)}%` : 'Add ARV'} warn={totals.rehabPct > 30} negative={totals.rehabPct > 60} />
              <Metric label="Profit Margin" value={property.arv ? `${totals.profitMargin.toFixed(1)}%` : 'Add ARV'} positive={totals.profitMargin >= 15} negative={totals.profitMargin < 10 && totals.arv > 0} />
            </div>

            <div className="summary-grid extra-summary">
              <Metric label="Low Range" value={money.format(totals.low)} />
              <Metric label="High Range" value={money.format(totals.high)} />
              <Metric label="Closing Costs" value={money.format(totals.closingCosts)} />
              <Metric label="Interest Costs" value={money.format(totals.interestCosts)} />
            </div>

            <div className="footer-actions">
              <div className={`deal-pill ${totals.dealTone}`}>{totals.dealLabel}</div>
              <button onClick={reset} className="reset-button">
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}

function Card({ icon, title, action, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-icon">{icon}</div>
        <h2 className="card-title">{title}</h2>
        {action && <p className="card-action">{action}</p>}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function CurrencyInput({ value, onChange, placeholder }) {
  return (
    <div className="currency-input">
      <span>$</span>
      <input type="number" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="input" />
    </div>
  );
}

function RepairRow({ item, repair, onToggle, onValue }) {
  const checked = Boolean(repair?.checked);
  return (
    <div className="repair-row">
      <div>
        <p className="repair-name">{item.name}</p>
        <p className="repair-hint">{item.hint}</p>
      </div>
      <span className="range-badge">{money.format(item.low)} to {money.format(item.high)}</span>
      <input type="number" disabled={!checked} value={repair?.value || ''} onChange={(event) => onValue(event.target.value)} className="repair-input" />
      <button type="button" onClick={onToggle} aria-label={`Toggle ${item.name}`} className={`repair-toggle ${checked ? 'checked' : ''}`}>
        {checked && <span>✓</span>}
      </button>
    </div>
  );
}

function Metric({ label, value, positive, negative, warn }) {
  let className = 'metric-value';
  if (positive) className += ' positive';
  if (warn) className += ' warn';
  if (negative) className += ' negative';

  return (
    <div className="metric-box">
      <p className="metric-label">{label}</p>
      <p className={className}>{value}</p>
    </div>
  );
}
