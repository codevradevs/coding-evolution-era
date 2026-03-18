import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import axios from 'axios';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/blogs/${slug}`);
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const renderContent = (content) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return <h1 key={i} className="text-3xl font-bold text-dark-100 mt-8 mb-4">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-bold text-dark-100 mt-6 mb-3">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold text-dark-200 mt-4 mb-2">{line.slice(4)}</h3>;
      }
      if (line.startsWith('```')) {
        return null;
      }
      if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return <li key={i} className="text-dark-300 ml-6">{line.trim().slice(1).trim()}</li>;
      }
      if (line.trim().match(/^\d+\./)) {
        return <li key={i} className="text-dark-300 ml-6">{line.trim().replace(/^\d+\./, '').trim()}</li>;
      }
      if (line.trim() === '') {
        return <br key={i} />;
      }
      return <p key={i} className="text-dark-300 mb-4 leading-relaxed">{line}</p>;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-dark-400">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-dark-400 mb-4">Article not found</p>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-20" />
      
      <article className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/blog')}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-3 py-1 rounded-lg glass-brand text-brand-400 text-sm font-medium mb-4">
              {blog.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-dark-100 mb-6">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-dark-400 mb-8 pb-8 border-b border-dark-700/30">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {blog.readTime} min read
              </span>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              {renderContent(blog.content)}
            </div>

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-dark-700/30">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-dark-500" />
                  {blog.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg glass text-sm text-dark-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-dark-700/30 text-center">
              <p className="text-dark-400 mb-4">Have questions? Reach out on Twitter or join our developer community.</p>
              <Button onClick={() => navigate('/blog')}>
                Read More Articles
              </Button>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
