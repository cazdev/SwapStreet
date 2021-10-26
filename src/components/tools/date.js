const today = new Date();

 const dateOptions = {
   timeZone: 'Sydney/Australia',
   weekday: 'long',
   year: 'numeric',
   month: 'short',
   day: 'numeric'
 };
 
 const timeOptions = {
   hour: 'numeric',
   minute: 'numeric'
 };
 
 // export const date = today.toLocaleDateString(undefined, dateOptions);
 // export const time = today.toLocaleTimeString(undefined, timeOptions);
 
 export const formatDate = date => {
   const newDate = new Date(date);
 
   //   const newDateOptions = {
   //     year: "numeric",
   //     month: "short",
   //     day: "numeric"
   //   };
 
   return newDate.toLocaleDateString('en-US', dateOptions);
 };