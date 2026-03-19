import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wrench, Key, Hash, Binary, Regex, Braces, Copy, Check, RotateCcw, ArrowLeftRight, Code2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

const tools = [
  { id: 'jwt', label: 'JWT Decoder', icon: Key, color: 'brand', category: 'security' },
  { id: 'hash', label: 'Hash Generator', icon: Hash, color: 'accent', category: 'security' },
  { id: 'base64', label: 'Base64', icon: Binary, color: 'brand', category: 'encoding' },
  { id: 'regex', label: 'Regex Tester', icon: Regex, color: 'accent', category: 'utility' },
  { id: 'json', label: 'JSON Formatter', icon: Braces, color: 'brand', category: 'data' },
  { id: 'uuid', label: 'UUID Generator', icon: Key, color: 'accent', category: 'security' },
  { id: 'hmac', label: 'HMAC Generator', icon: Hash, color: 'brand', category: 'security' },
  { id: 'password', label: 'Password Generator', icon: Key, color: 'accent', category: 'security' },
  { id: 'url', label: 'URL Encoder', icon: Binary, color: 'brand', category: 'encoding' },
  { id: 'html', label: 'HTML Encoder', icon: Code2, color: 'accent', category: 'encoding' },
  { id: 'binary', label: 'Binary Converter', icon: Binary, color: 'brand', category: 'encoding' },
  { id: 'hex', label: 'Hex Converter', icon: Hash, color: 'accent', category: 'encoding' },
  { id: 'yaml', label: 'YAML ↔ JSON', icon: Braces, color: 'brand', category: 'data' },
  { id: 'csv', label: 'CSV ↔ JSON', icon: Braces, color: 'accent', category: 'data' },
  { id: 'timestamp', label: 'Timestamp Converter', icon: RotateCcw, color: 'brand', category: 'utility' },
  { id: 'diff', label: 'Diff Checker', icon: ArrowLeftRight, color: 'accent', category: 'utility' },
  { id: 'color', label: 'Color Converter', icon: Wrench, color: 'brand', category: 'utility' },
  { id: 'cron', label: 'Cron Parser', icon: RotateCcw, color: 'accent', category: 'utility' },
];

