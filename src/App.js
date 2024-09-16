import React, { useState, useEffect } from 'react';

export default function Component() {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState('');

  // Fetch comments when the component mounts
  useEffect(() => {
    fetch('/api/comments')
      .then(res => res.json())
      .then(data => setReplies(data))
      .catch(err => console.error('Error fetching comments:', err));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!comment.trim()) {
      setError('Comment is required');
      return;
    }

    const newReply = {
      name: name.trim() || 'Anonymous',
      comment: comment.trim(),
      isSpoiler,
      timestamp: new Date().toLocaleString(),
    };

    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReply),
    })
      .then((res) => res.json())
      .then((data) => {
        setReplies([...replies, data]);
        setName('');
        setComment('');
        setIsSpoiler(false);
      })
      .catch((err) => console.error('Error submitting comment:', err));
  };

  return (
    <div className="bg-[#EEF2FF] min-h-screen font-sans text-[13px] text-[#000000]">
      {/* Header */}
      <header className="bg-[#D1D5EE] border-b border-[#B7C5D9] p-1">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="#" className="text-[#34345C] font-bold">[Twitter/X]</a>
            <a href="#" className="text-[#34345C] font-bold">[Telegram]</a>
            <a href="#" className="text-[#34345C] font-bold">[Pump]</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-[#34345C] font-bold">[a]</a>
            <a href="#" className="text-[#34345C] font-bold">[b]</a>
            <a href="#" className="text-[#34345C] font-bold">[c]</a>
            <a href="#" className="text-[#34345C] font-bold">[d]</a>
            <a href="#" className="text-[#34345C] font-bold">[e]</a>
            <a href="#" className="text-[#34345C] font-bold">[f]</a>
            <a href="#" className="text-[#34345C] font-bold">[g]</a>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-2">
        <div className="bg-[#D6DAF0] p-2 mb-4">
          <h1 className="text-[#AF0A0F] font-bold text-lg">/truth/ - Conspiracy</h1>
          <p className="text-xs mt-1">CA: processing...</p>
        </div>

        {/* Thread */}
        <div className="bg-[#D6DAF0] p-2 mb-4">
          {/* Original Post */}
          <div className="p-2 bg-[#F0E0D6]">
            <div className="flex items-start space-x-2">
              <img
                src="/truth.png"
                alt="Post image"
                className="w-[100px] md:w-[150px] border border-[#D9BFB7]"
              />
              <div>
                <div>
                  <span className="font-bold text-[#117743]">Anonymous</span>
                  <span className="text-xs"> 06/15/23(Thu)12:34:56 No.123456789</span>
                </div>
                <div className="text-xs mt-1">File: <span className="text-[#0000EE]">ufo_sighting.jpg</span> (39 KB, 250x250)</div>
                <p className="mt-2 whitespace-pre-wrap">
                  Hey /x/,

                  I was just watching a documentary on Area 51. Do you guys really believe they're hiding alien spacecraft there? Also, what's the deal with those weird black helicopters people keep seeing? Here's what I've gathered so far:

                  <span className="text-[#789922]">&gt;Area 51 is a front for reverse-engineering alien technology
                  &gt;Black helicopters are part of the New World Order surveillance program
                  &gt;The moon landing was faked as a distraction</span>

                  What do you think? Any truth to these or am I going down a rabbit hole?
                </p>
              </div>
            </div>
          </div>

          {/* Replies */}
          <div className="mt-2 space-y-2">
            <div className="p-2 bg-[#F0E0D6]">
              <div>
                <span className="font-bold text-[#117743]">Anonymous</span>
                <span className="text-xs"> 06/15/23(Thu)12:35:23 No.123456790</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap">
                <span className="text-[#789922]">&gt;believing the moon landing was faked</span>
                
                Come on man, that's a tired one. The real conspiracy is that NASA fakes new discoveries to justify their budget.

                <span className="italic text-[#789922]">&gt;&gt;123456789</span>
                About the black helicopters, though, it's real. I've seen them circling in my area late at night.
              </p>
            </div>

            <div className="p-2 bg-[#F0E0D6]">
              <div className="flex items-start space-x-2">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Reply image"
                  className="w-[100px] h-[100px] border border-[#D9BFB7]"
                />
                <div>
                  <div>
                    <span className="font-bold text-[#117743]">Anonymous</span>
                    <span className="text-xs"> 06/15/23(Thu)12:36:45 No.123456791</span>
                  </div>
                  <div className="text-xs mt-1">File: <span className="text-[#0000EE]">chemtrails.png</span> (15 KB, 100x100)</div>
                  <p className="mt-2 whitespace-pre-wrap">
                    If you want real answers, look into chemtrails. The government is spraying chemicals in the sky to control us.
                    
                    Wake up, sheeple.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2 bg-[#F0E0D6]">
              <div>
                <span className="font-bold text-[#117743]">Anonymous</span>
                <span className="text-xs"> 06/15/23(Thu)12:37:12 No.123456792</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap">
                <span className="italic text-[#789922]">&gt;&gt;123456791</span>
                Chemtrails are just the tip of the iceberg. You need to look into HAARP – it's controlling the weather.
                
                As for aliens, they've been here for decades. Area 51 is just one of many facilities.
              </p>
            </div>
            
            {/* New replies */}
            {replies.map((reply) => (
              <div key={reply._id} className="p-2 bg-[#F0E0D6]">
                <div>
                  <span className="font-bold text-[#117743]">{reply.name}</span>
                  <span className="text-xs"> {reply.timestamp} No.{reply._id}</span>
                </div>
                <p className={`mt-2 whitespace-pre-wrap ${reply.isSpoiler ? 'bg-black text-black hover:bg-transparent hover:text-inherit' : ''}`}>
                  {reply.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reply Form */}
        <div className="bg-[#D6DAF0] p-2">
          <h3 className="font-bold mb-2 text-[#0F0C5D]">Reply to Thread No.123456789</h3>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form className="space-y-2" onSubmit={handleFormSubmit}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name (optional)"
                className="w-1/3 bg-[#F0E0D6] border-[#B7C5D9] p-1"
              />
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment (required)"
              className="w-full h-24 bg-[#F0E0D6] border-[#B7C5D9] p-1"
              required
            />
            <div className="flex items-center space-x-2">
              <button 
                type="submit" 
                className="bg-[#0F0C5D] text-white p-1 hover:bg-[#0A0A3F] disabled:bg-gray-400"
                disabled={!comment.trim()}
              >
                Post
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="spoiler"
                checked={isSpoiler}
                onChange={(e) => setIsSpoiler(e.target.checked)}
              />
              <label htmlFor="spoiler" className="text-[#34345C]">Spoiler</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}