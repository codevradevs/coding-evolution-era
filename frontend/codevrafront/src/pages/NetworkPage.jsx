import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, MapPin, Users, MessageSquare, Rocket } from 'lucide-react';

const profiles = [
  { id: '1', name: 'Amina Osei', role: 'founder', title: 'CEO & Co-founder at PayStack Clone', location: 'Lagos, Nigeria', skills: ['Product Management', 'Fintech', 'Strategy'], bio: 'Building the next generation of African payment infrastructure.', lookingFor: 'Technical co-founder', avatar: 'AO' },
  { id: '2', name: 'David Kimani', role: 'developer', title: 'Full-Stack Developer', location: 'Nairobi, Kenya', skills: ['React', 'Node.js', 'PostgreSQL', 'M-Pesa API'], bio: 'Building tools for African developers. Open source contributor.', lookingFor: 'Startup opportunities', avatar: 'DK' },
];

const roleColors = {
  founder: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  developer: 'text-brand-400 bg-brand-500/10 border-brand-500/20',
};

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState('people');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-brand-400 text-xs font-medium mb-4">
              <Globe className="w-3 h-3" />AFRICAN STARTUP NETWORK
            </span>
            <h1 className="text-3xl font-bold mb-2">Connect. Build. <span className="gradient-text">Launch.</span></h1>
            <p className="text-dark-400 text-sm">Find co-founders, developers, and startups across Africa</p>
          </motion.div>
        </div>
      </section>
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="flex gap-2">
              <button onClick={() => setActiveTab('people')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'people' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
                <Users className="w-4 h-4" />People
              </button>
              <button onClick={() => setActiveTab('startups')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'startups' ? 'bg-accent-500/10 text-accent-400 border border-accent-500/20' : 'text-dark-400 hover:text-dark-200'}`}>
                <Rocket className="w-4 h-4" />Startups
              </button>
            </div>
            <div className="relative flex-1 w-full sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search people, skills, locations..." className="w-full pl-10 pr-4 py-2.5 rounded-lg glass text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile, i) => (
              <motion.div key={profile.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5 group hover:border-brand-500/20 transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center text-sm font-bold text-dark-200 border border-dark-700/50">{profile.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark-100 truncate">{profile.name}</h3>
                    <p className="text-xs text-dark-400 truncate">{profile.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border capitalize ${roleColors[profile.role]}`}>{profile.role}</span>
                  <span className="flex items-center gap-1 text-xs text-dark-500"><MapPin className="w-3 h-3" />{profile.location}</span>
                </div>
                <p className="text-sm text-dark-400 line-clamp-2 mb-3">{profile.bio}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {profile.skills.slice(0, 3).map(skill => <span key={skill} className="px-2 py-0.5 rounded text-xs bg-dark-800/50 text-dark-400">{skill}</span>)}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-dark-700/30">
                  <span className="text-xs text-dark-500">🔍 {profile.lookingFor}</span>
                  <button className="p-1.5 rounded-lg text-dark-500 hover:text-brand-400 hover:bg-dark-800/50 transition-all"><MessageSquare className="w-3.5 h-3.5" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
