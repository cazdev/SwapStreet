//          AUTHORS - KRITI CHAWLA, JOSHUA DODANDUWA
//          Macquarie University Students\

import React from 'react';

import ReactStars from 'react-rating-stars-component';

import NotFound from '../../tools/NotFound';
import { ReviewIcon } from '../../tools/Icon';

const ReviewSummary = props => {
  const totalRatings = props.totalRatings
  const totalReview = props.totalReview
  //const totalSummary = props.totalSummary

  //  const {
  //    reviewSummary: { totalRatings, totalReview, totalSummary }
  //  } = props;

  /*const getRatingPercentage = value => {
    return parseFloat(percentage(value, totalSummary).toFixed(2));
  };*/

  const averageRating =
    totalRatings > 0 && Math.round(totalRatings / totalReview);
  const ratingChanged = (e) => {
    console.log(e)
  }
  return (
    <div>
      {averageRating && (
        <>
          <ReactStars
            size={15}
            color={'#cccccc'}
            activeColor={'#ffb302'}
            a11y={true}
            isHalf={true}
            emptyIcon={<i className='fa fa-star' />}
            halfIcon={<i className='fa fa-star-half-alt' />}
            edit={false}
            value={averageRating}
          />
          {totalReview > 0 && <span>(average based on {totalReview} reviews)</span>}
          </>
      )}

      
      {/*{totalReview > 0 ? (
         ratingSummary.map((r, obj) => (
           <div key={obj} className='d-flex align-items-center mb-2'>
             <div className='left'>
               <span>{parseInt(Object.keys(r)[0])} star</span>
             </div>
             <div className='middle'>
               <div className='bar-container'>
                 <div
                   className={`bar-${parseInt(Object.keys(r)[0])}`}
                   style={{
                     width: `${getRatingPercentage(
                       parseInt(r[Object.keys(r)[0]])
                     )}%`
                   }}
                 ></div>
               </div>
             </div>
             <div className='ml-2 right'>
               <span className='fw-2'>
                 {getRatingPercentage(parseInt(r[Object.keys(r)[0]]))}%
               </span>
             </div>
           </div>
         ))
       ) : (
         <NotFound>
           <ReviewIcon width='40' height='40' className='my-2' />
           <p className='mb-2'>Be the first to add a review.</p>
         </NotFound>
       )}*/}
    </div>
  );
};

export default ReviewSummary;

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}