function JWTDecoder() {
  const [token, setToken] = useState('');
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState('');

  const decode = () => {
    try {
      setError('');
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format');
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      setDecoded({ header: JSON.stringify(header, null, 2), payload: JSON.stringify(payload, null, 2), signature: parts[2] });
    } catch {
      setError('Invalid JWT token');
      setDecoded(null);
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={token} onChange={e => setToken(e.target.value)} placeholder="Paste your JWT token here..." className="w-full h-32 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
      <Button onClick={decode} size="sm"><Key className="w-4 h-4" /> Decode Token</Button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {decoded && (
        <div className="space-y-3">
          <div>
            <span className="text-xs font-semibold text-brand-400 uppercase">Header</span>
            <pre className="mt-1 p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 overflow-x-auto">{decoded.header}</pre>
          </div>
          <div>
            <span className="text-xs font-semibold text-accent-400 uppercase">Payload</span>
            <pre className="mt-1 p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 overflow-x-auto">{decoded.payload}</pre>
          </div>
          <div>
            <span className="text-xs font-semibold text-dark-500 uppercase">Signature</span>
            <pre className="mt-1 p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-400 overflow-x-auto break-all">{decoded.signature}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({});
  const [copied, setCopied] = useState('');

  const generate = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    const results = {};

    for (const algo of algorithms) {
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      results[algo] = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    setHashes(results);
  };

  const copyHash = (algo, hash) => {
    navigator.clipboard.writeText(hash);
    setCopied(algo);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to hash..." className="flex-1 px-4 py-2.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent-500/30" />
        <Button onClick={generate} variant="accent" size="sm"><Hash className="w-4 h-4" /> Generate</Button>
      </div>
      {Object.entries(hashes).map(([algo, hash]) => (
        <div key={algo} className="flex items-start gap-2">
          <span className="text-xs font-semibold text-dark-500 uppercase w-16 pt-2 shrink-0">{algo}</span>
          <div className="flex-1 p-2 rounded-lg bg-dark-800/50 text-xs font-mono text-dark-300 break-all">{hash}</div>
          <button onClick={() => copyHash(algo, hash)} className="p-2 rounded-lg hover:bg-dark-800/50 text-dark-500 hover:text-dark-300 transition-colors shrink-0">
            {copied === algo ? <Check className="w-3.5 h-3.5 text-brand-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      ))}
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch {
      setOutput('Error: Invalid input');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => setMode('encode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'encode' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'decode' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>Decode</button>
        <button onClick={() => { setInput(output); setOutput(input); setMode(mode === 'encode' ? 'decode' : 'encode'); }} className="p-1.5 rounded-lg text-dark-500 hover:text-dark-300">
          <ArrowLeftRight className="w-4 h-4" />
        </button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'} className="w-full h-24 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
      <Button onClick={process} size="sm"><Binary className="w-4 h-4" /> {mode === 'encode' ? 'Encode' : 'Decode'}</Button>
      {output && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 break-all">{output}</div>}
    </div>
  );
}

function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const test = () => {
    try {
      setError('');
      const regex = new RegExp(pattern, flags);
      const found = testString.match(regex);
      setMatches(found || []);
    } catch (e) {
      setError(e.message);
      setMatches([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-1 px-3 rounded-lg bg-dark-800/50 border border-dark-700/50">
          <span className="text-dark-500 font-mono">/</span>
          <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="regex pattern" className="flex-1 py-2.5 bg-transparent text-dark-100 text-sm font-mono focus:outline-none" />
          <span className="text-dark-500 font-mono">/</span>
          <input type="text" value={flags} onChange={e => setFlags(e.target.value)} className="w-8 bg-transparent text-dark-300 text-sm font-mono focus:outline-none" />
        </div>
        <Button onClick={test} variant="accent" size="sm"><Regex className="w-4 h-4" /> Test</Button>
      </div>
      <textarea value={testString} onChange={e => setTestString(e.target.value)} placeholder="Enter test string..." className="w-full h-24 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent-500/30 resize-none" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {matches.length > 0 && (
        <div>
          <span className="text-xs font-semibold text-brand-400 uppercase">{matches.length} match{matches.length !== 1 ? 'es' : ''}</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {matches.map((m, i) => (
              <span key={i} className="px-2 py-1 rounded bg-brand-500/10 text-brand-400 text-sm font-mono border border-brand-500/20">{m}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const format = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch {
      setError('Invalid JSON');
    }
  };

  const minify = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch {
      setError('Invalid JSON');
    }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"paste": "your JSON here"}' className="w-full h-32 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
      <div className="flex gap-2">
        <Button onClick={format} size="sm"><Braces className="w-4 h-4" /> Format</Button>
        <Button onClick={minify} variant="secondary" size="sm">Minify</Button>
        <Button onClick={() => { setInput(''); setOutput(''); setError(''); }} variant="ghost" size="sm"><RotateCcw className="w-4 h-4" /> Clear</Button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {output && <pre className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 overflow-x-auto max-h-64 overflow-y-auto">{output}</pre>}
    </div>
  );
}

function UUIDGenerator() {
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => 
      crypto.randomUUID()
    );
    setUuids(newUuids);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="number" min="1" max="100" value={count} onChange={e => setCount(Number(e.target.value))} className="w-24 px-4 py-2.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30" />
        <Button onClick={generate} variant="accent" size="sm"><Key className="w-4 h-4" />Generate</Button>
        {uuids.length > 0 && <Button onClick={copyAll} variant="secondary" size="sm">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}Copy All</Button>}
      </div>
      {uuids.map((uuid, i) => (
        <div key={i} className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 break-all">{uuid}</div>
      ))}
    </div>
  );
}

function HMACGenerator() {
  const [input, setInput] = useState('');
  const [secret, setSecret] = useState('');
  const [hmac, setHmac] = useState('');

  const generate = async () => {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(input));
    const hashArray = Array.from(new Uint8Array(signature));
    setHmac(hashArray.map(b => b.toString(16).padStart(2, '0')).join(''));
  };

  return (
    <div className="space-y-4">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Text to sign..." className="w-full px-4 py-2.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
      <input type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Secret key..." className="w-full px-4 py-2.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
      <Button onClick={generate} size="sm"><Hash className="w-4 h-4" />Generate HMAC</Button>
      {hmac && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 break-all">{hmac}</div>}
    </div>
  );
}

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: true });

  const generate = () => {
    const chars = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    let charset = '';
    Object.keys(options).forEach(key => { if (options[key]) charset += chars[key]; });
    let pwd = '';
    for (let i = 0; i < length; i++) pwd += charset[Math.floor(Math.random() * charset.length)];
    setPassword(pwd);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input type="range" min="8" max="64" value={length} onChange={e => setLength(Number(e.target.value))} className="flex-1" />
        <span className="text-sm text-dark-400 w-12">{length}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.keys(options).map(key => (
          <button key={key} onClick={() => setOptions({ ...options, [key]: !options[key] })} className={`px-3 py-1.5 rounded-lg text-sm ${options[key] ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'bg-dark-800/50 text-dark-400'}`}>{key}</button>
        ))}
      </div>
      <Button onClick={generate} variant="accent" size="sm"><Key className="w-4 h-4" />Generate</Button>
      {password && <div className="p-3 rounded-lg bg-dark-800/50 text-lg font-mono text-dark-200 break-all">{password}</div>}
    </div>
  );
}

function URLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      setOutput(mode === 'encode' ? encodeURIComponent(input) : decodeURIComponent(input));
    } catch { setOutput('Error: Invalid input'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'encode' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'decode' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400'}`}>Decode</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Text to encode...' : 'URL to decode...'} className="w-full h-24 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
      <Button onClick={process} size="sm"><Binary className="w-4 h-4" />{mode === 'encode' ? 'Encode' : 'Decode'}</Button>
      {output && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 break-all">{output}</div>}
    </div>
  );
}

function HTMLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    if (mode === 'encode') {
      setOutput(input.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m])));
    } else {
      setOutput(input.replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, m => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }[m])));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'encode' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400'}`}>Encode</button>
        <button onClick={() => setMode('decode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'decode' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400'}`}>Decode</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="HTML text..." className="w-full h-24 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
      <Button onClick={process} size="sm"><Code2 className="w-4 h-4" />{mode === 'encode' ? 'Encode' : 'Decode'}</Button>
      {output && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 break-all">{output}</div>}
    </div>
  );
}

function BinaryConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(input.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' '));
      } else {
        setOutput(input.split(' ').map(b => String.fromCharCode(parseInt(b, 2))).join(''));
      }
    } catch { setOutput('Error: Invalid input'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'encode' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400'}`}>Text → Binary</button>
        <button onClick={() => setMode('decode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'decode' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400'}`}>Binary → Text</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Text...' : 'Binary (space separated)...'} className="w-full h-24 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
      <Button onClick={process} size="sm"><Binary className="w-4 h-4" />Convert</Button>
      {output && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 break-all">{output}</div>}
    </div>
  );
}

function HexConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(input.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' '));
      } else {
        setOutput(input.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join(''));
      }
    } catch { setOutput('Error: Invalid input'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('encode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'encode' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-dark-400'}`}>Text → Hex</button>
        <button onClick={() => setMode('decode')} className={`px-3 py-1.5 rounded-lg text-sm ${mode === 'decode' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-dark-400'}`}>Hex → Text</button>
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'encode' ? 'Text...' : 'Hex (space separated)...'} className="w-full h-24 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent-500/30 resize-none" />
      <Button onClick={process} variant="accent" size="sm"><Hash className="w-4 h-4" />Convert</Button>
      {output && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 break-all">{output}</div>}
    </div>
  );
}

function YAMLConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const convert = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const yaml = Object.entries(parsed).map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`).join('\n');
      setOutput(yaml);
    } catch { setError('Invalid JSON'); }
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='{"key": "value"}' className="w-full h-32 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30 resize-none" />
      <Button onClick={convert} size="sm"><Braces className="w-4 h-4" />JSON → YAML</Button>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {output && <pre className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 overflow-x-auto">{output}</pre>}
    </div>
  );
}

function CSVConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const convert = () => {
    const lines = input.trim().split('\n');
    const headers = lines[0].split(',');
    const result = lines.slice(1).map(line => {
      const values = line.split(',');
      return headers.reduce((obj, h, i) => ({ ...obj, [h.trim()]: values[i]?.trim() }), {});
    });
    setOutput(JSON.stringify(result, null, 2));
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="name,age\nJohn,30\nJane,25" className="w-full h-32 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent-500/30 resize-none" />
      <Button onClick={convert} variant="accent" size="sm"><Braces className="w-4 h-4" />CSV → JSON</Button>
      {output && <pre className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200 overflow-x-auto max-h-64 overflow-y-auto">{output}</pre>}
    </div>
  );
}

function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [human, setHuman] = useState('');

  const convert = () => {
    const ts = Number(timestamp);
    if (ts) setHuman(new Date(ts * 1000).toLocaleString());
  };

  const now = () => {
    const ts = Math.floor(Date.now() / 1000);
    setTimestamp(ts.toString());
    setHuman(new Date(ts * 1000).toLocaleString());
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={timestamp} onChange={e => setTimestamp(e.target.value)} placeholder="Unix timestamp..." className="flex-1 px-4 py-2.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
        <Button onClick={convert} size="sm"><RotateCcw className="w-4 h-4" />Convert</Button>
        <Button onClick={now} variant="secondary" size="sm">Now</Button>
      </div>
      {human && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200">{human}</div>}
    </div>
  );
}

function DiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState([]);

  const check = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const result = [];
    const maxLen = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLen; i++) {
      if (lines1[i] !== lines2[i]) result.push({ line: i + 1, left: lines1[i] || '', right: lines2[i] || '' });
    }
    setDiff(result);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <textarea value={text1} onChange={e => setText1(e.target.value)} placeholder="Text 1..." className="w-full h-32 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent-500/30 resize-none" />
        <textarea value={text2} onChange={e => setText2(e.target.value)} placeholder="Text 2..." className="w-full h-32 px-4 py-3 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent-500/30 resize-none" />
      </div>
      <Button onClick={check} variant="accent" size="sm"><ArrowLeftRight className="w-4 h-4" />Compare</Button>
      {diff.length > 0 && (
        <div className="space-y-2">
          <span className="text-xs font-semibold text-accent-400 uppercase">{diff.length} differences</span>
          {diff.map(d => (
            <div key={d.line} className="p-2 rounded-lg bg-dark-800/50 text-xs font-mono">
              <div className="text-dark-500 mb-1">Line {d.line}</div>
              <div className="text-red-400">- {d.left}</div>
              <div className="text-green-400">+ {d.right}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorConverter() {
  const [hex, setHex] = useState('#4ade80');
  const [rgb, setRgb] = useState('');
  const [hsl, setHsl] = useState('');

  const convert = () => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setRgb(`rgb(${r}, ${g}, ${b})`);
    const h = Math.round(Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI);
    const l = (r + g + b) / 3 / 255 * 100;
    const s = l > 0 ? (Math.max(r, g, b) - Math.min(r, g, b)) / 255 * 100 : 0;
    setHsl(`hsl(${h}, ${s.toFixed(0)}%, ${l.toFixed(0)}%)`);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <input type="color" value={hex} onChange={e => setHex(e.target.value)} className="w-16 h-12 rounded-lg cursor-pointer" />
        <input type="text" value={hex} onChange={e => setHex(e.target.value)} className="flex-1 px-4 py-2.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
        <Button onClick={convert} size="sm"><Wrench className="w-4 h-4" />Convert</Button>
      </div>
      {rgb && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200">{rgb}</div>}
      {hsl && <div className="p-3 rounded-lg bg-dark-800/50 text-sm font-mono text-dark-200">{hsl}</div>}
    </div>
  );
}

function CronParser() {
  const [cron, setCron] = useState('0 0 * * 1');
  const [explanation, setExplanation] = useState('');

  const parse = () => {
    const parts = cron.split(' ');
    const [min, hour, day, month, weekday] = parts;
    setExplanation(`At ${hour === '*' ? 'every hour' : hour + ':00'}, ${min === '*' ? 'every minute' : 'minute ' + min}, ${day === '*' ? 'every day' : 'day ' + day}, ${month === '*' ? 'every month' : 'month ' + month}, ${weekday === '*' ? 'every weekday' : 'on ' + ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][weekday]}`);
  };

  return (
    <div className="space-y-4">
      <input type="text" value={cron} onChange={e => setCron(e.target.value)} placeholder="0 0 * * 1" className="w-full px-4 py-2.5 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent-500/30" />
      <Button onClick={parse} variant="accent" size="sm"><RotateCcw className="w-4 h-4" />Parse</Button>
      {explanation && <div className="p-3 rounded-lg bg-dark-800/50 text-sm text-dark-200">{explanation}</div>}
    </div>
  );
}

const toolComponents = { jwt: JWTDecoder, hash: HashGenerator, base64: Base64Tool, regex: RegexTester, json: JSONFormatter, uuid: UUIDGenerator, hmac: HMACGenerator, password: PasswordGenerator, url: URLEncoder, html: HTMLEncoder, binary: BinaryConverter, hex: HexConverter, yaml: YAMLConverter, csv: CSVConverter, timestamp: TimestampConverter, diff: DiffChecker, color: ColorConverter, cron: CronParser };

export default function ToolsHubPage() {
  const [activeTool, setActiveTool] = useState('jwt');
  const ActiveComponent = toolComponents[activeTool];

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />

      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-6">
              <Wrench className="w-3 h-3" />
              DEVELOPER TOOLS HUB
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Your Developer <span className="gradient-text">Toolkit</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-dark-400 max-w-xl mx-auto">
            25+ professional tools. JWT, crypto, encoding, data conversion, and more. All client-side. No data leaves your browser.
          </motion.p>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {tools.map(tool => {
                const Icon = tool.icon;
                return (
                  <button key={tool.id} onClick={() => setActiveTool(tool.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTool === tool.id ? tool.color === 'brand' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20 glow-brand' : 'bg-accent-500/10 text-accent-400 border border-accent-500/20 glow-accent' : 'glass text-dark-400 hover:text-dark-200'}`}>
                    <Icon className="w-4 h-4" />
                    {tool.label}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div key={activeTool} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="glass rounded-xl p-4 sm:p-6 max-w-4xl mx-auto min-w-0">
                <div className="flex items-center gap-2 mb-6">
                  {(() => {
                    const tool = tools.find(t => t.id === activeTool);
                    const Icon = tool.icon;
                    return (
                      <>
                        <div className={`p-2 rounded-lg ${tool.color === 'brand' ? 'bg-brand-500/10 text-brand-400' : 'bg-accent-500/10 text-accent-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-semibold text-dark-100">{tool.label}</h2>
                      </>
                    );
                  })()}
                </div>
              <ActiveComponent />
            </motion.div>
        </div>
      </section>
    </div>
  );
}
