import ServiceLandingPage from '../components/ServiceLandingPage';

const data = {
  tag: 'AI Development',
  headline: 'Automate Your Business with AI',
  subheadline: 'Not AI for the sake of AI — AI that solves a real business problem.',
  description: 'We integrate AI into existing systems and build AI-native products: assistants, document processors, intelligent search, and workflow automation.',
  benefits: [
    { icon: '🤖', title: 'AI Assistants', desc: 'Custom chatbots and assistants trained on your business data.' },
    { icon: '📄', title: 'Document Processing', desc: 'Automated extraction, classification, and summarisation of documents.' },
    { icon: '🔍', title: 'Intelligent Search', desc: 'Semantic search that understands meaning, not just keywords.' },
    { icon: '⚙️', title: 'Workflow Automation', desc: 'Replace manual, repetitive processes with AI-powered pipelines.' },
    { icon: '🧠', title: 'RAG Systems', desc: 'Retrieval-Augmented Generation — AI that answers from your own knowledge base.' },
    { icon: '🔌', title: 'LLM Integration', desc: 'OpenAI, Anthropic, Gemini — we integrate the right model for your use case.' },
  ],
  process: [
    { title: 'Use Case Audit', desc: 'Identify where AI actually adds value in your workflow.' },
    { title: 'Data & Architecture', desc: 'Design the data pipeline, vector store, and model selection.' },
    { title: 'Build & Integrate', desc: 'Build the AI layer and integrate it into your existing systems.' },
    { title: 'Monitor & Improve', desc: 'Track accuracy, latency, and cost — then iterate.' },
  ],
  faqs: [
    { q: 'Does my business actually need AI?', a: 'Not always. We\'ll tell you honestly if a simpler solution is better. AI is the right tool when you have repetitive text/data tasks, large knowledge bases, or need intelligent search.' },
    { q: 'How much does AI development cost?', a: 'Simple integrations (chatbot, document summariser) start from $500. Custom RAG systems and AI agents range from $2,000 to $10,000+.' },
    { q: 'Do you use OpenAI?', a: 'We use OpenAI, Anthropic, Google Gemini, and open-source models depending on your cost, privacy, and performance requirements.' },
  ],
  cta: { heading: 'Ready to add AI to your business?', sub: 'Tell us the problem. We\'ll tell you if AI is the right solution — and build it if it is.', button: 'Explore AI Solutions' },
};

export default function AIDevelopmentPage() {
  return <ServiceLandingPage service={data} />;
}
