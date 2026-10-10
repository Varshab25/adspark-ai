import { useMemo, useState } from 'react';

const defaultForm = {
  businessName: 'BeanBurst Café',
  productService: 'New iced coffee launch',
  targetAudience: 'College students looking for a refreshing, affordable café treat',
  campaignObjective: 'Increase café visits and trial during the launch week',
  budget: '$800',
  offer: '10% off every iced coffee order during launch week',
};

const generateCampaignSummary = (values) => {
  const businessName = values.businessName || 'Your business';
  const product = values.productService || 'your product';
  const audience = values.targetAudience || 'your target customers';
  const objective = values.campaignObjective || 'grow engagement';
  const offer = values.offer || 'a launch offer';

  return `${businessName} is launching ${product.toLowerCase()} with a clear focus on ${audience.toLowerCase()}. The campaign promotes ${offer.toLowerCase()} and aims to ${objective.toLowerCase()} with practical messaging built for quick discovery and action. The plan balances platform-specific positioning and a budget of ${values.budget || '$500'} to keep the launch efficient and engaging.`;
};

const generateInstagram = (values) => {
  const businessName = values.businessName || 'Your brand';
  const product = values.productService || 'new favorite item';
  const audience = values.targetAudience || 'your audience';
  const offer = values.offer || 'special launch offer';

  return `“Your ${product.toLowerCase()} deserves a little attention. ✨\n\n${businessName} is bringing ${product.toLowerCase()} to ${audience.toLowerCase()} with a fresh, feel-good offer that stands out. ${offer}.\n\nThis is your sign to stop scrolling, grab your go-to treat, and make the most of the launch moment. 📍 Check us out today and see what everyone’s talking about. #${businessName.replace(/\s+/g, '')} #${product.replace(/\s+/g, '')} #SmallBusinessLove #LaunchOffer”`;
};

const generateGoogleAds = (values) => {
  const businessName = values.businessName || 'Your business';
  const product = values.productService || 'Your offer';
  const offer = values.offer || 'a limited-time deal';

  return `Headline 1: ${product}\nHeadline 2: ${businessName}\nDescription: Discover ${product.toLowerCase()} with ${offer.toLowerCase()} and a smarter offer built for fast action. Try it today.`;
};

const generateLinkedIn = (values) => {
  const businessName = values.businessName || 'Your business';
  const product = values.productService || 'your product';
  const audience = values.targetAudience || 'your audience';
  const objective = values.campaignObjective || 'drive trial and engagement';
  const offer = values.offer || 'a launch offer';

  return `${businessName} is introducing ${product.toLowerCase()} as part of a focused effort to reach ${audience.toLowerCase()} and support ${objective.toLowerCase()}. This initiative is designed to strengthen customer awareness, encourage direct engagement, and invite trial in a simple, relevant way. We’re currently offering ${offer.toLowerCase()} to help more people discover the launch value while maintaining a clear growth strategy.`;
};

const generateWhatsApp = (values) => {
  const businessName = values.businessName || 'Your business';
  const product = values.productService || 'our offer';
  const audience = values.targetAudience || 'your customers';
  const offer = values.offer || 'a limited-time offer';

  return `Hi! 👋 ${businessName} just launched ${product.toLowerCase()} and we’re inviting ${audience.toLowerCase()} to check it out. For a limited time, ${offer.toLowerCase()}. If you’ve been looking for something fresh, affordable, and worth trying, this is a great time to stop by. Want the address or a quick recommendation?`;
};

