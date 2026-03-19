import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, Search, Tag, Folder, Trash2, Edit3, Save, X, FileText, Code, Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { vaultApi } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const folders = ['All Notes', 'Credentials', 'Security Research', 'Code Snippets', 'Research'];

export default function VaultPage() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeFolder, setActiveFolder] = useState('All Notes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [showEncrypted, setShowEncrypted] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    vaultApi.getNotes()
      .then(res => setNotes(res.data))
      .catch(() => setError('Failed to load notes'))
      .finally(() => setLoading(false));
  }, [user]);

  const filteredNotes = notes.filter(note => {
    const matchesFolder = activeFolder === 'All Notes' || (note.tags || []).includes(activeFolder.toLowerCase().replace(' ', '-'));
    const matchesSearch = searchQuery === '' || note.title.toLowerCase().includes(searchQuery.toLowerCase()) || (note.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFolder && matchesSearch;
  });

  const startEditing = (note) => {
    setIsEditing(true);
    setEditTitle(note.title);
    setEditContent(note.encryptedContent || '');
  };

  const saveEdit = async () => {
    if (!selectedNote) return;
    try {
      const res = await vaultApi.updateNote(selectedNote._id, { title: editTitle, encryptedContent: editContent, tags: selectedNote.tags });
      setNotes(notes.map(n => n._id === selectedNote._id ? res.data : n));
      setSelectedNote(res.data);
      setIsEditing(false);
    } catch {
      setError('Failed to save note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await vaultApi.deleteNote(id);
      setNotes(notes.filter(n => n._id !== id));
      setSelectedNote(null);
    } catch {
      setError('Failed to delete note');
    }
  };

  const createNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    try {
      const res = await vaultApi.createNote({
        title: newNote.title,
        encryptedContent: newNote.content,
        tags: newNote.tags.split(',').map(t => t.trim()).filter(Boolean),
      });
      setNotes([res.data, ...notes]);
      setNewNote({ title: '', content: '', tags: '' });
      setIsCreating(false);
    } catch {
      setError('Failed to create note');
    }
  };

  if (!user) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Lock className="w-12 h-12 text-dark-600 mx-auto mb-3" />
          <p className="text-dark-400">Please sign in to access your vault</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-dots pointer-events-none opacity-20" />
      <section className="relative py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-brand text-accent-400 text-xs font-medium mb-4">
              <Lock className="w-3 h-3" />SECURE NOTE VAULT
            </span>
            <h1 className="text-3xl font-bold mb-2">Your Encrypted <span className="gradient-text-accent">Vault</span></h1>
            <p className="text-dark-400 text-sm flex items-center justify-center gap-2">
              <Shield className="w-3.5 h-3.5 text-brand-400" />End-to-end encrypted • Markdown support • Code snippets
            </p>
          </motion.div>
        </div>
      </section>
      <section className="relative px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {error && <p className="text-sm text-red-400 mb-4">{error}</p>}
          <div className="flex flex-col lg:flex-row gap-4 min-h-[500px] lg:h-[calc(100vh-280px)]">
            <div className="lg:w-64 shrink-0 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search notes..." className="w-full pl-10 pr-4 py-2.5 rounded-lg glass text-sm text-dark-100 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30" />
              </div>
              <div className="glass rounded-xl p-3 flex lg:flex-col gap-1 overflow-x-auto">
                {folders.map(folder => (
                  <button key={folder} onClick={() => setActiveFolder(folder)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${activeFolder === folder ? 'bg-accent-500/10 text-accent-400' : 'text-dark-400 hover:text-dark-200 hover:bg-dark-800/50'}`}>
                    <Folder className="w-3.5 h-3.5" />{folder}
                    <span className="ml-auto text-xs text-dark-600">{folder === 'All Notes' ? notes.length : notes.filter(n => (n.tags || []).includes(folder.toLowerCase().replace(' ', '-'))).length}</span>
                  </button>
                ))}
              </div>
              <Button onClick={() => setIsCreating(true)} size="sm" variant="accent">
                <Plus className="w-4 h-4" />New Note
              </Button>
            </div>
            <div className="lg:w-72 shrink-0 glass rounded-xl overflow-hidden flex flex-col max-h-64 lg:max-h-none">
              <div className="p-3 border-b border-dark-700/50"><span className="text-xs font-semibold text-dark-500 uppercase">{filteredNotes.length} notes</span></div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {loading ? (
                  <div className="flex items-center justify-center py-8"><Loader2 className="w-6 h-6 text-dark-500 animate-spin" /></div>
                ) : filteredNotes.map(note => (
                  <button key={note._id} onClick={() => { setSelectedNote(note); setIsEditing(false); }} className={`w-full text-left p-3 rounded-lg transition-all ${selectedNote?._id === note._id ? 'bg-accent-500/10 border border-accent-500/20' : 'hover:bg-dark-800/50 border border-transparent'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-3 h-3 text-dark-500" />
                      <span className="text-sm font-medium text-dark-200 truncate">{note.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-dark-600">{new Date(note.updatedAt).toLocaleDateString()}</span>
                      <div className="flex gap-1">{(note.tags || []).slice(0, 2).map(tag => <span key={tag} className="text-xs text-dark-600">#{tag}</span>)}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 glass rounded-xl overflow-hidden flex flex-col">
              {isCreating ? (
                <>
                  <div className="p-4 border-b border-dark-700/50 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-dark-100">New Note</h2>
                    <Button onClick={() => setIsCreating(false)} size="sm" variant="ghost"><X className="w-3.5 h-3.5" /></Button>
                  </div>
                  <div className="flex-1 p-4 space-y-3">
                    <input type="text" value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })} placeholder="Note title..." className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30" />
                    <input type="text" value={newNote.tags} onChange={e => setNewNote({ ...newNote, tags: e.target.value })} placeholder="Tags (comma separated)..." className="w-full px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/30" />
                    <textarea value={newNote.content} onChange={e => setNewNote({ ...newNote, content: e.target.value })} placeholder="Note content..." className="w-full h-48 px-3 py-2 rounded-lg bg-dark-800/50 border border-dark-700/50 text-dark-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent-500/30 resize-none" />
                    <Button onClick={createNote} disabled={!newNote.title.trim() || !newNote.content.trim()} variant="accent"><Save className="w-3.5 h-3.5" />Save Note</Button>
                  </div>
                </>
              ) : selectedNote ? (
                <>
                  <div className="p-4 border-b border-dark-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isEditing ? <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="text-lg font-semibold bg-transparent text-dark-100 focus:outline-none border-b border-dark-600" /> : <h2 className="text-lg font-semibold text-dark-100">{selectedNote.title}</h2>}
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <Button onClick={saveEdit} size="sm" variant="accent"><Save className="w-3.5 h-3.5" />Save</Button>
                          <Button onClick={() => setIsEditing(false)} size="sm" variant="ghost"><X className="w-3.5 h-3.5" /></Button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => setShowEncrypted(!showEncrypted)} className="p-2 rounded-lg text-dark-500 hover:text-dark-300">{showEncrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                          <button onClick={() => startEditing(selectedNote)} className="p-2 rounded-lg text-dark-500 hover:text-dark-300"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => deleteNote(selectedNote._id)} className="p-2 rounded-lg text-dark-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-2 border-b border-dark-700/30 flex items-center gap-2">
                    <Tag className="w-3 h-3 text-dark-600" />
                    {(selectedNote.tags || []).map(tag => <span key={tag} className="px-2 py-0.5 rounded text-xs bg-dark-800/50 text-dark-400">#{tag}</span>)}
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    {isEditing ? <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="w-full h-full bg-transparent text-dark-200 text-sm font-mono focus:outline-none resize-none" /> : <pre className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-dark-200">{showEncrypted ? selectedNote.encryptedContent : '🔒 Click the eye icon to view content.'}</pre>}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-dark-600">
                  <div className="text-center"><Lock className="w-12 h-12 mx-auto mb-3 opacity-30" /><p>Select a note or create a new one</p></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
