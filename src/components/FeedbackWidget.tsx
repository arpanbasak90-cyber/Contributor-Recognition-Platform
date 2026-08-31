import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2, ExternalLink } from 'lucide-react';
import { trackEvent } from '../services/analytics';

const GOOGLE_FORM_URL = 'https://forms.gle/StellarMintUserFeedbackForm50';

interface FeedbackData {
  rating: number;
  comment: string;
}

type ModalState = 'closed' | 'open' | 'submitted';

export const FeedbackWidget: React.FC = () => {
  const [state, setState] = useState<ModalState>('closed');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => setState('open');
  const handleClose = () => {
    setState('closed');
    setRating(0);
    setHoverRating(0);
    setComment('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    setIsSubmitting(true);

    // Store feedback locally
    try {
      const feedbackHistory = JSON.parse(localStorage.getItem('stellar_crp_feedback') || '[]');
      feedbackHistory.push({ rating, comment, timestamp: new Date().toISOString() });
      localStorage.setItem('stellar_crp_feedback', JSON.stringify(feedbackHistory));
    } catch { /* ignore */ }

    // Track the feedback event in analytics
    trackEvent('FEEDBACK_SUBMITTED', { rating, hasComment: comment.length > 0 });

    await new Promise(r => setTimeout(r, 600));
    setIsSubmitting(false);
    setState('submitted');
  };

  const starLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];

  return (
    <>
      {/* Floating Action Button */}
      {state === 'closed' && (
        <button
          className="feedback-fab"
          onClick={handleOpen}
          title="Share your feedback"
          aria-label="Open feedback form"
          id="feedback-fab-btn"
        >
          <MessageSquare size={22} color="#FFFFFF" />
        </button>
      )}

      {/* Modal Overlay */}
      {state !== 'closed' && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
          <div className="feedback-modal">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <MessageSquare size={18} color="#FFFFFF" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>
                    {state === 'submitted' ? 'Thank You! ??' : 'Share Feedback'}
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', opacity: 0.85 }}>
                    {state === 'submitted' ? 'Your response was recorded' : 'Help us improve the platform'}
                  </p>
                </div>
              </div>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                <X size={18} color="var(--text-muted)" />
              </button>
            </div>

            {/* Submitted State */}
            {state === 'submitted' ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <CheckCircle2 size={48} color="var(--accent-green)" style={{ margin: '0 auto 1rem' }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Your {rating}-star feedback has been saved! You can also submit it to our official form:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ textDecoration: 'none', fontSize: '0.88rem' }}
                  >
                    <ExternalLink size={14} /> Submit to Google Form
                  </a>
                  <button onClick={handleClose} className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
                    Close
                  </button>
                </div>
              </div>
            ) : (
              /* Feedback Form */
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Star Rating */}
                <div style={{ textAlign: 'center' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                    How would you rate your experience?
                  </label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} stars`}
                      >
                        {star <= (hoverRating || rating) ? '?' : '?'}
                      </button>
                    ))}
                  </div>
                  {(hoverRating || rating) > 0 && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                      {starLabels[hoverRating || rating]}
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Any comments? (optional)
                  </label>
                  <textarea
                    className="input-field"
                    placeholder="What did you like? What could be improved?"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={3}
                    maxLength={300}
                    style={{ resize: 'vertical', minHeight: '80px' }}
                  />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '0.2rem', opacity: 0.7 }}>
                    {comment.length}/300
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={rating === 0 || isSubmitting}
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="animate-spin" style={{ display: 'inline-block', fontSize: '1rem' }}>?</span>
                      Submitting...
                    </span>
                  ) : (
                    <><Send size={15} /> Submit Feedback</>
                  )}
                </button>

                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5, opacity: 0.75 }}>
                  Your feedback helps us improve the platform for all contributors.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