function App() {
  const [formData, setFormData] = useState(defaultForm);
  const [isGenerated, setIsGenerated] = useState(true);

  const outputs = useMemo(() => {
    return {
      summary: generateCampaignSummary(formData),
      instagram: generateInstagram(formData),
      google: generateGoogleAds(formData),
      linkedin: generateLinkedIn(formData),
      whatsapp: generateWhatsApp(formData),
    };
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (event) => {
    event.preventDefault();
    setIsGenerated(true);
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReset = () => {
    setFormData(defaultForm);
    setIsGenerated(true);
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const onCopy = async (text, buttonLabel) => {
    await copyText(text);
    const button = document.activeElement;
    if (button && button.dataset.copyLabel === buttonLabel) {
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 1200);
    }
  };

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="AdSpark AI home">
            <span className="brand-mark">A</span>
            <span>AdSpark AI</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#problem">Why it matters</a>
            <a href="#builder">Campaign builder</a>
            <a href="#results">Results</a>
            <a href="#how-it-works">How it works</a>
          </nav>

          <button className="nav-cta" type="button" onClick={() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            Start a campaign
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <span className="eyebrow">AI marketing assistant for growing brands</span>
              <h1>One brief. Four platforms. Smarter marketing.</h1>
              <p className="hero-copy">
                AdSpark AI turns your business idea into ready-to-use campaign copy for the channels that matter most — without the guesswork.
              </p>

              <div className="hero-actions">
                <button className="primary-btn" type="button" onClick={() => document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  Build my campaign
                </button>
                <button className="secondary-btn" type="button" onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
                  View sample output
                </button>
              </div>

              <ul className="trust-list" aria-label="Key benefits">
                <li>One brief, multi-platform outputs</li>
                <li>Built for small business teams</li>
                <li>Launch faster with clearer messaging</li>
              </ul>
            </div>

            <div className="hero-panel" aria-label="Campaign preview">
              <div className="mini-card top-card">
                <div>
                  <p className="mini-label">Campaign score</p>
                  <h3>92/100</h3>
                </div>
                <span className="badge success">Strong fit</span>
              </div>

              <div className="pipeline-card">
                <div className="pipeline-head">
                  <p>Launch pipeline</p>
                  <span>Live</span>
                </div>
                <div className="platform-row">
                  <span className="dot blue" />
                  <div>
                    <strong>Instagram</strong>
                    <small>Creative ad caption</small>
                  </div>
                  <em>Ready</em>
                </div>
                <div className="platform-row">
                  <span className="dot purple" />
                  <div>
                    <strong>Google Ads</strong>
                    <small>Search-focused CTA</small>
                  </div>
                  <em>Ready</em>
                </div>
                <div className="platform-row">
                  <span className="dot navy" />
                  <div>
                    <strong>LinkedIn</strong>
                    <small>Professional angle</small>
                  </div>
                  <em>Ready</em>
                </div>
                <div className="platform-row">
                  <span className="dot teal" />
                  <div>
                    <strong>WhatsApp</strong>
                    <small>Direct outreach</small>
                  </div>
                  <em>Ready</em>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="problem-solution" id="problem">
          <div className="container strip-grid">
            <div className="info-card issue-card">
              <span className="eyebrow subtle">The problem</span>
              <h2>Most small businesses are posting, but not converting.</h2>
              <p>
                Teams juggle different channels, rewrite the same message repeatedly, and still struggle to keep ad copy aligned with real business goals.
              </p>
            </div>

            <div className="info-card solution-card">
              <span className="eyebrow subtle">The solution</span>
              <h2>One prompt. Four tailored campaigns.</h2>
              <p>
                AdSpark AI translates your offer into platform-specific marketing language designed for discovery, engagement, and action — without starting from scratch each time.
              </p>
            </div>
          </div>
        </section>

        <section className="builder-section" id="builder">
          <div className="container builder-shell">
            <div className="builder-intro">
              <span className="eyebrow">Campaign builder</span>
              <h2>Tell us what you’re selling.</h2>
              <p>Shape your brief and generate a campaign set for the channels that matter.</p>
            </div>

            <div className="builder-card">
              <form className="campaign-form" onSubmit={handleGenerate}>
                <div className="field-grid">
                  <label>
                    <span>Business name</span>
                    <input name="businessName" type="text" value={formData.businessName} onChange={handleChange} />
                  </label>

                  <label>
                    <span>Product or service</span>
                    <input name="productService" type="text" value={formData.productService} onChange={handleChange} />
                  </label>

                  <label className="wide">
                    <span>Target audience</span>
                    <input name="targetAudience" type="text" value={formData.targetAudience} onChange={handleChange} />
                  </label>

                  <label className="wide">
                    <span>Campaign objective</span>
                    <input name="campaignObjective" type="text" value={formData.campaignObjective} onChange={handleChange} />
                  </label>

                  <label>
                    <span>Budget</span>
                    <input name="budget" type="text" value={formData.budget} onChange={handleChange} />
                  </label>

                  <label>
                    <span>Offer</span>
                    <input name="offer" type="text" value={formData.offer} onChange={handleChange} />
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="primary-btn generate-btn">Generate campaign</button>
                  <button type="button" className="secondary-btn" onClick={handleReset}>Try another campaign</button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="results-section" id="results">
          <div className="container results-wrap">
            <div className="results-header">
              <div>
                <span className="eyebrow">Campaign outputs</span>
                <h2>Ready-to-use creative for every channel</h2>
              </div>
              <span className="demo-badge">Sample output • demo mode</span>
            </div>

            <div className="summary-card">
              <div className="summary-top">
                <span>Campaign summary</span>
                <button className="ghost-btn" type="button" data-copy-label="summary" onClick={() => onCopy(outputs.summary, 'summary')}>
                  Copy summary
                </button>
              </div>
              <p>{outputs.summary}</p>
            </div>

            <div className="results-grid">
              <article className="platform-card">
                <div className="platform-header">
                  <div>
                    <span className="platform-tag instagram-tag">Instagram</span>
                    <h3>Creative ad</h3>
                  </div>
                  <button className="ghost-btn" type="button" data-copy-label="instagram" onClick={() => onCopy(outputs.instagram, 'instagram')}>
                    Copy
                  </button>
                </div>
                <div className="platform-copy">{outputs.instagram}</div>
              </article>

              <article className="platform-card">
                <div className="platform-header">
                  <div>
                    <span className="platform-tag google-tag">Google Ads</span>
                    <h3>Search campaign</h3>
                  </div>
                  <button className="ghost-btn" type="button" data-copy-label="google" onClick={() => onCopy(outputs.google, 'google')}>
                    Copy
                  </button>
                </div>
                <div className="platform-copy">{outputs.google}</div>
              </article>

              <article className="platform-card">
                <div className="platform-header">
                  <div>
                    <span className="platform-tag linkedin-tag">LinkedIn</span>
                    <h3>Professional post</h3>
                  </div>
                  <button className="ghost-btn" type="button" data-copy-label="linkedin" onClick={() => onCopy(outputs.linkedin, 'linkedin')}>
                    Copy
                  </button>
                </div>
                <div className="platform-copy">{outputs.linkedin}</div>
              </article>

              <article className="platform-card">
                <div className="platform-header">
                  <div>
                    <span className="platform-tag whatsapp-tag">WhatsApp</span>
                    <h3>Conversation</h3>
                  </div>
                  <button className="ghost-btn" type="button" data-copy-label="whatsapp" onClick={() => onCopy(outputs.whatsapp, 'whatsapp')}>
                    Copy
                  </button>
                </div>
                <div className="platform-copy">{outputs.whatsapp}</div>
              </article>
            </div>
          </div>
        </section>

        <section className="how-it-works" id="how-it-works">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">How it works</span>
              <h2>From a simple brief to full-funnel campaign messaging</h2>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <span className="step-number">01</span>
                <h3>Share your brief</h3>
                <p>Tell AdSpark AI your business, offer, audience, and objective in a few fields.</p>
              </div>

              <div className="step-card">
                <span className="step-number">02</span>
                <h3>Match the channel</h3>
                <p>Each platform gets a tailored tone and structure that fits how people actually engage.</p>
              </div>

              <div className="step-card">
                <span className="step-number">03</span>
                <h3>Launch with clarity</h3>
                <p>Review the outputs, copy what works, and iterate quickly without rewriting from scratch.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <div>
            <a href="#top" className="brand footer-brand">
              <span className="brand-mark">A</span>
              <span>AdSpark AI</span>
            </a>
            <p>Built for small businesses that want better marketing without the extra overhead.</p>
          </div>

          <div className="footer-links">
            <a href="#problem">Why it matters</a>
            <a href="#builder">Campaign builder</a>
            <a href="#results">Results</a>
            <a href="#how-it-works">How it works</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
