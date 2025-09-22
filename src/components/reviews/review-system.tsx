'use client';

import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  rating: number;
  comment: string;
  buyerName: string;
  buyerAvatar?: string;
  createdAt: string;
  isAnonymous: boolean;
}

interface ReviewSystemProps {
  sellerId: string;
  productId?: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  canReview?: boolean;
}

export default function ReviewSystem({ 
  sellerId, 
  productId, 
  averageRating, 
  totalReviews, 
  reviews,
  canReview = false 
}: ReviewSystemProps) {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={() => interactive && onRate && onRate(i + 1)}
      />
    ));
  };

  const handleSubmitReview = async () => {
    // In real app, submit to backend
    console.log('Submitting review:', {
      sellerId,
      productId,
      rating: newRating,
      comment: newComment,
      isAnonymous
    });

    setShowReviewDialog(false);
    setNewRating(0);
    setNewComment('');
    setIsAnonymous(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Reviews & Ratings</span>
          {canReview && (
            <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Write Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Write a Review</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(newRating, true, setNewRating)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Comment</label>
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your experience..."
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                    />
                    <label htmlFor="anonymous" className="text-sm">
                      Post anonymously
                    </label>
                  </div>
                  
                  <Button 
                    onClick={handleSubmitReview} 
                    disabled={newRating === 0}
                    className="w-full"
                  >
                    Submit Review
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Rating */}
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1">
              {renderStars(Math.round(averageRating))}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    {!review.isAnonymous && review.buyerAvatar && (
                      <AvatarImage src={review.buyerAvatar} />
                    )}
                    <AvatarFallback>
                      {review.isAnonymous ? '?' : review.buyerName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">
                        {review.isAnonymous ? 'Anonymous' : review.buyerName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {renderStars(review.rating)}
                    </div>
                    
                    {review.comment && (
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    )}
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-auto p-1">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Helpful
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}