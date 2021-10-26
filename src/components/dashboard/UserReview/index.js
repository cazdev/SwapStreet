/*import React from 'react';



const ReviewSummary = (userList) => {
console.log(userList)
return (<div> Hello World! </div>)
}

export default ReviewSummary;
*/


 import React from 'react';
 import { Row, Col } from 'reactstrap';
 
 import AddReview from './AddReview';
 import ReviewList from './ReviewList';
 import ReviewSummary from './ReviewSummary';
 
 const UserReview = props => {
   return (
     <div className='mt-md-4 user-review'>
       <Row className='flex-row'>
         <Col xs='12' md='5' lg='5' className='mb-3 px-3 px-md-2'>
           {Object.keys(props.reviewSummary).length > 0 && (
             <ReviewSummary reviewSummary={props.reviewSummary} />
           )}
         </Col>
         <Col xs='12' md='7' lg='7' className='mb-3 px-3 px-md-2'>
           {props.review.length > 0 && <ReviewList review={props.review} />}
           <AddReview
             reviewFormData={props.reviewFormData}
             reviewChange={props.reviewChange}
             reviewFormErrors={props.reviewFormErrors}
             addReview={props.addReview}
           />
         </Col>
       </Row>
     </div>
   );
 };
 
 export default UserReview;